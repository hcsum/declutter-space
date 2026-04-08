"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useDialogState } from "@/components/DialogProvider";
import ChecklistCloudBanner from "./components/ChecklistCloudBanner";
import {
  ArchivedItemsByEntryKey,
  CustomItemsByCategory,
  HistoryByDate,
  ImportedList,
  RemovedItemsByCategory,
  buildEntryKey,
  formatDateKey,
  getAllChecklistCategories,
  longDateFormatter,
  monthDayFormatter,
  parseDateKey,
} from "./lib/checklist";
import { useChecklistPersistence } from "./lib/useChecklistPersistence";

type DraftsByCategory = Record<string, string>;

const categoryAccents = [
  "bg-[#dcebdd] text-[#2b694d]",
  "bg-[#e7edf6] text-[#335b86]",
  "bg-[#f3e7d9] text-[#7a5228]",
  "bg-[#ece5f8] text-[#654799]",
  "bg-[#fde7e3] text-[#9b4f3e]",
  "bg-[#e4f0ec] text-[#2a6c59]",
];

function getFlowDates() {
  const today = new Date();

  return Array.from({ length: 31 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index - 10);
    return date;
  });
}

function getCategoryAccent(index: number) {
  return categoryAccents[index % categoryAccents.length];
}

export default function ClientPage() {
  const { setDialogContent } = useDialogState();
  const today = new Date();
  const todayKey = formatDateKey(today);
  const flowDates = useMemo(() => getFlowDates(), []);

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
  const [selectedHistoryDate, setSelectedHistoryDate] = useState<string | null>(
    null,
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasSeenMomentumDialog, setHasSeenMomentumDialog] = useState(false);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  const categories = useMemo(
    () =>
      getAllChecklistCategories(importedLists).map((category) => ({
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
      })),
    [importedLists, removedItemsByCategory],
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

  function removeItem(categoryKey: string, itemId: string) {
    const entryKey = buildEntryKey(categoryKey, itemId);
    const category = categories.find((value) => value.key === categoryKey);
    const item =
      category?.defaultItems.find((value) => value.id === itemId) ??
      (customItemsByCategory[categoryKey] ?? []).find(
        (value) => value.id === itemId,
      );

    if (category && item) {
      setArchivedItemsByEntryKey((prev) => ({
        ...prev,
        [entryKey]: {
          category: category.category,
          text: item.text,
        },
      }));
    }

    if (itemId.startsWith("custom-")) {
      setCustomItemsByCategory((prev) => {
        const next = { ...prev };
        const filtered = (next[categoryKey] ?? []).filter(
          (item) => item.id !== itemId,
        );

        if (filtered.length === 0) delete next[categoryKey];
        else next[categoryKey] = filtered;

        return next;
      });
      return;
    }

    if (importedLists.length > 0) {
      setImportedLists((prev) =>
        prev
          .map((list) => {
            if (list.id !== categoryKey) return list;
            return {
              ...list,
              items: list.items.filter((item) => item.id !== itemId),
            };
          })
          .filter((list) => list.items.length > 0),
      );
      return;
    }

    setRemovedItemsByCategory((prev) => {
      const next = { ...prev };
      const removed = new Set(next[categoryKey] ?? []);
      removed.add(itemId);
      next[categoryKey] = Array.from(removed);
      return next;
    });
  }

  function confirmRemoveItem(
    categoryKey: string,
    itemId: string,
    itemText: string,
  ) {
    setDialogContent({
      title: "Pew, done with this for good? Press yes to confirm.",
      content: (
        <div className="space-y-3 text-base leading-7 text-neutral-700 dark:text-neutral-300">
          <p>{itemText}</p>
          <p>This item will still be kept in your decluterring progress.</p>
        </div>
      ),
      actions: (
        <div className="flex w-full items-center justify-end gap-3 px-2">
          <button
            type="button"
            onClick={() => setDialogContent(undefined)}
            className="rounded-xl bg-[#edefe7] px-5 py-2.5 text-sm font-bold text-[#2b694d]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              removeItem(categoryKey, itemId);
              setDialogContent(undefined);
            }}
            className="rounded-xl bg-[#002d1c] px-5 py-2.5 text-sm font-bold text-white"
          >
            Yes
          </button>
        </div>
      ),
    });
  }

  return (
    <main className="min-h-screen bg-[#f9faf2] text-[#1a1c18] md:block">
      <aside className="hidden h-screen w-64 flex-col bg-[#f3f4ec] p-6 shadow-xl shadow-[#1a1c18]/5 md:fixed md:inset-y-0 md:left-0 md:flex">
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
            className="block rounded-xl bg-white p-3 text-[#002d1c] shadow-sm"
          >
            Declutter Checklist
          </Link>
          <Link
            href="/declutter-checklist/progress"
            className="block rounded-xl p-3 text-[#414844]"
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

        <button className="w-full rounded-xl bg-[#002d1c] py-4 text-sm font-bold tracking-[0.18em] text-white uppercase">
          Start Today&apos;s Declutter
        </button>

        <div className="mt-6 space-y-2 text-sm font-medium">
          <div className="rounded-xl p-2 text-[#414844]">Help</div>
          <div className="rounded-xl p-2 text-[#ba1a1a]">Sign Out</div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col md:ml-64">
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
            <button
              type="button"
              onClick={() => setIsEditMode((prev) => !prev)}
              className={[
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                isEditMode
                  ? "bg-[#002d1c] text-white"
                  : "bg-[#edefe7] text-[#2b694d]",
              ].join(" ")}
            >
              {isEditMode ? "Done editing" : "Edit mode"}
            </button>
          </div>
        </header>

        <section className="flex-1 space-y-8 px-5 pb-10 pt-4 md:px-8">
          <ChecklistCloudBanner
            isLoggedIn={isLoggedIn}
            cloudStatus={cloudStatus}
          />

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
                        <div key={item.id} className="flex items-start gap-3">
                          <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleItem(category.key, item.id)}
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

                          {isEditMode && (
                            <button
                              type="button"
                              onClick={() =>
                                confirmRemoveItem(
                                  category.key,
                                  item.id,
                                  item.text,
                                )
                              }
                              className="rounded-full bg-white px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#7a3222]"
                              aria-label={`Remove ${item.text}`}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {isEditMode && (
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
                  )}
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
