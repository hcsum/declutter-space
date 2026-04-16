"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { logout } from "@/actions/auth";
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
  formatDateKey,
  getChecklistDateFormatters,
  getLocalizedChecklistCategories,
  getTimelineDates,
  parseDateKey,
} from "@/lib/checklist/checklist";
import { useChecklistPersistence } from "@/lib/checklist/useChecklistPersistence";

const categoryAccents = [
  "bg-[#dcebdd] text-[#2b694d]",
  "bg-[#e7edf6] text-[#335b86]",
  "bg-[#f3e7d9] text-[#7a5228]",
  "bg-[#ece5f8] text-[#654799]",
  "bg-[#fde7e3] text-[#9b4f3e]",
  "bg-[#e4f0ec] text-[#2a6c59]",
];

function getCategoryAccent(index: number) {
  return categoryAccents[index % categoryAccents.length];
}

function getInclusiveDayCount(startDate: Date, endDate: Date) {
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  const diff = end.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ProgressClientPage() {
  const { t, locale, localePath } = useI18n();
  const today = new Date();
  const todayKey = formatDateKey(today);
  const todayDate = useMemo(() => parseDateKey(todayKey), [todayKey]);
  const { monthDayFormatter, longDateFormatter } = useMemo(
    () => getChecklistDateFormatters(locale),
    [locale],
  );

  const [customItemsByCategory, setCustomItemsByCategory] =
    useState<CustomItemsByCategory>({});
  const [archivedItemsByEntryKey, setArchivedItemsByEntryKey] =
    useState<ArchivedItemsByEntryKey>({});
  const [removedItemsByCategory, setRemovedItemsByCategory] =
    useState<RemovedItemsByCategory>({});
  const [historyByDate, setHistoryByDate] = useState<HistoryByDate>({});
  const [importedLists, setImportedLists] = useState<ImportedList[]>([]);
  const [hasSeenMomentumDialog, setHasSeenMomentumDialog] = useState(false);
  const [selectedHistoryDate, setSelectedHistoryDate] = useState<string | null>(
    null,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  const categories = useMemo(
    () =>
      getLocalizedChecklistCategories(locale, importedLists).map(
        (category) => ({
          ...category,
          defaultItems:
            importedLists.length > 0
              ? category.defaultItems
              : category.defaultItems.filter(
                  (item) =>
                    !(removedItemsByCategory[category.key] ?? []).includes(
                      item.id,
                    ),
                ),
        }),
      ),
    [importedLists, locale, removedItemsByCategory],
  );

  const historyCategories = useMemo(
    () => getLocalizedChecklistCategories(locale, importedLists),
    [importedLists, locale],
  );

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

  const allItemsByEntryKey = useMemo(() => {
    const entries = new Map<string, { category: string; text: string }>();

    historyCategories.forEach((category) => {
      category.defaultItems.forEach((item) => {
        entries.set(buildEntryKey(category.key, item.id), {
          category: category.category,
          text: item.text,
        });
      });

      (customItemsByCategory[category.key] ?? []).forEach((item) => {
        entries.set(buildEntryKey(category.key, item.id), {
          category: category.category,
          text: item.text,
        });
      });
    });

    return entries;
  }, [customItemsByCategory, historyCategories]);

  const recordedDateKeys = useMemo(
    () =>
      Object.keys(historyByDate)
        .filter((dateKey) => (historyByDate[dateKey] ?? []).length > 0)
        .sort(),
    [historyByDate],
  );

  const firstRecordDate = recordedDateKeys[0]
    ? parseDateKey(recordedDateKeys[0])
    : null;
  const journeyDays = firstRecordDate
    ? getInclusiveDayCount(firstRecordDate, today)
    : 0;

  const timelineDates = useMemo(
    () =>
      firstRecordDate
        ? getTimelineDates(firstRecordDate, todayDate)
        : [todayDate],
    [firstRecordDate, todayDate],
  );

  useEffect(() => {
    if (!hasLoadedStorage) return;
    setVisibleStartIndex(Math.max(0, timelineDates.length - 30));
  }, [hasLoadedStorage, timelineDates.length]);

  const visibleDates = timelineDates.slice(
    visibleStartIndex,
    visibleStartIndex + 30,
  );
  const maxWindowStartIndex = Math.max(0, timelineDates.length - 30);
  const canGoBackward = visibleStartIndex > 0;
  const canGoForward = visibleStartIndex < maxWindowStartIndex;
  const maxVisibleCount = Math.max(
    1,
    ...visibleDates.map(
      (date) => (historyByDate[formatDateKey(date)] ?? []).length,
    ),
  );

  const totalCompletedItems = useMemo(
    () =>
      recordedDateKeys.reduce(
        (sum, dateKey) => sum + (historyByDate[dateKey] ?? []).length,
        0,
      ),
    [historyByDate, recordedDateKeys],
  );

  const selectedHistoryEntries = selectedHistoryDate
    ? (historyByDate[selectedHistoryDate] ?? [])
    : [];

  const selectedHistoryGroups = selectedHistoryEntries.reduce<
    Array<{ category: string; items: string[] }>
  >((groups, entryKey) => {
    const details =
      allItemsByEntryKey.get(entryKey) ?? archivedItemsByEntryKey[entryKey];
    if (!details) return groups;

    const existing = groups.find(
      (group) => group.category === details.category,
    );
    if (existing) {
      existing.items.push(details.text);
      existing.items.sort((left, right) => left.localeCompare(right));
      return groups;
    }

    groups.push({ category: details.category, items: [details.text] });
    return groups;
  }, []);

  const categoryTotals = useMemo(() => {
    const counts = new Map<string, number>();

    recordedDateKeys.forEach((dateKey) => {
      (historyByDate[dateKey] ?? []).forEach((entryKey) => {
        const details =
          allItemsByEntryKey.get(entryKey) ?? archivedItemsByEntryKey[entryKey];
        if (!details) return;
        counts.set(details.category, (counts.get(details.category) ?? 0) + 1);
      });
    });

    return Array.from(counts.entries())
      .map(([category, count]) => ({
        category,
        count,
        percentage:
          totalCompletedItems === 0
            ? 0
            : Math.round((count / totalCompletedItems) * 100),
      }))
      .sort(
        (left, right) =>
          right.count - left.count ||
          left.category.localeCompare(right.category),
      );
  }, [
    allItemsByEntryKey,
    archivedItemsByEntryKey,
    historyByDate,
    recordedDateKeys,
    totalCompletedItems,
  ]);

  const repeatedItems = useMemo(() => {
    const counts = new Map<string, number>();

    recordedDateKeys.forEach((dateKey) => {
      (historyByDate[dateKey] ?? []).forEach((entryKey) => {
        counts.set(entryKey, (counts.get(entryKey) ?? 0) + 1);
      });
    });

    return Array.from(counts.entries())
      .map(([entryKey, count]) => {
        const details =
          allItemsByEntryKey.get(entryKey) ?? archivedItemsByEntryKey[entryKey];
        if (!details) return null;
        return {
          entryKey,
          count,
          category: details.category,
          text: details.text,
        };
      })
      .filter(
        (
          item,
        ): item is {
          entryKey: string;
          count: number;
          category: string;
          text: string;
        } => Boolean(item),
      )
      .sort(
        (left, right) =>
          right.count - left.count || left.text.localeCompare(right.text),
      )
      .slice(0, 10);
  }, [
    allItemsByEntryKey,
    archivedItemsByEntryKey,
    historyByDate,
    recordedDateKeys,
  ]);

  const topCategory = categoryTotals[0];
  const chartRangeLabel =
    visibleDates.length > 0
      ? `${monthDayFormatter.format(visibleDates[0])} - ${monthDayFormatter.format(visibleDates[visibleDates.length - 1])}`
      : monthDayFormatter.format(todayDate);

  function shiftWindow(step: number) {
    setVisibleStartIndex((prev) =>
      clamp(prev + step, 0, Math.max(0, timelineDates.length - 30)),
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
            className="block rounded-xl bg-white p-3 text-[#002d1c] shadow-sm"
          >
            {t("checklist.navProgress")}
          </Link>
          <Link
            href={localePath("/declutter-checklist/upload")}
            className="block rounded-xl p-3 text-[#414844]"
          >
            {t("checklist.navUpload")}
          </Link>
        </nav>

        <div className="mt-6 space-y-2 text-sm font-medium">
          {isLoggedIn && (
            <button
              onClick={logout}
              className="w-full rounded-xl p-2 text-left text-[#ba1a1a] hover:bg-[#ba1a1a]/10"
            >
              {t("checklist.signOut")}
            </button>
          )}
        </div>

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
                className="block rounded-xl bg-white p-3 text-[#002d1c] shadow-sm"
              >
                {t("checklist.navProgress")}
              </Link>
              <Link
                href={localePath("/declutter-checklist/upload")}
                onClick={() => setIsSidebarOpen(false)}
                className="block rounded-xl p-3 text-[#414844]"
              >
                {t("checklist.navUpload")}
              </Link>
            </nav>

            <div className="mt-6 space-y-2 text-sm font-medium">
              {isLoggedIn && (
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    void logout();
                  }}
                  className="w-full rounded-xl p-2 text-left text-[#ba1a1a] hover:bg-[#ba1a1a]/10"
                >
                  {t("checklist.signOut")}
                </button>
              )}
            </div>

            <ChecklistLocaleSwitcher />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col md:ml-64">
        <header className="sticky top-0 z-20 flex items-center justify-between bg-[#f9faf2] px-5 py-4 md:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#59615d]">
              {t("checklist.progressHeaderLabel")}
            </p>
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c]">
              {t("checklist.progressHeaderTitle")}
            </h2>
          </div>

          <div className="rounded-full bg-[#edefe7] px-4 py-2 text-sm font-semibold text-[#2b694d]">
            {t("checklist.progressRecordedClears").replace(
              "{count}",
              String(totalCompletedItems),
            )}
          </div>
        </header>

        <section className="flex-1 space-y-8 px-5 pb-10 pt-4 md:px-8">
          <ChecklistCloudBanner
            isLoggedIn={isLoggedIn}
            cloudStatus={cloudStatus}
          />

          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#6d756f]">
                {t("checklist.statsLabel")}
              </p>
              <h3 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#002d1c]">
                {t("checklist.journeyTitle")}
              </h3>
              <div className="mt-8 flex items-end gap-4">
                <div className="text-6xl font-black tracking-[-0.08em] text-[#002d1c] md:text-7xl">
                  {journeyDays}
                </div>
                <div className="pb-2 text-lg font-semibold text-[#56615c]">
                  {journeyDays === 1 ? t("checklist.day") : t("checklist.days")}
                </div>
              </div>
              <p className="mt-4 max-w-2xl text-sm text-[#56615c]">
                {firstRecordDate
                  ? t("checklist.journeyCounting").replace(
                      "{date}",
                      longDateFormatter.format(firstRecordDate),
                    )
                  : t("checklist.journeyNotStarted")}
              </p>
            </article>

            <article className="rounded-[2rem] bg-[#002d1c] p-6 text-white md:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#b0f1cc]">
                {t("checklist.focusArea")}
              </p>
              <h3 className="mt-3 text-3xl font-black tracking-[-0.05em]">
                {topCategory?.category ?? t("checklist.startFirstCheckin")}
              </h3>
              <p className="mt-4 text-sm text-[#b7d1c4]">
                {topCategory
                  ? t("checklist.focusAreaDesc")
                      .replace("{count}", String(topCategory.count))
                      .replace("{percentage}", String(topCategory.percentage))
                  : t("checklist.focusAreaEmpty")}
              </p>
            </article>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h3 className="text-3xl font-black tracking-[-0.05em] text-[#002d1c]">
                  {t("checklist.fullChartTitle")}
                </h3>
                <p className="mt-2 text-sm font-medium text-[#5e6662]">
                  {t("checklist.fullChartDesc")}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => shiftWindow(-30)}
                  disabled={!canGoBackward}
                  className="rounded-full border border-[#d7dbd4] bg-[#f9faf2] px-4 py-2 text-sm font-bold text-[#002d1c] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t("checklist.previous30")}
                </button>
                <div className="rounded-full bg-[#edefe7] px-4 py-2 text-sm font-semibold text-[#2b694d]">
                  {chartRangeLabel}
                </div>
                <button
                  type="button"
                  onClick={() => shiftWindow(30)}
                  disabled={!canGoForward}
                  className="rounded-full border border-[#d7dbd4] bg-[#f9faf2] px-4 py-2 text-sm font-bold text-[#002d1c] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t("checklist.next30")}
                </button>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto pb-2">
              <div className="min-w-[1080px]">
                <div
                  className="grid gap-2"
                  style={{
                    gridTemplateColumns: `repeat(${visibleDates.length}, minmax(0, 1fr))`,
                  }}
                >
                  {visibleDates.map((date) => {
                    const dateKey = formatDateKey(date);
                    const completedCount = (historyByDate[dateKey] ?? [])
                      .length;
                    const isSelected = selectedHistoryDate === dateKey;
                    const isToday = dateKey === todayKey;
                    const hasActivity = completedCount > 0;
                    const barHeight = hasActivity
                      ? Math.max(
                          18,
                          Math.round((completedCount / maxVisibleCount) * 100),
                        )
                      : 14;

                    return (
                      <button
                        key={dateKey}
                        type="button"
                        onClick={() =>
                          setSelectedHistoryDate(hasActivity ? dateKey : null)
                        }
                        className="group flex min-w-0 flex-col items-center"
                        aria-pressed={isSelected}
                        aria-label={`${monthDayFormatter.format(date)}: ${t("checklist.itemsCompleted").replace("{count}", String(completedCount))}`}
                      >
                        <span
                          className={[
                            "mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#f0bd8b] transition-opacity",
                            isToday ? "opacity-100" : "opacity-0",
                          ].join(" ")}
                        >
                          {t("checklist.today")}
                        </span>
                        <span className="flex h-64 w-full items-end">
                          <span
                            className={[
                              "block w-full rounded-t-xl transition-all",
                              isSelected
                                ? "bg-[#002d1c]"
                                : isToday
                                  ? "bg-[#f0bd8b]"
                                  : hasActivity
                                    ? "bg-[#2b694d]/75 hover:bg-[#2b694d]"
                                    : "bg-[#002d1c]/10 hover:bg-[#002d1c]/15",
                            ].join(" ")}
                            style={{ height: `${barHeight}%` }}
                          />
                        </span>
                        <span className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#717973]">
                          {monthDayFormatter.format(date)}
                        </span>
                        <span className="mt-1 text-xs font-bold text-[#2b694d]">
                          {completedCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {selectedHistoryDate && (
            <section className="rounded-[2rem] bg-[#edefe7] p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#5d6661]">
                    {t("checklist.dailyProgress")}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#002d1c]">
                    {longDateFormatter.format(
                      parseDateKey(selectedHistoryDate),
                    )}
                  </h3>
                  <p className="mt-2 text-sm text-[#56615c]">
                    {t("checklist.dailyProgressDesc")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedHistoryDate(null)}
                  className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#2b694d]"
                >
                  {t("checklist.close")}
                </button>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {selectedHistoryGroups.map((group) => (
                  <article
                    key={group.category}
                    className="rounded-[1.5rem] bg-white p-5"
                  >
                    <h4 className="text-lg font-bold tracking-[-0.03em] text-[#002d1c]">
                      {group.category}
                    </h4>
                    <ul className="mt-4 space-y-3 text-sm text-[#414844]">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#2b694d] text-[11px] font-bold text-white">
                            x
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <article className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-black tracking-[-0.05em] text-[#002d1c]">
                    {t("checklist.mainAreasTitle")}
                  </h3>
                  <p className="mt-2 text-sm text-[#5e6662]">
                    {t("checklist.mainAreasDesc")}
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {categoryTotals.length === 0 && (
                  <div className="rounded-[1.5rem] bg-[#f3f4ec] p-5 text-sm text-[#56615c]">
                    {t("checklist.noProgressYet")}
                  </div>
                )}

                {categoryTotals.slice(0, 6).map((area, index) => (
                  <div
                    key={area.category}
                    className="rounded-[1.5rem] bg-[#f3f4ec] p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xs font-black ${getCategoryAccent(index)}`}
                        >
                          {area.category.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold tracking-[-0.03em] text-[#002d1c]">
                            {area.category}
                          </h4>
                          <p className="text-sm text-[#5e6662]">
                            {t("checklist.percentageOfClears").replace(
                              "{percentage}",
                              String(area.percentage),
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-full bg-white px-3 py-1 text-sm font-black text-[#2b694d]">
                        {area.count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
              <h3 className="text-3xl font-black tracking-[-0.05em] text-[#002d1c]">
                {t("checklist.topItemsTitle")}
              </h3>
              <p className="mt-2 text-sm text-[#5e6662]">
                {t("checklist.topItemsDesc")}
              </p>

              <div className="mt-8 space-y-3">
                {repeatedItems.length === 0 && (
                  <div className="rounded-[1.5rem] bg-[#f3f4ec] p-5 text-sm text-[#56615c]">
                    {t("checklist.topItemsEmpty")}
                  </div>
                )}

                {repeatedItems.map((item, index) => (
                  <div
                    key={item.entryKey}
                    className="flex items-start justify-between gap-4 rounded-[1.5rem] bg-[#f3f4ec] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-black text-[#2b694d]">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#002d1c]">
                          {item.text}
                        </h4>
                        <p className="mt-1 text-sm text-[#5e6662]">
                          {item.category}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-full bg-white px-3 py-1 text-sm font-black text-[#2b694d]">
                      {item.count}x
                    </div>
                  </div>
                ))}
              </div>
            </article>
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
