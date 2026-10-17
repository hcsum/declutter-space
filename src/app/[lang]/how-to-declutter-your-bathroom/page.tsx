import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RoomDecisionGuide from "@/components/RoomDecisionGuide";
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
      eyebrow: "浴室整理指南",
      heroTitle: "如何整理浴室，又不缺日常用品",
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
        "打开浴室与洗衣区互动清单后，你可以勾选任务、添加项目并保存进度。先完成一个抽屉或一层柜格即可。",
      toolPage: "打开浴室清单功能页",
      mistakesTitle: "浴室整理里最常见的错误",
      mistakes: [
        "把备份库存和正在用的产品混在同一层",
        "因为体积小，就默认台面上可以放很多东西",
        "长期保留旅行装、小样和不适合自己的产品",
        "把过期护肤品和药品当成普通杂物，而不是时效性物品",
      ],
      keepTitle: "浴室里最值得看得见的东西",
      keepBody:
        "看得见的位置应该只留你早晚真的会用到的产品。备份、客用和低频用品可以保留，但应该分区放，不要让浴室看起来像你的全部库存清单。",
      quickResetTitle: "15 分钟浴室复位法",
      quickResetSteps: [
        "扔掉过期产品、空瓶和明显不会再用的东西",
        "把每天在用的产品集中到一个区域，其余从台面撤掉",
        "选一个抽屉或柜格，拿掉重复品和旅行装",
        "给备用库存设一个固定边界，例如一个篮子或一层柜格",
      ],
      faqTitle: "浴室整理常见问题",
      faqs: [
        ["浴室台面应该完全清空吗？", "不需要。它应该放每天真的会用到的物品，目标是清晰和顺手，不是酒店式摆拍。"],
        ["备份洗漱用品留多少合适？", "留在一个明确的备货区里、能看见上限就够了。超过那个边界，便利就开始变成杂物。"],
        ["浴室最该先扔什么？", "从过期产品、闲置小样和不适合自己的洗护开始。这些最不影响日常，但最容易立刻腾出空间。"],
      ],
      blockersTitle: "浴室杂物的情绪卡点",
      blockersBody:
        "没用完的洗发水、旅行装和昂贵但不适合自己的护肤品，可能让人因为怕浪费而迟迟不决定。先检查是否适合继续使用，再决定去留；不必为了用完而勉强使用刺激皮肤的产品。有效期、开封后使用期限和储存要求应以产品标示及厂商说明为准，不能统一按开封一年判断。处理别人的用品前先征求意见。",
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

  if (locale === "ja") {
    return {
      title: "浴室の片付け方 | ステップで進める浴室リセットガイド | DeclutterYourHome",
      description:
        "期限切れの製品、あふれたサンプル、散らかったカウンター、持ちすぎたストックを見直して、浴室をすっきり使いやすく整える方法を紹介します。",
      eyebrow: "浴室ガイド",
      heroTitle: "必需品を減らしすぎずに浴室を片付ける方法",
      heroSubtitle:
        "浴室の散らかりは、小さくて似た物が多く、残す理由もつけやすいので一気に増えます。大切なのは毎日使う物を見やすくし、あふれたストックを抑えて、朝の時点で窮屈に感じない浴室に戻すことです。",
      introTitle: "浴室の散らかりは、ストックのため込みと小物の積み重なりになりやすい",
      introBody:
        "サンプル、重複した洗面用品、期限が近い製品、古いタオル、空ボトル、必要以上のストックは、一つひとつは小さくても浴室ではすぐに圧迫感になります。いちばん効くリセットは、いらない物の量を先に減らすことです。もう不要な物のために収納グッズを増やしても、根本は軽くなりません。",
      stepsTitle: "浴室を片付ける 7 つのステップ",
      steps: [
        ["1. 期限切れ・劣化・明らかに使わない物を捨てる", "期限切れの薬、日焼け止め、スキンケア、メイク、サンプル、においや質感や色が変わった物から始めましょう。"],
        ["2. 同じカテゴリの物をまとめる", "ヘアケア、スキンケア、オーラルケア、掃除用品、救急用品をそれぞれ集めると、重複や買いすぎが一気に見えます。"],
        ["3. 使っている物だけをいちばん取りやすい場所に置く", "カウンターやシャワー棚には今使っている物だけを置きます。ストックはあってもよいですが、日用品と競わせないことが大切です。"],
        ["4. サンプルとトラベルサイズを減らす", "小さい物は害がなさそうに見えても、長期的な散らかりになりがちです。近いうちに使う物か旅行に持っていく物だけ残します。"],
        ["5. 使い古したタオル、シャワーカーテン、バスマットを見直す", "こうした布物は清潔感に大きく影響します。黄ばみ、におい、ほつれ、使い心地の悪さがあるなら、役目を終えている可能性が高いです。"],
        ["6. 引き出しや棚のこまごました物を整える", "ヘアゴム、綿棒、カミソリ、予備電池、説明書、おまけ類は混ざるとすぐ探しにくくなります。"],
        ["7. ストックには明確な上限を設ける", "予備の歯磨き粉、トイレットペーパー、シャンプー、掃除用品は便利ですが、見える境界がないと収納が静かに広がり続けます。"],
      ],
      removeTitle: "浴室で最初に減らしたいもの",
      removeItems: [
        "期限切れの薬やボディケア製品",
        "肌や髪に合わないまま残っている洗面用品",
        "使っていないサンプルやトラベルサイズ",
        "空ボトル、空箱、包装材",
        "黄ばんだ・におう・傷んだタオルや布物",
        "あふれた予備の洗面用品や洗剤類",
      ],
      emotionTitle: "浴室が整うと、毎日のセルフケアが軽くなる",
      emotionBody:
        "浴室は狭くても、一日の感触を静かに左右する場所です。カウンターが混み合い、引き出しを開けるたびに探し物が必要だと、本来シンプルな支度に摩擦が生まれます。その摩擦を減らすだけで、朝晩の流れはかなりスムーズになります。",
      mistakesTitle: "浴室の片付けでよくある失敗",
      mistakes: [
        "ストックと今使う物を同じ場所に混ぜる",
        "行くか分からない旅行のためにサンプルやトラベルサイズを残し続ける",
        "小さいからという理由でカウンターに物を出しすぎる",
        "期限切れのスキンケアや薬を、害のない物のように扱う",
      ],
      keepTitle: "浴室で見える場所に置くべきもの",
      keepBody:
        "朝と夜の習慣で実際に使っている製品だけを、手の届きやすい場所に残しましょう。ストック、来客用、たまにしか使わない物は分けておくと、浴室が『持ち物全体』ではなく『今日の支度』を映すようになります。",
      quickResetTitle: "15 分で浴室を片付ける方法",
      quickResetSteps: [
        "期限切れの物、空ボトル、明らかなゴミを捨てる",
        "毎日使う物を一か所にまとめ、それ以外をカウンターから外す",
        "引き出しや棚を 1 つ選び、重複品とサンプルを減らす",
        "ストックは 1 か所の明確なゾーンにまとめる",
      ],
      faqTitle: "浴室の片付けのよくある質問",
      faqs: [
        ["予備の洗面用品はどれくらい持てばいい？", "決めた 1 つのストックゾーンに収まる量だけで十分です。そこからあふれたら、便利さではなく散らかりになっています。"],
        ["浴室のカウンターは完全に空にすべき？", "いいえ。毎日実際に使う物は置いて問題ありません。目指すのはホテルの見た目ではなく、使いやすい明快さです。"],
        ["浴室では何から片付けるのが早い？", "期限切れの製品、使っていないサンプル、重複している物からです。毎日の習慣を崩さずに一番早く空間を作れます。"],
      ],
      toolTitle: "浴室チェックリストから始める",
      toolDesc:
        "浴室・洗濯スペースのチェックリストページで、項目のチェック、追加、進捗の保存ができます。まず引き出し一つ、または棚一段から始めましょう。",
      toolPage: "浴室チェックリストのページを開く",
      blockersTitle: "浴室の散らかりの奥にある感情的なつまずき",
      blockersBody:
        "使いかけのシャンプー、旅行用の小瓶、高かったのに肌に合わなかった美容液は、もったいなさから残しやすい物です。まず今も使えるかを確認し、合わない製品を無理に使い切る必要はありません。使用期限、開封後の使用期間、保管方法は製品表示とメーカーの案内を確認してください。開封から一律に一年とは判断できません。他の人の持ち物は本人に確認してから整理しましょう。",
      relatedTitle: "関連ガイド",
      relatedIntro: "部屋の外まで整えたいなら：",
      relatedLinks: [
        { href: "/adhd-cleaning-checklist", label: "ADHD フレンドリーな掃除チェックリスト" },
        { href: "/things-to-stop-buying", label: "clutter-free な家のために買うのをやめたい 10 のもの" },
        { href: "/things-to-declutter", label: "家から手放せる 60 のもの" },
        { href: "/how-to-declutter-your-kitchen", label: "キッチンの片付け方" },
      ],
    };
  }

  return {
    title: "How to Declutter Your Bathroom | Step-by-Step Bathroom Reset | DeclutterYourHome",
    description:
      "Declutter your bathroom one shelf at a time. Sort toiletries, makeup, medicines, towels, and backups with practical keep-or-release checks and a room checklist.",
    eyebrow: "Bathroom Guide",
    heroTitle: "How to Declutter Your Bathroom Without Running Out of Essentials",
    heroSubtitle:
      "Bathroom clutter builds fast because the items are small, repetitive, and easy to justify keeping. A better bathroom declutter keeps daily-use products visible, limits overflow, and stops the room from feeling crowded before the day even starts.",
    introTitle: "Bathroom clutter is usually backup clutter plus small-item buildup",
    introBody:
      "Bathrooms fill up with things that look harmless on their own: samples, duplicate toiletries, nearly expired products, old towels, empty bottles, and too much backup stock. Because the room is small, these categories pile up fast. The best bathroom reset comes from reducing volume first, not from buying more organizers for products you already do not need.",
    stepsTitle: "How to declutter your bathroom in 7 steps",
    steps: [
      ["1. Separate expired, deteriorated, and unwanted products", "Check expiry dates, opening-period symbols, and storage instructions. Set medicines aside for an appropriate disposal route, such as a local take-back scheme. Follow local guidance for other products and packaging."],
      ["2. Group like items together", "Put haircare, skincare, oral care, cleaning products, and first-aid items together so duplicates and overstock become obvious."],
      ["3. Keep only current-use items in the easiest spots", "Counters and shower shelves should hold what you are actively using now. Backups can stay, but they should not compete with daily-use products."],
      ["4. Cut back on samples and travel-size products", "Tiny items feel harmless, but they often become long-term clutter. Keep what you will actually use soon or take on a trip and clear the rest."],
      ["5. Review towels, curtains, and bath mats", "Launder and reassess textiles before replacing them for appearance alone. Keep usable items for household needs and check local textile-donation or disposal rules for what you no longer want."],
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
      "Separate expired products for appropriate disposal and remove empty packaging",
      "Pull all daily-use items together and move everything else off the counter",
      "Choose one drawer or shelf and remove duplicates and samples",
      "Put backups in one clearly limited zone instead of spreading them across the room",
    ],
    faqTitle: "Bathroom decluttering FAQ",
    faqs: [
      ["How many backup toiletries should you keep?", "Keep only what fits in one defined backup area. Once extras spill beyond that limit, they become clutter instead of convenience."],
      ["Should bathroom counters be completely empty?", "No. They should hold the products you actually use every day. The goal is functional clarity, not a hotel-style photo set."],
      ["What should you declutter first in a bathroom?", "Start with expired products, unused samples, and duplicate items. They are the fastest way to create space without affecting your routine."],
      ["How do you decide which skincare and makeup to discard?", "Check expiry dates, any period-after-opening symbol, storage instructions, and the manufacturer’s advice. Do not apply a universal twelve-month rule or keep using a product that irritates you just to finish it."],
      ["Can you donate unused toiletries?", "Some services accept suitable unopened, in-date products, but their rules vary. Confirm acceptance first; do not assume opened cosmetics, medicines, or every travel sample can be donated."],
    ],
    toolTitle: "Start with the bathroom checklist",
    toolDesc:
      "Open the bathroom and laundry checklist to check off tasks, add your own items, and save progress. Use it for the shelf you just sorted, then return when you are ready for another small area.",
    toolPage: "Open the Bathroom Checklist page",
    blockersTitle: "The emotional blockers behind bathroom clutter",
    blockersBody:
      "Half-finished bottles, travel samples, and an expensive serum that did not suit you can bring up feelings of waste. Check whether each product is still suitable and whether you actually want to use it. Follow its expiry, opening-period, and storage instructions rather than a universal twelve-month rule. You do not have to use up an irritating product to justify the purchase, and you should ask before removing another person’s toiletries.",
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
  if (!isValidLocale(lang) || lang === "es") return {};
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
  if (!isValidLocale(lang) || lang === "es") notFound();
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
            {locale === "en" && (
              <Link href="#item-decisions" className="rounded-full bg-[#dcebdd] px-5 py-3 text-[#002d1c]">
                Sort toiletries, makeup, and backups
              </Link>
            )}
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

        {locale === "en" && <RoomDecisionGuide room="bathroom" />}

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

        <section className="rounded-[2rem] bg-[#dcebdd] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
            {copy.toolTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#335748]">
            {copy.toolDesc}
          </p>
          <Link
            href={`/${locale}/declutter-checklist/bathroom-laundry`}
            className="mt-6 inline-flex items-center rounded-full bg-[#002d1c] px-6 py-3 text-sm font-bold text-white"
          >
            {copy.toolPage}
          </Link>
        </section>

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
