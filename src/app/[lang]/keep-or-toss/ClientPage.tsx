"use client";

import { useState, useEffect, useCallback } from "react";

import { useMutation } from "@tanstack/react-query";
import { createItem, deleteItem, archiveItem } from "@/actions/items";
import { useI18n } from "@/i18n/i18n-provider";
import { useLoginDialog } from "@/components/LoginDialogProvider";
import { useDialogState } from "@/components/DialogProvider";

type FetchedItem = {
  id: string;
  name: string;
  deadline: string;
  startDate: string;
  image: string | null;
};

type DisplayItem = {
  id: string;
  name: string;
  deadline: Date;
  startDate: Date;
  progress: number;
  image: string;
};

const DEMO_ITEMS: DisplayItem[] = [
  {
    id: "demo-1",
    name: "Blue Velvet Blazer",
    deadline: new Date(Date.now() + 14 * 86400000),
    startDate: new Date(Date.now() - 33 * 86400000),
    progress: 70,
    image: "/blazer.webp",
  },
  {
    id: "demo-2",
    name: "Vintage Camera",
    deadline: new Date(Date.now() + 32 * 86400000),
    startDate: new Date(Date.now() - 11 * 86400000),
    progress: 25,
    image: "/camera.webp",
  },
  {
    id: "demo-3",
    name: "Design Magazines",
    deadline: new Date(Date.now() + 2 * 86400000),
    startDate: new Date(Date.now() - 38 * 86400000),
    progress: 95,
    image: "/magazines.webp",
  },
];

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function daysUntil(d: Date): number {
  return Math.max(0, Math.ceil((d.getTime() - Date.now()) / 86400000));
}

function calcProgress(startDate: Date, deadline: Date): number {
  const total = deadline.getTime() - startDate.getTime();
  const elapsed = Date.now() - startDate.getTime();
  if (total <= 0) return 100;
  return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
}

function toDisplayItems(fetched: FetchedItem[]): DisplayItem[] {
  return fetched.map((item) => {
    const deadline = new Date(item.deadline);
    const startDate = new Date(item.startDate);
    return {
      id: item.id,
      name: item.name,
      deadline,
      startDate,
      progress: calcProgress(startDate, deadline),
      image: item.image || `https://picsum.photos/seed/${item.id}/400/400`,
    };
  });
}

