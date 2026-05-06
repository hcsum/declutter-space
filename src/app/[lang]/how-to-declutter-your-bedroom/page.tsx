import type { Metadata } from "next";
import Link from "next/link";
import AreaChecklistSection from "../declutter-checklist/components/AreaChecklistSection";
import { defaultLocale, isValidLocale, locales } from "@/i18n/config";

type Props = { params: Promise<{ lang: string }> };

function getCopy(locale: string) {
  if (locale === "zh") {
    return {
      title: "如何整理卧室 | 卧室断舍离分步骤指南 | DeclutterYourHome",
      description:
        "学习如何一步步整理卧室，先清理地面、床头柜、衣柜和床底，再处理那些占空间却不再服务你生活的物品。",
      eyebrow: "Bedroom Guide",
      heroTitle: "How to Declutter Your Bedroom, Step by Step",
      heroSubtitle:
        "如果卧室总让你觉得乱、挤、睡不踏实，别从收纳盒开始。先把真正不该继续留在卧室里的东西移出去，再让这个房间重新服务睡眠、晨间节奏和当下的你。",
      introTitle: "卧室整理最先带来的，不只是整洁",
      introBody:
        "卧室是你一天开始和结束的地方，所以这里的杂乱通常比别的房间更容易放大压力。地上的衣服、堆满的床头柜、床底的旧物、一直没处理的旧衣服，都会让这个房间更像待办事项集合，而不是让人恢复精力的空间。整理卧室时，先从最影响睡眠和视觉负担的地方下手，变化通常会来得最快。",
      stepsTitle: "整理卧室的 7 个步骤",
      steps: [
        ["1. 先清空地面和明显的表面杂物", "把地上的衣物、袋子、纸张、空杯子和不属于卧室的东西先移走。先解决视觉噪音，房间会立刻轻一点。"],
        ["2. 只保留真正支持睡眠的床边物品", "床头柜上只留你晚上和早上真的会用到的东西，比如灯、书、眼镜、耳塞或充电器。其余都移走。"],
        ["3. 快速筛掉衣柜里明显不会再穿的衣服", "先从最容易判断的开始：不合身、起球严重、有污渍、标签几年没剪、因为干洗太麻烦而一直不穿的衣服。"],
        ["4. 检查床底，不要让它变成延迟决策区", "床底最容易堆放“先留着看看”的东西。看不见不代表没有负担。把真正不用的移出，把需要保留的装进明确分类。"],
        ["5. 处理让你起床就分心的视觉负担", "过多的抱枕、积灰装饰、杂乱线缆、长期不用的椅子堆衣区，都会让卧室更像待办列表，而不是休息空间。"],
        ["6. 把“过去版本的你”的物品单独挑出来", "旧校服、旧工作风格的衣服、昂贵但买错的单品、带有情绪包袱的纪念物，先集中放一处，别混在日常物品里。"],
        ["7. 用 checklist 执行，用 decision guide 处理犹豫项", "能立刻决定的直接清掉，拿不准的交给 deadline-based decision guide。这样卧室不会一直被 maybe pile 拖住。"],
      ],
      removeTitle: "卧室里最该优先清掉的东西",
      removeItems: [
        "三个月没碰过的床头柜物品",
        "过去一年都不合身的衣服",
        "积灰又不再背的包",
        "床底长期闲置物",
        "睡不舒服却还在勉强用的枕头或床品",
        "让你愧疚但不会再穿的昂贵购买",
      ],
      emotionTitle: "卧室杂物通常不只是杂物",
      emotionBody:
        "卧室比客厅和厨房更容易积累情绪型物品：旧关系留下的东西、旧身份留下的衣服、旧计划留下的未完成承诺。它们占用的不只是空间，也会占用你睡前和起床后的注意力。卧室整理做得好，通常不是因为你买了更多收纳工具，而是因为你更清楚什么该留下。",
      toolTitle: "现在就开始卧室清单",
      toolDesc:
        "下面这份互动清单和 bedroom 功能页共用同一套数据。你可以直接在这里勾选、添加项目、保存进度。",
      toolPage: "打开 Bedroom Checklist 功能页",
    };
  }

  return {
    title: "How to Declutter Your Bedroom | A Step-by-Step Guide | DeclutterYourHome",
    description:
      "Learn how to declutter your bedroom step by step by clearing floors, nightstands, closets, and under-bed storage so your room feels calmer, lighter, and easier to sleep in.",
    eyebrow: "Bedroom Guide",
    heroTitle: "How to Declutter Your Bedroom, Step by Step",
    heroSubtitle:
      "If your bedroom feels crowded, visually noisy, or hard to relax in, do not start with storage bins. Start by removing what no longer belongs in a room meant for sleep, recovery, and your morning routine.",
    introTitle: "A calmer bedroom changes more than the room",
    introBody:
      "Your bedroom is where your day begins and ends, so clutter here tends to feel heavier than clutter elsewhere. Clothes on the floor, crowded nightstands, under-bed overflow, and old clothes you never wear again all create visual friction before sleep and first thing in the morning. The fastest wins usually come from removing what adds stress, not from adding more storage.",
    stepsTitle: "How to declutter your bedroom in 7 steps",
    steps: [
      ["1. Clear the floor and obvious surface clutter first", "Start with clothes on the floor, bags, paper, cups, and anything that does not belong in the bedroom. Removing visual noise creates quick momentum."],
      ["2. Reset your nightstand to sleep-only essentials", "Keep only what you genuinely use at night or first thing in the morning, such as a lamp, book, glasses, charger, or earplugs. Everything else can move out."],
      ["3. Declutter your closet by removing easy noes", "Start with what is easiest to decide: clothes that do not fit, pieces with stains or heavy pilling, tags still attached after months, and items you avoid because they are uncomfortable or high maintenance."],
      ["4. Check under-bed storage before it becomes a delay zone", "Under the bed often turns into a holding area for things you do not want to decide on. Review it with intention so hidden clutter does not keep draining space and attention."],
      ["5. Remove visual stressors that make the room feel busy", "Extra throw pillows, dusty decor, visible cords, and the chair covered in clothes all make a bedroom feel less restful. The goal is calm, not just containment."],
      ["6. Separate items tied to a past version of you", "Old uniforms, clothes from a different lifestyle, expensive mistakes, and emotionally loaded keepsakes should be reviewed on purpose instead of staying mixed into everyday use."],
      ["7. Use a checklist for action and the decision guide for maybes", "Clear the easy items now, then move the maybe pile into a deadline-based process so your bedroom does not stay stuck in permanent hesitation."],
    ],
    removeTitle: "What to declutter from your bedroom first",
    removeItems: [
      "Nightstand items untouched for three months",
      "Clothes that have not fit in the past year",
      "Dust-collecting bags you no longer carry",
      "Unused storage under the bed",
      "Worn bedding or pillows that hurt sleep quality",
      "Expensive purchases you keep out of guilt",
    ],
    emotionTitle: "Bedroom clutter is often identity clutter",
    emotionBody:
      "Bedrooms collect more than objects. They collect old versions of you: relationship relics, aspirational clothes, unfinished plans, and guilt purchases. That is why bedroom decluttering can feel emotionally heavier than tidying the kitchen. The win is not owning less for its own sake. The win is making the room support who you are now.",
    toolTitle: "Start with the bedroom checklist",
    toolDesc:
      "This interactive checklist shares the same live data as the dedicated bedroom checklist page, so you can check off tasks, add items, and keep progress saved from either page.",
    toolPage: "Open the Bedroom Checklist page",
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
      canonical: `/${locale}/how-to-declutter-your-bedroom`,
      languages: Object.fromEntries(
        locales.map((alternateLocale) => [
          alternateLocale,
          `/${alternateLocale}/how-to-declutter-your-bedroom`,
        ]),
      ),
    },
  };
}

export default async function BedroomPage({ params }: Props) {
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
              href={`/${locale}/declutter-checklist/bedroom`}
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
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c]">
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

        <AreaChecklistSection
          areaSlug="bedroom"
          heading={copy.toolTitle}
          description={copy.toolDesc}
          nextPath={`/${locale}/how-to-declutter-your-bedroom`}
        />
      </div>
    </main>
  );
}
