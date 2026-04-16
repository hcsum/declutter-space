"use client";

import Link from "next/link";
import { ChangeEvent, useMemo, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useI18n } from "@/i18n/i18n-provider";
import ChecklistCloudBanner from "../components/ChecklistCloudBanner";
import ChecklistLocaleSwitcher from "../components/ChecklistLocaleSwitcher";
import {
  ArchivedItemsByEntryKey,
  CustomItemsByCategory,
  HistoryByDate,
  ImportedList,
  RemovedItemsByCategory,
  buildEntryKey,
  buildImportedItemId,
  buildImportedListId,
  getChecklistCategories,
  sanitizeImportedLists,
} from "@/lib/checklist/checklist";
import { useChecklistPersistence } from "@/lib/checklist/useChecklistPersistence";

type ParsedRow = { title: string; item: string };
type PreviewList = {
  id: string;
  title: string;
  items: Array<{ id: string; text: string }>;
};
type SourceCategory = {
  sourceListId: string;
  targetListId: string;
  title: string;
  items: Array<{ id: string; text: string }>;
};

const sampleCsv = `list,item
Kitchen,Expired spices
Kitchen,Mismatched food containers
Bedroom,Clothes with tags still attached
Bedroom,Old pillows
Bathroom,Empty detergent bottles`;

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      const nextChar = line[index + 1];
      if (inQuotes && nextChar === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      cells.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

function parseCsvText(csvText: string) {
  const normalizedText = csvText.replace(/\r\n?/g, "\n").trim();
  if (!normalizedText) {
    return {
      rows: [] as ParsedRow[],
      skippedRowCount: 0,
      invalidRowCount: 0,
      error: "The CSV file is empty.",
    };
  }

  const lines = normalizedText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return {
      rows: [] as ParsedRow[],
      skippedRowCount: 0,
      invalidRowCount: 0,
      error: "Add a header row and at least one item row.",
    };
  }

  const header = parseCsvLine(lines[0]).map((value) => value.toLowerCase());
  const titleColumnIndex = header.findIndex((value) => value === "list");
  const itemColumnIndex = header.findIndex((value) => value === "item");

  if (
    titleColumnIndex === -1 ||
    itemColumnIndex === -1 ||
    header.length !== 2 ||
    header[0] !== "list" ||
    header[1] !== "item"
  ) {
    return {
      rows: [] as ParsedRow[],
      skippedRowCount: 0,
      invalidRowCount: 0,
      error: 'Use exactly this header row: "list,item".',
    };
  }

  const rows: ParsedRow[] = [];
  let invalidRowCount = 0;

  lines.slice(1).forEach((line) => {
    const cells = parseCsvLine(line);
    const title = (cells[titleColumnIndex] ?? "").trim();
    const item = (cells[itemColumnIndex] ?? "").trim();

    if (!title || !item) {
      invalidRowCount += 1;
      return;
    }

    rows.push({ title, item });
  });

  return {
    rows,
    skippedRowCount: 0,
    invalidRowCount,
    error:
      rows.length === 0 ? "No valid rows were found in the CSV file." : null,
  };
}

function buildPreviewLists(rows: ParsedRow[]) {
  const grouped = new Map<string, Map<string, { id: string; text: string }>>();
  let duplicateCount = 0;

  rows.forEach(({ title, item }) => {
    const titleId = buildImportedListId(title);
    const itemId = buildImportedItemId(item);
    const current =
      grouped.get(titleId) ?? new Map<string, { id: string; text: string }>();

    if (current.has(itemId)) {
      duplicateCount += 1;
    } else {
      current.set(itemId, { id: itemId, text: item.trim() });
    }

    grouped.set(titleId, current);
  });

  const previewLists: PreviewList[] = Array.from(grouped.entries())
    .map(([id, itemsMap]) => {
      const title =
        rows
          .find((row) => buildImportedListId(row.title) === id)
          ?.title.trim() ?? "";
      return {
        id,
        title,
        items: Array.from(itemsMap.values()).sort((left, right) =>
          left.text.localeCompare(right.text),
        ),
      };
    })
    .filter((list) => list.title && list.items.length > 0)
    .sort((left, right) => left.title.localeCompare(right.title));

  return { previewLists, duplicateCount };
}

