import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import { buildLanguageAlternates } from "@/lib/seo";
import SentimentalDecisionExamples from "@/components/SentimentalDecisionExamples";
import SentimentalWorksheet from "@/components/SentimentalWorksheet";

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
        "思い出の品には、懐かしさだけでなく、手放す罪悪感や忘れてしまう不安も伴うことがあります。このガイドでは、何を残したいのかを確かめながら、少しずつ整理する手順を紹介します。すぐに手放す必要はありません。",
      introTitle: "思い出の品が他の物より難しい理由",
      introBody:
        "キッチンの道具なら、使うかどうかで選びやすいかもしれません。でも手紙や贈り物には、『手放したら、あの人に悪いのでは』という気持ちが伴うことがあります。収納場所だけでなく、自分が何を大切にしたいのかも考えてみましょう。原物を残す、写真にする、今は決めないという選択もできます。",
      stepsTitle: "思い出の品を整理する7つのステップ",
      steps: [
        ["1. まず、どんな気持ちになるか確かめる", "物を手に取っても、すぐに結論を出さなくて大丈夫です。『これを見ると、どんな気持ちになる？』と自分に聞いてみてください。懐かしさ、悲しみ、罪悪感、あるいは特に何も感じないこともあります。感じたことを一言メモしてから、どうしたいか考えましょう。"],
        ["2. 写真やメモに残してみる", "写真には物の見た目を、メモにはその物にまつわる思い出を残せます。まずは手放すかどうか迷いの少ない物で試し、画像が読めるか、バックアップがあるかを確認してください。紙の手触りや手書きの文字そのものが大切なら、無理に写真で代える必要はありません。"],
        ["3. 残したい理由を確かめる", "思い出すとうれしいから残したいのか、それとも贈ってくれた人に申し訳ないからなのか、考えてみてください。理由がいくつかあっても構いません。相手への感謝と、自分がこの物を保管し続けたいかどうかを分けて考えるための問いです。"],
        ["4. 同じ種類の中で、まず残したい物を選ぶ", "年賀状なら読み返したい言葉があるもの、学校の作品なら特に思い入れのあるものから選んでみましょう。最初に1〜2点選ぶのは、考え始めるための方法です。残してよい数の上限ではありません。ほかにも大切な物があれば、使える収納場所と相談しながら残せます。"],
        ["5. 手放す物の行き先を決める", "手放すと決めたら、次の行動を具体的にします。欲しい人がいるか尋ねる、寄付先の受け入れ条件を調べる、自治体の分別方法を確認するなどです。人に渡すときは先に希望を聞き、受け渡しの日を決めておくと、仕分けた物がそのまま残るのを防げます。"],
        ["6. 残す物に合った保管場所を作る", "飾りたい物は棚へ、手紙や写真は名前や日付を添えてアルバムや箱へ。人に見せたくない物は、安心して保管できる場所に置いて構いません。日常で使わなくても、飾らなくても、大切に残す意味はあります。"],
        ["7. たまり直さないためのリズムを作る", "年に1回、または引っ越しや喪失、大きな生活変化のたびに、この流れをもう一度たどってください。思い出の品は自然に増えます。大事なのは、次に向き合えないほど山積みにしないことです。"],
      ],
      removeTitle: "準備ができたら、先に手放しやすい物",
      removeItems: [
        "5年以上一度も見返していない記念品",
        "期限が切れている、または傷んでいる紙類（レシートの束、古いチケット、同じカードの重複分）",
        "同じ写真の重複や、残したい内容が写っていない失敗写真",
        "罪悪感だけで持ち続けている、実は好きではないギフト",
        "2回以上の引っ越しを未開封のまま生き延びた思い出箱",
        "もう今の自分やその関係性とつながっていない物",
      ],
      emotionTitle: "全部を残さなくても、大切に思う気持ちは変わらない",
      emotionBody:
        "物が大切な人や過去の出来事とのつながりになることはあります。そのつながりを大切にしながら、残す量を考えて構いません。原物を残す、写真やメモにする、今はそのまま置いておく。どれも選べる方法です。手放せるかどうかで、悲しみが癒えたかや、その人への思いの深さが決まるわけではありません。",
      permissionTitle: "自分に許していいこと（手放していいことリスト）",
      permissionIntro:
        "思い出の品で止まってしまう人の多くは、『どう捨てるか』ではなく『捨てていいのか』で止まっています。次のことは、どれも許されている選択です。",
      permissionItems: [
        "大切な人からもらった物を手放していい",
        "全部ではなく1つだけ残していい",
        "写真に残してから物を手放していい",
        "贈り主の心遣いに感謝しながら、ギフトは手放してもいい",
        "罪悪感で残していたけれど、実は好きではなかったと認めていい",
        "いったん保留していい。保留は永久保存ではなく、「保留ボックス」に入れて30〜90日後に見直せばいい",
      ],
      inheritedTitle: "受け継いだ物についての補足",
      inheritedBody:
        "親や近しい家族から受け継いだ物は、自分だけでは決めにくいことがあります。まず、保管場所や費用の負担と、残しておきたい思い出を分けて考えてみましょう。ほかの家族にも関わる物は、希望や所有者を確認してから扱います。誰が何を引き取るか、いつまでに返事をするかを相談し、自分に処分する権限がある物について行き先を決めてください。期限を過ぎたことだけで、ほかの人の物を処分してよいわけではありません。",
      mistakesTitle: "思い出の品の断捨離でよくある失敗",
      mistakes: [
        "最初から思い出の品に着手すること。いちばん重いカテゴリーは最後に回し、先に軽い物で判断の筋肉を温める",
        "その物と一緒に暮らしていない人に決断を委ねること。保管コストを払っていない人ほど『取っておけば』と言いやすい",
        "贈り主への気持ちと、物を保管し続けたいかどうかを分けて考えないこと",
        "保留にした箱に中身や見直す時期を書かず、あとで探せなくなること",
      ],
      keepTitle: "本当に残す価値がある物とは",
      keepBody:
        "『また読みたい、見たい、手に取りたい物はどれ？』『原物だからこそ残したいのはどれ？』と考えてみてください。すぐに選べる物から始め、迷う物は別にしておけます。残す数に正解はありません。思い入れと収納場所の両方を考え、保管する物には見つけやすい居場所を作りましょう。",
      quickResetTitle: "動けないときの15分スタート法",
      quickResetSteps: [
        "範囲を最小にする: 引き出し1つ、靴箱1つ、フォルダ1冊だけ",
        "15分のタイマーをかける",
        "1つ手に取るたびに、まず感情を言うか書く",
        "決められない物は写真を撮って「保留ボックス」に入れ、30〜90日後に見直す",
      ],
      faqTitle: "よくある質問",
      faqs: [
        ["亡くなった人の思い出の品はどう整理すればいいですか？", "急ぐ事情がなければ、すぐに手放す判断をしなくても構いません。引っ越しなどで整理が必要な場合は、重要な書類を先に分け、残したい物、手放してよい物、迷う物に少しずつ仕分けます。迷う物には中身と日付を記し、無理のない時期に見直してください。残す数や、決めるまでの期間に一律の基準はありません。"],
        ["ギフトを捨ててもいいですか？", "自分の物になった贈り物を、一生保管し続ける必要はありません。相手の心遣いに感謝しながら、物は手放すこともできます。必要なら写真やメモを残し、再利用できる物は希望する人や受け入れ先へ。相手から借りている物や家族の共有物は、先に確認してください。"],
        ["将来の子どもや孫のために取っておくべきですか？", "本人に聞けるなら、何を残してほしいか相談してみましょう。まだ聞けない場合は、自分が伝えたい思い出のある物を選び、誰の物か、いつの物か、どんな出来事に関わるかを書き添えます。将来、受け取る人が必要に応じて選べるようにしておくことも大切です。"],
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
      title: "如何整理有纪念意义的物品，减少愧疚和纠结 | DeclutterYourHome",
      description:
        "从旧贺卡、照片到亲人留下的物品，用 7 个步骤慢慢整理。了解哪些可以留下、如何拍照记录，以及拿不定主意时怎么处理。",
      eyebrow: "纪念物品整理指南",
      heroTitle: "如何整理有纪念意义的物品，减少愧疚和纠结",
      heroSubtitle:
        "旧照片、贺卡和亲人留下的物品，常常让人舍不得，也不知道该怎么收。这份指南帮你从一小部分开始，想清楚要留下什么、怎样保存，以及哪些决定可以以后再做。不必为了整理而勉强自己丢东西。",
      introTitle: "为什么有纪念意义的物品更难整理",
      introBody:
        "整理厨房抽屉时，你可能很容易判断什么还用得上。面对旧信件或礼物，却可能会想：“丢掉它，是不是就辜负了那个人？”这时除了安排收纳空间，也需要照顾自己的感受。可以先说清楚自己舍不得的是什么，再考虑保留原物、拍照记录，还是暂时不作决定。",
      stepsTitle: "整理纪念物品的 7 个步骤",
      steps: [
        ["1. 先看看自己有什么感受", "拿起来后，不用立刻决定。问问自己：“看到它，我有什么感觉？”可能是温暖、悲伤、愧疚，也可能没什么感觉。用一两句话记下来，再考虑自己想怎样保存或处理它。"],
        ["2. 试试用照片或文字记录", "照片能记录物品的样子，文字能留下它背后的故事。先找一件不太纠结的物品试试，确认照片清楚、文件有备份，再考虑是否还要保留原物。如果你珍惜的是纸张的触感、亲笔字迹或物品本身，就不必用照片代替。"],
        ["3. 想想自己为什么留着它", "你是喜欢它带来的回忆，还是担心送礼的人发现东西不在了会失望？两种感受也可能同时存在。这个问题不是催你扔掉东西，而是帮你把对别人的感谢，和自己是否想继续保留物品分开考虑。"],
        ["4. 在同一类里，先挑出最想留下的", "面对一盒旧贺卡，可以先挑出一两张你还想重读的；面对学生时代的物品，可以先选最有意义的作品或毕业纪念册。这只是帮助你开始的方法，不是保留数量的上限。其余物品也可以结合感情和收纳空间慢慢决定。"],
        ["5. 给决定不留的物品安排去处", "想好具体的下一步：问一位可能需要的人是否愿意接收，确认捐赠机构的要求，或者查询当地回收和垃圾分类规则。送人之前先征求对方意见，再约好交接时间，避免整理出来的物品一直堆在门口。"],
        ["6. 给留下的物品找一个合适的位置", "想展示的可以摆在架子上，信件和照片可以标注姓名、日期后收进相册或盒子。私密物品也可以妥善收起来，不必给别人看。东西不常用、不展示，并不代表它不值得保留。"],
        ["7. 定期整理，避免越积越多", "可以每年找个时间，或在搬家等生活变化后，看看哪些物品需要重新收纳。每次只处理一小部分；感到难受时可以暂停，不必一次整理完。"],
      ],
      removeTitle: "可以先尝试放手的物品（当你准备好时）",
      removeItems: [
        "你 5 年以上都没拿出来看过的纪念品",
        "已经过期或失效的纸质纪念物（票根、贺卡的批量副本）",
        "同一张照片的多余副本，或没有保留价值的模糊照片",
        "你出于愧疚而留下、但其实不喜欢的礼物",
        "已经搬过 2 次还没拆开的纪念盒",
        "在你看来已经和那段关系/那个人无关的物品",
      ],
      emotionTitle: "不用留下每一件物品，也可以珍惜那段回忆",
      emotionBody:
        "一件物品可能是你与某个人、某段生活的珍贵联系。你可以承认这份意义，再决定要保留多少。留原物、拍照、记下故事，或暂时维持原样，都是可以的选择。能不能放下物品，不能用来判断你是否走出了悲伤；愿意保留，也不代表整理失败。",
      permissionTitle: "这些选择，你都可以放心做",
      permissionIntro:
        "面对有纪念意义的物品，你也许已经知道有哪些处理方式，只是还不确定自己能不能这样做。你可以根据自己的感受，选择下面任何一种：",
      permissionItems: [
        "可以放手你爱的人送的东西",
        "可以只留一件，不留全部",
        "可以拍下来再让物品离开",
        "可以感谢送礼人的心意，同时选择不再保留物品",
        "可以承认你其实不喜欢这件你出于愧疚留着的东西",
        "可以暂停。暂停不等于永远保留——把不确定的装进 \"待定盒\"，30-90 天后再决定",
      ],
      inheritedTitle: "继承物品的特殊处理",
      inheritedBody:
        "面对父母或亲人留下的物品，可以先分清两件事：你想保存哪些回忆，以及空间、时间和保管费用带来了哪些负担。涉及其他家人的物品，先确认归属和大家的意愿，再商量由谁保管、什么时候交接。只有你有权处置的物品，才能由你决定去处；约定的日期过了，也不代表可以直接处理别人的东西。",
      mistakesTitle: "整理纪念物品时容易遇到的问题",
      mistakes: [
        "一开始就处理最难取舍的物品；如果容易卡住，可以先从不太纠结的东西练起",
        "向不和这些物品一起生活的人征求决定——他们没有承担成本，所以他们的答案往往是 \"留着吧\"",
        "把感谢送礼人的心意，和自己是否想继续保管这件礼物混在一起",
        "把暂时拿不定主意的物品装箱后，不标内容和复查日期，之后又找不到",
      ],
      keepTitle: "什么值得真正留下",
      keepBody:
        "问问自己：“哪些东西我还想重读、看看或拿在手里？”“哪些必须保留原物，照片不能代替？”从容易选出的开始，拿不准的先放在一旁。没有统一的保留数量；你可以兼顾自己的感情和实际空间，为留下的东西安排一个好找、好保存的位置。",
      quickResetTitle: "感到无法开始时的 15 分钟启动法",
      quickResetSteps: [
        "选一个最小的范围：一个抽屉、一个鞋盒、一个文件夹",
        "设 15 分钟计时器",
        "拿起每一件，先说出（或写下）你的感觉",
        "拿不准的拍照，封进 \"待定盒\"，30-90 天后再决定",
      ],
      faqTitle: "常见问题",
      faqs: [
        ["如何整理去世亲人的遗物？", "如果没有紧迫的事情，不必马上决定丢掉什么。若因为搬家等原因需要整理，先分出重要文件，再把物品分成想保留、可以处理和暂时拿不准的三类。拿不准的可以标注内容和日期，等自己愿意时再看。保留多少、过多久再决定，都没有统一标准。"],
        ["丢掉礼物可以吗？", "已经属于你的礼物，不需要一辈子保存。你可以感谢对方的心意，同时决定不再保留物品。如果愿意，可以拍照或记下收到礼物时的故事；还能使用的东西，可以先问问是否有人需要。借来的物品或家人共有的东西，要先确认再处理。"],
        ["要不要留着以后给孩子？", "如果孩子已经能表达自己的想法，可以问问他们想留下什么。如果还不能，可以先选你希望传下去的物品，写明属于谁、是什么时候的，以及背后的故事。同时也给将来的接收者留一点选择余地，不必要求他们保留所有东西。"],
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
      "Decide what to keep, photograph, or let go with examples for cards, photos, and inherited keepsakes, plus a free printable sentimental items decision worksheet.",
    eyebrow: "Sentimental Items Guide",
    heroTitle: "How to Declutter Sentimental Items Without Guilt",
    heroSubtitle:
      "Old cards, photographs, and inherited keepsakes can be hard to sort. You may feel attached, guilty, or worried about forgetting. Start with a small group, decide what you want to preserve, and give yourself room to pause. You do not have to let something go to make progress.",
    introTitle: "Why sentimental items are harder than any other clutter",
    introBody:
      "You can move through a kitchen drawer by drawer without much pain. Sentimental items are different — each one comes with the unspoken sentence \"if I let this go, am I betraying that person, that relationship, that version of me?\" That is not a storage problem. It is an emotional problem. So the order of operations has to be different too: feel first, decide second. Once the feeling has been named, the object becomes much easier to handle.",
    stepsTitle: "How to declutter sentimental items in 7 steps",
    steps: [
      ["1. Notice the feeling before you decide", "Pick the item up without rushing to a verdict. Ask: ‘How do I feel when I see this?’ You might notice warmth, sadness, guilt, or no particular feeling. Write a sentence if it helps, then consider what you want to preserve or do next."],
      ["2. Try a photograph or a written story", "A photo can preserve an object’s appearance, while a note can preserve why it matters. Try this with a low-stakes item first and check that the file is readable and backed up. Neither has to replace an original whose texture, handwriting, or presence matters to you."],
      ["3. Ask why you are keeping it", "Do you enjoy the connection it brings, or worry that the giver would be disappointed if it were gone? You may feel both. The question is a way to separate appreciation for a person from your wish to keep an object, not a test the item has to pass."],
      ["4. Start with the pieces you most want to keep", "In a box of cards, begin with the messages you want to read again. Among school keepsakes, choose a project or yearbook that matters to you. Picking one or two items can help you begin; it is not a limit on how many you may keep. Consider the rest at your own pace, with your available storage in mind."],
      ["5. Choose a specific destination", "If you decide to release an item, choose the next action: offer it to a named person, check a donation service’s requirements, or find the appropriate recycling or disposal route. Ask before giving someone your keepsakes. Put the handoff on your calendar so the release pile does not become another permanent box."],
      ["6. Give the items you keep a suitable home", "Display an object if you enjoy seeing it, or label and store it in an album, sleeve, or memory box. Private letters can stay somewhere private. An item does not need to be useful, on display, or regularly revisited to be worth keeping."],
      ["7. Set a rhythm so sentimental clutter does not pile back up", "Once a year, or at every major life transition (move, loss, big change), walk this framework again. Sentimental items will keep arriving. The goal is to keep the pile small enough that you can still face it next time."],
    ],
    removeTitle: "What to consider releasing first (when ready)",
    removeItems: [
      "Keepsakes you have not pulled out in five or more years",
      "Expired paper items: stacks of receipts, old tickets, bulk duplicates of cards",
      "Extra copies of the same photograph, or blurred images you do not want",
      "Gifts kept out of guilt that you never actually liked",
      "Sealed memory boxes that have survived two or more moves unopened",
      "Items connected to a relationship or version of you that is no longer present",
    ],
    emotionTitle: "You can keep the connection without keeping every object",
    emotionBody:
      "An object can be a meaningful link to a person or a time in your life. You do not have to deny that connection to decide how much to keep. A few originals, a recorded story, or a labelled photo album may preserve what you want; some items may deserve to stay exactly as they are. Letting something go is not a test of whether you have processed grief, and keeping it is not a failure.",
    permissionTitle: "Things you are allowed to do (a permission list)",
    permissionIntro:
      "Most people stuck on sentimental items are not stuck on \"how to throw something away.\" They are stuck on \"am I allowed to.\" The following are all allowed:",
    permissionItems: [
      "It is OK to let go of things from people you love",
      "It is OK to keep one piece instead of all of them",
      "It is OK to photograph something and then release the object",
      "It is OK to appreciate a gift without keeping the object forever",
      "It is OK to admit you never actually liked the item you have been keeping out of guilt",
      "It is OK to pause. Pause is not the same as keeping forever — put it in a maybe box, revisit in 30 to 90 days",
    ],
    inheritedTitle: "A note on inherited items",
    inheritedBody:
      "With inherited belongings, consider both the connection you want to preserve and the space, time, or cost involved in keeping them. If other family members are involved, confirm ownership and ask what they would like before making decisions. Agree on who will keep each item and when any handoff will happen. A missed response date does not give you permission to dispose of someone else’s property; make release decisions only for items you have the authority to handle.",
    mistakesTitle: "Common mistakes when decluttering sentimental items",
    mistakes: [
      "Starting with sentimental items first — train decision muscles on easier categories before tackling the heaviest one",
      "Asking permission from people who do not live with the items — they are not paying the storage cost, so their answer skews toward \"keep it\"",
      "Treating appreciation for a giver as an obligation to store every gift",
      "Putting undecided items in an unlabelled box with no way to find or review them later",
    ],
    keepTitle: "What truly deserves to stay",
    keepBody:
      "Ask which pieces you want to read, see, or hold again, and which originals matter in a way a photograph cannot replace. Begin with the easy choices and set uncertain items aside. There is no correct number to keep. Consider both your attachment and your storage space, then give the collection you choose a home where you can find it.",
    quickResetTitle: "How to start when you feel paralyzed",
    quickResetSteps: [
      "Pick the smallest possible scope: one drawer, one shoebox, one folder",
      "Set a 15-minute timer",
      "For each item, say or write the feeling first, then the decision",
      "Whatever you cannot decide on: photograph it, put it in a maybe box with today's date, and revisit in 30 to 90 days",
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      ["How do I declutter sentimental items from a deceased loved one?", "If there is no urgent deadline, you do not need to make release decisions now. If a move or home clearance means you must sort, separate important records first, then work in small groups: items to keep, items you are comfortable releasing, and items you are unsure about. Label the uncertain items and revisit them when you feel ready. There is no universal timeline or number you need to keep."],
      ["Is it OK to throw away gifts?", "You do not have to store a gift you own for life. You can appreciate the gesture and still decide not to keep the object. If you want a record, take a photograph or write down the story. Offer usable items to someone who wants them, or check a donation service’s requirements. Confirm before releasing anything borrowed or jointly owned."],
      ["Should I keep things for my future kids or grandkids?", "If you can ask them, find out what they would like to keep. If not, choose pieces whose stories you want to pass on and record who they belonged to, when they were used, and why they matter. Leave future recipients room to make their own choices rather than expecting them to keep everything."],
    ],
    relatedTitle: "Related guides",
    relatedIntro: "Sentimental decluttering does not happen in isolation. These guides connect to it:",
    relatedLinks: [
      { href: "/how-to-declutter-old-cards-and-letters", label: "How to declutter old cards and letters" },
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
  if (!isValidLocale(lang) || lang === "es") return {};
  const locale = lang;
  const copy = getCopy(locale);

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLanguageAlternates(locale, "/how-to-declutter-sentimental-items"),
  };
}

export default async function SentimentalItemsPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLocale(lang) || lang === "es") notFound();
  const locale = lang;
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
          {locale === "en" && <div className="mt-7 flex flex-wrap gap-4 text-sm font-bold">
            <a href="#decision-worksheet" className="rounded-full bg-[#002d1c] px-6 py-3 text-white hover:bg-[#335748]">Use the printable decision worksheet</a>
            <Link href="/en/decluttering-decision-guide" className="rounded-full bg-[#dcebdd] px-6 py-3 text-[#002d1c] hover:bg-[#cbdcce]">Open the decision guide →</Link>
          </div>}
        </section>

        {locale === "en" && <><SentimentalDecisionExamples /><SentimentalWorksheet /></>}

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
