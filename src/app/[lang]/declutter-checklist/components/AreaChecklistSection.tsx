"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { useDialogState } from "@/components/DialogProvider";
import { useI18n } from "@/i18n/i18n-provider";
import {
  ArchivedItemsByEntryKey,
  buildEntryKey,
  CustomItemsByCategory,
  formatDateKey,
  getChecklistCategoryBySlug,
  HistoryByDate,
  ImportedList,
  RemovedItemsByCategory,
} from "@/lib/checklist/checklist";
import { useChecklistPersistence } from "@/lib/checklist/useChecklistPersistence";
import { trackEvent } from "@/lib/analytics";
import ChecklistCloudBanner from "./ChecklistCloudBanner";

type DraftsByCategory = Record<string, string>;

type AreaChecklistSectionProps = {
  areaSlug: string;
  heading: string;
  description: string;
  nextPath: string;
};

export default function AreaChecklistSection({
  areaSlug,
  heading,
  description,
  nextPath,
}: AreaChecklistSectionProps) {
  const { setDialogContent } = useDialogState();
  const { t, locale } = useI18n();
  const todayKey = formatDateKey(new Date());

  const [customItemsByCategory, setCustomItemsByCategory] =
    useState<CustomItemsByCategory>({});
  const [archivedItemsByEntryKey, setArchivedItemsByEntryKey] =
    useState<ArchivedItemsByEntryKey>({});
  const [removedItemsByCategory, setRemovedItemsByCategory] =
    useState<RemovedItemsByCategory>({});
  const [historyByDate, setHistoryByDate] = useState<HistoryByDate>({});
  const [importedLists, setImportedLists] = useState<ImportedList[]>([]);
  const [draftsByCategory, setDraftsByCategory] = useState<DraftsByCategory>(
    {},
  );
  const [hasSeenMomentumDialog, setHasSeenMomentumDialog] = useState(false);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const pdfContentRef = useRef<HTMLDivElement | null>(null);

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

  const category = useMemo(
    () => getChecklistCategoryBySlug(areaSlug, locale),
    [areaSlug, locale],
  );

  const visibleCategory = useMemo(() => {
    if (!category) return null;

    return {
      ...category,
      defaultItems: category.defaultItems.filter(
        (item) => !(removedItemsByCategory[category.key] ?? []).includes(item.id),
      ),
    };
  }, [category, removedItemsByCategory]);

  const customItems = useMemo(
    () =>
      visibleCategory ? customItemsByCategory[visibleCategory.key] ?? [] : [],
    [customItemsByCategory, visibleCategory],
  );
  const allItems = useMemo(
    () =>
      visibleCategory ? [...visibleCategory.defaultItems, ...customItems] : [],
    [customItems, visibleCategory],
  );
  const sortedItems = useMemo(
    () => [...allItems].sort((left, right) => left.text.localeCompare(right.text)),
    [allItems],
  );
  const todayHistorySet = useMemo(
    () => new Set(historyByDate[todayKey] ?? []),
    [historyByDate, todayKey],
  );
  const completedCount = useMemo(
    () =>
      allItems.reduce(
        (sum, item) =>
          sum +
          (visibleCategory &&
          todayHistorySet.has(buildEntryKey(visibleCategory.key, item.id))
            ? 1
            : 0),
        0,
      ),
    [allItems, todayHistorySet, visibleCategory],
  );

  function toggleItem(itemId: string) {
    if (!visibleCategory) return;

    const entryKey = buildEntryKey(visibleCategory.key, itemId);
    // Only the check direction is a signal of use; unchecking is a correction.
    if (!todayHistorySet.has(entryKey)) {
      trackEvent("check_item", { source: "checklist_area", area: areaSlug });
    }
    if (hasLoadedStorage && !hasSeenMomentumDialog) {
      setHasSeenMomentumDialog(true);
      setDialogContent({
        title: t("checklist.momentumTitle"),
        content: (
          <p className="text-base leading-7 text-neutral-700 dark:text-neutral-300">
            {t("checklist.momentumDesc")}
          </p>
        ),
        actions: (
          <button
            type="button"
            onClick={() => setDialogContent(undefined)}
            className="rounded-xl bg-[#002d1c] px-5 py-2.5 text-sm font-bold text-white"
          >
            {t("checklist.keepGoing")}
          </button>
        ),
      });
    }

    setHistoryByDate((prev) => {
      const next = { ...prev };
      const entries = new Set(next[todayKey] ?? []);
      if (entries.has(entryKey)) entries.delete(entryKey);
      else entries.add(entryKey);
      if (entries.size === 0) delete next[todayKey];
      else next[todayKey] = Array.from(entries);
      return next;
    });
  }

  function addCustomItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!visibleCategory) return;

    const draft = (draftsByCategory[visibleCategory.key] ?? "").trim();
    if (!draft) return;

    setCustomItemsByCategory((prev) => {
      const next = { ...prev };
      const items = next[visibleCategory.key]
        ? [...next[visibleCategory.key]]
        : [];
      items.push({
        id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        text: draft,
      });
      next[visibleCategory.key] = items;
      return next;
    });
    setDraftsByCategory((prev) => ({ ...prev, [visibleCategory.key]: "" }));
  }

  function removeItem(itemId: string) {
    if (!visibleCategory) return;

    const entryKey = buildEntryKey(visibleCategory.key, itemId);
    const item =
      visibleCategory.defaultItems.find((value) => value.id === itemId) ??
      customItems.find((value) => value.id === itemId);
    if (item) {
      setArchivedItemsByEntryKey((prev) => ({
        ...prev,
        [entryKey]: { category: visibleCategory.category, text: item.text },
      }));
    }
    if (itemId.startsWith("custom-")) {
      setCustomItemsByCategory((prev) => {
        const next = { ...prev };
        const filtered = (next[visibleCategory.key] ?? []).filter(
          (currentItem) => currentItem.id !== itemId,
        );
        if (filtered.length === 0) delete next[visibleCategory.key];
        else next[visibleCategory.key] = filtered;
        return next;
      });
      return;
    }

    setRemovedItemsByCategory((prev) => {
      const next = { ...prev };
      const removed = new Set(next[visibleCategory.key] ?? []);
      removed.add(itemId);
      next[visibleCategory.key] = Array.from(removed);
      return next;
    });
  }

  function confirmRemoveItem(itemId: string, itemText: string) {
    setDialogContent({
      title: t("checklist.confirmRemoveTitle"),
      content: (
        <div className="space-y-3 text-base leading-7 text-neutral-700 dark:text-neutral-300">
          <p>{itemText}</p>
          <p>{t("checklist.confirmRemoveDesc")}</p>
        </div>
      ),
      actions: (
        <div className="flex w-full items-center justify-end gap-3 px-2">
          <button
            type="button"
            onClick={() => setDialogContent(undefined)}
            className="rounded-xl bg-[#edefe7] px-5 py-2.5 text-sm font-bold text-[#2b694d]"
          >
            {t("checklist.cancel")}
          </button>
          <button
            type="button"
            onClick={() => {
              removeItem(itemId);
              setDialogContent(undefined);
            }}
            className="rounded-xl bg-[#002d1c] px-5 py-2.5 text-sm font-bold text-white"
          >
            {t("checklist.yes")}
          </button>
        </div>
      ),
    });
  }

  async function downloadPdf() {
    if (!visibleCategory || !pdfContentRef.current || isGeneratingPdf) return;

    setIsGeneratingPdf(true);
    try {
      trackEvent("download_pdf", {
        source: "checklist_area",
        area: areaSlug,
      });

      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(pdfContentRef.current, {
        backgroundColor: "#f9faf2",
        scale: Math.min(2, window.devicePixelRatio || 1.5),
        useCORS: true,
      });
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pageWidth = 210;
      const pageHeight = 297;
      const imageHeight = (canvas.height * pageWidth) / canvas.width;

      let renderedHeight = 0;
      pdf.addImage(imageData, "PNG", 0, 0, pageWidth, imageHeight);
      renderedHeight += pageHeight;

      while (renderedHeight < imageHeight) {
        pdf.addPage();
        pdf.addImage(
          imageData,
          "PNG",
          0,
          -renderedHeight,
          pageWidth,
          imageHeight,
        );
        renderedHeight += pageHeight;
      }

      pdf.save(`${areaSlug}-declutter-checklist.pdf`);
    } catch (error) {
      console.error("Failed to generate checklist PDF", error);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  }

  if (!visibleCategory) return null;

  return (
    <section className="rounded-[2rem] bg-[#f9faf2] p-6 text-[#1a1c18] shadow-sm ring-1 ring-black/5 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-4xl">
              {heading}
            </h2>
            <p className="mt-3 text-base leading-7 text-[#414844]">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#2b694d] shadow-sm">
              {completedCount}/{allItems.length} {t("checklist.items")}
            </div>
            <button
              type="button"
              onClick={downloadPdf}
              disabled={isGeneratingPdf}
              className="print-hidden rounded-full bg-[#002d1c] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#00432a] disabled:cursor-wait disabled:opacity-60"
            >
              {t("checklist.downloadPdf")}
            </button>
          </div>
        </div>

        <div className="print-hidden">
          <ChecklistCloudBanner
            isLoggedIn={isLoggedIn}
            cloudStatus={cloudStatus}
            nextPath={nextPath}
          />
        </div>

        <article className="rounded-[2rem] bg-[#f3f4ec] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c]">
                {visibleCategory.category}
              </h3>
              <p className="mt-2 text-sm text-[#59615d]">
                {t("checklist.tryTasks")}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {sortedItems.map((item) => {
              const entryKey = buildEntryKey(visibleCategory.key, item.id);
              const isChecked = todayHistorySet.has(entryKey);
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-2xl bg-white/80 px-4 py-3"
                >
                  <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItem(item.id)}
                      className="mt-0.5 h-5 w-5 shrink-0 rounded-md border-none bg-white text-[#2b694d] focus:ring-[#2b694d]/20"
                    />
                    <span
                      className={[
                        "min-w-0 text-sm font-medium text-[#414844] transition-colors",
                        isChecked && "line-through opacity-60",
                      ].join(" ")}
                    >
                      {item.text}
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => confirmRemoveItem(item.id, item.text)}
                    className="print-hidden rounded-full bg-[#f9faf2] px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#7a3222]"
                    aria-label={`${t("checklist.remove")} ${item.text}`}
                  >
                    {t("checklist.remove")}
                  </button>
                </div>
              );
            })}
          </div>

          <form onSubmit={addCustomItem} className="print-hidden mt-6">
            <div className="flex gap-2 rounded-2xl bg-white p-2">
              <input
                type="text"
                value={draftsByCategory[visibleCategory.key] ?? ""}
                onChange={(event) =>
                  setDraftsByCategory((prev) => ({
                    ...prev,
                    [visibleCategory.key]: event.target.value,
                  }))
                }
                placeholder={t("checklist.addItem")}
                className="min-w-0 flex-1 border-none bg-transparent px-3 py-2 text-sm focus:ring-0"
              />
              <button
                type="submit"
                className="rounded-2xl bg-[#002d1c] px-4 py-2 text-sm font-bold text-white"
              >
                {t("checklist.add")}
              </button>
            </div>
          </form>
        </article>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-[-9999px] top-0 w-[794px] overflow-hidden"
      >
        <div
          ref={pdfContentRef}
          className="bg-[#f9faf2] px-12 py-10 font-sans text-[#1a1c18]"
        >
          <div className="rounded-[28px] bg-white p-9 shadow-sm ring-1 ring-[#dfe4d7]">
            <div className="flex items-start justify-between gap-8 border-b border-[#dfe4d7] pb-7">
              <div className="min-w-0">
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#59615d]">
                  {t("checklist.downloadPdf")}
                </p>
                <h1 className="mt-3 text-[34px] font-black leading-tight text-[#002d1c]">
                  {heading}
                </h1>
                <p className="mt-3 text-[15px] leading-7 text-[#414844]">
                  {description}
                </p>
              </div>
              <div className="shrink-0 rounded-2xl bg-[#edefe7] px-5 py-4 text-center text-[#2b694d]">
                <div className="text-[28px] font-black leading-none">
                  {completedCount}/{allItems.length}
                </div>
                <div className="mt-2 text-[11px] font-black uppercase tracking-[0.18em]">
                  {t("checklist.items")}
                </div>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {sortedItems.map((item) => {
                const entryKey = buildEntryKey(visibleCategory.key, item.id);
                const isChecked = todayHistorySet.has(entryKey);

                return (
                  <div
                    key={item.id}
                    className="flex min-h-14 items-start gap-3 rounded-2xl bg-[#f3f4ec] px-4 py-3"
                  >
                    <div
                      className={[
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 text-[12px] font-black",
                        isChecked
                          ? "border-[#2b694d] bg-[#2b694d] text-white"
                          : "border-[#93a096] bg-white text-white",
                      ].join(" ")}
                    >
                      {isChecked ? "x" : ""}
                    </div>
                    <div
                      className={[
                        "text-[13px] font-semibold leading-5 text-[#28302c]",
                        isChecked ? "opacity-60 line-through" : "",
                      ].join(" ")}
                    >
                      {item.text}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[#dfe4d7] pt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6d766f]">
              <span>{visibleCategory.category}</span>
              <span>{t("checklist.printFooterNote")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
