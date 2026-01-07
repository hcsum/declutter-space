"use client";

import { useDialogState } from "@/components/DialogProvider";
import checklist from "@/const/declutter-checklist.json";

type PoolItem = { category: string; item: string };

export default function HomeCtas({
  showTaskButton = true,
  showChecklistLink = true,
}: {
  showTaskButton?: boolean;
  showChecklistLink?: boolean;
}) {
  const { setDialogContent } = useDialogState();

  function randomDeclutterTasks(): PoolItem[] {
    const data = checklist as Array<{ category: string; items: string[] }>;
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
      title: "Quick Declutter Task",
      content: (
        <div className="pt-2 text-left">
          {choice ? (
            <div className="space-y-3">
              <div className="text-sm uppercase tracking-wide text-blue-600 dark:text-blue-400 font-semibold">
                {choice.category}
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                {choice.item}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Spend some time on this. Do what you can. Set a timer if you
                want.
              </p>
            </div>
          ) : (
            <p className="text-neutral-600 dark:text-neutral-300">
              No tasks available.
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
            OK
          </button>
          <button
            onClick={reroll}
            className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
          >
            Give me another
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
          Give me a Declutter task
        </button>
      )}
      {showChecklistLink && (
        <a
          href="/declutter-checklist"
          className="inline-flex items-center justify-center bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium px-6 py-3 rounded-lg text-lg transition-colors duration-200 w-full sm:w-auto"
        >
          Or check the declutter checklist
        </a>
      )}
    </div>
  );
}
