import type { Metadata } from "next";
import Link from "next/link";
import AreaChecklistSection from "../declutter-checklist/components/AreaChecklistSection";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { buildLanguageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

function getCopy(locale: string) {
  if (locale === "zh") {
    return {
      title: "如何整理客厅 | 客厅断舍离与收纳指南 | DeclutterYourHome",
      description:
        "学习如何整理客厅，先处理表面杂物、毯子、遥控器、玩具和临时堆放物，让客厅重新变回适合休息、交谈和共处的空间。",
      eyebrow: "客厅整理指南",
      heroTitle: "如何整理客厅，又不让它显得空荡",
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
        "下面这份互动清单和客厅清单功能页共用同一套数据。你可以直接在这里勾选、添加项目、保存进度。",
      toolPage: "打开客厅清单功能页",
      mistakesTitle: "客厅整理里最常见的错误" as string | undefined,
      mistakes: [
        "只把杂物塞进篮子里，却不减少真正留在客厅的数量",
        "让茶几和电视柜重新变成临时落脚点",
        "让单一类别长期占领客厅，例如玩具、快递或充电线",
        "指望周末一次大整理，而不是每天 5 分钟复位",
      ] as string[],
      keepTitle: "什么值得长期留在客厅" as string | undefined,
      keepBody:
        "值得长期放在客厅的，是支持这个共享空间真实用途的东西：舒适座位、常用盖毯、经常会被拿起的书或游戏、每天会用到的遥控器和充电器。剩下那些只是暂时停留、却不断扩张的东西，都应该离开客厅表面。" as string | undefined,
      quickResetTitle: "10 分钟客厅复位法" as string | undefined,
      quickResetSteps: [
        "拿一个篮子绕客厅一圈，把不属于客厅的东西先收走",
        "把茶几和边几清到只剩少量有意留下的物品",
        "集中遥控器、充电线和小电子设备，统一放进一个托盘或抽屉",
        "把玩具、杂志或邮件中最外溢的一块区域缩小一半",
      ] as string[],
      faqTitle: "客厅整理常见问题" as string | undefined,
      faqs: [
        ["客厅应该多久整理一次？", "客厅是共享高频空间，最适合每天短复位、每几周做一次更深的筛选。等到周末再一次性收拾，通常只会让杂物继续堆。"],
        ["有孩子或室友时怎么维持客厅整洁？", "给临时物品一个明确缓冲区，例如一个篮子或有盖收纳凳。目标不是永远空无一物，而是让临时杂物有单一落点，不在整个房间蔓延。"],
        ["极简客厅是不是要把东西都藏起来？", "不是。好的客厅不是看起来空，而是看得见的东西都有理由留在这里。你应该保留生活感，但减少无序感。"],
      ] as Array<[string, string]>,
      blockersTitle: "客厅杂物的情绪卡点" as string | undefined,
      blockersBody:
        "客厅杂物的核心情绪不是个人的，而是共享的。\"这是 ta 的东西，我不能扔\"、\"孩子可能还要玩\"、\"我不想为这种小事吵架\"——这些都让客厅成为家里决策疲劳最重的房间。客厅里的\"留着以防万一\"，常常其实是\"以防有人来\"——一堆备用杯垫、不会用的盘子、为派对准备的椅子。如果半年都没用上，它服务的不是真实场景，而是想象中的某个时刻。" as string | undefined,
      relatedTitle: "相关阅读" as string | undefined,
      relatedIntro: "想拓展到房间外的话题：" as string | undefined,
      relatedLinks: [
        { href: "/adhd-cleaning-checklist", label: "ADHD 友好的家务清单" },
        { href: "/how-to-declutter-your-kitchen", label: "如何整理厨房" },
        { href: "/how-to-declutter-your-home-office", label: "如何整理家庭办公室" },
        { href: "/things-to-stop-buying", label: "10 件该停止买的东西" },
      ] as Array<{ href: string; label: string }> | undefined,
    };
  }

  if (locale === "ja") {
    return {
      title: "リビングの片付け方 | 心地よく整えるリビングリセットガイド | DeclutterYourHome",
      description:
        "表に出ている物、ブランケット、リモコン、おもちゃ、あふれた日用品を見直して、リビングを落ち着いて使いやすい空間に戻す方法を紹介します。",
      eyebrow: "リビングガイド",
      heroTitle: "がらんとさせずにリビングを片付ける方法",
      heroSubtitle:
        "リビングは家族みんなの一時置き場になりやすい場所です。目指すのは何もない部屋ではなく、視界のノイズを減らし、共有スペースの見える面を整え、休むこと・話すこと・いつもの暮らしを支える物だけを残すことです。",
      introTitle: "リビングの散らかりは共有空間の散らかりになりやすい",
      introBody:
        "寝室と違って、リビングの散らかりは複数人ぶんが重なって生まれることが多いです。ブランケット、リモコン、おもちゃ、本、バックパック、充電ケーブル、通りがかりに置かれた物。効くリセットは、収納を足すことよりも、見えている物を減らし、この部屋が本当に必要とする物にシンプルな定位置を作ることです。",
      stepsTitle: "リビングを片付ける 7 つのステップ",
      steps: [
        ["1. リビングに属さない物を外に出す", "靴、食器、書類、バックパック、上着、梱包材から始めます。まずは通り道の散らかりを取り除きましょう。"],
        ["2. 見える面を先にリセットする", "ローテーブル、テレビ台、サイドテーブル、ソファの肘掛けは散らかりがたまりやすい場所です。ここを空けると最速で見た目が変わります。"],
        ["3. リモコン、充電器、小さな電子機器に 1 つの定位置を作る", "小さい物でも、置き場所が決まらないと低いレベルの散らかりが続きます。トレー、バスケット、引き出しのどれか 1 つで十分です。"],
        ["4. クッション、ブランケット、飾りを減らす", "居心地のよい部屋にも編集は必要です。実際に使う物、好きな物、空間に合う物だけを残し、あとは外します。"],
        ["5. 本、ゲーム、おもちゃのあふれを抑える", "生活感のある部屋でも落ち着きは作れます。今使っている物だけ近くに残し、残りはテーブルの積み上げではなく意図ある収納へ移します。"],
        ["6. 一時的な物の置き場を 1 つ作る", "バスケット、ふた付きオットマン、トレーがあれば、日々の小さな散らかりが部屋全体に広がりにくくなります。"],
        ["7. 5 分の毎日リセットで維持する", "リビングは人の出入りが多い共有空間です。週末の一気片付けを待つより、毎日の短いリセットのほうが効果的です。"],
      ],
      removeTitle: "リビングで最初に減らしたいもの",
      removeItems: [
        "いつも片付かないローテーブルの散らかり",
        "もう意味を感じない飾り",
        "多すぎるクッションとブランケット",
        "古いケーブル、切れた電池、予備の充電器",
        "この部屋でほとんど使われない子どものおもちゃ",
        "読み返さない雑誌やカタログ",
      ],
      emotionTitle: "よいリビングは作り込まれた感じより、呼吸しやすさが大切",
      emotionBody:
        "多くのリビングが散らかって見えるのは、どれか 1 つが間違っているからではなく、どのカテゴリも少しずつ限界を超えているからです。クッションが少し多い、ケーブルが少し多い、おもちゃが少し多い、本が少し多い。その積み重ねで、部屋はいつも『まだ片付け途中』に見えてしまいます。目指すのは空っぽさではなく、くつろぐ前に毎回片付けなくてよい温かい部屋です。",
      toolTitle: "リビングチェックリストから始める",
      toolDesc:
        "このインタラクティブなチェックリストは、専用のリビングチェックリストページと同じライブデータを使っています。どちらのページからでも項目のチェック、追加、進捗の保存ができます。",
      toolPage: "リビングチェックリストページを開く",
      mistakesTitle: "リビングの片付けでよくある失敗" as string | undefined,
      mistakes: [
        "中身を見直さず、バスケットの中に隠すだけにする",
        "ソファが受け止められる以上のクッションやブランケットを増やす",
        "おもちゃや趣味道具など 1 カテゴリに共有空間を占拠させる",
        "毎日の短いリセットをせず、週末の大掛かりな片付けに期待する",
      ],
      keepTitle: "リビングに常設する価値があるもの" as string | undefined,
      keepBody:
        "この部屋の実際の使い方を支える物を残しましょう。ちゃんと座る椅子やソファ、よく使うブランケットを 1 〜 2 枚、手に取られている本やゲーム、毎晩使うリモコンや充電器。飾って見せるためだけの物、思い出の飾り、『いつか』の山は、意味が残っている少数まで絞るのがコツです。" as string | undefined,
      quickResetTitle: "10 分でリビングを片付ける方法" as string | undefined,
      quickResetSteps: [
        "バスケットを持って一周し、別の部屋に属する物を集める",
        "ローテーブルを数点の必要な物だけに絞る",
        "ブランケットをたたみ、リモコンを集め、ケーブルを 1 つのトレーか引き出しに入れる",
        "おもちゃ、郵便物、雑誌など、あふれている 1 ゾーンを半分にする",
      ],
      faqTitle: "リビングの片付けでよくある質問" as string | undefined,
      faqs: [
        ["リビングはどれくらいの頻度で片付けるべき？", "見える面の短い毎日リセットと、数週間に一度の少し深い見直しが、年に一度の大掛かりな片付けを待つよりずっと現実的です。共有空間なのでたまるのも早いからです。"],
        ["子どもやルームメイトがいてもリビングを保つには？", "バスケット、ふた付きオットマン、トレーなど置き場を 1 つ決めて、その使用を前提にします。目標は常に空にすることではなく、収まる先を作ることです。その 1 か所だけを週 1 回空にすれば十分です。"],
        ["ミニマルなリビングには何が必要？", "座り心地のよい座席、やわらかい照明、日常使いのためのすっきりした面、そして少数に絞った個人的な物です。ミニマルは空っぽではなく、見えている物すべてに理由がある状態です。"],
      ] as Array<[string, string]>,
      blockersTitle: "リビングの散らかりの奥にある感情的なつまずき" as string | undefined,
      blockersBody:
        "リビングの物は、たいてい一人だけの物ではありません。『これはあの人の物だから勝手に捨てられない』『子どもがまだ遊ぶかもしれない』『こんな小さなことで揉めたくない』。だからリビングは家の中でいちばん決断疲れが重くなりやすい場所です。ここでの『念のため』は『誰かが来たときのために』であることも多いです。半年使っていないなら、それは現実の暮らしではなく想像上の場面に仕えている物かもしれません。" as string | undefined,
      relatedTitle: "関連ガイド" as string | undefined,
      relatedIntro: "部屋の外まで整えたいなら：" as string | undefined,
      relatedLinks: [
        { href: "/adhd-cleaning-checklist", label: "ADHD フレンドリーな掃除チェックリスト" },
        { href: "/how-to-declutter-your-kitchen", label: "キッチンの片付け方" },
        { href: "/how-to-declutter-your-home-office", label: "ホームオフィスの片付け方" },
        { href: "/things-to-stop-buying", label: "散らからない家のために買うのをやめたい 10 のもの" },
      ] as Array<{ href: string; label: string }> | undefined,
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
    mistakesTitle: "Common living room decluttering mistakes" as string | undefined,
    mistakes: [
      "Hiding clutter inside baskets without ever editing what is in them",
      "Buying more decorative pillows and throws than the sofa can hold",
      "Letting one category, like toys or hobby gear, take over the whole shared room",
      "Saving the room for a big weekend overhaul instead of a short daily reset",
    ],
    keepTitle: "What earns a permanent spot in a living room" as string | undefined,
    keepBody:
      "Keep what supports the way the room is actually used: comfortable seating you sit in, one or two well-loved throws, the books and games that get picked up regularly, and the remotes and chargers you reach for every evening. Display pieces, sentimental decor, and \"someday\" stacks should be edited down to the few that still mean something, not the dozen that just survived past purges." as string | undefined,
    quickResetTitle: "How to declutter your living room in 10 minutes" as string | undefined,
    quickResetSteps: [
      "Walk the room with a basket and remove anything that belongs in another space",
      "Clear the coffee table down to a few intentional items",
      "Fold the throws, round up the remotes, and put cables into one tray or drawer",
      "Pick one overflow zone — toys, mail, magazines — and shrink it by half",
    ],
    faqTitle: "Living room decluttering FAQ" as string | undefined,
    faqs: [
      ["How often should you declutter a living room?", "A short daily reset of surfaces, plus a deeper edit every few weeks, beats waiting for one annual purge. Living rooms are shared and high-traffic, so they accumulate fast and benefit from frequent light touches."],
      ["How do you keep a living room tidy with kids or roommates?", "Give the room one defined landing zone — a basket, lidded ottoman, or tray — and accept that it will get used. The goal is containment, not constant emptiness. Empty that one zone weekly instead of fighting clutter everywhere."],
      ["What should a minimalist living room have?", "Comfortable seating, soft lighting, one clear surface for daily use, and a small edited mix of personal items. Minimal does not mean empty; it means every visible item has a reason to be there."],
    ] as Array<[string, string]>,
    blockersTitle: "The emotional blockers behind living room clutter" as string | undefined,
    blockersBody:
      "Living room clutter is rarely just one person's. \"That belongs to them, I can't toss it,\" \"the kids might still want to play with it,\" \"I don't want to argue over something this small\" — these are why the living room carries the heaviest decision fatigue in the home. The \"just in case\" here is often \"in case someone comes over\" — extra coasters, plates you do not use, chairs prepared for a party. If half a year goes by without it serving a real moment, it is serving an imagined one." as string | undefined,
    relatedTitle: "Related guides" as string | undefined,
    relatedIntro: "Pair this room reset with broader habit changes:" as string | undefined,
    relatedLinks: [
      { href: "/adhd-cleaning-checklist", label: "ADHD-friendly cleaning checklist" },
      { href: "/how-to-declutter-your-kitchen", label: "How to declutter your kitchen" },
      { href: "/how-to-declutter-your-home-office", label: "How to declutter your home office" },
      { href: "/things-to-stop-buying", label: "10 things to stop buying for a clutter-free home" },
    ] as Array<{ href: string; label: string }> | undefined,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = getCopy(locale);

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLanguageAlternates(locale, "/how-to-declutter-your-living-room"),
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
          areaSlug="living-room"
          heading={copy.toolTitle}
          description={copy.toolDesc}
          nextPath={`/${locale}/how-to-declutter-your-living-room`}
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
