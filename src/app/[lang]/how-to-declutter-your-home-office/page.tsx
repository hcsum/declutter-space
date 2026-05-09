import type { Metadata } from "next";
import Link from "next/link";
import AreaChecklistSection from "../declutter-checklist/components/AreaChecklistSection";
import { defaultLocale, isValidLocale, locales } from "@/i18n/config";

type Props = { params: Promise<{ lang: string }> };

function getCopy(locale: string) {
  if (locale === "zh") {
    return {
      title: "如何整理家庭办公室 | 家庭办公区断舍离指南 | DeclutterYourHome",
      description:
        "学习如何整理家庭办公室，先处理纸张、线缆、旧电子设备、抽屉杂物和视觉干扰，让工作区更清爽、更容易专注。",
      eyebrow: "Home Office Guide",
      heroTitle: "How to Declutter Your Home Office Without Losing Important Stuff",
      heroSubtitle:
        "家庭办公室最难整理的地方，不是东西多，而是很多东西看起来都“可能还会用到”。有效的整理，不是把一切都收起来，而是区分什么真的支持工作，什么只是持续分散注意力。",
      introTitle: "家庭办公区的杂乱，最容易伪装成“工作需要”",
      introBody:
        "纸张、旧笔记本、闲置数据线、坏掉但还没处理的电子设备、赠品文具、临时堆放的文件，都会让办公区越来越像一个延迟决策区。家庭办公室整理最有效的方法，不是追求极简，而是先减少你每次坐下来工作时的视觉和认知负担。",
      stepsTitle: "整理家庭办公室的 7 个步骤",
      steps: [
        ["1. 先把纸张分成 action、reference、recycle", "不要一张张反复犹豫。先快速分成要处理、要保留参考、可以回收三类，立刻减少桌面和抽屉压力。"],
        ["2. 清空桌面上不支持当前工作的东西", "桌面只留每天真的会用的设备和文具。纪念品、包装盒、闲置本子和随机小物先移开。"],
        ["3. 整理线缆、充电器和旧电子配件", "很多家庭办公区的混乱来自“也许以后还配得上”的线材。把正在用的留下，重复和来历不明的尽量处理。"],
        ["4. 处理旧设备和坏设备", "旧鼠标、坏耳机、已经不用的键盘和过时配件，常常以“以后修”或“以后备用”的名义长期占位。"],
        ["5. 把抽屉里的随机文具和小杂物分类", "回形针、电池、便签、U 盘、名片、说明书，如果长期混在一起，只会让你每次找东西都变慢。"],
        ["6. 清掉会不断打断注意力的视觉干扰", "堆起来的待看资料、过多便签、无关物品和积灰设备，都会让工作区在你开始工作前就先消耗注意力。"],
        ["7. 按工作流程重建归位逻辑", "高频使用的纸张、设备、笔和充电器，应该放在最顺手的位置。工作越少切换，空间越容易维持。"],
      ],
      removeTitle: "家庭办公室最该先清掉的东西",
      removeItems: [
        "已经不需要的纸张和打印件",
        "重复或来历不明的线缆充电器",
        "坏掉或过时的电子设备",
        "不会再用的赠品文具",
        "桌面上无关工作的装饰性杂物",
        "抽屉里长期混乱的小配件",
      ],
      emotionTitle: "好的工作区，会让你更快进入状态",
      emotionBody:
        "家庭办公室不需要完美，但它应该降低启动工作的阻力。真正让人分心的，往往不是某一件大东西，而是很多小东西一起不断提醒你：这里还有一堆没处理的事。把这些噪音降下来，专注通常会自然回来。",
      toolTitle: "现在就开始家庭办公室清单",
      toolDesc:
        "下面这份互动清单和 home office 功能页共用同一套数据。你可以直接在这里勾选、添加项目、保存进度。",
      toolPage: "打开 Home Office Checklist 功能页",
    };
  }

  return {
    title: "How to Declutter Your Home Office | A Focus-Friendly Reset | DeclutterYourHome",
    description:
      "Learn how to declutter your home office by sorting papers, cables, old electronics, drawer clutter, and visual distractions so the space supports deeper focus.",
    eyebrow: "Home Office Guide",
    heroTitle: "How to Declutter Your Home Office Without Losing Important Stuff",
    heroSubtitle:
      "Home office clutter is rarely random. It is usually made of things that feel potentially useful: papers to review, cables to match later, devices to fix eventually, and notes you do not want to forget. A better reset helps you keep what supports work and remove what keeps stealing attention.",
    introTitle: "Home office clutter often disguises itself as productivity",
    introBody:
      "Paper stacks, old notebooks, spare chargers, dead electronics, freebie stationery, and unresolved admin tasks can all sit in a home office for months because they look work-related. The result is a space that feels busy before you even start. The most effective reset is not extreme minimalism. It is reducing visual and mental friction so the room supports focused work again.",
    stepsTitle: "How to declutter your home office in 7 steps",
    steps: [
      ["1. Sort papers into action, reference, and recycle", "Do not make every paper a fresh emotional decision. Use three fast categories to reduce desk and drawer pressure immediately."],
      ["2. Clear the desktop of anything that does not support current work", "Keep only the tools and supplies you use regularly. Move memorabilia, packaging, random notebooks, and unrelated items off the primary work surface."],
      ["3. Reset cables, chargers, and tech accessories", "Many home offices stay messy because of mystery cables and duplicate chargers. Keep what is active and identify what no longer serves any device you own."],
      ["4. Deal with old or broken electronics", "Old mice, damaged headphones, obsolete keyboards, and half-working accessories tend to stay around under the story of someday fixing them."],
      ["5. Organize drawer clutter by type", "Paper clips, batteries, sticky notes, USB drives, business cards, and manuals are small, but when they mix together they slow down every search."],
      ["6. Remove visual distractions that break focus", "Overloaded note piles, too many reminders, dusty gear, and unrelated objects make a workspace feel mentally noisy before work even begins."],
      ["7. Put things back by workflow", "Your most-used papers, devices, pens, and chargers should live in the easiest-to-reach spots. The less you interrupt your flow, the easier the office is to maintain."],
    ],
    removeTitle: "What to declutter from your home office first",
    removeItems: [
      "Papers and printouts you no longer need",
      "Duplicate or mystery cables and chargers",
      "Broken or outdated electronics",
      "Freebie stationery you never use",
      "Desktop clutter unrelated to real work",
      "Mixed small accessories buried in drawers",
    ],
    emotionTitle: "A better workspace reduces startup friction",
    emotionBody:
      "A useful home office does not need to be empty. It needs to make it easier to begin. What drains focus is often not one big mess, but dozens of small unfinished signals competing for attention. When those signals are reduced, concentration usually comes back faster than expected.",
    toolTitle: "Start with the home office checklist",
    toolDesc:
      "This interactive checklist shares the same live data as the dedicated home office checklist page, so you can check off tasks, add items, and keep progress saved from either page.",
    toolPage: "Open the Home Office Checklist page",
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
      canonical: `/${locale}/how-to-declutter-your-home-office`,
      languages: Object.fromEntries(
        locales.map((alternateLocale) => [
          alternateLocale,
          `/${alternateLocale}/how-to-declutter-your-home-office`,
        ]),
      ),
    },
  };
}

export default async function HomeOfficePage({ params }: Props) {
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
              href={`/${locale}/declutter-checklist/home-office`}
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

        <AreaChecklistSection
          areaSlug="home-office"
          heading={copy.toolTitle}
          description={copy.toolDesc}
          nextPath={`/${locale}/how-to-declutter-your-home-office`}
        />
      </div>
    </main>
  );
}
