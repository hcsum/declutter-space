import type { Metadata } from "next";
import Link from "next/link";
import AreaChecklistSection from "../declutter-checklist/components/AreaChecklistSection";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { buildLanguageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

type GuideCopy = {
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introBody: string;
  stepsTitle: string;
  steps: Array<[string, string]>;
  removeTitle: string;
  removeItems: string[];
  emotionTitle: string;
  emotionBody: string;
  toolTitle: string;
  toolDesc: string;
  toolPage: string;
  mistakesTitle?: string;
  mistakes: string[];
  keepTitle?: string;
  keepBody?: string;
  quickResetTitle?: string;
  quickResetSteps: string[];
  faqTitle?: string;
  faqs: Array<[string, string]>;
  blockersTitle?: string;
  blockersBody?: string;
  relatedTitle?: string;
  relatedIntro?: string;
  relatedLinks?: Array<{ href: string; label: string }>;
};

function getCopy(locale: string): GuideCopy {
  if (locale === "zh") {
    return {
      title: "如何整理浴室 | 浴室断舍离分步骤指南 | DeclutterYourHome",
      description:
        "学习如何整理浴室，先清掉过期用品、重复洗漱备份、闲置小样和失控收纳，让日常洗漱更轻松，空间更清爽。",
      eyebrow: "Bathroom Guide",
      heroTitle: "How to Declutter Your Bathroom Without Running Out of Essentials",
      heroSubtitle:
        "浴室最容易看起来不大，却塞进很多重复、过期和“先留着”的东西。有效的整理，不是把所有备份都丢掉，而是让每天真正会用到的东西更容易看到、拿到和补充。",
      introTitle: "浴室杂乱通常来自小体积但高频累积",
      introBody:
        "护肤小样、重复囤货、快过期却一直没用完的产品、旧毛巾、空瓶、过量清洁用品，都会在浴室这种小空间里迅速放大拥挤感。整理浴室最有效的方式，不是买更多收纳盒，而是先减少“你根本不可能同时用完”的数量。",
      stepsTitle: "整理浴室的 7 个步骤",
      steps: [
        ["1. 先扔掉过期、变质和明显不会再用的东西", "先处理过期药品、过期护肤品、防晒、彩妆、小样和已经变味或分层的产品。浴室常常有一批可以直接清掉的东西。"],
        ["2. 把同类洗漱和护肤用品放在一起看", "把洗发、护发、护肤、口腔护理、清洁用品分别集中，你会更容易发现重复、囤过头和根本不适合自己的产品。"],
        ["3. 只把正在用的放在最顺手的位置", "台面和淋浴区只留下当前在用的日常用品。备份库存可以保留，但不要和日用混在一起。"],
        ["4. 精简囤货和旅行装", "小样和旅行装看起来不占地方，但很容易变成永远用不完的集合。留下会真的带走或近期会用掉的，其余处理。"],
        ["5. 处理旧毛巾、浴帘和脚垫", "这些东西会长期影响视觉清爽度和使用感。已经磨损、发黄、发霉或不好用的可以直接淘汰。"],
        ["6. 清掉抽屉和柜子里的随机小物", "发圈、棉签、剃刀、电池、旧说明书和赠品小物，如果长期混放，只会让每次找东西都更麻烦。"],
        ["7. 给补货区设一个明确上限", "备用牙膏、卫生纸、洗发水和清洁用品可以保留，但最好限制在一个篮子或一个格子内，避免无限扩张。"],
      ],
      removeTitle: "浴室最该先清掉的东西",
      removeItems: [
        "过期药品和过期护理产品",
        "不适合自己却一直留着的护肤洗护",
        "长期闲置的小样和旅行装",
        "空瓶、空盒和旧包装",
        "发黄、磨损或发霉的毛巾浴帘脚垫",
        "重复囤太多的洗漱和清洁备份",
      ],
      emotionTitle: "好的浴室，会让日常照顾自己更轻松",
      emotionBody:
        "浴室不只是功能区，它也是你早晚最频繁接触的空间之一。台面拥挤、抽屉混乱、每次都要翻找，会在很小的时间片里不断制造摩擦。把这些小摩擦减掉，日常节奏会顺很多。",
      toolTitle: "现在就开始浴室清单",
      toolDesc:
        "下面这份互动清单和 bathroom checklist 功能页共用同一套数据。你可以直接在这里勾选、添加项目、保存进度。",
      toolPage: "打开 Bathroom Checklist 功能页",
      mistakes: [],
      quickResetSteps: [],
      faqs: [],
      blockersTitle: "浴室杂物的情绪卡点（emotional blockers）",
      blockersBody:
        "浴室的杂物常常以小但多的形式积累——\"还能挤一下\" 的洗发水、\"哪天用得上\" 的旅行装、收过来从没用的样品、贵但其实不适合自己肤质的护肤品。这些东西不是因为还有用而留着，而是因为扔它们带着 \"浪费\" 和 \"以防万一\" 的小负罪感。Use it or lose it 在浴室特别适用：开封后超过一年的护肤品基本已经氧化失效，留着只是占地方。",
      relatedTitle: "相关阅读",
      relatedIntro: "想拓展到房间外的话题：",
      relatedLinks: [
        { href: "/adhd-cleaning-checklist", label: "ADHD 友好的家务清单" },
        { href: "/things-to-stop-buying", label: "10 件该停止买的东西" },
        { href: "/things-to-declutter", label: "60 件可以从家里清掉的东西" },
        { href: "/how-to-declutter-your-kitchen", label: "如何整理厨房" },
      ],
    };
  }

  return {
    title: "How to Declutter Your Bathroom | Step-by-Step Bathroom Reset | DeclutterYourHome",
    description:
      "Learn how to declutter your bathroom step by step by clearing expired products, sample overflow, crowded counters, and backup stock you do not need.",
    eyebrow: "Bathroom Guide",
    heroTitle: "How to Declutter Your Bathroom Without Running Out of Essentials",
    heroSubtitle:
      "Bathroom clutter builds fast because the items are small, repetitive, and easy to justify keeping. A better bathroom declutter keeps daily-use products visible, limits overflow, and stops the room from feeling crowded before the day even starts.",
    introTitle: "Bathroom clutter is usually backup clutter plus small-item buildup",
    introBody:
      "Bathrooms fill up with things that look harmless on their own: samples, duplicate toiletries, nearly expired products, old towels, empty bottles, and too much backup stock. Because the room is small, these categories pile up fast. The best bathroom reset comes from reducing volume first, not from buying more organizers for products you already do not need.",
    stepsTitle: "How to declutter your bathroom in 7 steps",
    steps: [
      ["1. Throw away expired, spoiled, or clearly unused products", "Start with expired medication, sunscreen, skincare, makeup, samples, and anything that has changed texture, smell, or color."],
      ["2. Group like items together", "Put haircare, skincare, oral care, cleaning products, and first-aid items together so duplicates and overstock become obvious."],
      ["3. Keep only current-use items in the easiest spots", "Counters and shower shelves should hold what you are actively using now. Backups can stay, but they should not compete with daily-use products."],
      ["4. Cut back on samples and travel-size products", "Tiny items feel harmless, but they often become long-term clutter. Keep what you will actually use soon or take on a trip and clear the rest."],
      ["5. Replace worn towels, curtains, and bath mats", "These items have a big impact on how clean the room feels. If they are yellowed, musty, frayed, or unpleasant to use, they are likely past their useful life."],
      ["6. Reset drawers and cabinets full of random small items", "Hair ties, cotton swabs, razors, spare batteries, manuals, and freebie extras become frustrating fast when they are mixed together."],
      ["7. Put a firm limit on backup stock", "Extra toothpaste, toilet paper, shampoo, and cleaning supplies are fine, but they need a visible boundary so storage does not quietly expand forever."],
    ],
    removeTitle: "What to declutter from your bathroom first",
    removeItems: [
      "Expired medicine and personal care products",
      "Toiletries that do not suit you but still linger",
      "Unused samples and travel-size items",
      "Empty bottles, boxes, and packaging",
      "Yellowed, musty, or worn towels and bath textiles",
      "Overflow backup toiletries and cleaners",
    ],
    emotionTitle: "A better bathroom makes daily care feel lighter",
    emotionBody:
      "Bathrooms are small, but they shape your day in quiet ways. When the counters are crowded and every drawer search takes too long, the room adds friction to routines that should feel simple. Clearing that friction makes mornings and evenings feel smoother almost immediately.",
    mistakesTitle: "Common bathroom decluttering mistakes",
    mistakes: [
      "Keeping backup stock mixed in with current-use products",
      "Saving samples and travel-size items for trips that never come",
      "Leaving too many products on the counter because they are small",
      "Treating expired skincare and medicine like harmless clutter instead of time-sensitive clutter",
    ],
    keepTitle: "What should stay visible in a bathroom",
    keepBody:
      "Keep only the products you are actively using in your morning and evening routine within easy reach. Backups, guest items, and less-frequent products should stay separate so the room reflects today’s routine instead of your entire inventory.",
    quickResetTitle: "How to declutter your bathroom in 15 minutes",
    quickResetSteps: [
      "Throw away expired products, empty bottles, and obvious trash",
      "Pull all daily-use items together and move everything else off the counter",
      "Choose one drawer or shelf and remove duplicates and samples",
      "Put backups in one clearly limited zone instead of spreading them across the room",
    ],
    faqTitle: "Bathroom decluttering FAQ",
    faqs: [
      ["How many backup toiletries should you keep?", "Keep only what fits in one defined backup area. Once extras spill beyond that limit, they become clutter instead of convenience."],
      ["Should bathroom counters be completely empty?", "No. They should hold the products you actually use every day. The goal is functional clarity, not a hotel-style photo set."],
      ["What should you declutter first in a bathroom?", "Start with expired products, unused samples, and duplicate items. They are the fastest way to create space without affecting your routine."],
    ],
    toolTitle: "Start with the bathroom checklist",
    toolDesc:
      "This interactive checklist shares the same live data as the dedicated bathroom checklist page, so you can check off tasks, add items, and keep progress saved from either page.",
    toolPage: "Open the Bathroom Checklist page",
    blockersTitle: "The emotional blockers behind bathroom clutter",
    blockersBody:
      "Bathroom clutter accumulates as \"small but many\": the half-finished shampoo \"there's still some left,\" the travel-size bottles \"might use them on a trip someday,\" the free samples that arrived with no review, the expensive serum that did not work but feels wasteful to toss. None of it is staying because it is useful. It is staying because tossing it carries a small charge of \"waste\" or \"just in case.\" Use it or lose it applies here especially hard: most opened skincare oxidizes within twelve months, so the bottle you have been saving is already past its actual usefulness.",
    relatedTitle: "Related guides",
    relatedIntro: "Pair this room reset with broader habit changes:",
    relatedLinks: [
      { href: "/adhd-cleaning-checklist", label: "ADHD-friendly cleaning checklist" },
      { href: "/things-to-stop-buying", label: "10 things to stop buying for a clutter-free home" },
      { href: "/things-to-declutter", label: "60 things to declutter from your home" },
      { href: "/how-to-declutter-your-kitchen", label: "How to declutter your kitchen" },
    ],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = getCopy(locale);

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLanguageAlternates(locale, "/how-to-declutter-your-bathroom"),
  };
}

export default async function BathroomPage({ params }: Props) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = getCopy(locale);

  return (
    <main className="min-h-screen bg-[#f3f4ec] px-5 pb-20 pt-24 text-[#1a1c18] md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-[2rem] bg-white px-6 py-10 shadow-sm ring-1 ring-black/5 md:px-10 md:py-14">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#59615d]">
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-[-0.05em] text-[#002d1c] md:text-6xl">
            {copy.heroTitle}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#414844] md:text-lg md:leading-8">
            {copy.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
            <Link
              href={`/${locale}/declutter-checklist/bathroom-laundry`}
              className="rounded-full bg-[#002d1c] px-5 py-3 text-white"
            >
              {copy.toolPage}
            </Link>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
              {copy.introTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-[#414844]">
              {copy.introBody}
            </p>
          </article>

          <aside className="rounded-[2rem] bg-[#dcebdd] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
              {copy.removeTitle}
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[#335748]">
              {copy.removeItems.map((item) => (
                <li key={item} className="rounded-2xl bg-white/70 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
            {copy.stepsTitle}
          </h2>
          <div className="mt-6 space-y-5">
            {copy.steps.map(([title, body]) => (
              <div key={title} className="rounded-[1.5rem] bg-[#f9faf2] px-5 py-5">
                <h3 className="text-lg font-bold text-[#002d1c]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#414844] md:text-base md:leading-7">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-[#fff4df] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#573611] md:text-3xl">
            {copy.emotionTitle}
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-7 text-[#7a5228]">
            {copy.emotionBody}
          </p>
        </section>

        {copy.mistakes.length > 0 && copy.mistakesTitle && (
          <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
              <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
                {copy.mistakesTitle}
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[#414844] md:text-base">
                {copy.mistakes.map((item) => (
                  <li key={item} className="rounded-2xl bg-[#f9faf2] px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            {copy.keepTitle && copy.keepBody && (
              <aside className="rounded-[2rem] bg-[#dcebdd] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
                <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
                  {copy.keepTitle}
                </h2>
                <p className="mt-4 text-base leading-7 text-[#335748]">
                  {copy.keepBody}
                </p>
              </aside>
            )}
          </section>
        )}

        {copy.quickResetSteps.length > 0 && copy.quickResetTitle && (
          <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
              {copy.quickResetTitle}
            </h2>
            <ol className="mt-6 space-y-3 text-sm leading-6 text-[#414844] md:text-base">
              {copy.quickResetSteps.map((step) => (
                <li key={step} className="rounded-[1.5rem] bg-[#f9faf2] px-5 py-4">
                  {step}
                </li>
              ))}
            </ol>
          </section>
        )}

        {copy.faqs.length > 0 && copy.faqTitle && (
          <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
              {copy.faqTitle}
            </h2>
            <div className="mt-6 space-y-4">
              {copy.faqs.map(([question, answer]) => (
                <div key={question} className="rounded-[1.5rem] bg-[#f9faf2] px-5 py-5">
                  <h3 className="text-lg font-bold text-[#002d1c]">{question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#414844] md:text-base md:leading-7">
                    {answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {copy.blockersTitle && copy.blockersBody && (
          <section className="rounded-[2rem] bg-[#fff4df] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#573611] md:text-3xl">
              {copy.blockersTitle}
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-7 text-[#7a5228]">
              {copy.blockersBody}
            </p>
          </section>
        )}

        <AreaChecklistSection
          areaSlug="bathroom-laundry"
          heading={copy.toolTitle}
          description={copy.toolDesc}
          nextPath={`/${locale}/how-to-declutter-your-bathroom`}
        />

        {copy.relatedTitle && copy.relatedLinks && copy.relatedLinks.length > 0 && (
          <section className="rounded-[2rem] bg-[#dcebdd] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
              {copy.relatedTitle}
            </h2>
            {copy.relatedIntro && (
              <p className="mt-3 text-base leading-7 text-[#335748]">{copy.relatedIntro}</p>
            )}
            <ul className="mt-5 grid gap-3 text-sm font-semibold md:grid-cols-2 md:text-base">
              {copy.relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="block rounded-2xl bg-white/80 px-4 py-3 text-[#002d1c] hover:bg-white"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
