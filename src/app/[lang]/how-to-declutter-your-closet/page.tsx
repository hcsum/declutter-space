import type { Metadata } from "next";
import Link from "next/link";
import AreaChecklistSection from "../declutter-checklist/components/AreaChecklistSection";
import { defaultLocale, isValidLocale, locales } from "@/i18n/config";

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
};

function getCopy(locale: string): GuideCopy {
  if (locale === "zh") {
    return {
      title: "如何整理衣柜 | 衣柜断舍离与收纳指南 | DeclutterYourHome",
      description:
        "学习如何整理衣柜，筛掉不合身、不舒服、重复和不再适合现在生活的衣服，让穿衣更轻松，空间也更清爽。",
      eyebrow: "Closet Guide",
      heroTitle: "How to Declutter Your Closet Without Starting Over",
      heroSubtitle:
        "衣柜整理最难的地方，通常不是东西太多，而是每一件都在代表某种可能性。真正有效的断舍离，不是彻底推翻你的衣橱，而是让它重新服务现在的身体、现在的生活节奏和现在的你。",
      introTitle: "衣柜杂乱，常常是决策疲劳的累积",
      introBody:
        "不合身却舍不得丢的衣服、价格不低但总是不穿的单品、重复却永远先跳过的基础款，都会让每天穿衣变成微小但持续的消耗。整理衣柜最有效的角度，不是追求更少，而是减少“每次打开都要重新判断”的摩擦。",
      stepsTitle: "整理衣柜的 7 个步骤",
      steps: [
        ["1. 先从明显不会再穿的衣服开始", "不合身、破损、有明显污渍、严重起球的衣服先直接拿出来，不要一开始就挑战最难决定的物品。"],
        ["2. 把“总跳过”的衣服单独挑出来", "如果一件衣服每次都被你看见，却从来没有真正穿上，它大概率已经不该继续占位置。"],
        ["3. 按类别整理，而不是一件件零散判断", "把上衣、裤子、外套、鞋子、包和配饰分开看，你会更容易发现重复、空缺和真正常用的东西。"],
        ["4. 处理不适合现在生活方式的衣服", "旧工作风格、旧社交场景、旧审美阶段留下的衣服，往往不是坏了，只是不再属于现在。"],
        ["5. 留意“昂贵但错误”的购买", "价格已经花出去了。继续留着，只会让衣柜持续承担愧疚感和占用空间的成本。"],
        ["6. 只给常穿衣物最顺手的位置", "真正高频使用的衣服、鞋子和包，应该最容易看到、最容易拿取。把顺手位置留给现实中的你。"],
        ["7. 用清单执行，再用小复盘维持结果", "整理衣柜不是一次性项目。先用 checklist 完成第一轮，再定期快速复查，避免反复堆回去。"],
      ],
      removeTitle: "衣柜最该先清掉的东西",
      removeItems: [
        "过去一年都不合身的衣服",
        "严重起球、污渍或破损的单品",
        "穿上不舒服却因为价格留下的衣服",
        "长期没剪吊牌的衣服",
        "你总是跳过的重复基础款",
        "不再会拿起的旧包和配饰",
      ],
      emotionTitle: "好的衣柜，不该让你每天做太多额外决定",
      emotionBody:
        "衣柜整理的目标不是让每一件都完美，而是让你打开门时更容易找到适合今天的东西。真正让人轻松的衣柜，通常不是最大、最多，而是最贴近当前生活的那一个。",
      toolTitle: "现在就开始衣柜清单",
      toolDesc:
        "下面这份互动清单和 closets 功能页共用同一套数据。你可以直接在这里勾选、添加项目、保存进度。",
      toolPage: "打开 Closets Checklist 功能页",
      mistakes: [],
      quickResetSteps: [],
      faqs: [],
    };
  }

  return {
    title: "How to Declutter Your Closet | Step-by-Step Closet Guide | DeclutterYourHome",
    description:
      "Learn how to declutter your closet step by step by removing clothes you do not wear, pieces that no longer fit, and duplicates that make getting dressed harder.",
    eyebrow: "Closet Guide",
    heroTitle: "How to Declutter Your Closet Without Starting Over",
    heroSubtitle:
      "Closet clutter is not just about having too many clothes. It is often about too many decisions, too many duplicates, and too many items tied to a version of you that no longer matches your real life. A better closet reset makes getting dressed easier, not stricter.",
    introTitle: "Closet clutter usually shows up as decision fatigue",
    introBody:
      "A crowded closet drains energy in small ways: pieces that do not fit, items you never actually choose, expensive mistakes you feel guilty about, and categories full of near-duplicates. The goal is not to own less just for the sake of it. The goal is to reduce the friction between opening the closet and getting dressed for the life you live now.",
    stepsTitle: "How to declutter your closet in 7 steps",
    steps: [
      ["1. Start with the clear noes", "Pull out anything that does not fit, is damaged, stained, or heavily worn. Start with easy decisions before you tackle emotional ones."],
      ["2. Separate the items you always skip", "If you see a piece every week but never actually wear it, that is useful data. Repeated avoidance usually means it no longer earns space."],
      ["3. Declutter by category, not random pieces", "Review tops, pants, jackets, shoes, bags, and accessories separately so duplicates and patterns become easier to spot."],
      ["4. Remove clothes that no longer match your current life", "Some clothes are not wrong, they are simply tied to an old job, old routine, or old version of your style."],
      ["5. Deal with guilt purchases honestly", "The money is already gone. Keeping an expensive mistake does not recover the cost. It just keeps charging rent in your closet."],
      ["6. Give prime space to what you actually wear", "Your easiest-to-reach space should belong to the clothes, shoes, and bags that support your real weekly life."],
      ["7. Keep it going with a checklist and quick reviews", "Closet clutter returns slowly. A checklist helps you finish the first reset, and short follow-up reviews keep the system from sliding back."],
    ],
    removeTitle: "What to declutter from your closet first",
    removeItems: [
      "Clothes that have not fit in the past year",
      "Pieces with stains, tears, or heavy pilling",
      "Expensive items you keep but avoid wearing",
      "Tags-still-on clothes months later",
      "Duplicate basics you never reach for",
      "Bags and accessories you no longer use",
    ],
    emotionTitle: "A good closet should lower decision fatigue",
    emotionBody:
      "The best closets are not impressive because they hold more. They are useful because they hold less uncertainty. When the closet reflects your current body, routine, and style, getting dressed becomes faster and calmer instead of another small daily debate.",
    mistakesTitle: "Common closet decluttering mistakes",
    mistakes: [
      "Trying on every item before removing the obvious noes",
      "Keeping duplicate basics because they feel practical even when you never choose them",
      "Organizing around fantasy clothes instead of real weekly outfits",
      "Giving prime closet space to guilt purchases instead of daily favorites",
    ],
    keepTitle: "What deserves the easiest-to-reach closet space",
    keepBody:
      "Your most accessible space should belong to the clothes, shoes, and bags you wear in a normal week. Occasionwear, sentimental items, and seasonal overflow can stay, but they should not crowd the part of the closet that supports everyday dressing.",
    quickResetTitle: "How to declutter your closet in 15 minutes",
    quickResetSteps: [
      "Pull out anything damaged, stained, or clearly uncomfortable",
      "Choose one category to edit fast: tops, pants, shoes, or bags",
      "Set aside the items you always skip when getting dressed",
      "Return only the pieces that fit your current life and current body",
    ],
    faqTitle: "Closet decluttering FAQ",
    faqs: [
      ["What is the fastest way to declutter a closet?", "Start with damaged pieces, poor fits, and obvious non-wearers. Quick wins create momentum before you handle emotional clothing decisions."],
      ["Should you declutter by item or by category?", "Category works better. Reviewing all your jackets, jeans, or shoes together makes duplicates and avoidance patterns much easier to see."],
      ["What if everything still fits but the closet still feels crowded?", "Fit is only one filter. If you do not choose it, enjoy it, or need it in your real life, it can still be clutter even if it technically fits."],
    ],
    toolTitle: "Start with the closets checklist",
    toolDesc:
      "This interactive checklist shares the same live data as the dedicated closets checklist page, so you can check off tasks, add items, and keep progress saved from either page.",
    toolPage: "Open the Closets Checklist page",
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = getCopy(locale);

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `/${locale}/how-to-declutter-your-closet`,
      languages: Object.fromEntries(
        locales.map((alternateLocale) => [
          alternateLocale,
          `/${alternateLocale}/how-to-declutter-your-closet`,
        ]),
      ),
    },
  };
}

export default async function ClosetPage({ params }: Props) {
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
              href={`/${locale}/declutter-checklist/closets`}
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

        <AreaChecklistSection
          areaSlug="closets"
          heading={copy.toolTitle}
          description={copy.toolDesc}
          nextPath={`/${locale}/how-to-declutter-your-closet`}
        />
      </div>
    </main>
  );
}