function mergeImportedLists(
  existingLists: ImportedList[],
  nextLists: ImportedList[],
) {
  const merged = new Map<string, ImportedList>();

  existingLists.forEach((list) => {
    merged.set(list.id, {
      ...list,
      items: [...list.items],
    });
  });

  nextLists.forEach((list) => {
    const current = merged.get(list.id);
    if (!current) {
      merged.set(list.id, list);
      return;
    }

    const items = new Map<string, { id: string; text: string }>();
    [...current.items, ...list.items].forEach((item) =>
      items.set(item.id, item),
    );

    merged.set(list.id, {
      ...current,
      title: list.title,
      items: Array.from(items.values()).sort((left, right) =>
        left.text.localeCompare(right.text),
      ),
    });
  });

  return sanitizeImportedLists(Array.from(merged.values())).sort(
    (left, right) => left.title.localeCompare(right.title),
  );
}

function replaceImportedListsKeepingHistory(
  existingLists: ImportedList[],
  nextLists: ImportedList[],
  historyByDate: HistoryByDate,
  sourceCategories: SourceCategory[],
) {
  const nextByListId = new Map<string, ImportedList>();
  const nextHistoryByDate: HistoryByDate = Object.fromEntries(
    Object.entries(historyByDate).map(([dateKey, entryKeys]) => [
      dateKey,
      [...entryKeys],
    ]),
  );

  nextLists.forEach((list) => {
    nextByListId.set(list.id, {
      ...list,
      items: [...list.items],
    });
  });

  const historyEntryKeys = new Set(Object.values(historyByDate).flat());

  const preserveHistoryItems = ({
    sourceListId,
    targetListId,
    title,
    items,
  }: {
    sourceListId: string;
    targetListId: string;
    title: string;
    items: Array<{ id: string; text: string }>;
  }) => {
    const current = nextByListId.get(targetListId) ?? {
      id: targetListId,
      title,
      items: [],
    };
    const itemsById = new Map(current.items.map((item) => [item.id, item]));

    items.forEach((item) => {
      const sourceEntryKey = buildEntryKey(sourceListId, item.id);
      if (!historyEntryKeys.has(sourceEntryKey)) return;

      const importedItemId = buildImportedItemId(item.text);
      itemsById.set(importedItemId, { id: importedItemId, text: item.text });

      const importedEntryKey = buildEntryKey(targetListId, importedItemId);
      Object.entries(nextHistoryByDate).forEach(([dateKey, entryKeys]) => {
        if (!entryKeys.includes(sourceEntryKey)) {
          return;
        }

        const nextEntries = entryKeys.map((entryKey) =>
          entryKey === sourceEntryKey ? importedEntryKey : entryKey,
        );
        nextHistoryByDate[dateKey] = Array.from(new Set(nextEntries));
      });
    });

    if (itemsById.size > 0) {
      nextByListId.set(targetListId, {
        id: targetListId,
        title: current.title || title,
        items: Array.from(itemsById.values()).sort((left, right) =>
          left.text.localeCompare(right.text),
        ),
      });
    }
  };

  existingLists.forEach((list) => {
    preserveHistoryItems({
      sourceListId: list.id,
      targetListId: list.id,
      title: list.title,
      items: list.items,
    });
  });

  sourceCategories.forEach((category) => {
    preserveHistoryItems({
      sourceListId: category.sourceListId,
      targetListId: category.targetListId,
      title: category.title,
      items: category.items,
    });
  });

  return {
    importedLists: sanitizeImportedLists(
      Array.from(nextByListId.values()),
    ).sort((left, right) => left.title.localeCompare(right.title)),
    historyByDate: nextHistoryByDate,
  };
}

function promotePresetHistoryToImportedHistory(
  historyByDate: HistoryByDate,
  sourceCategories: SourceCategory[],
) {
  const nextHistoryByDate: HistoryByDate = Object.fromEntries(
    Object.entries(historyByDate).map(([dateKey, entryKeys]) => [
      dateKey,
      [...entryKeys],
    ]),
  );

  sourceCategories.forEach((category) => {
    category.items.forEach((item) => {
      const presetEntryKey = buildEntryKey(category.sourceListId, item.id);
      const importedItemId = buildImportedItemId(item.text);
      const importedEntryKey = buildEntryKey(
        category.targetListId,
        importedItemId,
      );

      Object.entries(nextHistoryByDate).forEach(([dateKey, entryKeys]) => {
        if (!entryKeys.includes(presetEntryKey)) {
          return;
        }

        const nextEntries = entryKeys.map((entryKey) =>
          entryKey === presetEntryKey ? importedEntryKey : entryKey,
        );
        nextHistoryByDate[dateKey] = Array.from(new Set(nextEntries));
      });
    });
  });

  return nextHistoryByDate;
}

