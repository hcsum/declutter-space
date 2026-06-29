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
      blockersTitle: "衣柜整理的情绪卡点（emotional blockers）",
      blockersBody:
        "衣柜里藏着最多的身份认同。\"等我减肥就能穿\" 的牛仔裤、\"这件很贵不能扔\" 的设计师外套、\"那段关系送的\" 的连衣裙、上一份工作的衬衫、过去某个版本的你的风格——每一件都不是关于衣服，是关于你自己。这就是为什么 sentimental clutter 在衣柜尤其重。Use it or lose it 加 \"我现在的身材\" 的判断同时用：你过去 12 个月没穿过的，不会因为再放一年就突然合适。",
      relatedTitle: "相关阅读",
      relatedIntro: "想拓展到房间外的话题：",
      relatedLinks: [
        { href: "/how-to-declutter-sentimental-items", label: "如何整理情感物品" },
        { href: "/things-to-stop-buying", label: "10 件该停止买的东西" },
        { href: "/things-to-declutter", label: "60 件可以从家里清掉的东西" },
        { href: "/how-to-declutter-your-bedroom", label: "如何整理卧室" },
      ],
    };
  }

  if (locale === "ja") {
    return {
      title: "クローゼットの片付け方 | ステップで進めるクローゼット整理ガイド | DeclutterYourHome",
      description:
        "着ていない服、サイズが合わない服、重複した服を減らして、毎日の着替えをもっと楽にするクローゼット整理の進め方を紹介します。",
      eyebrow: "クローゼットガイド",
      heroTitle: "全部やり直さずにクローゼットを片付ける方法",
      heroSubtitle:
        "クローゼットの clutter は、服が多いことだけが原因ではありません。判断の多さ、似た服の重複、今の暮らしに合わない過去の自分の名残が、毎朝の支度を重くします。よいリセットは、厳しくすることではなく、着替えやすくすることです。",
      introTitle: "クローゼットの clutter は decision fatigue として現れやすい",
      introBody:
        "詰まったクローゼットは小さな形でエネルギーを奪います。サイズが合わない服、毎回見送る服、もったいなくて残した高い買い物、ほとんど同じアイテムが何枚もあるカテゴリ。目標はただ数を減らすことではなく、扉を開けてから今の暮らしに合う服を選ぶまでの摩擦を減らすことです。",
      stepsTitle: "クローゼットを片付ける 7 つのステップ",
      steps: [
        ["1. まず明らかな no から始める", "サイズが合わない、傷んでいる、シミがある、強く消耗している服を先に抜きます。感情の重い判断の前に、簡単な判断で勢いをつけましょう。"],
        ["2. いつも選ばない服を分ける", "毎週目にしているのに実際には着ない服は、かなり役立つデータです。繰り返し避けているなら、その服はもうスペースを稼げていない可能性があります。"],
        ["3. ランダムではなくカテゴリごとに見る", "tops、pants、jackets、shoes、bags、accessories を別々に見ると、重複やパターンがずっと見えやすくなります。"],
        ["4. 今の生活に合わない服を減らす", "悪い服ではなくても、昔の仕事、昔の routine、昔の style に結びついた服は、今の自分には不要かもしれません。"],
        ["5. guilt purchase と正直に向き合う", "お金はすでに払っています。高かった失敗を残しても元は取れず、クローゼットの家賃だけ払い続けることになります。"],
        ["6. 実際によく着る物に一等地を渡す", "取り出しやすい場所は、現実の 1 週間を支える服、靴、バッグのために使いましょう。"],
        ["7. checklist と短い見直しで維持する", "クローゼットの clutter は少しずつ戻ります。最初のリセットを終わらせるには checklist、戻りすぎを防ぐには短い定期レビューが役立ちます。"],
      ],
      removeTitle: "クローゼットで最初に減らしたいもの",
      removeItems: [
        "この 1 年サイズが合っていない服",
        "シミ、破れ、強い毛玉がある服",
        "高かったのに避けて着ていない服",
        "何か月もタグが付いたままの服",
        "結局手に取らない重複した basics",
        "もう使っていないバッグや accessories",
      ],
      emotionTitle: "よいクローゼットは decision fatigue を下げる",
      emotionBody:
        "役立つクローゼットは、たくさん入るから優秀なのではありません。不確実さが少ないから優秀なのです。今の体、今の routine、今の style を反映しているクローゼットなら、着替えは小さな議論ではなく、もっと静かな作業になります。",
      mistakesTitle: "クローゼットの片付けでよくある失敗",
      mistakes: [
        "明らかな no を抜く前に、すべて試着しようとする",
        "実際には選ばないのに practical に感じるという理由で basics を重複保管する",
        "現実の 1 週間ではなく fantasy clothes を中心に整える",
        "毎日の favorites ではなく guilt purchase に一等地を渡す",
      ],
      keepTitle: "いちばん取りやすいクローゼット space に置くべきもの",
      keepBody:
        "最もアクセスしやすい場所には、普段の 1 週間で着る服、履く靴、使うバッグを置きましょう。occasionwear、sentimental items、季節外の overflow は残してもかまいませんが、毎日の支度を支える部分を圧迫しないようにします。",
      quickResetTitle: "15 分でクローゼットを片付ける方法",
      quickResetSteps: [
        "傷み、シミ、明らかな着心地の悪さがある服を抜く",
        "tops、pants、shoes、bags のどれか 1 カテゴリを素早く見る",
        "着替えのたびに飛ばしている服を分ける",
        "今の生活と今の体に合う服だけを戻す",
      ],
      faqTitle: "クローゼットの片付け FAQ",
      faqs: [
        ["クローゼットを最速で片付けるには？", "傷んだ服、サイズが合わない服、明らかに着ていない服から始めます。感情の重い服に入る前に、簡単な勝ちを作るのが早道です。"],
        ["1 点ずつ見るべき？ それともカテゴリごと？", "カテゴリごとのほうが効果的です。ジャケット、デニム、靴をまとめて見ると、重複や避けている傾向がずっと分かりやすくなります。"],
        ["全部まだ着られるのに、なぜか窮屈に感じるのは？", "fit は 1 つの基準にすぎません。実際に選ばない、好きではない、今の暮らしで使わないなら、着られても clutter であることはあります。"],
      ],
      toolTitle: "Closets Checklist から始める",
      toolDesc:
        "このインタラクティブなチェックリストは、専用の Closets Checklist ページと同じライブデータを使っています。どちらのページからでも項目のチェック、追加、進捗の保存ができます。",
      toolPage: "Closets Checklist ページを開く",
      blockersTitle: "クローゼットの散らかりの奥にある感情的なつまずき",
      blockersBody:
        "クローゼットほど『自分らしさ』を抱えやすい場所はあまりありません。『痩せたら履く』デニム、『高かったから捨てられない』服、過去の関係でもらったワンピース、前の仕事のシャツ、昔の自分のワードローブ。問題は服そのものではなく自己イメージです。だから思い入れのある物が特に重くなります。ここでは『使うか、手放すか』に加えて、『今の自分の体』というフィルターが必要です。過去 12 か月着なかった服は、もう 1 年待っても突然しっくり来るとは限りません。",
      relatedTitle: "関連ガイド",
      relatedIntro: "部屋の外まで整えたいなら：",
      relatedLinks: [
        { href: "/how-to-declutter-sentimental-items", label: "思い出の品を片付ける方法" },
        { href: "/things-to-stop-buying", label: "clutter-free な家のために買うのをやめたい 10 のもの" },
        { href: "/things-to-declutter", label: "家から手放せる 60 のもの" },
        { href: "/how-to-declutter-your-bedroom", label: "寝室の片付け方" },
      ],
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
    blockersTitle: "The emotional blockers behind closet clutter",
    blockersBody:
      "Closets hold more identity than any other room. \"When I lose weight\" jeans, \"this was so expensive\" designer pieces, dresses from a past relationship, shirts from a previous job, the wardrobe of a past version of you — none of it is about clothes. It is about self-image. This is why sentimental clutter is heaviest in closets. Apply use it or lose it alongside one honest filter: \"the body I have now.\" Clothes you have not worn in the past twelve months will not start fitting differently just because you wait another year.",
    relatedTitle: "Related guides",
    relatedIntro: "Pair this room reset with broader habit changes:",
    relatedLinks: [
      { href: "/how-to-declutter-sentimental-items", label: "How to declutter sentimental items" },
      { href: "/things-to-stop-buying", label: "10 things to stop buying for a clutter-free home" },
      { href: "/things-to-declutter", label: "60 things to declutter from your home" },
      { href: "/how-to-declutter-your-bedroom", label: "How to declutter your bedroom" },
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
    alternates: buildLanguageAlternates(locale, "/how-to-declutter-your-closet"),
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
          areaSlug="closets"
          heading={copy.toolTitle}
          description={copy.toolDesc}
          nextPath={`/${locale}/how-to-declutter-your-closet`}
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
