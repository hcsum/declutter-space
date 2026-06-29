import type { Metadata } from "next";
import Link from "next/link";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { buildLanguageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

type Step = {
  title: string;
  body: string;
  start: string;
};

type Copy = {
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introBody: string;
  stepsTitle: string;
  stepsIntro: string;
  steps: Step[];
  principlesTitle: string;
  principlesBody: string;
  principle1Heading: string;
  principle1Body: string;
  principle2Heading: string;
  principle2Body: string;
  faqTitle: string;
  faqs: Array<[string, string]>;
  relatedTitle: string;
  relatedIntro: string;
  relatedLinks: Array<{ href: string; label: string }>;
  startLabel: string;
};

function getCopy(locale: string): Copy {
  if (locale === "ja") {
    return {
      title: "引っ越し前の片付けチェックリスト | DeclutterYourHome",
      description:
        "後で捨てる物のために引っ越し代を払わないための、引っ越し前の片付けチェックリスト。6〜8週間前から始める downsizing の順番、部屋別の進め方、後悔を減らす判断基準をまとめました。",
      eyebrow: "Moving & Downsizing",
      heroTitle: "引っ越し前の片付け（Downsizing Checklist）",
      heroSubtitle:
        "箱に詰める物はすべて、運ぶ費用がかかり、到着後にまた開けて置き場所を決める必要があります。引っ越し前に片付けておけば、次の家に本当に必要な物だけを持って行けます。箱は減り、運ぶ量も減り、引っ越し後の暮らしも整いやすくなります。",
      introTitle: "荷造りの前に片付ける。荷ほどきしながら片付けない",
      introBody:
        "r/declutter で繰り返し出てくる引っ越しの後悔は、『捨てすぎた』ことよりも『まったく仕分けせず、そのまま次の家へ運んだ』ことです。何年たっても開けていない『とりあえず』の箱、使わないまま移動したガレージの薬品や期限切れ食品、引っ越し後しばらくしてから寄付することになった家具。『こんな物を運んだなんて本当にばかだった。意味のない重荷だった』という声もあります。いちばん安く運べる箱は、そもそも詰めない箱です。引っ越し前に片付けると、次の家に持ち込むのは本当に居場所のある物だけになります。新居でも、箱の壁を少しずつ掘り進めるのではなく、最初から意図のある暮らしに近づけます。目的は生活を空っぽにすることではなく、旅に出る物すべてに『行く価値があるか』を確認することです。",
      stepsTitle: "部屋別の downsizing の順番",
      stepsIntro:
        "感情が薄く、量が多い場所から始めて、個人的な物へ進みます。どの段階でも、箱詰めの前に keep / donate-sell / toss に仕分けます。",
      steps: [
        {
          title: "1. まず収納スペースから（ガレージ・屋根裏・地下など）",
          body: "ここには『なぜまだ持っているの？』という量が最も多く、感情的な負荷は最も少ない物が集まりがちです。古い塗料や溶剤、壊れた道具、前回の引っ越しから開けていない箱など。『いつか直す』物を運ばないこと、そして危険なガレージ用薬品（シンナー、古い燃料など）は絶対に引っ越しで運ばず、適切に処分することが大切です。最小の痛みで最大のスペースが空きます。",
          start: "前回の引っ越しから封を切っていない箱を全部開ける。なくても困らなかったなら手放す。",
        },
        {
          title: "2. キッチン、そしてパントリーを食べ切る",
          body: "ここは重複が増えやすい場所です。マグカップの予備、1回しか使わなかった道具、そろっていない保存容器、期限切れの食品。何度も出てくる実用的なコツは、数週間前からパントリーや冷凍庫の物を食べ進めることです。満杯の食品庫を運ぶのではなく、小さな箱1つ分に近づけます。よく使う主力だけ残し、予備は手放します。",
          start: "今日からパントリーと冷凍庫の食材で料理する。道具は1種類につき1つ残し、重複は寄付し、期限切れ食品は捨てる。",
        },
        {
          title: "3. クローゼットと衣類",
          body: "引っ越しは服を見直す絶好の強制力になります。これから向かう生活に合わない物なら、わざわざ運ぶ必要はありません。まだ使えるうちに寄付しましょう。",
          start: "この1年で着た物だけを箱に入れる。残りは箱詰め前に寄付する。",
        },
        {
          title: "4. 家具。新居の寸法を測る",
          body: "大きな物ほど運搬コストがかかります。新しい間取りに本当に入るのか、そして本当にそこで使いたいのかを確認してください。大きすぎる物や使い込まれた物は、到着後に歩道へ出すのではなく、今のうちに売るか寄付するほうが合理的です。",
          start: "新居の主要な部屋を測り、入らない家具やもう好きではない家具をリスト化して売り始める。",
        },
        {
          title: "5. 書類と『念のため』の物",
          body: "古い取扱説明書、期限切れの保証書、いつかシュレッダーにかけようと思っていた紙類。残す必要がある物はデジタル化し、それ以外はリサイクルして、書類キャビネットの重さをそのまま運ばないようにします。",
          start: "古い書類はシュレッダーかリサイクルへ。本当に必要な物だけスキャンして残す。",
        },
        {
          title: "6. 思い出の品は最後に、軽く触れる程度で",
          body: "ここは最後です。引っ越しは『あとで決めるために全部残す』か『ストレスで全部手放す』かに振れやすい場面です。どちらもしないでください。思い出をよく代表する少数だけ残し、残りは写真に残します。二度と開けない箱のために引っ越し代を払わないことです。",
          start: "1人1箱のメモリーボックスだけ残し、残りは箱詰め前に写真を撮る。",
        },
      ],
      principlesTitle: "引っ越し後の後悔を減らす2つの考え方",
      principlesBody: "後悔には両側があります。残しすぎることも、焦って捨てすぎることもあります。この2つの考え方が、判断を現実的に保ってくれます。",
      principle1Heading: "私はこれを運ぶためにお金を払い、着いてからまた開けたいか？",
      principle1Body:
        "時間がないときに最速で効くフィルターです。箱代、トラックのスペース、そして新居で置き場所を見つける手間をかける価値がない物なら、持ち続ける価値も薄い可能性が高いです。『いつか使うかも』より、実際のコストのほうが判断を具体的にしてくれます。",
      principle2Heading: "早く始める。思っているよりずっと大きい作業だから",
      principle2Body:
        "引っ越しスレッドで何度も支持されている真実があります。『引っ越し作業は、誰にとっても想像よりはるかに大きい。全員そうだ。』準備しているつもりでも、最後の1週間は混乱しがちです。6〜8週間前から始め、1日1カテゴリずつ減らしてください。ゆっくりした判断のほうが良い判断です。トラック前夜の深夜にやるパニック片付けこそ、本当に残したかった物を捨てる場面になりやすいです。",
      faqTitle: "よくある質問",
      faqs: [
        ["引っ越し前の片付けはいつ始めるべきですか？", "理想は6〜8週間前です。1日1カテゴリ、または1部屋ずつ進めます。早く始めれば、前夜の焦った大量処分ではなく、落ち着いた日々の判断に変えられます。引っ越し後の後悔の多くは、この『土壇場の判断』から生まれます。"],
        ["先に運んで、新居であとから仕分けしてもいいですか？", "おすすめしません。先に片付けるほうが合理的です。引っ越し費用は量と重さに比例するので、散らかりをそのまま運ぶのは『問題を維持するためにお金を払う』ことになります。新居で『あとで仕分けする』は、たいてい何か月も箱のまま残ります。"],
        ["みんなが運んで後悔しがちな物は何ですか？", "何度も挙がるのは、本や古い教科書、細かい飾り物、ガレージ用品、重複した保存容器、期限切れ食品、そして『いつか直す』壊れた物です。ほとんどの人は手放して後悔せず、むしろ運搬費を払って何年も箱のままにしたことを後悔しています。"],
        ["捨てたあと後悔しそうで怖いです。どう判断すればいいですか？", "『私はこれを運んで、開けて、置き場所を作るためにお金と手間をかけたいか？』で考えてください。そして焦って大量処分しないこと。本当に危ないのは、『適当な物の箱』に実は書類や写真が入っていて、そのまま捨てることです。捨てる前にすべての箱を一度開けて中身をざっと見て、出生証明書など重要書類は別にし、期限付きの小さな maybe box を作ってください。難しい物は decision guide も役立ちます。"],
        ["思い出の品や遺品はどうすればいいですか？", "最後に回し、よく代表する少数だけ残して、残りは写真にします。二度と開けない箱のために引っ越し代を払わないことです。やさしく進めたいなら、思い出の品の片付け方や decluttering after a death のガイドも参考になります。"],
      ],
      relatedTitle: "関連記事",
      relatedIntro: "引っ越しの downsizing に必要なのは、日常の片付けでも使う判断力です。次に読むならこちら:",
      relatedLinks: [
        { href: "/decluttering-decision-guide", label: "判断に迷う物の decision guide" },
        { href: "/things-to-declutter", label: "家から手放せるもの60選" },
        { href: "/how-to-declutter-your-closet", label: "クローゼットを片付ける方法" },
        { href: "/how-to-declutter-sentimental-items", label: "思い出の品を片付ける方法" },
        { href: "/swedish-death-cleaning", label: "Swedish death cleaning のやさしいチェックリスト" },
        { href: "/declutter-checklist", label: "インタラクティブ片付けチェックリスト" },
      ],
      startLabel: "ここから始める",
    };
  }

  return {
    title: "Decluttering Before a Move: A Downsizing Checklist | DeclutterYourHome",
    description:
      "Don't pay to move what you'll only toss later. This decluttering-before-a-move checklist gives you a room-by-room downsizing order, a timeline that starts 6–8 weeks out, and how to let go without the moving-day regret.",
    eyebrow: "Moving & Downsizing",
    heroTitle: "Decluttering Before a Move (Downsizing Checklist)",
    heroSubtitle:
      "Every box you pack is something you pay to move and then unpack. Decluttering before a move means you only carry what belongs in the next home — less to box, less to haul, less to find a place for.",
    introTitle: "Declutter before you pack, not while you unpack",
    introBody:
      "The single most common moving regret on r/declutter isn't tossing too much — it's not sorting at all and paying to haul the mess to the next place. People describe boxes of \"random stuff\" they still haven't opened five years later, garage chemicals and expired food that made the trip for no reason, furniture donated months after arrival. As one put it, moving that stuff \"feels so dumb… a burden we carried for no reason.\" The cheapest box to move is the one you never pack. Decluttering before a move means you only carry what belongs in the next home — and you unpack into a home that feels intentional from day one instead of a wall of boxes you slowly excavate. The aim isn't to strip your life bare; it's to make sure everything that makes the trip earns its place.",
    stepsTitle: "Room-by-room downsizing order",
    stepsIntro:
      "Work from the lowest-emotion, highest-volume spaces toward the personal ones. Each pass is sort into keep / donate-sell / toss before anything gets boxed.",
    steps: [
      {
        title: "1. Storage zones first (garage, attic, basement)",
        body: "These hold the most 'why do we still have this' volume and the least emotion — old paint and solvents, broken gear, boxes you never unpacked from the last move. Don't move broken things 'to fix someday,' and never move hazardous garage chemicals (paint thinner, old fuel) — dispose of them properly instead. Clearing storage first frees the most space for the least pain.",
        start: "Open every still-sealed box from the last move; if you didn't miss it, it goes.",
      },
      {
        title: "2. Kitchen — and eat down the pantry",
        body: "Duplicates multiply here: extra mugs, gadgets used once, mismatched containers, expired pantry items. A tip that comes up again and again: start eating down your food weeks ahead so you're moving a small box, not a full pantry and freezer. Keep the workhorses and let the spares go.",
        start: "Start cooking from the pantry/freezer now; keep one of each tool, donate duplicates, toss expired food.",
      },
      {
        title: "3. Closets and clothing",
        body: "Moving is the perfect forcing function for clothes. If it doesn't fit the life you're moving toward, don't pay to transport it. Donate while it can still help someone.",
        start: "Pack only what you've worn in the last year; donate the rest before boxing.",
      },
      {
        title: "4. Furniture — measure the new place",
        body: "Big items cost the most to move. Check what actually fits the new floor plan and what you genuinely want there. Sell or donate oversized or worn pieces now rather than hauling them to the curb later.",
        start: "Measure key new rooms; list furniture that won't fit or you don't love, and sell it.",
      },
      {
        title: "5. Paperwork and 'just in case' items",
        body: "Old manuals, expired warranties, paper you've been meaning to shred. Digitize what you must keep and recycle the rest so you're not moving filing-cabinet weight.",
        start: "Shred or recycle outdated paperwork; scan anything you truly need to keep.",
      },
      {
        title: "6. Sentimental items — last, and lightly",
        body: "Save these for the end. A move tempts you to either keep everything 'to decide later' or dump it all in stress. Do neither: keep a curated few, photograph the rest. Don't pay to move boxes you'll never reopen.",
        start: "Keep one memory box per person; photograph the rest before it gets boxed.",
      },
    ],
    principlesTitle: "Two ideas that beat moving-day regret",
    principlesBody: "Regret cuts both ways — keeping too much, or purging in panic. These two ideas keep the cuts honest.",
    principle1Heading: "Would I pay to move this — and unpack it?",
    principle1Body:
      "It's the fastest filter under time pressure. If an item isn't worth the box, the truck space, and the effort of finding it a home on the other end, it isn't worth keeping. The cost makes the decision concrete in a way 'might need it' never does.",
    principle2Heading: "Start early — it's bigger than you think",
    principle2Body:
      "The most upvoted truth in moving threads: \"Everybody's moving tasks is WAY bigger than they think it is. Everybody's.\" People who felt organized still ended up with a chaotic last week. Begin 6–8 weeks out and clear one category a day. Slow decisions are good decisions; the panic purges at midnight before the truck arrives are where you toss the thing you actually wanted.",
    faqTitle: "Frequently asked questions",
    faqs: [
      ["When should I start decluttering before a move?", "Ideally 6–8 weeks out, one category or room per day. Starting early turns it into calm daily decisions instead of a frantic purge the night before the truck arrives — which is where most moving regret comes from."],
      ["Should I declutter or just move it and sort later?", "Declutter first. Moving costs scale with volume and weight, so relocating clutter means paying to keep your problem and unpacking it again. Sorting 'later' in the new home usually means it sits in boxes for months."],
      ["What do people most often regret moving?", "The same things come up over and over: books and old textbooks, tchotchkes and decor, garage items, duplicate containers, expired food, and broken stuff kept 'to fix someday.' Almost no one regrets letting those go; many regret paying to move them and finding them still boxed years later."],
      ["I'm scared I'll regret getting rid of something. How do I decide?", "Use the 'would I pay to move and unpack this?' test, and don't purge in a panic. The one real over-purge risk is tossing a box of 'random stuff' that turns out to hold documents or photos — so open and skim every box before it goes, set aside birth certificates and the like, and keep a small 'maybe' box with a clear deadline. See the decision guide for hard items."],
      ["What about sentimental things and inherited items?", "Do them last, keep a curated few, and photograph the rest — don't pay to move boxes you'll never reopen. See how to declutter sentimental items and decluttering after a death for the gentle approach."],
    ],
    relatedTitle: "Related guides",
    relatedIntro: "Downsizing leans on the same skills as everyday decluttering. These go next:",
    relatedLinks: [
      { href: "/decluttering-decision-guide", label: "Decision guide for hard items" },
      { href: "/things-to-declutter", label: "60 things to declutter from your home" },
      { href: "/how-to-declutter-your-closet", label: "How to declutter your closet" },
      { href: "/how-to-declutter-sentimental-items", label: "How to declutter sentimental items" },
      { href: "/swedish-death-cleaning", label: "Swedish death cleaning: a gentle checklist" },
      { href: "/declutter-checklist", label: "Interactive declutter checklist" },
    ],
    startLabel: "Start here",
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = getCopy(locale);

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLanguageAlternates(locale, "/decluttering-before-a-move"),
  };
}

export default async function DeclutteringBeforeMovePage({ params }: Props) {
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
        </section>

        <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
            {copy.introTitle}
          </h2>
          <p className="mt-4 text-base leading-7 text-[#414844]">{copy.introBody}</p>
        </section>

        <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
            {copy.stepsTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#414844]">{copy.stepsIntro}</p>
          <div className="mt-6 space-y-5">
            {copy.steps.map((step) => (
              <article key={step.title} className="rounded-[1.5rem] bg-[#f9faf2] px-5 py-5">
                <h3 className="text-lg font-bold text-[#002d1c] md:text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#414844] md:text-base md:leading-7">
                  {step.body}
                </p>
                <div className="mt-4 rounded-2xl bg-[#dcebdd] px-4 py-3 text-sm md:text-base">
                  <span className="font-semibold text-[#335748]">{copy.startLabel}: </span>
                  <span className="text-[#335748]">{step.start}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-[#fff4df] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#573611] md:text-3xl">
            {copy.principlesTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#7a5228]">{copy.principlesBody}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.5rem] bg-white/80 px-5 py-5">
              <h3 className="text-lg font-bold text-[#573611]">{copy.principle1Heading}</h3>
              <p className="mt-3 text-sm leading-6 text-[#7a5228] md:text-base md:leading-7">
                {copy.principle1Body}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/80 px-5 py-5">
              <h3 className="text-lg font-bold text-[#573611]">{copy.principle2Heading}</h3>
              <p className="mt-3 text-sm leading-6 text-[#7a5228] md:text-base md:leading-7">
                {copy.principle2Body}
              </p>
            </div>
          </div>
        </section>

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

        <section className="rounded-[2rem] bg-[#dcebdd] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
            {copy.relatedTitle}
          </h2>
          <p className="mt-3 text-base leading-7 text-[#335748]">{copy.relatedIntro}</p>
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
      </div>
    </main>
  );
}