export default function UploadClientPage() {
  const { t, locale, localePath } = useI18n();
  const presetCategories = useMemo(
    () => getChecklistCategories(locale),
    [locale],
  );
  const [customItemsByCategory, setCustomItemsByCategory] =
    useState<CustomItemsByCategory>({});
  const [archivedItemsByEntryKey, setArchivedItemsByEntryKey] =
    useState<ArchivedItemsByEntryKey>({});
  const [removedItemsByCategory, setRemovedItemsByCategory] =
    useState<RemovedItemsByCategory>({});
  const [importedLists, setImportedLists] = useState<ImportedList[]>([]);
  const [historyByDate, setHistoryByDate] = useState<HistoryByDate>({});
  const [hasSeenMomentumDialog, setHasSeenMomentumDialog] = useState(false);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewLists, setPreviewLists] = useState<PreviewList[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [invalidRowCount, setInvalidRowCount] = useState(0);
  const [duplicateCount, setDuplicateCount] = useState(0);
  const [importMode, setImportMode] = useState<"merge" | "replace">("merge");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const existingLists = importedLists;

  const checklistState = useMemo(
    () => ({
      customItemsByCategory,
      archivedItemsByEntryKey,
      removedItemsByCategory,
      historyByDate,
      importedLists,
      hasSeenMomentumDialog,
    }),
    [
      archivedItemsByEntryKey,
      customItemsByCategory,
      hasSeenMomentumDialog,
      historyByDate,
      importedLists,
      removedItemsByCategory,
    ],
  );

  const { isLoggedIn, cloudStatus } = useChecklistPersistence({
    state: checklistState,
    hasLoadedStorage,
    setters: {
      setCustomItemsByCategory,
      setArchivedItemsByEntryKey,
      setRemovedItemsByCategory,
      setHistoryByDate,
      setImportedLists,
      setHasSeenMomentumDialog,
      setHasLoadedStorage,
    },
  });

  const previewItemCount = useMemo(
    () => previewLists.reduce((sum, list) => sum + list.items.length, 0),
    [previewLists],
  );

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setSuccessMessage(null);

    try {
      const csvText = await file.text();
      const parsed = parseCsvText(csvText);
      setParseError(parsed.error);
      setInvalidRowCount(parsed.invalidRowCount);

      if (parsed.error) {
        setPreviewLists([]);
        setDuplicateCount(0);
        return;
      }

      const preview = buildPreviewLists(parsed.rows);
      setPreviewLists(preview.previewLists);
      setDuplicateCount(preview.duplicateCount);
    } catch {
      setParseError("The file could not be read. Please try again.");
      setPreviewLists([]);
      setDuplicateCount(0);
      setInvalidRowCount(0);
    }
  }

  function handleImport() {
    const nextLists = sanitizeImportedLists(previewLists);
    const initialSourceCategories: SourceCategory[] = presetCategories.map(
      (category) => ({
        sourceListId: category.key,
        targetListId: buildImportedListId(category.category),
        title: category.category,
        items: [
          ...category.defaultItems.filter(
            (item) =>
              !(removedItemsByCategory[category.key] ?? []).includes(item.id),
          ),
          ...(customItemsByCategory[category.key] ?? []),
        ],
      }),
    );
    const currentActiveLists =
      existingLists.length > 0
        ? existingLists
        : sanitizeImportedLists(
            initialSourceCategories.map((category) => ({
              id: category.targetListId,
              title: category.title,
              items: category.items.map((item) => ({
                id: buildImportedItemId(item.text),
                text: item.text,
              })),
            })),
          );
    const replaceResult =
      importMode === "replace"
        ? replaceImportedListsKeepingHistory(
            currentActiveLists,
            nextLists,
            historyByDate,
            existingLists.length === 0 ? initialSourceCategories : [],
          )
        : null;
    const result =
      importMode === "replace"
        ? (replaceResult?.importedLists ?? [])
        : mergeImportedLists(currentActiveLists, nextLists);
    const nextHistory =
      replaceResult?.historyByDate ??
      (existingLists.length === 0
        ? promotePresetHistoryToImportedHistory(
            historyByDate,
            initialSourceCategories,
          )
        : historyByDate);

    setImportedLists(result);
    setHistoryByDate(nextHistory);
    setSuccessMessage(
      importMode === "replace"
        ? t("checklist.uploadReplaceSuccess").replace(
            "{file}",
            fileName ?? t("checklist.yourFile"),
          )
        : t("checklist.uploadMergeSuccess")
            .replace("{count}", String(nextLists.length))
            .replace("{file}", fileName ?? t("checklist.yourFile")),
    );
  }

  return (
    <main className="min-h-screen bg-[#f9faf2] text-[#1a1c18] md:block">
      <aside className="hidden h-screen w-64 flex-col bg-[#f3f4ec] p-6 shadow-xl shadow-[#1a1c18]/5 md:fixed md:inset-y-0 md:left-0 md:flex">
        <div className="mb-8">
          <h1 className="text-xl font-black uppercase tracking-[-0.04em] text-[#002d1c]">
            {t("common.appName")}
          </h1>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#414844]/70">
            {t("checklist.sidebarSubtitle")}
          </p>
        </div>

        <nav className="flex-1 space-y-2 text-lg font-semibold">
          <Link
            href={localePath("/declutter-checklist")}
            className="block rounded-xl p-3 text-[#414844]"
          >
            {t("checklist.navChecklist")}
          </Link>
          <Link
            href={localePath("/declutter-checklist/progress")}
            className="block rounded-xl p-3 text-[#414844]"
          >
            {t("checklist.navProgress")}
          </Link>
          <Link
            href={localePath("/declutter-checklist/upload")}
            className="block rounded-xl bg-white p-3 text-[#002d1c] shadow-sm"
          >
            {t("checklist.navUpload")}
          </Link>
        </nav>

        <ChecklistLocaleSwitcher />
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#1a1c18]/35 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <aside
            className="flex h-full w-72 flex-col bg-[#f3f4ec] p-6 shadow-xl shadow-[#1a1c18]/10"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <Link
                  href={localePath("/")}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="text-xl font-black uppercase tracking-[-0.04em] text-[#002d1c] hover:opacity-80 transition-opacity">
                    {t("common.appName")}
                  </span>
                </Link>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#414844]/70">
                  {t("checklist.sidebarSubtitle")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                aria-label={t("checklist.close")}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2b694d] shadow-sm"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-2 text-lg font-semibold">
              <Link
                href={localePath("/declutter-checklist")}
                onClick={() => setIsSidebarOpen(false)}
                className="block rounded-xl p-3 text-[#414844]"
              >
                {t("checklist.navChecklist")}
              </Link>
              <Link
                href={localePath("/declutter-checklist/progress")}
                onClick={() => setIsSidebarOpen(false)}
                className="block rounded-xl p-3 text-[#414844]"
              >
                {t("checklist.navProgress")}
              </Link>
              <Link
                href={localePath("/declutter-checklist/upload")}
                onClick={() => setIsSidebarOpen(false)}
                className="block rounded-xl bg-white p-3 text-[#002d1c] shadow-sm"
              >
                {t("checklist.navUpload")}
              </Link>
            </nav>

            <ChecklistLocaleSwitcher />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col md:ml-64">
        <header className="sticky top-0 z-20 flex items-center justify-between bg-[#f9faf2] px-5 py-4 md:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#59615d]">
              {t("checklist.uploadHeaderLabel")}
            </p>
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c]">
              {t("checklist.uploadHeaderTitle")}
            </h2>
          </div>

          <div className="rounded-full bg-[#edefe7] px-4 py-2 text-sm font-semibold text-[#2b694d]">
            {t("checklist.currentLists").replace(
              "{count}",
              String(
                existingLists.length > 0
                  ? existingLists.length
                  : presetCategories.length,
              ),
            )}
          </div>
        </header>

        <section className="flex-1 space-y-8 px-5 pb-10 pt-4 md:px-8">
          <ChecklistCloudBanner
            isLoggedIn={isLoggedIn}
            cloudStatus={cloudStatus}
          />

          <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#6d756f]">
                {t("checklist.csvFormat")}
              </p>
              <h3 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#002d1c]">
                {t("checklist.keepItSimple")}
              </h3>
              <p className="mt-4 text-sm text-[#56615c]">
                {t("checklist.csvFormatDesc")}
              </p>
              <pre className="mt-6 overflow-x-auto rounded-[1.5rem] bg-[#f3f4ec] p-5 text-sm leading-7 text-[#002d1c]">
                <code>{sampleCsv}</code>
              </pre>
              <p className="mt-4 text-sm text-[#56615c]">
                {t("checklist.csvHeaderHint")}
              </p>
            </article>

            <article className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#6d756f]">
                {t("checklist.importFile")}
              </p>
              <h3 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#002d1c]">
                {t("checklist.importTitle")}
              </h3>

              <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border-2 border-dashed border-[#c9d0c8] bg-[#f3f4ec] px-6 py-10 text-center">
                <span className="text-lg font-bold text-[#002d1c]">
                  {t("checklist.chooseCsv")}
                </span>
                <span className="mt-2 text-sm text-[#56615c]">
                  {fileName ?? t("checklist.noFileSelected")}
                </span>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] bg-[#f3f4ec] p-4">
                  <div className="text-3xl font-black tracking-[-0.05em] text-[#002d1c]">
                    {previewLists.length}
                  </div>
                  <div className="mt-1 text-sm text-[#56615c]">
                    {t("checklist.listsDetected")}
                  </div>
                </div>
                <div className="rounded-[1.5rem] bg-[#f3f4ec] p-4">
                  <div className="text-3xl font-black tracking-[-0.05em] text-[#002d1c]">
                    {previewItemCount}
                  </div>
                  <div className="mt-1 text-sm text-[#56615c]">
                    {t("checklist.itemsReady")}
                  </div>
                </div>
                <div className="rounded-[1.5rem] bg-[#f3f4ec] p-4">
                  <div className="text-3xl font-black tracking-[-0.05em] text-[#002d1c]">
                    {invalidRowCount + duplicateCount}
                  </div>
                  <div className="mt-1 text-sm text-[#56615c]">
                    {t("checklist.rowsSkipped")}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setImportMode("merge")}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-bold",
                    importMode === "merge"
                      ? "bg-[#002d1c] text-white"
                      : "bg-[#edefe7] text-[#2b694d]",
                  ].join(" ")}
                >
                  {t("checklist.mergeCurrent")}
                </button>
                <button
                  type="button"
                  onClick={() => setImportMode("replace")}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-bold",
                    importMode === "replace"
                      ? "bg-[#002d1c] text-white"
                      : "bg-[#edefe7] text-[#2b694d]",
                  ].join(" ")}
                >
                  {t("checklist.replaceCurrent")}
                </button>
              </div>

              <p className="mt-4 text-sm text-[#56615c]">
                {t("checklist.crossedItemsKept")}
              </p>

              <div className="mt-6 rounded-[1.5rem] bg-[#f3f4ec] p-5 text-sm text-[#56615c]">
                {t("checklist.mergeReplaceDesc")}
              </div>

              {parseError && (
                <div className="mt-6 rounded-[1.5rem] bg-[#fde7e3] p-4 text-sm font-medium text-[#9b4f3e]">
                  {parseError}
                </div>
              )}

              {successMessage && (
                <div className="mt-6 rounded-[1.5rem] bg-[#dcebdd] p-4 text-sm font-medium text-[#2b694d]">
                  {successMessage}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleImport}
                  disabled={previewLists.length === 0 || Boolean(parseError)}
                  className="rounded-xl bg-[#002d1c] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t("checklist.importLists")}
                </button>
                <Link
                  href={localePath("/declutter-checklist")}
                  className="rounded-xl bg-[#edefe7] px-5 py-3 text-sm font-bold text-[#2b694d]"
                >
                  {t("checklist.goToChecklist")}
                </Link>
              </div>
            </article>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="text-3xl font-black tracking-[-0.05em] text-[#002d1c]">
                  {t("checklist.previewTitle")}
                </h3>
                <p className="mt-2 text-sm text-[#5e6662]">
                  {t("checklist.previewDesc")}
                </p>
              </div>
              <div className="rounded-full bg-[#edefe7] px-4 py-2 text-sm font-semibold text-[#2b694d]">
                {t("checklist.currentlyStored").replace(
                  "{count}",
                  String(existingLists.length),
                )}
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {previewLists.length === 0 && (
                <div className="rounded-[1.5rem] bg-[#f3f4ec] p-5 text-sm text-[#56615c]">
                  {t("checklist.uploadToPreview")}
                </div>
              )}

              {previewLists.map((list, index) => (
                <article
                  key={list.id}
                  className="rounded-[1.75rem] bg-[#f3f4ec] p-5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={[
                        "flex h-11 w-11 items-center justify-center rounded-2xl text-xs font-black",
                        index % 2 === 0
                          ? "bg-[#dcebdd] text-[#2b694d]"
                          : "bg-[#e7edf6] text-[#335b86]",
                      ].join(" ")}
                    >
                      {list.title.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold tracking-[-0.03em] text-[#002d1c]">
                        {list.title}
                      </h4>
                      <p className="text-sm text-[#5e6662]">
                        {list.items.length} {t("checklist.items")}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2 text-sm text-[#414844]">
                    {list.items.map((item) => (
                      <li key={item.id} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white text-[11px] font-bold text-[#2b694d]">
                          +
                        </span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>

      <button
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        aria-label={t("header.openMenu")}
        className="fixed bottom-5 left-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#002d1c] text-white shadow-lg shadow-[#1a1c18]/20 md:hidden"
      >
        <Bars3Icon className="h-5 w-5" />
      </button>
    </main>
  );
}
