import type { Metadata } from "next";
import Link from "next/link";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { buildLanguageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

type Copy = {
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
  permissionTitle: string;
  permissionIntro: string;
  permissionItems: string[];
  inheritedTitle: string;
  inheritedBody: string;
  mistakesTitle: string;
  mistakes: string[];
  keepTitle: string;
  keepBody: string;
  quickResetTitle: string;
  quickResetSteps: string[];
  faqTitle: string;
  faqs: Array<[string, string]>;
  relatedTitle: string;
  relatedIntro: string;
  relatedLinks: Array<{ href: string; label: string }>;
};

function getCopy(locale: string): Copy {
  if (locale === "ja") {
    return {
      title: "思い出の品を罪悪感なく手放す方法 | DeclutterYourHome",
      description:
        "思い出の品、記念品、形見を無理なく整理するための7ステップガイド。手放していい理由のリスト、遺品や受け継いだ物への向き合い方、判断が止まったときの進め方までまとめています。",
      eyebrow: "思い出の品ガイド",
      heroTitle: "思い出の品を罪悪感なく整理する方法",
      heroSubtitle:
        "思い出の品の片付けが難しいのは、量が多いからではなく、1つ1つに感情が結びついているからです。罪悪感、忘れてしまう不安、人からどう見られるかへの怖さ。このガイドでは、記憶を物に閉じ込めず、自分の中に残したまま進めるためのゆっくりした手順を紹介します。",
      introTitle: "思い出の品が他の物より難しい理由",
      introBody:
        "キッチンの引き出しなら、比較的淡々と片付けられます。でも思い出の品は違います。『これを手放したら、あの人やあの時期を裏切ることになるのでは』という言葉が、どの物にも静かについてきます。これは収納の問題ではなく、感情の問題です。だから順番も変わります。先に感情を扱い、そのあとで物を決める。気持ちに名前がつくと、物への判断はずっとしやすくなります。",
      stepsTitle: "思い出の品を整理する7つのステップ",
      steps: [
        ["1. 先に感情に名前をつける", "物を手に取っても、すぐ結論を出さなくて大丈夫です。まず『これは私に _____ を感じさせる』と1文で言葉にしてください。あたたかさ、悲しみ、罪悪感、プレッシャー、無感覚。感情を言語化すると、問いは『捨てるかどうか』から『この感情に毎回触れ続けたいか』へ変わります。"],
        ["2. 決める前に写真を撮る", "高解像度の写真は、見た目の記憶の大半を残してくれます。物が手元を離れても、画像は残せます。このひと手間だけで、『忘れてしまいそうで捨てられない』という怖さがかなりやわらぎます。"],
        ["3. 今この物は誰のためにあるのかを聞く", "誰かが来たときに見えるように残しているなら、その物はあなたではなく相手のために置かれています。思い出したいときに自分が自然と手に取るなら、それは今もあなたに役立っています。前者は手放しやすく、後者は残す価値があります。"],
        ["4. 同じカテゴリーの中では、重みのある1〜2個だけ残す", "卒業アルバムが何冊もあるなら、本当に見返す1冊だけ。元恋人からのカードが引き出し1杯あるなら、いちばん意味のある2〜3枚だけ。思い出の品の断捨離は『ゼロにする』ことではなく、本当に重みのある1〜2個に明確な居場所を与えることです。"],
        ["5. 捨てるではなく、受け渡すと考える", "視点の言い換えが大事です。『これを必要な人に回す』『使ってくれる家庭へ寄付する』と考えると、物はそこで終わるのではなく次へ続きます。Reddit でも、寄付した物が誰かに使われているのを見たときのほうが、ずっとしまっておくより気持ちが整理できたという声が多くあります。"],
        ["6. 残す物は、本当に生活の中で生かす", "取っておくと決めた物が、また箱の中で眠るなら、不安の置き場所を変えただけです。飾る、使う、棚に置く。地下室ではなく、日常で見える場所に置いてください。思い出の品の価値は、保管されることではなく、ちゃんと見えることにあります。"],
        ["7. たまり直さないためのリズムを作る", "年に1回、または引っ越しや喪失、大きな生活変化のたびに、この流れをもう一度たどってください。思い出の品は自然に増えます。大事なのは、次に向き合えないほど山積みにしないことです。"],
      ],
      removeTitle: "準備ができたら、先に手放しやすい物",
      removeItems: [
        "5年以上一度も見返していない記念品",
        "期限が切れている、または傷んでいる紙類（レシートの束、古いチケット、同じカードの重複分）",
        "写真の重複。同じ出来事なら2〜3枚だけ残して十分です",
        "罪悪感だけで持ち続けている、実は好きではないギフト",
        "2回以上の引っ越しを未開封のまま生き延びた思い出箱",
        "もう今の自分やその関係性とつながっていない物",
      ],
      emotionTitle: "記憶は物の中ではなく、自分の中に残る",
      emotionBody:
        "r/declutter で何度も共有される言葉に、『息子を捨てたのではなく、息子の持ち物の一部を手放しただけ』というものがあります。これが思い出の品を片付けるときの中心的な考え方の転換です。記憶はあなたのものです。シャツやカードやマグカップが抱えているのではありません。物は手放せても、記憶は一緒に消えません。むしろ手放せるということは、大切だったものがすでに自分の中に根づいている証拠です。",
      permissionTitle: "自分に許していいこと（手放していいことリスト）",
      permissionIntro:
        "思い出の品で止まってしまう人の多くは、『どう捨てるか』ではなく『捨てていいのか』で止まっています。次のことは、どれも許されている選択です。",
      permissionItems: [
        "大切な人からもらった物を手放していい",
        "全部ではなく1つだけ残していい",
        "写真に残してから物を手放していい",
        "ギフトを手放していい。ギフトの意味は渡された時点で完了している",
        "罪悪感で残していたけれど、実は好きではなかったと認めていい",
        "いったん保留していい。保留は永久保存ではなく、「保留ボックス」に入れて30〜90日後に見直せばいい",
      ],
      inheritedTitle: "受け継いだ物についての補足",
      inheritedBody:
        "親や近しい家族から受け継いだ物は、思い出の品の中でも特に重いカテゴリーです。自分の悲しみに加えて、『自分が代わりに決めてはいけないのでは』という感覚も乗ってきます。役に立つ問いは、『私がこの箱の前を通るたび重くなり、クローゼットも開けられず、収納にお金まで払っていると知ったら、あの人はそれを望むだろうか？』です。多くの人にとって、正直な答えはノーです。その答えが、動き始める許可になります。ほかの家族にも思い入れがありそうなら一度だけ声をかけましょう。ただし『みんなが決めるまで待つ』を永久保管にしないこと。期限を決め、そこまでに引き取り手がいなければ、自分で扱ってよい物です。",
      mistakesTitle: "思い出の品の断捨離でよくある失敗",
      mistakes: [
        "最初から思い出の品に着手すること。いちばん重いカテゴリーは最後に回し、先に軽い物で判断の筋肉を温める",
        "その物と一緒に暮らしていない人に決断を委ねること。保管コストを払っていない人ほど『取っておけば』と言いやすい",
        "物そのものではなく、贈り主のために持ち続けること。それは愛情ではなく罪悪感であることが多い",
        "全部をひと箱に封印して二度と開けないこと。不安の置き場所を移しただけで、決断はしていない",
      ],
      keepTitle: "本当に残す価値がある物とは",
      keepBody:
        "カテゴリーごとに『1つしか残せないならどれ？』と聞いてみてください。次に『2つなら？』と。すぐに名前が挙がる1〜2個で止めましょう。そこに本当の意味が宿っています。それ以外は、多くの場合『念のため』か、まだ決め切れていない気持ちの延長です。数を増やしてもつながりは深まりません。むしろ本当に残したい1〜2個の重みを薄めてしまいます。",
      quickResetTitle: "動けないときの15分スタート法",
      quickResetSteps: [
        "範囲を最小にする: 引き出し1つ、靴箱1つ、フォルダ1冊だけ",
        "15分のタイマーをかける",
        "1つ手に取るたびに、まず感情を言うか書く",
        "決められない物は写真を撮って「保留ボックス」に入れ、30〜90日後に見直す",
      ],
      faqTitle: "よくある質問",
      faqs: [
        ["亡くなった人の思い出の品はどう整理すればいいですか？", "まず時間を自分に与えてください。喪失から最初の1年は、恒久的な判断をするのに向かないことが多いです。もし今すぐ動く必要があるなら（引っ越しや家の整理など）、物を3つに分けます。明確に残す物（10〜20点、1箱に入る量）、明確に手放せる物、迷う物です。迷う山は無理に決めず、日付を書いて封をし、3〜6か月後に見直してください。悲しみの形が変わると、判断も変わります。"],
        ["ギフトを捨ててもいいですか？", "大丈夫です。ギフトの意味は、渡された瞬間に完了しています。物自体に一生の義務はありません。贈り主が生きていて、他の誰かに役立てられるならなお良いです。相手に見つかるのが心配なら写真だけ残して手放して構いません。多くの場合、相手は何を贈ったか細かく覚えていません。"],
        ["将来の子どもや孫のために取っておくべきですか？", "正直に考えてみてください。親が自分のために残してくれた物のうち、本当に欲しかった物は何点ありましたか。たいていはごく少数です。同じことが自分と子どもの間でも起こります。箱ごと残す代わりに、今5〜10点だけ選び、その物語を書き残しましょう。受け継がれるのは物量よりストーリーです。"],
      ],
      relatedTitle: "関連ガイド",
      relatedIntro: "思い出の品の整理は単独では進みません。次のガイドも役立ちます。",
      relatedLinks: [
        { href: "/how-to-declutter-unwanted-gifts", label: "いらないギフトの手放し方" },
        { href: "/decluttering-after-a-death", label: "死別後の片付けガイド" },
        { href: "/swedish-death-cleaning", label: "Swedish death cleaning のやさしいチェックリスト" },
        { href: "/decluttering-decision-guide", label: "迷う物の判断ガイド" },
        { href: "/things-to-declutter", label: "家の断捨離で手放せるもの60選" },
        { href: "/how-to-declutter-your-bedroom", label: "寝室の断捨離方法" },
        { href: "/how-to-declutter-your-closet", label: "クローゼットの断捨離方法" },
        { href: "/declutter-checklist", label: "断捨離チェックリスト" },
      ],
    };
  }

  if (locale === "zh") {
    return {
      title: "如何整理纪念物 / 情感物品（不带负罪感）| DeclutterYourHome",
      description:
        "学习如何分步整理纪念物、纪念品和遗物。包含 7 步框架、许可清单、继承物品的特殊处理，以及面对决策疲劳时的小招。",
      eyebrow: "情感物品整理指南",
      heroTitle: "如何整理情感物品（不带负罪感）",
      heroSubtitle:
        "整理情感物品比其他类别都难，不是因为东西多，而是因为每一件都连着情绪——愧疚、害怕忘记、害怕被别人评价。这份指南给你一套可以慢慢走的流程，让记忆留在你身上，不再都被绑在物品上。",
      introTitle: "为什么情感物品比其他杂物难",
      introBody:
        "厨房杂物你可以一抽屉一抽屉过，扔起来不疼。但情感物品的每一件都自带 \"如果我扔了，是不是就背叛了那段感情/那个人\" 的句子。这种情感杂物不是物品问题，是情绪问题。所以解决它的顺序也不一样：先处理情绪，再决定物品。把对的人换到对的位置后，整理本身反而是最简单的一步。",
      stepsTitle: "整理情感物品的 7 步框架",
      steps: [
        ["1. 先承认这一件让你有什么感觉", "拿起来不要立刻决定。先在心里或写下来一句话：\"这让我觉得 _____\"。是温暖、悲伤、愧疚、压力、还是麻木？情绪命名出来之后，决定就不再是 \"扔不扔\"，而是 \"我要不要继续被这种情绪反复触发\"。"],
        ["2. 拍下来，再决定", "先拍照，再做决定。一张高清照片可以承载视觉记忆的 80% 以上。物品离开后你随时能看到它的样子，而它不再每天占用衣柜或储物间。这个动作能让 \"我会忘记\" 的恐惧消解大半。"],
        ["3. 问：这个物品现在为谁服务", "如果它的存在是为了 \"以防那个人哪天来看时看到\"——那它服务的不是你。如果是为了 \"想到 ta 的时候有东西可以拿\"——那它真的为你服务。前者可以放手，后者值得留下。"],
        ["4. 在一类东西里，只留 1-2 件最有重量的", "一柜子高中年鉴可以缩成 1 本你最常翻的。一抽屉前任送的卡片可以变成 2-3 张最重要的。整理情感物品的关键不是保留所有，而是给最重要的那一两件一个清晰的位置。"],
        ["5. 放手时用 \"传递\"，不用 \"丢弃\"", "换个说法是这一步的核心。\"我把它送给会用到的人\"、\"我把它捐给需要它的家庭\"——这些动作让物品继续活着，而不是终结。Reddit 上很多人提到，看到自己捐的东西出现在二手店或别人身上时，比一直藏着它要好得多。"],
        ["6. 让留下的那件真的活在你的生活里", "保留的物品如果继续躺在箱子里，你只是把焦虑换了位置。把保留的那一两件放到能看到、能用到的位置——挂出来、用起来、放在书架而不是地下室。物品的价值在被看到，不在被收藏。"],
        ["7. 建立一个节律，别再让情感杂物重新堆积", "每年一次、或者每次搬家、每次重大生活变动后，过一次这套流程。情感物品会自然累积，关键是不要让它累积到 \"动都不敢动\" 的程度。"],
      ],
      removeTitle: "可以先尝试放手的物品（当你准备好时）",
      removeItems: [
        "你 5 年以上都没拿出来看过的纪念品",
        "已经过期或失效的纸质纪念物（票根、贺卡的批量副本）",
        "重复的照片（同一场合 10 张挑 2-3 张）",
        "你出于愧疚而留下、但其实不喜欢的礼物",
        "已经搬过 2 次还没拆开的纪念盒",
        "在你看来已经和那段关系/那个人无关的物品",
      ],
      emotionTitle: "记忆不存在物品里，记忆存在你身上",
      emotionBody:
        "Reddit 上有一句被反复引用的话：\"我没有扔掉我去世的儿子，我只是放手了他的一部分东西。\" 整理情感物品的核心转念就是这个——记忆是你的，不是那件衣服、那张卡片、那只杯子的。物品可以走，记忆不会走。能够放手物品，反而说明你已经把它内化了。",
      permissionTitle: "你可以允许自己的事（许可清单）",
      permissionIntro:
        "整理情感物品时，绝大多数人卡住的不是 \"不知道怎么扔\"，而是 \"觉得自己没资格扔\"。下面这些都是允许的：",
      permissionItems: [
        "可以放手你爱的人送的东西",
        "可以只留一件，不留全部",
        "可以拍下来再让物品离开",
        "可以放手作为礼物收到的东西——礼物的意义在送出那一刻已经完成",
        "可以承认你其实不喜欢这件你出于愧疚留着的东西",
        "可以暂停。暂停不等于永远保留——把不确定的装进 \"待定盒\"，30-90 天后再决定",
      ],
      inheritedTitle: "继承物品的特殊处理",
      inheritedBody:
        "继承父母或亲人的物品是最重的一类。除了你自己的情绪，还多了 \"我不能代替 ta 决定\" 的恐惧。一个有用的问题是：\"如果 ta 知道我因为这件物品而每天压抑、空间被占、不敢开柜子，ta 会希望我继续留着吗？\" 大多数人在心里给出的答案是 \"不会\"。然后你才能开始做真正属于你的决定。如果家里有其他人也对这些物品有感情，先问一圈是否有人想要——但不要让 \"等大家决定\" 变成永远不动。设一个截止日期：到了那天，没有人来认领的物品，你有权处理。",
      mistakesTitle: "整理情感物品时最常见的错误",
      mistakes: [
        "把情感物品放在整理的第一项——决策最重的应该放在最后，先用更简单的物品练习决策肌肉",
        "向不和这些物品一起生活的人征求决定——他们没有承担成本，所以他们的答案往往是 \"留着吧\"",
        "为送礼物的人保留，而不是为物品本身保留——这是愧疚，不是爱",
        "把所有东西都封进一个永远不打开的箱子——这只是换了个位置藏焦虑，没有真正决定",
      ],
      keepTitle: "什么值得真正留下",
      keepBody:
        "在每一个类别里，问 \"如果只能保留一件，我会保留哪一件\"。然后再问 \"两件呢？\"。停在你心里能立刻指出的那 1-2 件。这些是真正承载意义的物品。其他的，要么是 \"以防万一\" 的延伸，要么是没有勇气放手的延伸——它们不会增加你对那段关系的连接，只会稀释你真正想保留的那一两件的重量。",
      quickResetTitle: "感到无法开始时的 15 分钟启动法",
      quickResetSteps: [
        "选一个最小的范围：一个抽屉、一个鞋盒、一个文件夹",
        "设 15 分钟计时器",
        "拿起每一件，先说出（或写下）你的感觉",
        "拿不准的拍照，封进 \"待定盒\"，30-90 天后再决定",
      ],
      faqTitle: "常见问题",
      faqs: [
        ["如何整理去世亲人的遗物？", "先给自己时间——丧失发生后的第一年通常不是做这种决定的最佳时间。如果必须现在做（比如要搬家、要清理 ta 的房子），把物品分成三堆：明确要留的（10-20 件，能放进一个箱子）、明确可以放手的、不确定的。不确定的不要勉强决定，封箱标日期，3-6 个月后再回来看。情绪会变化，决策会更清楚。"],
        ["丢掉礼物可以吗？", "可以。礼物的意义在被送出的那一刻已经完成。物品本身不需要终生绑定。如果送礼物的人健在，可以把不再适合的礼物在感谢之后传给会用到的人。如果你担心被发现，可以拍照留念，物品本身处理掉。多数情况下，对方早已忘记送过什么。"],
        ["要不要留着以后给孩子？", "诚实问一下：你的父母留给你的东西里，你真正想要的有几件？通常是很少。同样的逻辑会发生在你和你的孩子之间。与其留一整箱让 ta 将来面对决策疲劳，不如现在就挑出 5-10 件真正有意义的东西，写下背后的故事——传递给孩子的是故事，不是物品的总量。"],
      ],
      relatedTitle: "相关阅读",
      relatedIntro: "整理情感物品不是单独的工作。这些指南也会帮到你：",
      relatedLinks: [
        { href: "/how-to-declutter-unwanted-gifts", label: "如何断舍离不想要的礼物" },
        { href: "/decluttering-decision-guide", label: "犹豫物品决策指南" },
        { href: "/things-to-declutter", label: "60 件可以从家里清掉的东西" },
        { href: "/how-to-declutter-your-bedroom", label: "如何整理卧室" },
        { href: "/how-to-declutter-your-closet", label: "如何整理衣柜" },
        { href: "/declutter-checklist", label: "互动整理清单" },
      ],
    };
  }

  return {
    title: "How to Declutter Sentimental Items Without Guilt | DeclutterYourHome",
    description:
      "Learn how to declutter sentimental items, inherited belongings, and emotionally loaded keepsakes using a gentle 7-step framework, permission lists, and decision tools designed for hard categories.",
    eyebrow: "Sentimental Items Guide",
    heroTitle: "How to Declutter Sentimental Items Without Guilt",
    heroSubtitle:
      "Decluttering sentimental items is the hardest category — not because there is more of it, but because every piece carries feeling: guilt, fear of forgetting, fear of being judged. This guide gives you a slow, low-pressure framework so the memory can live in you instead of being trapped in the object.",
    introTitle: "Why sentimental items are harder than any other clutter",
    introBody:
      "You can move through a kitchen drawer by drawer without much pain. Sentimental items are different — each one comes with the unspoken sentence \"if I let this go, am I betraying that person, that relationship, that version of me?\" That is not a storage problem. It is an emotional problem. So the order of operations has to be different too: feel first, decide second. Once the feeling has been named, the object becomes much easier to handle.",
    stepsTitle: "How to declutter sentimental items in 7 steps",
    steps: [
      ["1. Name the feeling before you decide", "Pick the item up but do not rush to a verdict. Say out loud — or write down — one sentence: \"This makes me feel _____.\" Is it warmth, grief, guilt, pressure, numbness? Once the emotion is named, the question shifts from \"do I throw this away?\" to \"do I want to keep being triggered by this feeling every time I open the drawer?\""],
      ["2. Photograph before you decide", "A high-resolution photograph carries about 80 percent of the visual memory. The object can leave while the image stays. This single step dissolves most of the \"but I'll forget\" fear that paralyzes sentimental decluttering."],
      ["3. Ask who the object is serving now", "If you are keeping it in case someone else notices it, it is serving them, not you. If you reach for it when you want to remember that person, it is serving you. The first kind can usually go. The second kind earns its space."],
      ["4. Inside each category, keep the one or two pieces that carry the most weight", "A bookshelf of yearbooks shrinks to one. A drawer of cards from an ex becomes two or three that meant the most. Sentimental decluttering does not mean keeping nothing. It means giving the heaviest one or two pieces a clear home — not diluting them with twenty lower-weight items."],
      ["5. Release with intention, not disposal", "Reframe the act. \"I am passing this to someone who will use it.\" \"I am donating it to a family that needs it.\" Many people on Reddit describe the moment they spotted a donated item being worn or used in the wild — that closure is more powerful than indefinite storage."],
      ["6. Make the items you keep live in your life", "If the pieces you save sit in a sealed box you never open, you have just relocated the anxiety. Display them, use them, put them on a shelf you walk past — not in a basement. The value of a sentimental item is in being seen, not in being archived."],
      ["7. Set a rhythm so sentimental clutter does not pile back up", "Once a year, or at every major life transition (move, loss, big change), walk this framework again. Sentimental items will keep arriving. The goal is to keep the pile small enough that you can still face it next time."],
    ],
    removeTitle: "What to consider releasing first (when ready)",
    removeItems: [
      "Keepsakes you have not pulled out in five or more years",
      "Expired paper items: stacks of receipts, old tickets, bulk duplicates of cards",
      "Duplicate photos — keep two or three from each event, release the rest",
      "Gifts kept out of guilt that you never actually liked",
      "Sealed memory boxes that have survived two or more moves unopened",
      "Items connected to a relationship or version of you that is no longer present",
    ],
    emotionTitle: "Memory is not stored in the object — it is stored in you",
    emotionBody:
      "One of the most-shared lines from r/declutter is from a parent who lost a child: \"I didn't throw away my son. I just let go of some of his things.\" That is the reframe at the center of sentimental decluttering. The memory is yours. It is not held by the shirt, the card, or the mug. The object can go. The memory does not go with it. Being able to release the object actually proves you have already internalized what mattered.",
    permissionTitle: "Things you are allowed to do (a permission list)",
    permissionIntro:
      "Most people stuck on sentimental items are not stuck on \"how to throw something away.\" They are stuck on \"am I allowed to.\" The following are all allowed:",
    permissionItems: [
      "It is OK to let go of things from people you love",
      "It is OK to keep one piece instead of all of them",
      "It is OK to photograph something and then release the object",
      "It is OK to release gifts — the meaning of a gift was completed the moment it was given",
      "It is OK to admit you never actually liked the item you have been keeping out of guilt",
      "It is OK to pause. Pause is not the same as keeping forever — put it in a maybe box, revisit in 30 to 90 days",
    ],
    inheritedTitle: "A note on inherited items",
    inheritedBody:
      "Inherited belongings from a parent or close relative are the heaviest sub-category. On top of your own grief, there is the layer of \"I cannot decide for them.\" A useful question: \"If they knew I was holding back from opening this closet, that this storage unit was costing me money every month, that I felt heavy every time I walked past this box — would they want me to keep carrying that?\" For most people, the honest answer is no. That answer is what gives you permission to start. If other family members may also feel attached, ask once — but do not let \"waiting for everyone to decide\" turn into permanent storage. Set a date. After that date, items no one claimed are yours to handle.",
    mistakesTitle: "Common mistakes when decluttering sentimental items",
    mistakes: [
      "Starting with sentimental items first — train decision muscles on easier categories before tackling the heaviest one",
      "Asking permission from people who do not live with the items — they are not paying the storage cost, so their answer skews toward \"keep it\"",
      "Keeping items for the giver, not for the object — that is guilt, not love",
      "Sealing everything into one box you never open — that just relocates the anxiety, it does not decide anything",
    ],
    keepTitle: "What truly deserves to stay",
    keepBody:
      "Inside each category, ask yourself: \"if I could only keep one, which one?\" Then: \"two?\" Stop at the one or two you can name immediately. Those are the items that actually carry meaning. Everything else is either \"just in case\" or unfinished decision-making. The extras do not deepen your connection to the relationship; they dilute the weight of the one or two pieces that should have stayed central.",
    quickResetTitle: "How to start when you feel paralyzed",
    quickResetSteps: [
      "Pick the smallest possible scope: one drawer, one shoebox, one folder",
      "Set a 15-minute timer",
      "For each item, say or write the feeling first, then the decision",
      "Whatever you cannot decide on: photograph it, put it in a maybe box with today's date, and revisit in 30 to 90 days",
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      ["How do I declutter sentimental items from a deceased loved one?", "Give yourself time. The first year after a loss is usually not the best time to make permanent decisions. If you have to act now — a move, clearing their home — sort into three piles: a clearly-keep box (10 to 20 items, must fit in one container), a clearly-release pile, and an unsure pile. Do not force the unsure pile. Seal it with the date and revisit in three to six months. Grief shifts, and so will what you can release."],
      ["Is it OK to throw away gifts?", "Yes. A gift's meaning is completed the moment it is given. The object is not under lifelong obligation. If the giver is alive and you can pass the gift onward to someone who will use it, even better. If you are worried the giver will notice, photograph it and let it go — in most cases, the giver has long since forgotten what they gave."],
      ["Should I keep things for my future kids or grandkids?", "Be honest: of everything your parents kept for you, how many items did you actually want? Usually very few. The same will happen between you and your kids. Instead of leaving a full box for them to navigate later, choose 5 to 10 items now and write down the story behind each. Stories pass down better than volume of objects."],
    ],
    relatedTitle: "Related guides",
    relatedIntro: "Sentimental decluttering does not happen in isolation. These guides connect to it:",
    relatedLinks: [
      { href: "/how-to-declutter-unwanted-gifts", label: "How to declutter unwanted gifts" },
      { href: "/decluttering-after-a-death", label: "Decluttering after a death" },
      { href: "/swedish-death-cleaning", label: "Swedish death cleaning: a gentle checklist" },
      { href: "/decluttering-decision-guide", label: "Decision guide for hard items" },
      { href: "/things-to-declutter", label: "60 things to declutter from your home" },
      { href: "/how-to-declutter-your-bedroom", label: "How to declutter your bedroom" },
      { href: "/how-to-declutter-your-closet", label: "How to declutter your closet" },
      { href: "/declutter-checklist", label: "Interactive declutter checklist" },
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
    alternates: buildLanguageAlternates(locale, "/how-to-declutter-sentimental-items"),
  };
}

export default async function SentimentalItemsPage({ params }: Props) {
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

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
              {copy.introTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-[#414844]">{copy.introBody}</p>
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

        <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
            {copy.permissionTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#414844]">
            {copy.permissionIntro}
          </p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {copy.permissionItems.map((item) => (
              <li
                key={item}
                className="rounded-2xl bg-[#dcebdd] px-4 py-3 text-sm leading-6 text-[#335748] md:text-base"
              >
                ✓ {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[2rem] bg-[#fff4df] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#573611] md:text-3xl">
            {copy.inheritedTitle}
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-7 text-[#7a5228]">
            {copy.inheritedBody}
          </p>
        </section>

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

          <aside className="rounded-[2rem] bg-[#dcebdd] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
              {copy.keepTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-[#335748]">{copy.keepBody}</p>
          </aside>
        </section>

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
