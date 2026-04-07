"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useDialogState } from "@/components/DialogProvider";
import data from "@/const/declutter-checklist.json";

type DeclutterCategory = { category: string; items: string[] };
type CustomItem = { id: string; text: string };
type CustomItemsByCategory = Record<string, CustomItem[]>;
type HistoryByDate = Record<string, string[]>;
type DraftsByCategory = Record<string, string>;

const checklist = data as DeclutterCategory[];

const CUSTOM_ITEMS_STORAGE_KEY = "declutter-checklist-custom-items";
const HISTORY_STORAGE_KEY = "declutter-checklist-history";
const MOMENTUM_DIALOG_STORAGE_KEY = "declutter-checklist-momentum-dialog-seen";
const monthDayFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});
const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

const categoryAccents = [
  "bg-[#dcebdd] text-[#2b694d]",
  "bg-[#e7edf6] text-[#335b86]",
  "bg-[#f3e7d9] text-[#7a5228]",
  "bg-[#ece5f8] text-[#654799]",
  "bg-[#fde7e3] text-[#9b4f3e]",
  "bg-[#e4f0ec] text-[#2a6c59]",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getFlowDates() {
  const today = new Date();

  return Array.from({ length: 31 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index - 10);
    return date;
  });
}

function buildEntryKey(categoryKey: string, itemId: string) {
  return `${categoryKey}::${itemId}`;
}

function buildCategoryKey(category: string, index: number) {
  return `${slugify(category)}-${index}`;
}

function getCategoryAccent(index: number) {
  return categoryAccents[index % categoryAccents.length];
}

