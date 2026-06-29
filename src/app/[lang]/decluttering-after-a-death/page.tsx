import type { Metadata } from "next";
import Link from "next/link";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { buildLanguageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

type Item = {
  title: string;
  body: string;
  pressure: string;
  gentle: string;
};

type Copy = {
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introBody: string;
  itemsTitle: string;
  items: Item[];
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
  labels: { pressure: string; gentle: string };
};

function getCopy(locale: string): Copy {
  if (locale === "ja") {
    return {
      title: "大切な人が亡くなった後の片付け方 | DeclutterYourHome",
      description:
        "亡くなった大切な人の持ち物を整理することは、家事ではなく grief work です。急がず進めるためのやさしいガイドとして、遺品や思い出の品を何から見ればいいか、何を残し、何を手放すか、罪悪感への向き合い方をまとめました。",
      eyebrow: "手放し方ガイド",
      heroTitle: "大切な人が亡くなった後の片付け方: やさしい遺品整理ガイド",
      heroSubtitle:
        "誰かが亡くなった後にその人の持ち物を整理するのは、家事ではなく grief work です。相手を大切に思うために、すべてを残す必要はありません。ここでは、急がず進める方法と、残った物をどう扱うかを整理します。",
      introTitle: "全部残すことは、その人を残すことではない",
      introBody:
        "物を手放すことは、その人まで手放すことのように感じられるかもしれません。失礼ではないか、相手が傷つくのではないか、という不安も自然です。でも愛情や記憶は物の中ではなく、あなたの中にあります。家いっぱいに持ち物が残ると、引き出しを開けるたびに悲しみが揺り戻され、 grief が動けなくなることもあります。意味のある少数を残し、残りを手放してよいのです。それは裏切りではなく、悲しみが前に進む形です。ここに締め切りも、正しい数もありません。",
      itemsTitle: "少しずつ、項目ごとに進める",
      items: [
        {
          title: "1. まだ思い出の強い物には触れなくていい",
          body: "最初の数週間は、善意から『早く片付けたほうがいい』と言われることがあります。でも急ぐ必要はありません。先に扱うのは、期限のある物だけで十分です。法的書類、食品、大家さんや相続手続きで必要な物などです。記憶が結びついた物は、数か月後でも、それ以上先でも、準備ができてからで構いません。",
          pressure: "家族や事情から、今すぐ全部整理するよう急かされる。",
          gentle: "まずは急ぎの実務だけに絞り、思い出の強い物は待たせましょう。準備が整う前に始めると、あとで悔やむ判断になりやすいです。",
        },
        {
          title: "2. 日用品（服、キッチン用品、家具）",
          body: "服や食器、家具は、物語性は比較的少ない一方で、場所は大きく取ります。着ていたコートを手放すのは耐えがたく感じるかもしれませんが、こうした物は別の場所でまた役立ちやすいカテゴリーでもあります。",
          pressure: "本人が着ていた服を手放すのは間違っている気がする。",
          gentle: "誰かに使ってもらえる形で寄付しましょう。それはその人の名における親切の続きです。手触りのある物が必要なら、シャツやスカーフなど着られる物を1〜2点だけ残す方法もあります。",
        },
        {
          title: "3. 本当に思い出を強く運ぶ少数の物",
          body: "腕時計、手紙の束、いつも使っていたマグカップ。こうした物こそ、あなたにとってその人をよく感じさせる物です。落とし穴は、『その人の物だった』という理由だけで、今は全部が神聖に思えてしまうことです。",
          pressure: "全部その人の物だったのだから、全部残さなければ。",
          gentle: "実際に見る、使う、触れる少数の意味あるセットを選びましょう。開けない収納に大量に置くより、棚にきちんと残した少数のほうが、よほどその人を大切にできます。",
        },
        {
          title: "4. 写真と紙類",
          body: "写真、カード、書類は箱単位で増えやすく、減らすのがほぼ不可能に見えます。でも記憶を残すために、ぼやけた重複写真まで全部必要なわけではありません。",
          pressure: "写真もメモも全部保存しないといけない気がする。",
          gentle: "いちばん良いものを残し、できる範囲でデジタル化し、家族にも共有しましょう。思い出は、同じ写真5枚ではなく、選ばれたアルバムの中で十分に残ります。",
        },
        {
          title: "5. 受け継いだ家族の品（『代々の物だから』）",
          body: "食器、家具、指輪など、重みと一緒に引き継がれる物には、『今度はあなたが守る番』という無言の役割がついてきます。好きでもない物に対してさえ、断れない義務のように感じることがあります。",
          pressure: "これからは自分が家族の物を守らなければならない。",
          gentle: "本当に好きな物、使う物だけを残して大丈夫です。由来は書き残すか写真にし、他の親族に渡したい物があれば声をかけ、残りは手放しましょう。あなたは家族の博物館ではありません。",
        },
        {
          title: "6. 途中で終わったプロジェクトや趣味の道具",
          body: "作りかけのキルト、工具でいっぱいの作業場、読みかけの本。こうした物がつらいのは、人生が途中で止まったことを強く感じさせるからです。でもそれは、あなたが引き継がなければならない宿題ではありません。",
          pressure: "代わりに完成させるべき、または全部残すべきだと思う。",
          gentle: "必要なら記念として1つだけ残し、材料や道具は使う人に渡しましょう。そのプロジェクトはその人のものであり、完成も保管もあなたの義務ではありません。",
        },
        {
          title: "7. 生前にもらっていたギフト",
          body: "相手が亡くなったあとには、それまでにもらったギフト全部が触れられない物に感じられることがあります。でも愛情は『贈る行為』の中にあり、それはすでに起きたことです。",
          pressure: "あの人にもらった物は1つも手放せない。",
          gentle: "本当に意味を感じる物だけ残し、残りは手放して大丈夫です。残すべきなのは人であって、すべての物ではありません。やさしい進め方は『いらないギフトの手放し方』も参考になります。",
        },
        {
          title: "8. 売る・寄付することへの罪悪感",
          body: "遺品を売ることはその人に値段をつけるように感じられ、寄付することはその人を軽く扱うように感じられるかもしれません。でもその罪悪感は grief であって、間違ったことをしている証拠ではありません。",
          pressure: "売ったり譲ったりするのは裏切りのように思える。",
          gentle: "必要としている人に渡ることで、その人の持ち物はもう一度役に立てます。お金になることや寄付になることは失礼ではなく、その人の物が再び良い働きをする形です。",
        },
      ],
      principlesTitle: "心に置いておきたい2つのこと",
      principlesBody: "どうしても決められないときは、次の2つが重さを少し下げてくれます。",
      principle1Heading: "記憶は物ではなく、自分の中にある",
      principle1Body:
        "セーターを手放したからといって、その人を忘れるわけではありません。関係性は、思い出、習慣、その人から受けた影響としてあなたの中に残っています。物は思い出すきっかけにすぎず、その役目には少数で十分です。残りを手放しても、1つの記憶も消えません。",
      principle2Heading: "締め切りも、残すノルマもない",
      principle2Body:
        "悲しみにスケジュールがないように、この作業にも期限はありません。1箱ずつ、休みながら進めてください。本当に残したい物を残し、必要ならあとから見直して構いません。目標は家を空にすることでも、満杯にすることでもなく、悲しみながらも暮らせる家に戻すことです。",
      faqTitle: "よくある質問",
      faqs: [
        ["いつから遺品整理を始めればいいですか？", "決まりはありません。先に必要なのは、期限のある物や法的に必要な物だけです。思い出の強い物は数か月後でも、それ以上先でも大丈夫です。誰にも急がされないでください。準備ができる前にした決断ほど、あとで悔やまれやすいです。"],
        ["持ち物を手放すことに強い罪悪感があります。普通ですか？", "とても普通です。その罪悪感は grief であり、間違っているサインではありません。誰かの役に立つ形で遺品を寄付することは、その人の名における贈り物でもあり、やさしさを次へつなぐ方法でもあります。"],
        ["家族で誰が何を持つか意見が割れたら？", "意味の大きい少数の物は、早めに、オープンに話し合って決めましょう。写真を残せば、物を持たなくても記憶は共有できます。持ち物のせいで、本来もっと大切な関係が壊れないようにすることが最優先です。"],
        ["どれくらい残すのが適切ですか？", "正解の数はありません。実際に目に入る少数の厳選セットのほうが、開けない箱よりずっと良いです。迷うなら、今は少し多めに残して構いません。悲しみが少し落ち着いたあとで、いつでも見直せます。"],
      ],
      relatedTitle: "関連ガイド",
      relatedIntro: "悲しみ、思い出の品、受け継いだギフトはつながっています。次はこちら。",
      relatedLinks: [
        { href: "/how-to-declutter-sentimental-items", label: "思い出の品を罪悪感なく整理する方法" },
        { href: "/swedish-death-cleaning", label: "Swedish death cleaning のやさしいチェックリスト" },
        { href: "/how-to-declutter-unwanted-gifts", label: "いらないギフトの手放し方" },
        { href: "/decluttering-decision-guide", label: "迷う物の判断ガイド" },
        { href: "/things-to-declutter", label: "家の断捨離で手放せるもの60選" },
        { href: "/declutter-checklist", label: "断捨離チェックリスト" },
      ],
      labels: { pressure: "感じやすい圧", gentle: "やさしい進め方" },
    };
  }

  return {
    title: "Decluttering After a Death: A Gentle Guide to a Loved One's Belongings | DeclutterYourHome",
    description:
      "Sorting a deceased loved one's belongings is grief work, not a chore. A gentle, no-deadline guide to going through inherited items and sentimental things — what to keep, what to release, and how to handle the guilt.",
    eyebrow: "Letting Go",
    heroTitle: "Decluttering After a Death: A Gentle Guide to a Loved One's Belongings",
    heroSubtitle:
      "Going through someone's things after they die is grief work, not a chore. You don't have to keep everything to keep them. Here's how to move through it slowly — and what to do with what's left.",
    introTitle: "Keeping it all isn't keeping them",
    introBody:
      "The fear underneath this is that letting go of their things means letting go of them — that you're being disrespectful, or that they would be hurt. But your love and your memories do not live in the objects. They live in you. A house full of someone's belongings can actually keep grief stuck, with every drawer a fresh wave. You are allowed to keep a meaningful few and release the rest. That is not betrayal; it is grief moving forward. There is no deadline here, and no \"right\" amount to keep.",
    itemsTitle: "Going through it, piece by piece",
    items: [
      {
        title: "1. Don't touch the sentimental things yet",
        body: "In the first weeks, well-meaning people may push you to \"clear it out.\" You do not have to. Handle only what is time-sensitive — legal documents, perishables, anything a landlord or estate needs. Everything with a memory attached can wait until you are ready, whether that is months or longer.",
        pressure: "Family or circumstances rushing you to sort it all now.",
        gentle: "Do the urgent, practical items first. Let the sentimental ones wait. Starting before you're ready usually means decisions you later regret.",
      },
      {
        title: "2. The everyday items (clothes, kitchen, furniture)",
        body: "Their clothes, dishes, and furniture carry the least story and take the most space. Giving their coats away can feel unbearable, but these are the items most able to do good somewhere else.",
        pressure: "It feels wrong to give away the clothes they wore.",
        gentle: "Donate so someone uses them — that's a kindness in their name. Keep one or two wearable pieces (a shirt, a scarf) if having something tangible helps.",
      },
      {
        title: "3. The truly sentimental few",
        body: "A watch, a stack of letters, the mug they always used. These are the things that actually hold them for you. The trap is trying to keep everything that was \"theirs\" because all of it feels sacred right now.",
        pressure: "Keep all of it — it was all theirs.",
        gentle: "Choose a small, meaningful set you will actually see or use. A curated few on a shelf honor them more than a storage unit you never open.",
      },
      {
        title: "4. Photos and paper",
        body: "Boxes of photos, cards, and documents pile up fast and feel impossible to cull. But you do not need every blurry duplicate to keep the memory.",
        pressure: "Every photo and note feels like it has to be saved.",
        gentle: "Keep the best, digitize what you can, and share copies with other family. The story survives in a curated album, not in five identical prints.",
      },
      {
        title: "5. Inherited heirlooms (\"it's been in the family\")",
        body: "Items handed down with weight — the china, the furniture, the ring — arrive with a silent \"you're the keeper now.\" That can feel like a duty you can't refuse, even for things you don't love.",
        pressure: "You're the keeper of the family's things now.",
        gentle: "Keep what you genuinely love or use. Write down or photograph its story, offer pieces to other relatives, and release the rest. You are not the family museum.",
      },
      {
        title: "6. Their unfinished projects and hobbies",
        body: "The half-finished quilt, the workshop full of tools, the half-read books. These ache because they represent a life interrupted — but they were never a task you inherited.",
        pressure: "I should finish it / keep all their hobby things.",
        gentle: "Keep one token if you'd like. Pass the materials to someone who'll use them. Their project was theirs; you don't owe it completion or storage.",
      },
      {
        title: "7. The gifts they gave you over the years",
        body: "Now that they're gone, every gift they ever gave can feel untouchable. But the love was in the giving, and that already happened.",
        pressure: "I can't part with anything they gave me.",
        gentle: "Keep the pieces that genuinely mean something; let the rest go. You keep the person, not every object. See how to declutter unwanted gifts for the gentle version.",
      },
      {
        title: "8. The guilt about selling or donating",
        body: "Selling their belongings can feel like putting a price on them, and donating can feel like dismissing them. That guilt is grief, not evidence you're doing something wrong.",
        pressure: "Selling or giving it away feels like a betrayal.",
        gentle: "Passing things to people who need them continues their generosity. The money, or the donation, is not disrespect — it's their things doing good again.",
      },
    ],
    principlesTitle: "Two things to hold onto",
    principlesBody: "When it feels impossible, these two truths take the weight off the decision.",
    principle1Heading: "The memory lives in you, not the object",
    principle1Body:
      "You will not forget them because a sweater left the house. The relationship is carried in you — in stories, habits, the way they shaped you. The objects are reminders, and you only need a few to be reminded. Letting the rest go does not erase a single memory.",
    principle2Heading: "There is no deadline and no quota",
    principle2Body:
      "Grief has no schedule, and neither does this. Take one box at a time, with breaks. Keep what you genuinely want, and know you can revisit later. The goal isn't an empty house or a full one — it's a home you can actually live in while you grieve.",
    faqTitle: "Frequently asked questions",
    faqs: [
      ["How soon should I start going through their things?", "There is no rule. Handle only the time-sensitive and legal items early; the sentimental things can wait months or longer. Don't let anyone rush you — decisions made before you're ready are the ones people most often regret."],
      ["I feel guilty giving their things away. Is that normal?", "Completely. The guilt is grief, not a sign you're doing something wrong. Donating their belongings so others benefit is a gift made in their name, and a way their kindness keeps going."],
      ["What if family disagrees about who keeps what?", "Decide the few high-meaning items together, early and openly. Photograph things so everyone can keep the memory without the object. Don't let belongings fracture relationships that matter far more than the stuff."],
      ["How much should I keep?", "There's no right number. A small, curated set you'll actually see beats boxes you never open. If unsure, keep a little more than you think you'll want for now — you can always revisit once the grief is less raw."],
    ],
    relatedTitle: "Related guides",
    relatedIntro: "Grief, sentimental things, and inherited gifts are the same knot. These go next:",
    relatedLinks: [
      { href: "/how-to-declutter-sentimental-items", label: "How to declutter sentimental items (without guilt)" },
      { href: "/swedish-death-cleaning", label: "Swedish death cleaning: a gentle checklist" },
      { href: "/how-to-declutter-unwanted-gifts", label: "How to declutter unwanted gifts" },
      { href: "/decluttering-decision-guide", label: "Decision guide for hard items" },
      { href: "/things-to-declutter", label: "60 things to declutter from your home" },
      { href: "/declutter-checklist", label: "Interactive declutter checklist" },
    ],
    labels: { pressure: "The pressure", gentle: "A gentler way" },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = getCopy(locale);

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLanguageAlternates(locale, "/decluttering-after-a-death"),
  };
}

export default async function DeclutteringAfterADeathPage({ params }: Props) {
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
            {copy.itemsTitle}
          </h2>
          <div className="mt-6 space-y-5">
            {copy.items.map((item) => (
              <article key={item.title} className="rounded-[1.5rem] bg-[#f9faf2] px-5 py-5">
                <h3 className="text-lg font-bold text-[#002d1c] md:text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#414844] md:text-base md:leading-7">
                  {item.body}
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl bg-white px-4 py-3 text-sm md:text-base">
                    <span className="font-semibold text-[#7a2d2d]">{copy.labels.pressure}: </span>
                    <span className="text-[#414844]">{item.pressure}</span>
                  </div>
                  <div className="rounded-2xl bg-[#dcebdd] px-4 py-3 text-sm md:text-base">
                    <span className="font-semibold text-[#335748]">{copy.labels.gentle}: </span>
                    <span className="text-[#335748]">{item.gentle}</span>
                  </div>
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
