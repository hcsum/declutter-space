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
      title: "如何整理厨房 | 厨房断舍离分步骤指南 | DeclutterYourHome",
      description:
        "学习如何整理厨房，先清掉过期食品、重复工具、闲置小家电和失控的抽屉，让做饭、备餐和收纳都更轻松。",
      eyebrow: "Kitchen Guide",
      heroTitle: "How to Declutter Your Kitchen Without Making Cooking Harder",
      heroSubtitle:
        "厨房整理最怕走向另一个极端：台面变干净了，但真正做饭时却更不顺手。有效的厨房断舍离，不是把东西全藏起来，而是清掉过期、重复和几乎不用的部分，让常用流程更流畅。",
      introTitle: "厨房杂乱通常来自“以后可能会用”",
      introBody:
        "厨房很容易积累不会立刻坏掉、却一直在占地方的东西：多年没碰的调味料、重复的小工具、配不成套的保鲜盒、留着备用却从来没用上的玻璃罐、已经不顺手的小家电。厨房整理最有效的切入点，不是重新设计系统，而是先让真实会被使用的东西更容易拿到。",
      stepsTitle: "整理厨房的 7 个步骤",
      steps: [
        ["1. 先扔掉明显不能再吃或再用的东西", "先处理过期食品、发霉食材、失去风味的香料、坏掉的保鲜盒和破损餐具。厨房最容易有一批可以直接清掉的东西。"],
        ["2. 清一轮冰箱、食品柜和调味区", "把相似东西放到一起看，你会更快发现重复购买、快过期和根本没人会吃的东西。"],
        ["3. 把重复工具和赠品餐具挑出来", "多余的量杯、刮刀、开瓶器、赠品杯子和一次性餐具，通常比你想象中更占抽屉和橱柜空间。"],
        ["4. 重新判断小家电是否真的值得留下", "电饭煲、空气炸锅、搅拌机、榨汁机，不是拥有过就必须继续留着。留下高频使用的，处理长期闲置的。"],
        ["5. 解决保鲜盒和锅具这两类最容易失控的区域", "不成套、盖子对不上、已经变形染色的保鲜盒，以及不顺手、生锈、难清洗的锅具，都会持续制造做饭阻力。"],
        ["6. 把台面只留给高频且必要的东西", "厨房台面不是仓库。只留下每天或每周都真的会用的物品，其他尽量归位，让备餐空间重新出现。"],
        ["7. 按做饭流程重新归位", "常用餐具、调味料、刀具和备餐工具，应该靠近真正使用它们的位置。厨房越贴近动线，越容易保持整洁。"],
      ],
      removeTitle: "厨房最该先清掉的东西",
      removeItems: [
        "过期或不会再吃的食品",
        "失去风味的香料和调味料",
        "不成套的保鲜盒和盖子",
        "重复的小工具和赠品杯子",
        "长期闲置的小家电",
        "缺口、变形或不好用的餐具锅具",
      ],
      emotionTitle: "好的厨房，不是东西少，而是动作更顺",
      emotionBody:
        "厨房整理的目标不是做成样板厨房，而是让你在真正饿、忙、赶时间的时候，也能更容易拿到需要的东西。很多厨房压力，并不是来自做饭本身，而是来自找不到、放不下、台面总被占住。把这些摩擦减掉，厨房自然会更轻松。",
      toolTitle: "现在就开始厨房清单",
      toolDesc:
        "下面这份互动清单和 kitchen 功能页共用同一套数据。你可以直接在这里勾选、添加项目、保存进度。",
      toolPage: "打开 Kitchen Checklist 功能页",
      mistakes: [],
      quickResetSteps: [],
      faqs: [],
      blockersTitle: "厨房整理的情绪卡点（emotional blockers）",
      blockersBody:
        "厨房虽然看起来是功能性最强的房间，但情绪卡点一点不少：礼物锅具的负罪感（\"是 ta 送的，扔了不好\"）、过期但 \"just in case\" 的香料、参加过烹饪潮流买的专用电器、某段关系里两个人的厨具混在一起。这些杂物的存在，不是因为你需要它们，而是因为决定它们的去留要消耗 decision fatigue。先承认这一点，再带着 use it or lose it 的角度走一遍——多数会一直被 \"以后再说\" 的东西，都可以现在就放手。",
      relatedTitle: "相关阅读",
      relatedIntro: "想拓展到房间外的话题：",
      relatedLinks: [
        { href: "/adhd-cleaning-checklist", label: "ADHD 友好的家务清单" },
        { href: "/things-to-stop-buying", label: "10 件该停止买的东西" },
        { href: "/things-to-declutter", label: "60 件可以从家里清掉的东西" },
        { href: "/how-to-declutter-your-bathroom", label: "如何整理浴室" },
      ],
    };
  }

  return {
    title: "How to Declutter Your Kitchen | Step-by-Step Kitchen Guide | DeclutterYourHome",
    description:
      "Learn how to declutter your kitchen step by step by clearing expired food, duplicate tools, cluttered counters, and low-value appliances so cooking gets easier.",
    eyebrow: "Kitchen Guide",
    heroTitle: "How to Declutter Your Kitchen Without Making Cooking Harder",
    heroSubtitle:
      "A good kitchen declutter should make everyday cooking easier, not turn the room into a showroom. The goal is to remove expired food, duplicate tools, and counter overflow so prep, cleanup, and meal routines feel smoother.",
    introTitle: "Kitchen clutter is usually workflow clutter",
    introBody:
      "Kitchen clutter is rarely random. It usually builds around decision delays: spices you might use someday, duplicate gadgets, mugs you did not choose, lids without containers, containers without lids, and appliances that once felt helpful but now sit in the way. The strongest kitchen reset starts by protecting the real workflow of cooking, cleaning, and putting groceries away.",
    stepsTitle: "How to declutter your kitchen in 7 steps",
    steps: [
      ["1. Throw away what is clearly expired, broken, or unusable", "Start with expired food, stale spices, moldy ingredients, damaged storage containers, and chipped tableware. Kitchens usually contain an easy first wave of obvious noes."],
      ["2. Reset the pantry, fridge, and seasoning zones", "Group similar items together so duplicates, near-expired food, and wishful purchases become visible fast."],
      ["3. Remove duplicate gadgets and freebie tableware", "Extra measuring cups, spatulas, can openers, promo mugs, and disposable utensils quietly fill drawers and cabinets without adding much value."],
      ["4. Reassess small appliances honestly", "Rice cookers, air fryers, blenders, and juicers should earn their space through regular use. If they do not, they are storage-heavy clutter."],
      ["5. Fix the two chaos magnets: containers and cookware", "Mismatched food containers, missing lids, warped plastic, rusty pans, and tools that are annoying to clean all make the kitchen harder to use."],
      ["6. Keep the counters for true daily essentials", "Counters are work surfaces, not overflow storage. Leave out only what supports regular cooking or daily routines."],
      ["7. Put things back by cooking workflow", "Utensils, spices, prep tools, and dishes should live close to where you actually use them. A kitchen that matches your movement is easier to maintain."],
    ],
    removeTitle: "What to declutter from your kitchen first",
    removeItems: [
      "Expired or never-to-be-used food",
      "Spices and condiments with no flavor left",
      "Mismatched storage containers and lids",
      "Duplicate gadgets and freebie mugs",
      "Small appliances that sit idle for months",
      "Chipped, warped, rusty, or annoying cookware",
    ],
    emotionTitle: "A better kitchen reduces friction, not personality",
    emotionBody:
      "A good kitchen does not need to look minimal to feel calm. It needs less friction. When the counters are clearer, the drawers close easily, and the ingredients you actually use are visible, cooking becomes less draining. The win is not fewer possessions for its own sake. The win is a kitchen that supports real life more smoothly.",
    mistakesTitle: "Common kitchen decluttering mistakes",
    mistakes: [
      "Clearing the counters without fixing what is overflowing inside cabinets and drawers",
      "Keeping appliances because they were expensive, even though they are rarely used",
      "Organizing expired food instead of removing it first",
      "Treating the kitchen like storage instead of a working room",
    ],
    keepTitle: "What should stay within easy reach in a kitchen",
    keepBody:
      "Keep the things you use in a normal week closest to where they are needed: your everyday dishes near the dishwasher or drying area, prep tools near the main work surface, and your most-used oils, spices, and utensils near the stove. Prime access should go to real habits, not idealized routines.",
    quickResetTitle: "How to declutter your kitchen in 15 minutes",
    quickResetSteps: [
      "Throw away expired food and clear obvious trash from counters",
      "Gather duplicate mugs, utensils, and containers into one place",
      "Choose one problem zone to finish: fridge, pantry shelf, or utensil drawer",
      "Put back only what supports daily cooking this week",
    ],
    faqTitle: "Kitchen decluttering FAQ",
    faqs: [
      ["How often should you declutter a kitchen?", "A light reset every week and a deeper declutter every few months usually works better than waiting for one huge overhaul."],
      ["What is the fastest place to start in a messy kitchen?", "Start with expired food, duplicate containers, and crowded counters. Those three areas usually create the fastest visible change."],
      ["How many small appliances should stay on the counter?", "Only the ones you use often enough that putting them away would slow down a real routine. Everything else should earn cabinet space or leave."],
    ],
    toolTitle: "Start with the kitchen checklist",
    toolDesc:
      "This interactive checklist shares the same live data as the dedicated kitchen checklist page, so you can check off tasks, add items, and keep progress saved from either page.",
    toolPage: "Open the Kitchen Checklist page",
    blockersTitle: "The emotional blockers behind kitchen clutter",
    blockersBody:
      "The kitchen looks like the most functional room in the house, but the emotional residue is real: gift cookware kept out of guilt (\"my mother-in-law gave us that\"), spices saved \"just in case\" they come back into rotation, single-use appliances bought during a cooking-trend phase, and the merged kitchen gear of a past relationship. None of it is staying because you need it — it is staying because deciding takes decision fatigue. Name the blocker first. Then apply use it or lose it: if the past 12 months did not bring it out, the next 12 probably will not either.",
    relatedTitle: "Related guides",
    relatedIntro: "Pair this room reset with broader habit changes:",
    relatedLinks: [
      { href: "/adhd-cleaning-checklist", label: "ADHD-friendly cleaning checklist" },
      { href: "/things-to-stop-buying", label: "10 things to stop buying for a clutter-free home" },
      { href: "/things-to-declutter", label: "60 things to declutter from your home" },
      { href: "/how-to-declutter-your-bathroom", label: "How to declutter your bathroom" },
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
    alternates: buildLanguageAlternates(locale, "/how-to-declutter-your-kitchen"),
  };
}

export default async function KitchenPage({ params }: Props) {
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
              href={`/${locale}/declutter-checklist/kitchen`}
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
          areaSlug="kitchen"
          heading={copy.toolTitle}
          description={copy.toolDesc}
          nextPath={`/${locale}/how-to-declutter-your-kitchen`}
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
