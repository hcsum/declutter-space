"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDialogState } from "@/components/DialogProvider";
import { useI18n } from "@/i18n/i18n-provider";
import { logout } from "@/actions/auth";
import ChecklistCloudBanner from "./components/ChecklistCloudBanner";
import ChecklistLocaleSwitcher from "./components/ChecklistLocaleSwitcher";
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
  parseDateKey,
} from "@/lib/checklist/checklist";
import { useChecklistPersistence } from "@/lib/checklist/useChecklistPersistence";

type DraftsByCategory = Record<string, string>;

const categoryAccents = [
  "bg-[#dcebdd] text-[#2b694d]",
  "bg-[#e7edf6] text-[#335b86]",
  "bg-[#f3e7d9] text-[#7a5228]",
  "bg-[#ece5f8] text-[#654799]",
  "bg-[#fde7e3] text-[#9b4f3e]",
  "bg-[#e4f0ec] text-[#2a6c59]",
];

const checklistSeoContent = {
  en: {
    guideLabel: "How to use this checklist",
    guideTitle: "A declutter checklist works best when you use it room by room",
    guideIntro:
      "This page is not just a big list of things to throw away. It is a practical declutter checklist built to help you make progress one room at a time, keep track of what you finished today, and come back tomorrow without losing momentum.",
    guidePoints: [
      {
        title: "Start with one room, not the whole house",
        body: "Pick one area such as your bedroom, kitchen, bathroom, living room, closet, or home office. A smaller target makes it easier to finish a session and gives Google a clearer room-by-room theme for this page.",
      },
      {
        title: "Use the checklist for quick wins first",
        body: "Begin with easy decisions like expired products, duplicates, broken items, and things you have not used in a long time. Quick wins reduce visual clutter and make harder choices easier later.",
      },
      {
        title: "Save progress and build a repeatable habit",
        body: "Your daily checkmarks create a lightweight decluttering rhythm. Even clearing one to three items per session is enough if you keep showing up consistently.",
      },
    ],
    roomTitle: "Room-by-room decluttering guides",
    roomIntro:
      "If you want more than a checklist, these guides explain what to declutter first in each space and how to make decisions faster.",
    roomLinks: [
      {
        href: "/how-to-declutter-your-bedroom",
        label: "Bedroom decluttering guide",
        desc: "Clear floors, nightstands, closets, and under-bed storage without making the room feel worse first.",
      },
      {
        href: "/how-to-declutter-your-kitchen",
        label: "Kitchen decluttering guide",
        desc: "Cut duplicates, expired pantry items, neglected gadgets, and crowded drawers.",
      },
      {
        href: "/how-to-declutter-your-bathroom",
        label: "Bathroom decluttering guide",
        desc: "Reset toiletries, medicine, towels, and overflow storage so the room feels lighter fast.",
      },
      {
        href: "/how-to-declutter-your-living-room",
        label: "Living room decluttering guide",
        desc: "Reduce surface noise, media clutter, and decor that makes the room harder to maintain.",
      },
      {
        href: "/how-to-declutter-your-closet",
        label: "Closet decluttering guide",
        desc: "Work through easy noes, unloved clothes, and items you keep out of guilt.",
      },
      {
        href: "/how-to-declutter-your-home-office",
        label: "Home office decluttering guide",
        desc: "Sort paper, cables, stationery, and old devices into a space that supports focused work.",
      },
    ],
    faqTitle: "Declutter checklist FAQ",
    faqs: [
      {
        question: "What should I declutter first?",
        answer:
          "Start with the room that creates the most daily friction, then begin with visible clutter, expired items, duplicates, and easy noes. Momentum matters more than finding the perfect starting point.",
      },
      {
        question: "How many items should I declutter in one session?",
        answer:
          "There is no magic number. One focused pass through a single drawer, shelf, or category is enough if you can finish it and return tomorrow.",
      },
      {
        question: "Is this checklist free to use?",
        answer:
          "Yes. The declutter checklist is free to use and built to help you track progress room by room without needing a complicated organizing system.",
      },
      {
        question: "What if I get stuck on sentimental or ADHD-related clutter?",
        answer:
          "Use smaller sessions and switch to a more specific guide when needed. The sentimental-items guide and ADHD cleaning checklist are better fits when the obstacle is emotional load or executive function, not lack of storage.",
      },
    ],
  },
  zh: {
    guideLabel: "这份清单怎么用",
    guideTitle: "断舍离清单最适合按房间来推进",
    guideIntro:
      "这个页面不只是一个“该扔什么”的大列表，而是一份可以按房间推进、记录今天进度、明天继续接着做的断舍离清单。",
    guidePoints: [
      {
        title: "一次只处理一个空间",
        body: "先选卧室、厨房、浴室、客厅、衣柜或家庭办公室中的一个区域。目标越小，越容易做完一轮，也更容易形成闭环。",
      },
      {
        title: "先拿容易的项目建立势能",
        body: "优先清掉过期品、重复物、损坏物和长期没用过的东西。先把明显的杂物拿掉，后面的犹豫项会更好决定。",
      },
      {
        title: "把它当成可重复的日常习惯",
        body: "每天只完成 1 到 3 项也没问题。关键不是一次清空，而是持续回到清单，让空间一点点变轻。",
      },
    ],
    roomTitle: "按房间整理的配套指南",
    roomIntro:
      "如果你不只想勾选清单，还想知道每个空间应该先从哪里下手，可以直接读下面这些房间级指南。",
    roomLinks: [
      {
        href: "/how-to-declutter-your-bedroom",
        label: "卧室整理指南",
        desc: "从地面、床头柜、衣柜和床下空间开始，让卧室先恢复可睡、可放松的状态。",
      },
      {
        href: "/how-to-declutter-your-kitchen",
        label: "厨房整理指南",
        desc: "清理重复工具、过期食材、闲置小家电和拥挤抽屉。",
      },
      {
        href: "/how-to-declutter-your-bathroom",
        label: "浴室整理指南",
        desc: "重置洗护用品、药品、毛巾和囤货，让空间更轻更好维护。",
      },
      {
        href: "/how-to-declutter-your-living-room",
        label: "客厅整理指南",
        desc: "减少台面视觉噪音、媒体杂物和难维护的装饰物。",
      },
      {
        href: "/how-to-declutter-your-closet",
        label: "衣柜整理指南",
        desc: "先处理最容易说不的衣物、长期不穿的单品和出于愧疚留下的东西。",
      },
      {
        href: "/how-to-declutter-your-home-office",
        label: "家庭办公室整理指南",
        desc: "整理纸张、线缆、文具和旧设备，恢复一个支持专注工作的桌面。",
      },
    ],
    faqTitle: "断舍离清单 FAQ",
    faqs: [
      {
        question: "应该先从哪里开始断舍离？",
        answer:
          "先从最影响你每天生活的房间开始，再优先处理看得见的杂物、过期品、重复物和容易决定的项目。先建立势能，比选“最完美起点”更重要。",
      },
      {
        question: "一次要清多少东西才算有效？",
        answer:
          "没有固定数量。一次清完一个抽屉、一层架子或一个小分类，就已经是有效进展，只要你能做完并愿意明天继续。",
      },
      {
        question: "这份清单是免费的吗？",
        answer:
          "是的。这份断舍离清单可以免费使用，目的就是帮助你按房间持续推进，而不是依赖复杂的整理系统。",
      },
      {
        question: "如果我卡在情绪物品或 ADHD 型杂乱怎么办？",
        answer:
          "把任务切得更小，并切换到更具体的专题页。遇到情感负担时看 sentimental items，遇到执行功能卡住时看 ADHD cleaning checklist，会比硬撑着做更有效。",
      },
    ],
  },
  ja: {
    guideLabel: "このチェックリストの使い方",
    guideTitle: "断捨離チェックリストは部屋ごとに進めるのがいちばん続きます",
    guideIntro:
      "このページは単なる『捨てる物リスト』ではなく、部屋ごとに片付けを進めて、今日の進捗を残し、明日また再開しやすくするための断捨離チェックリストです。",
    guidePoints: [
      {
        title: "家全体ではなく、まず一部屋から始める",
        body: "寝室、キッチン、浴室、リビング、クローゼット、ホームオフィスのどれか一つを選びましょう。範囲を小さくすると、1 回で終わらせやすくなります。",
      },
      {
        title: "最初は簡単に手放せる物から",
        body: "期限切れ、重複、壊れた物、長く使っていない物から始めると、見た目のノイズが減って、その後の判断もしやすくなります。",
      },
      {
        title: "毎日少しずつ続ける前提で使う",
        body: "1 回で 1〜3 項目でも十分です。完璧に終わらせることより、また戻ってこられる流れを作ることが大切です。",
      },
    ],
    roomTitle: "部屋別の片付けガイド",
    roomIntro:
      "チェックリストだけでなく、各スペースで何から片付けるべきかも知りたい場合は、以下のガイドが役立ちます。",
    roomLinks: [
      {
        href: "/how-to-declutter-your-bedroom",
        label: "寝室の片付けガイド",
        desc: "床、ナイトテーブル、クローゼット、ベッド下から始めて、落ち着ける寝室に戻します。",
      },
      {
        href: "/how-to-declutter-your-kitchen",
        label: "キッチンの片付けガイド",
        desc: "重複した道具、期限切れの食品、使っていない家電、詰め込みすぎた引き出しを整理します。",
      },
      {
        href: "/how-to-declutter-your-bathroom",
        label: "浴室の片付けガイド",
        desc: "日用品、薬、タオル、ストックを見直して、軽く管理しやすい空間にします。",
      },
      {
        href: "/how-to-declutter-your-living-room",
        label: "リビングの片付けガイド",
        desc: "表面のごちゃつき、メディア周り、維持しにくい飾りを減らします。",
      },
      {
        href: "/how-to-declutter-your-closet",
        label: "クローゼットの片付けガイド",
        desc: "着ていない服、気が進まない服、罪悪感で残している物から整理します。",
      },
      {
        href: "/how-to-declutter-your-home-office",
        label: "ホームオフィスの片付けガイド",
        desc: "紙類、ケーブル、文具、古いデバイスを整理して、集中しやすい作業環境を作ります。",
      },
    ],
    faqTitle: "断捨離チェックリスト FAQ",
    faqs: [
      {
        question: "何から断捨離すればいいですか？",
        answer:
          "毎日のストレスが大きい部屋から始め、見える散らかり、期限切れ、重複、判断しやすい物を先に片付けましょう。勢いを作ることが最優先です。",
      },
      {
        question: "1 回でどれくらい片付ければ十分ですか？",
        answer:
          "決まった数はありません。引き出し 1 つ、棚 1 段、小さなカテゴリ 1 つでも終わらせられれば十分です。",
      },
      {
        question: "このチェックリストは無料ですか？",
        answer:
          "はい。部屋ごとの進捗を気軽に追える、無料の断捨離チェックリストとして使えます。",
      },
      {
        question: "思い出の物や ADHD 由来の片付けづらさがある場合は？",
        answer:
          "作業単位をさらに小さくし、必要なら専用ガイドに切り替えてください。感情的な負荷が強いときは sentimental items、実行機能の負担が大きいときは ADHD cleaning checklist が向いています。",
      },
    ],
  },
} as const;

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
  const { t, locale, localePath } = useI18n();
  const seoContent =
    checklistSeoContent[locale as keyof typeof checklistSeoContent] ??
    checklistSeoContent.en;
  const today = new Date();
  const todayKey = formatDateKey(today);
  const flowDates = useMemo(() => getFlowDates(), []);
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
  const [draftsByCategory, setDraftsByCategory] = useState<DraftsByCategory>(
    {},
  );
  const [selectedHistoryDate, setSelectedHistoryDate] = useState<string | null>(
    null,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasSeenMomentumDialog, setHasSeenMomentumDialog] = useState(false);
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
        [entryKey]: { category: category.category, text: item.text },
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
              removeItem(categoryKey, itemId);
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

  const checklistPath = localePath("/declutter-checklist");

  return (
    <main className="min-h-screen bg-[#f9faf2] pt-16 text-[#1a1c18] md:block">
      <aside className="hidden h-[calc(100vh-4rem)] w-64 flex-col bg-[#f3f4ec] p-6 shadow-xl shadow-[#1a1c18]/5 md:fixed md:bottom-0 md:left-0 md:top-16 md:flex">
        <nav className="flex-1 space-y-2 text-lg font-semibold">
          <Link
            href={checklistPath}
            className="block rounded-xl bg-white p-3 text-[#002d1c] shadow-sm"
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
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                aria-label={t("checklist.close")}
                className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2b694d] shadow-sm"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-2 text-lg font-semibold">
              <Link
                href={checklistPath}
                onClick={() => setIsSidebarOpen(false)}
                className="block rounded-xl bg-white p-3 text-[#002d1c] shadow-sm"
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
            <h1 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#59615d]">
              {t("checklist.headerLabel")}
            </h1>
            <p className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c]">
              {t("checklist.headerTitle")}
            </p>
          </div>
          <div className="rounded-full bg-[#edefe7] px-4 py-2 text-sm font-bold text-[#2b694d]">
            {t("checklist.tasksToday").replace(
              "{count}",
              String(todayHistorySet.size),
            )}
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
                  {t("checklist.ongoingTitle")}
                </h2>
                <p className="mt-1 text-sm font-medium text-[#5e6662]">
                  {t("checklist.ongoingDesc")}
                </p>
              </div>
              <div className="text-sm font-bold text-[#2b694d]">
                {t("checklist.tryTasks")}
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
                  <span>{t("checklist.tapBar")}</span>
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

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c]">
              {t("checklist.dailyTasksTitle")}
            </h2>
            <button
              type="button"
              onClick={() => setIsEditMode((prev) => !prev)}
              className={[
                "rounded-full px-4 py-2 text-xs font-bold transition-colors",
                isEditMode
                  ? "bg-[#002d1c] text-white"
                  : "bg-[#edefe7] text-[#2b694d] hover:bg-[#e0e4d9]",
              ].join(" ")}
            >
              {isEditMode
                ? t("checklist.doneEditing")
                : t("checklist.editList")}
            </button>
          </div>

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
                        {category.source === "built-in" ? (
                          <Link
                            href={localePath(`/declutter-checklist/${category.slug}`)}
                            className="hover:underline"
                          >
                            {category.category}
                          </Link>
                        ) : (
                          category.category
                        )}
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
                              aria-label={`${t("checklist.remove")} ${item.text}`}
                            >
                              {t("checklist.remove")}
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
                  )}
                </article>
              );
            })}
          </section>

          <section className="rounded-[2rem] bg-[#002d1c] p-8 text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#b0f1cc]">
                  {t("checklist.dailyReminder")}
                </p>
                <h3 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.04em]">
                  {t("checklist.reminderQuote")}
                </h3>
                <p className="mt-3 text-sm text-[#b7d1c4]">
                  {t("checklist.reminderDesc")}
                </p>
              </div>
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/10 bg-[#2b694d] text-xs font-black uppercase tracking-[0.2em] text-[#b0f1cc] md:h-32 md:w-32">
                {t("checklist.flow")}
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
            <div className="max-w-4xl">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#59615d]">
                {seoContent.guideLabel}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[#002d1c]">
                {seoContent.guideTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-[#414844]">
                {seoContent.guideIntro}
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {seoContent.guidePoints.map((point) => (
                <article
                  key={point.title}
                  className="rounded-[1.5rem] bg-[#f3f4ec] p-5"
                >
                  <h3 className="text-lg font-bold tracking-[-0.03em] text-[#002d1c]">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#4b534f]">
                    {point.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] bg-[#edefe7] p-6 md:p-8">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold tracking-[-0.05em] text-[#002d1c]">
                {seoContent.roomTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-[#4b534f]">
                {seoContent.roomIntro}
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {seoContent.roomLinks.map((item) => (
                <article
                  key={item.href}
                  className="rounded-[1.5rem] bg-white p-5 shadow-sm"
                >
                  <h3 className="text-lg font-bold tracking-[-0.03em] text-[#002d1c]">
                    <Link
                      href={localePath(item.href)}
                      className="hover:text-[#2b694d] hover:underline"
                    >
                      {item.label}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#4b534f]">
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-3xl font-bold tracking-[-0.05em] text-[#002d1c]">
              {seoContent.faqTitle}
            </h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {seoContent.faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-[1.5rem] bg-[#f9faf2] p-5"
                >
                  <h3 className="text-lg font-bold tracking-[-0.03em] text-[#002d1c]">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#4b534f]">
                    {faq.answer}
                  </p>
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
