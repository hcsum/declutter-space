"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  CUSTOM_ITEMS_STORAGE_KEY,
  HISTORY_STORAGE_KEY,
  IMPORTED_LISTS_STORAGE_KEY,
  CustomItemsByCategory,
  HistoryByDate,
  ImportedList,
  buildEntryKey,
  formatDateKey,
  getAllChecklistCategories,
  getTimelineDates,
  longDateFormatter,
  monthDayFormatter,
  parseDateKey,
} from "../lib/checklist";

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
  const today = new Date();
  const todayKey = formatDateKey(today);
  const todayDate = useMemo(() => parseDateKey(todayKey), [todayKey]);

  const [customItemsByCategory, setCustomItemsByCategory] =
    useState<CustomItemsByCategory>({});
  const [historyByDate, setHistoryByDate] = useState<HistoryByDate>({});
  const [importedLists, setImportedLists] = useState<ImportedList[]>([]);
  const [selectedHistoryDate, setSelectedHistoryDate] = useState<string | null>(
    null,
  );
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  useEffect(() => {
    try {
      const storedCustomItems = window.localStorage.getItem(
        CUSTOM_ITEMS_STORAGE_KEY,
      );
      const storedHistory = window.localStorage.getItem(HISTORY_STORAGE_KEY);
      const storedImportedLists = window.localStorage.getItem(
        IMPORTED_LISTS_STORAGE_KEY,
      );

      if (storedCustomItems)
        setCustomItemsByCategory(JSON.parse(storedCustomItems));
      if (storedHistory) setHistoryByDate(JSON.parse(storedHistory));
      if (storedImportedLists)
        setImportedLists(JSON.parse(storedImportedLists));
    } catch {
      setCustomItemsByCategory({});
      setHistoryByDate({});
      setImportedLists([]);
    } finally {
      setHasLoadedStorage(true);
    }
  }, []);

  const categories = useMemo(
    () => getAllChecklistCategories(importedLists),
    [importedLists],
  );

  const allItemsByEntryKey = useMemo(() => {
    const entries = new Map<string, { category: string; text: string }>();

    categories.forEach((category) => {
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
  }, [categories, customItemsByCategory]);

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
    const details = allItemsByEntryKey.get(entryKey);
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
        const details = allItemsByEntryKey.get(entryKey);
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
        const details = allItemsByEntryKey.get(entryKey);
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
  }, [allItemsByEntryKey, historyByDate, recordedDateKeys]);

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
    <main className="min-h-screen bg-[#f9faf2] text-[#1a1c18] md:flex">
      <aside className="hidden h-screen w-64 shrink-0 flex-col bg-[#f3f4ec] p-6 shadow-xl shadow-[#1a1c18]/5 md:flex md:sticky md:top-0">
        <div className="mb-8">
          <h1 className="text-xl font-black uppercase tracking-[-0.04em] text-[#002d1c]">
            DeclutterSpace
          </h1>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#414844]/70">
            Let&apos;s declutter your home today
          </p>
        </div>

        <nav className="flex-1 space-y-2 text-lg font-semibold">
          <Link
            href="/declutter-checklist"
            className="block rounded-xl p-3 text-[#414844]"
          >
            Declutter Checklist
          </Link>
          <Link
            href="/declutter-checklist/progress"
            className="block rounded-xl bg-white p-3 text-[#002d1c] shadow-sm"
          >
            Track your progress
          </Link>
          <Link
            href="/declutter-checklist/upload"
            className="block rounded-xl p-3 text-[#414844]"
          >
            Upload your own list
          </Link>
        </nav>

        <Link
          href="/declutter-checklist"
          className="block w-full rounded-xl bg-[#002d1c] py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-white"
        >
          Start Today&apos;s Declutter
        </Link>

        <div className="mt-6 space-y-2 text-sm font-medium">
          <div className="rounded-xl p-2 text-[#414844]">Help</div>
          <div className="rounded-xl p-2 text-[#ba1a1a]">Sign Out</div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between bg-[#f9faf2] px-5 py-4 md:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#59615d]">
              Track your progress
            </p>
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c]">
              Your declutter rhythm over time
            </h2>
          </div>

          <div className="rounded-full bg-[#edefe7] px-4 py-2 text-sm font-semibold text-[#2b694d]">
            {totalCompletedItems} recorded clears
          </div>
        </header>

        <section className="flex-1 space-y-8 px-5 pb-10 pt-4 md:px-8">
          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#6d756f]">
                Stats
              </p>
              <h3 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#002d1c]">
                Declutter journey
              </h3>
              <div className="mt-8 flex items-end gap-4">
                <div className="text-6xl font-black tracking-[-0.08em] text-[#002d1c] md:text-7xl">
                  {journeyDays}
                </div>
                <div className="pb-2 text-lg font-semibold text-[#56615c]">
                  {journeyDays === 1 ? "day" : "days"}
                </div>
              </div>
              <p className="mt-4 max-w-2xl text-sm text-[#56615c]">
                {firstRecordDate
                  ? `Counting from ${longDateFormatter.format(firstRecordDate)} through today.`
                  : "Your journey day count will start as soon as you complete your first checklist item."}
              </p>
            </article>

            <article className="rounded-[2rem] bg-[#002d1c] p-6 text-white md:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#b0f1cc]">
                Focus Area
              </p>
              <h3 className="mt-3 text-3xl font-black tracking-[-0.05em]">
                {topCategory?.category ?? "Start your first check-in"}
              </h3>
              <p className="mt-4 text-sm text-[#b7d1c4]">
                {topCategory
                  ? `${topCategory.count} recorded clears, which is ${topCategory.percentage}% of all tracked progress so far.`
                  : "Once you have history, this card will highlight the area where you declutter most often."}
              </p>
            </article>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h3 className="text-3xl font-black tracking-[-0.05em] text-[#002d1c]">
                  Full progress chart
                </h3>
                <p className="mt-2 text-sm font-medium text-[#5e6662]">
                  Move backward or forward in 30-day steps to review the days
                  you showed up.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => shiftWindow(-30)}
                  disabled={!canGoBackward}
                  className="rounded-full border border-[#d7dbd4] bg-[#f9faf2] px-4 py-2 text-sm font-bold text-[#002d1c] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous 30
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
                  Next 30
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
                        aria-label={`${monthDayFormatter.format(date)}: ${completedCount} items completed`}
                      >
                        <span
                          className={[
                            "mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#f0bd8b] transition-opacity",
                            isToday ? "opacity-100" : "opacity-0",
                          ].join(" ")}
                        >
                          Today
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
                    Daily Progress
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#002d1c]">
                    {longDateFormatter.format(
                      parseDateKey(selectedHistoryDate),
                    )}
                  </h3>
                  <p className="mt-2 text-sm text-[#56615c]">
                    These are the items you completed on that day.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedHistoryDate(null)}
                  className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#2b694d]"
                >
                  Close
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
                    Main declutter areas
                  </h3>
                  <p className="mt-2 text-sm text-[#5e6662]">
                    The spaces where you tend to make the most progress.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {categoryTotals.length === 0 && (
                  <div className="rounded-[1.5rem] bg-[#f3f4ec] p-5 text-sm text-[#56615c]">
                    No recorded progress yet. Complete a few checklist items and
                    your main areas will show up here.
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
                            {area.percentage}% of all recorded clears
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
                Top 10 items repeatedly crossed
              </h3>
              <p className="mt-2 text-sm text-[#5e6662]">
                These are the items that appear most often across your
                check-ins.
              </p>

              <div className="mt-8 space-y-3">
                {repeatedItems.length === 0 && (
                  <div className="rounded-[1.5rem] bg-[#f3f4ec] p-5 text-sm text-[#56615c]">
                    Your top repeated items will appear here once you build some
                    history.
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
    </main>
  );
}