export default function ClientPage() {
  const { setDialogContent } = useDialogState();
  const today = new Date();
  const todayKey = formatDateKey(today);
  const flowDates = useMemo(() => getFlowDates(), []);

  const categories = useMemo(
    () =>
      checklist.map((category, index) => ({
        ...category,
        key: buildCategoryKey(category.category, index),
        defaultItems: category.items.map((text, itemIndex) => ({
          id: `default-${itemIndex}`,
          text,
        })),
      })),
    [],
  );

  const [customItemsByCategory, setCustomItemsByCategory] =
    useState<CustomItemsByCategory>({});
  const [historyByDate, setHistoryByDate] = useState<HistoryByDate>({});
  const [draftsByCategory, setDraftsByCategory] = useState<DraftsByCategory>(
    {},
  );
  const [selectedHistoryDate, setSelectedHistoryDate] = useState<string | null>(
    null,
  );
  const [hasSeenMomentumDialog, setHasSeenMomentumDialog] = useState(false);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  useEffect(() => {
    try {
      const storedCustomItems = window.localStorage.getItem(
        CUSTOM_ITEMS_STORAGE_KEY,
      );
      const storedHistory = window.localStorage.getItem(HISTORY_STORAGE_KEY);
      const storedMomentumDialog = window.localStorage.getItem(
        MOMENTUM_DIALOG_STORAGE_KEY,
      );

      if (storedCustomItems)
        setCustomItemsByCategory(JSON.parse(storedCustomItems));
      if (storedHistory) setHistoryByDate(JSON.parse(storedHistory));
      if (storedMomentumDialog === "true") setHasSeenMomentumDialog(true);
    } catch {
      setCustomItemsByCategory({});
      setHistoryByDate({});
      setHasSeenMomentumDialog(false);
    } finally {
      setHasLoadedStorage(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage) return;
    window.localStorage.setItem(
      CUSTOM_ITEMS_STORAGE_KEY,
      JSON.stringify(customItemsByCategory),
    );
  }, [customItemsByCategory, hasLoadedStorage]);

  useEffect(() => {
    if (!hasLoadedStorage) return;
    window.localStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify(historyByDate),
    );
  }, [historyByDate, hasLoadedStorage]);

  useEffect(() => {
    if (!hasLoadedStorage) return;
    window.localStorage.setItem(
      MOMENTUM_DIALOG_STORAGE_KEY,
      String(hasSeenMomentumDialog),
    );
  }, [hasLoadedStorage, hasSeenMomentumDialog]);

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

  const todayHistorySet = useMemo(
    () => new Set(historyByDate[todayKey] ?? []),
    [historyByDate, todayKey],
  );

  const totalTrackedItems = useMemo(
    () =>
      categories.reduce(
        (sum, category) =>
          sum +
          category.defaultItems.length +
          (customItemsByCategory[category.key] ?? []).length,
        0,
      ),
    [categories, customItemsByCategory],
  );

  const completedTodayCount = todayHistorySet.size;
  const completionRate =
    totalTrackedItems === 0
      ? 0
      : Math.round((completedTodayCount / totalTrackedItems) * 100);
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
      return groups;
    }

    groups.push({ category: details.category, items: [details.text] });
    return groups;
  }, []);

  function toggleItem(categoryKey: string, itemId: string) {
    const entryKey = buildEntryKey(categoryKey, itemId);

    if (hasLoadedStorage && !hasSeenMomentumDialog) {
      setHasSeenMomentumDialog(true);
      setDialogContent({
        title: "Keep the momentum going",
        content: (
          <p className="text-base leading-7 text-neutral-700 dark:text-neutral-300">
            Decluttering is an ongoing progress, make sure to check back and
            build momentum.
          </p>
        ),
        actions: (
          <button
            type="button"
            onClick={() => setDialogContent(undefined)}
            className="rounded-xl bg-[#002d1c] px-5 py-2.5 text-sm font-bold text-white"
          >
            Keep going
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

  function addCustomItem(
    categoryKey: string,
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    const draft = (draftsByCategory[categoryKey] ?? "").trim();
    if (!draft) return;

    setCustomItemsByCategory((prev) => {
      const next = { ...prev };
      const items = next[categoryKey] ? [...next[categoryKey]] : [];
      items.push({
        id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        text: draft,
      });
      next[categoryKey] = items;
      return next;
    });

    setDraftsByCategory((prev) => ({ ...prev, [categoryKey]: "" }));
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
          <div className="rounded-xl bg-white p-3 text-[#002d1c] shadow-sm">
            Declutter Checklist
          </div>
          <div className="rounded-xl p-3 text-[#414844]">
            Track your progress
          </div>
          <div className="rounded-xl p-3 text-[#414844]">
            Upload your own list
          </div>
        </nav>

        <button className="w-full rounded-xl bg-[#002d1c] py-4 text-sm font-bold tracking-[0.18em] text-white uppercase">
          Start Today&apos;s Declutter
        </button>

        <div className="mt-6 space-y-2 text-sm font-medium">
          <div className="rounded-xl p-2 text-[#414844]">Help</div>
          <div className="rounded-xl p-2 text-[#ba1a1a]">Sign Out</div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between bg-[#f9faf2] px-5 py-4 md:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#59615d]">
              Declutter Checklist
            </p>
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c]">
              What you keep shapes how you live
            </h2>
          </div>

          <div className="rounded-full bg-[#edefe7] px-4 py-2 text-sm font-semibold text-[#2b694d]">
            {completedTodayCount} tasks today
          </div>
        </header>

        <section className="flex-1 space-y-8 px-5 pb-10 pt-4 md:px-8">
          <section className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-black tracking-[-0.05em] text-[#002d1c]">
                  Declutter is an ongoing progress
                </h2>
                <p className="mt-1 text-sm font-medium text-[#5e6662]">
                  Your checklist resets each day, while your daily progress
                  stays part of the bigger picture.
                </p>
              </div>

              <div className="text-sm font-bold text-[#2b694d]">
                try to actually do 1 or 2 tasks today, every bit counts.
              </div>
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="min-w-[960px]">
                <div className="flex h-52 items-end gap-1.5 md:gap-3">
                  {flowDates.map((date) => {
                    const dateKey = formatDateKey(date);
                    const completedCount = (historyByDate[dateKey] ?? [])
                      .length;
                    const isSelected = selectedHistoryDate === dateKey;
                    const isToday = dateKey === todayKey;
                    const isFuture = date > today;
                    const hasActivity = completedCount > 0;
                    const minBarHeight = 20;
                    const maxBarHeight = 100;
                    const perItemStep = 10;
                    const barHeight = hasActivity
                      ? Math.min(
                          maxBarHeight,
                          minBarHeight + completedCount * perItemStep,
                        )
                      : minBarHeight;

                    return (
                      <button
                        key={dateKey}
                        type="button"
                        onClick={() =>
                          setSelectedHistoryDate(
                            completedCount > 0 ? dateKey : null,
                          )
                        }
                        className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end"
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
                        <span
                          className={[
                            "block w-full rounded-t-lg transition-all",
                            isSelected
                              ? "bg-[#002d1c]"
                              : isToday
                                ? "bg-[#f0bd8b]"
                                : hasActivity
                                  ? "bg-[#2b694d]/75 hover:bg-[#2b694d]"
                                  : isFuture
                                    ? "bg-[#e8e9e1] opacity-60"
                                    : "bg-[#002d1c]/10 hover:bg-[#002d1c]/15",
                          ].join(" ")}
                          style={{ height: `${barHeight}%` }}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 flex justify-between text-[11px] font-semibold uppercase tracking-[0.22em] text-[#717973]">
                  <span>{monthDayFormatter.format(flowDates[0])}</span>
                  <span>Tap a highlighted bar to inspect that day</span>
                  <span>
                    {monthDayFormatter.format(flowDates[flowDates.length - 1])}
                  </span>
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

          <section className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {categories.map((category, index) => {
              const customItems = customItemsByCategory[category.key] ?? [];
              const allItems = [...category.defaultItems, ...customItems];
              const sortedItems = [...allItems].sort((left, right) =>
                left.text.localeCompare(right.text),
              );
              const completedCount = allItems.reduce((sum, item) => {
                return (
                  sum +
                  (todayHistorySet.has(buildEntryKey(category.key, item.id))
                    ? 1
                    : 0)
                );
              }, 0);

              return (
                <article
                  key={category.key}
                  className="rounded-[2rem] bg-[#f3f4ec] p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-black ${getCategoryAccent(index)}`}
                      >
                        {category.category.slice(0, 2).toUpperCase()}
                      </div>
                      <h3 className="text-lg font-bold tracking-[-0.03em] text-[#002d1c]">
                        {category.category}
                      </h3>
                    </div>

                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-black text-[#2b694d]">
                      {completedCount}/{allItems.length}
                    </span>
                  </div>

                  <div className="mt-6 space-y-3">
                    {sortedItems.map((item) => {
                      const entryKey = buildEntryKey(category.key, item.id);
                      const isChecked = todayHistorySet.has(entryKey);

                      return (
                        <label
                          key={item.id}
                          className="flex cursor-pointer items-start gap-3"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleItem(category.key, item.id)}
                            className="mt-0.5 h-5 w-5 shrink-0 rounded-md border-none bg-white text-[#2b694d] focus:ring-[#2b694d]/20"
                          />
                          <span
                            className={[
                              "text-sm font-medium text-[#414844] transition-colors",
                              isChecked && "line-through opacity-60",
                            ].join(" ")}
                          >
                            {item.text}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <form
                    onSubmit={(event) => addCustomItem(category.key, event)}
                    className="mt-6"
                  >
                    <div className="flex gap-2 rounded-2xl bg-white p-2">
                      <input
                        type="text"
                        value={draftsByCategory[category.key] ?? ""}
                        onChange={(event) =>
                          setDraftsByCategory((prev) => ({
                            ...prev,
                            [category.key]: event.target.value,
                          }))
                        }
                        placeholder="Add item"
                        className="min-w-0 flex-1 border-none bg-transparent px-3 py-2 text-sm focus:ring-0"
                      />
                      <button
                        type="submit"
                        className="rounded-2xl bg-[#002d1c] px-4 py-2 text-sm font-bold text-white"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </article>
              );
            })}
          </section>

          <section className="rounded-[2rem] bg-[#002d1c] p-8 text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#b0f1cc]">
                  Daily Reminder
                </p>
                <h3 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.04em]">
                  &quot;When you revisit your belongings, you&apos;re deciding
                  what deserves space in your life.&quot;
                </h3>
                <p className="mt-3 text-sm text-[#b7d1c4]">
                  Your checklist resets each day, but your consistency keeps
                  compounding.
                </p>
              </div>

              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/10 bg-[#2b694d] text-xs font-black uppercase tracking-[0.2em] text-[#b0f1cc] md:h-32 md:w-32">
                Flow
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
