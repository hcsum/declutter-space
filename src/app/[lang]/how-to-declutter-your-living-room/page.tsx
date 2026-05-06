import type { Metadata } from "next";
import Link from "next/link";
import AreaChecklistSection from "../declutter-checklist/components/AreaChecklistSection";
import { defaultLocale, isValidLocale, locales } from "@/i18n/config";

type Props = { params: Promise<{ lang: string }> };

function getCopy(locale: string) {
  if (locale === "zh") {
    return {
      title: "如何整理客厅 | 客厅断舍离与收纳指南 | DeclutterYourHome",
      description:
        "学习如何整理客厅，先处理表面杂物、毯子、遥控器、玩具和临时堆放物，让客厅重新变回适合休息、交谈和共处的空间。",
      eyebrow: "Living Room Guide",
      heroTitle: "How to Declutter Your Living Room Without Making It Feel Empty",
      heroSubtitle:
        "客厅最容易变成全家的临时寄存区。真正有效的整理，不是把一切都藏起来，而是把这个共享空间从视觉噪音和临时堆放中解救出来，让它重新适合放松、交谈和一起待着。",
      introTitle: "客厅杂乱通常来自“大家都在用”",
      introBody:
        "和卧室不同，客厅的问题通常不是一个人的犹豫，而是很多人的临时放下：毯子、遥控器、玩具、背包、杂志、快递盒、充电线、随手放着的杯子。客厅整理最有效的方法，不是追求空，而是减少视觉负担，同时保留真正支持日常共处的东西。",
      stepsTitle: "整理客厅的 7 个步骤",
      steps: [
        ["1. 先把不属于客厅的东西移出去", "鞋子、杯盘、作业、背包、外套、快递包装，先全部移回原本所属的空间。先清掉“路过型杂物”。"],
        ["2. 清空最容易积杂物的表面", "先从茶几、电视柜、边几和沙发扶手开始。客厅一乱，通常先乱在这些平面。"],
        ["3. 给遥控器、充电线和小电子设备一个固定归位点", "这些东西数量不多，却最容易制造持续的小混乱。用一个小篮子、抽屉或托盘统一收口。"],
        ["4. 重新筛一遍抱枕、毯子和装饰物", "客厅不是展示所有喜欢东西的地方。留下常用、好看、和空间协调的，其他移走。"],
        ["5. 处理书籍、杂志、游戏和玩具的外溢", "客厅可以有生活感，但不要让每一种活动都永久占据一个角落。保留正在使用的，其余明确收纳。"],
        ["6. 为临时放下的东西设一个缓冲区", "比如一个篮子、一个有盖收纳凳，或一个指定托盘。这样客厅不会因为零散物品慢慢重新失控。"],
        ["7. 用每日 5 分钟复位维持成果", "客厅是高频共享空间，不适合等到周末一次性大扫除。每天一个短复位，比偶尔一次猛整理更有效。"],
      ],
      removeTitle: "客厅最该先清掉的东西",
      removeItems: [
        "长期堆在茶几上的杂物",
        "失去意义的小摆件或装饰品",
        "过量的抱枕和盖毯",
        "过时线缆、旧电池和闲置充电头",
        "孩子已经不怎么碰的客厅玩具",
        "已经读完或不会再翻的杂志和目录",
      ],
      emotionTitle: "客厅需要的不是空，而是可呼吸",
      emotionBody:
        "很多客厅看起来乱，不是因为东西特别多，而是因为每一类东西都稍微溢出一点点。结果就是这个空间永远像“还没收完”。好的客厅整理不是做成样板间，而是让人一进来就知道：这里可以坐下、聊天、休息，而不是先想该把东西挪到哪里。",
      toolTitle: "现在就开始客厅清单",
      toolDesc:
        "下面这份互动清单和 living room 功能页共用同一套数据。你可以直接在这里勾选、添加项目、保存进度。",
      toolPage: "打开 Living Room Checklist 功能页",
    };
  }

  return {
    title: "How to Declutter Your Living Room | A Calm, Comfortable Reset | DeclutterYourHome",
    description:
      "Learn how to declutter your living room by clearing surface clutter, blankets, remotes, toys, and overflow so the space feels calmer, more usable, and still comfortable.",
    eyebrow: "Living Room Guide",
    heroTitle: "How to Declutter Your Living Room Without Making It Feel Empty",
    heroSubtitle:
      "Living rooms often become the default drop zone for everyone in the house. The goal is not to strip the room bare. It is to remove visual noise, reset the shared surfaces, and keep what truly supports rest, conversation, and everyday living.",
    introTitle: "Living room clutter is usually shared-space clutter",
    introBody:
      "Unlike bedroom clutter, living room clutter is often collective. Blankets, remotes, toys, books, backpacks, charging cables, and random drop-zone items all build up in the same place. The most effective reset is not just adding storage. It is reducing what stays visible and creating simple homes for what the room genuinely needs.",
    stepsTitle: "How to declutter your living room in 7 steps",
    steps: [
      ["1. Remove anything that does not belong in the living room", "Start with shoes, dishes, paperwork, backpacks, jackets, and packaging. Clear the pass-through clutter before dealing with what actually belongs in the room."],
      ["2. Reset the surfaces first", "Coffee tables, media consoles, side tables, and sofa arms collect clutter fast. Clearing them gives you the quickest visual win."],
      ["3. Give remotes, chargers, and small electronics one home", "These items are tiny but they create constant low-level mess. A tray, basket, or drawer instantly makes the room feel more controlled."],
      ["4. Cut back on pillows, throws, and decorative extras", "A comfortable room still needs editing. Keep the pieces that are used, loved, and proportionate to the space, and remove the rest."],
      ["5. Contain the overflow from books, games, and toys", "A lived-in room can still feel calm. Keep what is actively used nearby and move the rest into intentional storage instead of permanent surface piles."],
      ["6. Create one landing zone for temporary items", "A basket, lidded ottoman, or tray gives daily clutter a controlled place to land so it does not spread across the room."],
      ["7. Maintain it with a 5-minute daily reset", "Living rooms are high-traffic shared spaces. A short daily tidy is usually more effective than waiting for one big weekend clean-up."],
    ],
    removeTitle: "What to declutter from your living room first",
    removeItems: [
      "Coffee table clutter that never gets cleared",
      "Decor pieces that no longer add meaning",
      "Too many throw pillows and blankets",
      "Old cables, dead batteries, and spare chargers",
      "Kids' toys that no longer get used in this room",
      "Magazines and catalogs you will not reread",
    ],
    emotionTitle: "A good living room should feel breathable, not staged",
    emotionBody:
      "Many living rooms feel cluttered not because every item is wrong, but because every category has spilled slightly past its limit. A few extra pillows, a few extra cables, a few extra toys, a few extra books, and suddenly the room always feels half-finished. The win is not emptiness. The win is a room that still feels warm and lived-in without constantly asking you to tidy it before you can relax.",
    toolTitle: "Start with the living room checklist",
    toolDesc:
      "This interactive checklist shares the same live data as the dedicated living room checklist page, so you can check off tasks, add items, and keep progress saved from either page.",
    toolPage: "Open the Living Room Checklist page",
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
      canonical: `/${locale}/how-to-declutter-your-living-room`,
      languages: Object.fromEntries(
        locales.map((alternateLocale) => [
          alternateLocale,
          `/${alternateLocale}/how-to-declutter-your-living-room`,
        ]),
      ),
    },
  };
}

export default async function LivingRoomPage({ params }: Props) {
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
              href={`/${locale}/declutter-checklist/living-room`}
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
          areaSlug="living-room"
          heading={copy.toolTitle}
          description={copy.toolDesc}
          nextPath={`/${locale}/how-to-declutter-your-living-room`}
        />
      </div>
    </main>
  );
}
