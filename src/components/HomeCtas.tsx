"use client";

import Link from "next/link";
import { useDialogState } from "@/components/DialogProvider";
import { useI18n } from "@/i18n/i18n-provider";
import { getChecklistCategories } from "@/lib/checklist/checklist";

type PoolItem = { category: string; item: string };

export default function HomeCtas({
  showTaskButton = true,
  showChecklistLink = true,
}: {
  showTaskButton?: boolean;
  showChecklistLink?: boolean;
}) {
  const { t, locale, localePath } = useI18n();
  const { setDialogContent } = useDialogState();

  function randomDeclutterTasks(): PoolItem[] {
    const data = getChecklistCategories(locale);
    const pool: PoolItem[] = [];
    for (const c of data) {
      for (const item of c.items) pool.push({ category: c.category, item });
    }
    if (pool.length === 0) return [];
    const picks: PoolItem[] = [];
    const used = new Set<number>();
    while (picks.length < 1 && used.size < pool.length) {
      const idx = Math.floor(Math.random() * pool.length);
      if (used.has(idx)) continue;
      used.add(idx);
      picks.push(pool[idx]);
    }
    return picks;
  }

  function onGiveMeTask() {
    const picks = randomDeclutterTasks();
    const choice = picks[0];
    const reroll = () => onGiveMeTask();
    setDialogContent({
      title: t("homeCtas.dialogTitle"),
      content: (
        <div className="pt-2 text-left">
          {choice ? (
            <div className="space-y-3">
              <div className="text-xl tracking-normal text-black dark:text-white font-medium font-geist">
                {choice.category}
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                {choice.item}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                {t("homeCtas.dialogSpentTime")}
              </p>
            </div>
          ) : (
            <p className="text-neutral-600 dark:text-neutral-300">
              {t("homeCtas.dialogNoTasks")}
            </p>
          )}
        </div>
      ),
      actions: (
        <div className="flex gap-2">
          <button
            onClick={() => setDialogContent(undefined)}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            {t("homeCtas.ok")}
          </button>
          <button
            onClick={reroll}
            className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
          >
            {t("homeCtas.giveMeAnother")}
          </button>
        </div>
      ),
    });
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
      {showTaskButton && (
        <button
          onClick={onGiveMeTask}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 mt-6 rounded-lg text-lg transition-colors duration-200 w-full sm:w-auto"
        >
          {t("homeCtas.getTask")}
        </button>
      )}
      {showChecklistLink && (
        <Link
          href={localePath("/declutter-checklist")}
          className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg text-lg transition-colors duration-200 w-full sm:w-auto"
        >
          {t("homeCtas.checklistLink")}
        </Link>
      )}
    </div>
  );
}
