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
      mistakes: [],
      quickResetSteps: [],
      faqs: [],
      blockersTitle: "工作区杂物的情绪卡点（emotional blockers）",
      blockersBody:
        "家庭办公室的杂物，常常带着 \"我应该处理这个\" 的内疚信号——一堆没回的邮件打印件、看了一半的书、买了但没拆的工具书、上一份工作留下的笔记本。每一件都在视野边缘提醒你 \"还有事没做完\"，造成 decision fatigue 之前先消耗注意力。Use it or lose it 在这里就是：超过 90 天没碰过的 \"我会回来处理它\" 的纸张，几乎可以确定不会被处理——扫描或直接放手。",
      relatedTitle: "相关阅读",
      relatedIntro: "想拓展到房间外的话题：",
      relatedLinks: [
        { href: "/adhd-cleaning-checklist", label: "ADHD 友好的家务清单" },
        { href: "/how-to-declutter-sentimental-items", label: "如何整理情感物品" },
        { href: "/things-to-stop-buying", label: "10 件该停止买的东西" },
        { href: "/things-to-declutter", label: "60 件可以从家里清掉的东西" },
      ],
    };
  }

  if (locale === "ja") {
    return {
      title: "ホームオフィスの片付け方 | ステップで進めるワークスペース整理ガイド | DeclutterYourHome",
      description:
        "紙類、ケーブル、古い電子機器、視界のノイズを整理して、集中しやすいホームオフィスに戻す方法をステップごとに紹介します。",
      eyebrow: "ホームオフィスガイド",
      heroTitle: "大事な物を失わずにホームオフィスを片付ける方法",
      heroSubtitle:
        "ホームオフィスの clutter は偶然ではなく、たいてい『まだ使うかもしれない』物でできています。見直すべき紙、あとで合わせるケーブル、いつか直す機器、忘れたくないメモ。よい declutter は、仕事を支える物を残し、注意を奪う物を外すことです。",
      introTitle: "ホームオフィスの clutter は productivity のふりをしやすい",
      introBody:
        "紙の山、古いノート、予備の充電器、動かない電子機器、freebie stationery、未処理の事務作業は、仕事っぽく見えるため何か月も残りやすいものです。その結果、仕事を始める前から部屋が忙しく感じられます。必要なのは極端な minimalism ではなく、視覚と認知の friction を減らして、集中できる部屋に戻すことです。",
      stepsTitle: "ホームオフィスを片付ける 7 つのステップ",
      steps: [
        ["1. 紙類を action・reference・recycle に分ける", "紙を 1 枚ずつ感情的に判断し直す必要はありません。3 つの速いカテゴリだけで、机と引き出しの圧迫をすぐに下げられます。"],
        ["2. 今の仕事を支えない物をデスクから外す", "普段使う道具と備品だけを残します。思い出の品、箱、使っていないノート、無関係の物は主な作業面から外しましょう。"],
        ["3. cables・chargers・tech accessories を整える", "ホームオフィスが散らかる大きな理由の 1 つが、正体不明の cable と重複した charger です。今使っている物を残し、どの device にも役立たない物を見極めます。"],
        ["4. 古い電子機器や壊れた機器に対処する", "古いマウス、壊れたヘッドホン、古いキーボード、中途半端に動く accessories は、『いつか直す』の名目で残りがちです。"],
        ["5. 引き出しの clutter を種類ごとに分ける", "クリップ、電池、付せん、USB drive、名刺、説明書は小さくても、混ざると探すたびに流れを止めます。"],
        ["6. 集中を切る visual distractions を減らす", "山積みのメモ、reminder の貼りすぎ、ほこりをかぶった機器、無関係の物は、仕事の前から頭の中を騒がせます。"],
        ["7. workflow に合わせて戻す", "よく使う紙、device、ペン、充電器をいちばん手に取りやすい場所へ。流れを止める回数が少ないほど、部屋も維持しやすくなります。"],
      ],
      removeTitle: "ホームオフィスで最初に減らしたいもの",
      removeItems: [
        "もう不要な紙や printout",
        "重複した、または正体不明の cable と charger",
        "壊れた、または古くなった電子機器",
        "使わない freebie stationery",
        "実際の仕事に関係ない desktop clutter",
        "引き出しに混ざった小さな accessories",
      ],
      emotionTitle: "よい workspace は始めるまでの friction を減らす",
      emotionBody:
        "役立つホームオフィスは空っぽである必要はありません。大切なのは、仕事を始めやすいことです。集中を奪うのは大きな散らかり 1 つではなく、未完了のサインが何十個も同時に見えている状態です。それらが減ると、思っている以上に早く集中が戻ることがあります。",
      mistakesTitle: "ホームオフィスの片付けでよくある失敗",
      mistakes: [
        "重要そうに見えるからと、すべての紙を見える場所に置き続ける",
        "使っている device に結び付けないまま cables や accessories を増やす",
        "desktop を無関係の事務作業の置き場にする",
        "今進行中の project の置き場所を決めないまま部屋だけ片付ける",
      ],
      keepTitle: "ホームオフィスで見える場所に置くべきもの",
      keepBody:
        "今の仕事を支える道具だけを見える場所に残しましょう。メインの device、ノート 1 冊、進行中の紙を少し、よく使う備品だけで十分です。今週触らない project の物は、机の上ではなく stored reference space に置くほうが合理的です。",
      quickResetTitle: "15 分でホームオフィスを片付ける方法",
      quickResetSteps: [
        "今やっている仕事に関係ない物をデスクから外す",
        "見えている紙を action・reference・recycle に分ける",
        "ゆるい cables を全部集め、重複や mystery cable を除く",
        "引き出しを 1 つ選び、備品を種類ごとにまとめる",
      ],
      faqTitle: "ホームオフィスの片付け FAQ",
      faqs: [
        ["ホームオフィスの机に残すべきものは？", "今の仕事を支える物だけです。メインの device、日々のメモ、少数の active supplies があれば十分で、それ以外は収納するか外しましょう。"],
        ["大事な紙を失わずに片付けるには？", "まず action、reference、recycle の 3 分類にします。最終判断を急がなくても、混乱だけはすぐ減らせます。"],
        ["なぜホームオフィスはすぐ散らかるの？", "仕事に関係ありそうな物の多くが『役立つかもしれない』顔をしているからです。active project や今の workflow に結び付いていない物は、静かに visual noise になります。"],
      ],
      toolTitle: "Home Office Checklist から始める",
      toolDesc:
        "このインタラクティブなチェックリストは、専用の Home Office Checklist ページと同じライブデータを使っています。どちらのページからでも項目のチェック、追加、進捗の保存ができます。",
      toolPage: "Home Office Checklist ページを開く",
      blockersTitle: "ホームオフィスの散らかりの奥にある感情的なつまずき",
      blockersBody:
        "オフィスの物には『これに向き合うべきだ』という無言のサインが宿ります。未読の郵便、読みかけの本、前職のノート、スキャンするつもりだった印刷物。どれも視界の端で『まだ終わっていない仕事がある』と伝え、始める前から注意力を削ります。ここでの『使うか、手放すか』はかなり厳しい基準です。『あとで戻る』という名目で 90 日触っていない物には、たいていもう戻りません。スキャンして手放すか、そのまま手放すかを決めましょう。",
      relatedTitle: "関連ガイド",
      relatedIntro: "部屋の外まで整えたいなら：",
      relatedLinks: [
        { href: "/adhd-cleaning-checklist", label: "ADHD フレンドリーな掃除チェックリスト" },
        { href: "/how-to-declutter-sentimental-items", label: "思い出の品を片付ける方法" },
        { href: "/things-to-stop-buying", label: "clutter-free な家のために買うのをやめたい 10 のもの" },
        { href: "/things-to-declutter", label: "家から手放せる 60 のもの" },
      ],
    };
  }

  return {
    title: "How to Declutter Your Home Office | Step-by-Step Office Reset | DeclutterYourHome",
    description:
      "Learn how to declutter your home office step by step by sorting papers, cables, old electronics, and visual clutter so the room supports focused work.",
    eyebrow: "Home Office Guide",
    heroTitle: "How to Declutter Your Home Office Without Losing Important Stuff",
    heroSubtitle:
      "Home office clutter is rarely random. It is usually made of things that feel potentially useful: papers to review, cables to match later, devices to fix eventually, and notes you do not want to forget. A better home office declutter keeps what supports work and removes what keeps stealing attention.",
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
    mistakesTitle: "Common home office decluttering mistakes",
    mistakes: [
      "Keeping every paper in sight because it feels important",
      "Letting cables and accessories accumulate without matching them to active devices",
      "Using the desktop as a holding area for unrelated admin tasks",
      "Decluttering the room without defining where current projects should live",
    ],
    keepTitle: "What should stay visible in a home office",
    keepBody:
      "Keep only the tools that support current work in plain sight: your main device, one notebook, a short list of active papers, and the supplies you use most often. If an item supports a project you are not touching this week, it probably belongs in stored reference space rather than on the desk.",
    quickResetTitle: "How to declutter a home office in 15 minutes",
    quickResetSteps: [
      "Clear the desktop of anything unrelated to the work you are doing now",
      "Sort visible papers into action, reference, and recycle",
      "Gather all loose cables and remove the duplicates or mystery ones",
      "Choose one drawer and group supplies by type instead of leaving them mixed together",
    ],
    faqTitle: "Home office decluttering FAQ",
    faqs: [
      ["What should stay on a home office desk?", "Only the tools that support your current work: your main device, daily notes, and a few active supplies. Everything else should either be stored or removed."],
      ["How do you declutter papers without losing something important?", "Use three categories first: action, reference, and recycle. That reduces chaos immediately without forcing every paper into a final decision."],
      ["Why does a home office get cluttered so fast?", "Because many work-related items feel potentially useful. If they are not tied to an active project or current workflow, they quietly become visual and mental noise."],
    ],
    toolTitle: "Start with the home office checklist",
    toolDesc:
      "This interactive checklist shares the same live data as the dedicated home office checklist page, so you can check off tasks, add items, and keep progress saved from either page.",
    toolPage: "Open the Home Office Checklist page",
    blockersTitle: "The emotional blockers behind office clutter",
    blockersBody:
      "Office clutter carries the unspoken signal \"I should be dealing with this\" — the stack of unread mail, the half-read book, the notebook from a previous job, the printouts you meant to scan. Each item sits at the edge of your vision reminding you \"there is unfinished work here,\" draining attention before you even start. Use it or lose it lands hard in this room: anything you have not touched in 90 days under the heading \"I'll come back to this\" almost certainly never gets returned to. Scan and toss, or just toss.",
    relatedTitle: "Related guides",
    relatedIntro: "Pair this room reset with broader habit changes:",
    relatedLinks: [
      { href: "/adhd-cleaning-checklist", label: "ADHD-friendly cleaning checklist" },
      { href: "/how-to-declutter-sentimental-items", label: "How to declutter sentimental items" },
      { href: "/things-to-stop-buying", label: "10 things to stop buying for a clutter-free home" },
      { href: "/things-to-declutter", label: "60 things to declutter from your home" },
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
    alternates: buildLanguageAlternates(locale, "/how-to-declutter-your-home-office"),
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
          areaSlug="home-office"
          heading={copy.toolTitle}
          description={copy.toolDesc}
          nextPath={`/${locale}/how-to-declutter-your-home-office`}
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