export default function ClientPage() {
  const { t } = useI18n();
  const { setOpen: setLoginOpen } = useLoginDialog();
  const { setDialogContent } = useDialogState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [realItems, setRealItems] = useState<DisplayItem[]>([]);
  const [itemName, setItemName] = useState("");
  const [trialMonths, setTrialMonths] = useState("2");
  const [actingOn, setActingOn] = useState<string | null>(null);

  const fetchItems = useCallback(() => {
    fetch("/api/items", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data?.items) {
          setRealItems(toDisplayItems(data.items));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch("/api/auth/status", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        const logged = Boolean(d?.loggedIn);
        setLoggedIn(logged);
        if (logged) fetchItems();
      })
      .catch(() => setLoggedIn(false));
  }, [fetchItems]);

  const { mutate: addItem, isPending: isAdding } = useMutation({
    mutationFn: createItem,
    onSuccess(res) {
      if (res?.success) {
        setItemName("");
        fetchItems();
      }
    },
  });

  const handleAdd = useCallback(() => {
    const trimmed = itemName.trim();
    if (!trimmed) return;
    const fd = new FormData();
    fd.set("name", trimmed);
    fd.set("pieces", "1");
    fd.set("deadline", trialMonths);
    addItem(fd);
  }, [itemName, trialMonths, addItem]);

  const handleKeep = useCallback(
    async (id: string) => {
      if (actingOn) return;
      setActingOn(id);
      try {
        await archiveItem(id);
        fetchItems();
      } finally {
        setActingOn(null);
      }
    },
    [actingOn, fetchItems],
  );

  const handleLetGo = useCallback(
    async (id: string) => {
      if (actingOn) return;
      setActingOn(id);
      try {
        await deleteItem(id);
        fetchItems();
      } finally {
        setActingOn(null);
      }
    },
    [actingOn, fetchItems],
  );

  function confirmKeep(id: string) {
    setDialogContent({
      title: t("declutteringTips.confirmKeepTitle"),
      content: (
        <p className="text-base leading-7 text-neutral-700 dark:text-neutral-300">
          {t("declutteringTips.confirmKeepDesc")}
        </p>
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
              handleKeep(id);
              setDialogContent(undefined);
            }}
            className="rounded-xl bg-[#002d1c] px-5 py-2.5 text-sm font-bold text-white"
          >
            {t("declutteringTips.confirmAction")}
          </button>
        </div>
      ),
    });
  }

  function confirmLetGo(id: string) {
    setDialogContent({
      title: t("declutteringTips.confirmLetGoTitle"),
      content: (
        <p className="text-base leading-7 text-neutral-700 dark:text-neutral-300">
          {t("declutteringTips.confirmLetGoDesc")}
        </p>
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
              handleLetGo(id);
              setDialogContent(undefined);
            }}
            className="rounded-xl bg-[#002d1c] px-5 py-2.5 text-sm font-bold text-white"
          >
            {t("declutteringTips.confirmAction")}
          </button>
        </div>
      ),
    });
  }

  const items = loggedIn ? realItems : DEMO_ITEMS;

  return (
    <div className="bg-[#fbf9f8] dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans min-h-screen">
      <section className="px-6 pb-16 pt-32 text-center md:pt-36">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-display font-display text-on-surface dark:text-white mb-4">
            {t("declutteringTips.heroTitle")}
          </h1>
          <p className="text-lg md:text-xl text-[#486173] dark:text-gray-400 max-w-2xl mx-auto">
            {t("declutteringTips.heroSubtitle")}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-sm border border-[#eae8e7] dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-6 text-[#82533f] dark:text-gray-100">
            {t("declutteringTips.addSectionTitle")}
          </h2>
          {loggedIn ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-6">
                <label className="text-sm text-[#84746e] dark:text-gray-400 mb-2 block">
                  {t("declutteringTips.itemNameLabel")}
                </label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAdd();
                  }}
                  className="w-full bg-[#fbf9f8] dark:bg-gray-900 border border-[#d6c2bb] dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#82533f] focus:border-[#82533f] outline-none transition-all"
                  placeholder={t("declutteringTips.itemNamePlaceholder")}
                />
              </div>
              <div className="md:col-span-4">
                <label className="text-sm text-[#84746e] dark:text-gray-400 mb-2 block">
                  {t("declutteringTips.trialPeriodLabel")}
                </label>
                <select
                  value={trialMonths}
                  onChange={(e) => setTrialMonths(e.target.value)}
                  className="w-full bg-[#fbf9f8] dark:bg-gray-900 border border-[#d6c2bb] dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-1 focus:ring-[#82533f] focus:border-[#82533f] outline-none transition-all appearance-none"
                >
                  <option value="1">1 month</option>
                  <option value="2">2 months</option>
                  <option value="3">3 months</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button
                  onClick={handleAdd}
                  disabled={isAdding}
                  className="w-full bg-[#82533f] text-white font-medium py-3 px-6 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
                >
                  {t("declutteringTips.addButton")}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-[#84746e] dark:text-gray-400 mb-4">
                {t("declutteringTips.loginPrompt")}
              </p>
              <button
                onClick={() => setLoginOpen(true)}
                className="inline-flex items-center justify-center bg-[#82533f] text-white font-medium px-8 py-3 rounded-lg hover:brightness-110 transition-all"
              >
                {t("declutteringTips.addButton")}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex items-center justify-between mb-8 border-b border-[#e4e2e2] dark:border-gray-700 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1b1c1c] dark:text-gray-100">
            {t("declutteringTips.itemsTitle")}
          </h2>
          <span className="text-sm bg-[#c9e3f8] dark:bg-blue-900 text-[#4d6677] dark:text-blue-200 px-3 py-1 rounded-full">
            {t("declutteringTips.itemsActive").replace(
              "{count}",
              String(items.length),
            )}
          </span>
        </div>

        {!loggedIn && (
          <p className="text-base text-[#84746e] dark:text-gray-500 mb-6">
            {t("declutteringTips.demoDisclaimer")}
          </p>
        )}

        {items.length === 0 && loggedIn ? (
          <div className="text-center py-16">
            <p className="text-[#84746e] dark:text-gray-400 text-lg">
              No items yet. Add something above to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => {
              const days = daysUntil(item.deadline);
              const isUrgent = days <= 3;
              const isLoading = actingOn === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-[#eae8e7] dark:border-gray-700 group transition-all hover:-translate-y-1"
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-[#e4e2e2] dark:bg-gray-700">
                    <img
                      className="w-full h-full object-cover"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-[#1b1c1c] dark:text-gray-100">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#84746e] dark:text-gray-400 mb-6">
                    {t("declutteringTips.reviewBy").replace(
                      "{date}",
                      formatDate(item.deadline),
                    )}
                  </p>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className={`text-sm ${isUrgent ? "text-[#ba1a1a] dark:text-red-400" : "text-[#486173] dark:text-blue-300"}`}
                      >
                        {t("declutteringTips.daysLeft").replace(
                          "{count}",
                          String(days),
                        )}
                      </span>
                      <span className="text-sm text-[#84746e] dark:text-gray-400">
                        {t("declutteringTips.progressLabel").replace(
                          "{percentage}",
                          String(item.progress),
                        )}
                      </span>
                    </div>
                    <div className="w-full bg-[#e4e2e2] dark:bg-gray-700 h-1 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          isUrgent
                            ? "bg-[#ba1a1a] dark:bg-red-500"
                            : "bg-[#486173] dark:bg-blue-400"
                        }`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                  {loggedIn ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => confirmKeep(item.id)}
                        disabled={isLoading}
                        className="flex-1 bg-[#82533f] text-white font-medium py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-60"
                      >
                        {isLoading ? "..." : t("declutteringTips.keepIt")}
                      </button>
                      <button
                        onClick={() => confirmLetGo(item.id)}
                        disabled={isLoading}
                        className="flex-1 border border-[#84746e] dark:border-gray-500 text-[#84746e] dark:text-gray-300 font-medium py-3 rounded-lg hover:bg-[#fbf9f8] dark:hover:bg-gray-700 transition-all disabled:opacity-60"
                      >
                        {isLoading ? "..." : t("declutteringTips.letItGo")}
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        disabled
                        className="flex-1 bg-[#82533f] text-white font-medium py-3 rounded-lg opacity-50 cursor-default"
                      >
                        {t("declutteringTips.keepIt")}
                      </button>
                      <button
                        disabled
                        className="flex-1 border border-[#84746e] dark:border-gray-500 text-[#84746e] dark:text-gray-300 font-medium py-3 rounded-lg opacity-50 cursor-default"
                      >
                        {t("declutteringTips.letItGo")}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="py-20 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800 dark:text-gray-200">
            {t("declutteringTips.howItWorksTitle")}
          </h2>
          <div className="space-y-8">
            {[
              {
                title: t("declutteringTips.step1Title"),
                desc: t("declutteringTips.step1Desc"),
              },
              {
                title: t("declutteringTips.step2Title"),
                desc: t("declutteringTips.step2Desc"),
              },
              {
                title: t("declutteringTips.step3Title"),
                desc: t("declutteringTips.step3Desc"),
              },
            ].map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#82533f] text-white flex items-center justify-center font-bold text-xl">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#fbf9f8] dark:bg-gray-900 border-t border-[#e4e2e2] dark:border-gray-700">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800 dark:text-gray-200">
            {t("declutteringTips.whyItWorksTitle")}
          </h2>
          <div className="grid gap-12 md:grid-cols-3 text-center md:text-left">
            {[
              {
                title: t("declutteringTips.why1Title"),
                desc: t("declutteringTips.why1Desc"),
                bg: "bg-[#ffdbcd] dark:bg-orange-900/30",
                text: "text-[#82533f] dark:text-orange-300",
              },
              {
                title: t("declutteringTips.why2Title"),
                desc: t("declutteringTips.why2Desc"),
                bg: "bg-[#b0cade] dark:bg-blue-900/30",
                text: "text-[#486173] dark:text-blue-300",
              },
              {
                title: t("declutteringTips.why3Title"),
                desc: t("declutteringTips.why3Desc"),
                bg: "bg-[#ebe1d6] dark:bg-amber-900/30",
                text: "text-[#645d55] dark:text-amber-300",
              },
            ].map((card, i) => (
              <div key={i} className="space-y-4">
                <div
                  className={`w-12 h-12 ${card.bg} rounded-full flex items-center justify-center ${card.text} mx-auto md:mx-0`}
                >
                  <span className="text-lg font-bold">{i + 1}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {card.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
            {t("declutteringTips.keepOrTossTitle")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 text-center">
            {t("declutteringTips.keepOrTossDesc")}
          </p>
          <div className="space-y-4 mb-8">
            {[
              t("declutteringTips.question1"),
              t("declutteringTips.question2"),
              t("declutteringTips.question3"),
            ].map((q, i) => (
              <div
                key={i}
                className="bg-[#fbf9f8] dark:bg-gray-900 rounded-lg p-5 shadow-sm text-gray-800 dark:text-gray-200 text-lg border border-[#eae8e7] dark:border-gray-700"
              >
                {q}
              </div>
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg text-center max-w-2xl mx-auto">
            {t("declutteringTips.keepOrTossConclusion")}
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#82533f] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("declutteringTips.ctaTitle")}
          </h2>
          <p className="text-lg mb-8 text-[#f6b9a0]">
            {t("declutteringTips.ctaDesc")}
          </p>
          <button
            onClick={() => setLoginOpen(true)}
            className="inline-flex items-center justify-center bg-white text-[#82533f] hover:bg-[#fbf9f8] font-semibold px-8 py-3 rounded-lg text-lg transition-colors duration-200"
          >
            {t("declutteringTips.ctaButton")}
          </button>
        </div>
      </section>
    </div>
  );
}
