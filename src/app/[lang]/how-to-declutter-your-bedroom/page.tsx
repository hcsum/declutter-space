import type { Metadata } from "next";
import Link from "next/link";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { buildLanguageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

function getCopy(locale: string) {
  if (locale === "zh") {
    return {
      title: "如何整理卧室 | 卧室复位与睡眠空间整理指南 | DeclutterYourHome",
      description:
        "学习如何整理卧室，先清理地面、床头柜、床边表面和床底杂物，让卧室重新变回适合休息、起床和放松的房间。",
      eyebrow: "卧室空间整理指南",
      heroTitle: "如何整理卧室，让房间重新适合休息",
      heroSubtitle:
        "如果卧室总让你觉得乱、挤、睡不踏实，别先想怎么买收纳盒。先把地面、床边、床底和那些本来就不该留在卧室里的东西清出去，让这个房间重新服务睡眠、起床和放松。",
      introTitle: "卧室整理的重点，是让房间不再像待办事项堆",
      introBody:
        "卧室是你一天开始和结束的地方，所以这里的杂乱比别的房间更容易放大压力。地上的衣物、堆满的床头柜、床边线缆、床底旧物和临时放下的杯子纸张，会让这个房间一直像没收尾的现场。整理卧室时，先处理最影响睡眠和视觉负担的区域，通常比一开始就折腾衣橱系统更快见效。",
      stepsTitle: "整理卧室的 7 个步骤",
      steps: [
        ["1. 先清空地面和明显的表面杂物", "把地上的衣物、袋子、纸张、空杯子和不属于卧室的东西先移走。先解决视觉噪音，房间会立刻轻一点。"],
        ["2. 只保留真正支持睡眠的床边物品", "床头柜上只留你晚上和早上真的会用到的东西，比如灯、书、眼镜、耳塞或充电器。其余都移走。"],
        ["3. 处理卧室里长期停留却不该停留的衣物", "椅子上的衣服、床尾堆放的外套、地上的洗净衣物，都先回到衣柜、洗衣篮或别的房间。卧室先恢复动线，比深挖每件衣服更重要。"],
        ["4. 检查床底，不要让它变成延迟决策区", "床底最容易堆放“先留着看看”的东西。看不见不代表没有负担。把真正不用的移出，把需要保留的装进明确分类。"],
        ["5. 处理让你起床就分心的视觉负担", "过多的抱枕、积灰装饰、杂乱线缆、长期不用的椅子堆衣区，都会让卧室更像待办列表，而不是休息空间。"],
        ["6. 把“过去版本的你”的物品单独挑出来", "旧校服、旧工作风格的衣服、昂贵但买错的单品、带有情绪包袱的纪念物，先集中放一处，别混在日常物品里。"],
        ["7. 用清单执行，用决策指南处理犹豫项", "能立刻决定的直接清掉，拿不准的交给带期限的决策指南。这样卧室不会一直被 \"待定堆\" 拖住。"],
      ],
      removeTitle: "卧室里最该优先清掉的东西",
      removeItems: [
        "三个月没碰过的床头柜物品",
        "床边和地面上长期停留的杂物",
        "床底长期闲置又说不清用途的东西",
        "积灰又不再背的包",
        "让房间显得拥挤的多余抱枕和装饰",
        "睡不舒服却还在勉强用的枕头或床品",
      ],
      emotionTitle: "卧室杂物通常不只是杂物",
      emotionBody:
        "卧室比客厅和厨房更容易积累情绪型物品：旧关系留下的东西、旧身份留下的衣服、旧计划留下的未完成承诺。它们占用的不只是空间，也会占用你睡前和起床后的注意力。卧室整理做得好，通常不是因为你买了更多收纳工具，而是因为你更清楚什么该留在这个房间里。",
      toolTitle: "现在就开始卧室清单",
      toolDesc:
        "下面这份互动清单和卧室清单功能页共用同一套数据。你可以直接在这里勾选、添加项目、保存进度。",
      toolPage: "打开卧室清单功能页",
      mistakesTitle: "卧室整理里最常见的错误" as string | undefined,
      mistakes: [
        "还没清掉地面和床边杂物，就先去买收纳盒",
        "把椅子、床尾和床头柜当成永久缓冲区",
        "让工作文件、快递和杂物长期停留在卧室里",
        "把床底变成“以后再决定”的长期仓库",
      ] as string[],
      keepTitle: "卧室最该留给什么" as string | undefined,
      keepBody:
        "离床最近、最顺手的位置，应该留给真正支持睡眠和起床节奏的东西：舒服的床品、每天会用的灯、眼镜、书、充电器，以及少量当季常穿衣物。任何让房间看起来像还没收尾的东西，都不值得占卧室的一等位置。" as string | undefined,
      quickResetTitle: "15 分钟卧室复位法" as string | undefined,
      quickResetSteps: [
        "把地上的衣物、袋子和不属于卧室的东西全部移开",
        "清空床头柜表面，只放回睡前和起床会用到的物品",
        "把椅子、床尾和床边堆放的衣物分别送回衣柜或洗衣篮",
        "看一眼床底，拿走任何你说不清用途的东西",
      ] as string[],
      faqTitle: "卧室整理常见问题" as string | undefined,
      faqs: [
        ["最快让卧室看起来整洁的方法是什么？", "先清地面、再清床头柜、最后处理床边和床底。卧室最明显的变化几乎都来自这几块，而不是先整理抽屉内部。"],
        ["卧室里最不该长期放什么？", "工作文件、快递盒、杂乱线缆、昨天的衣服堆、长期不用的健身器材和“以后再决定”的箱子。这些都会把卧室变成待办现场。"],
        ["如果卧室太乱让我不想开始怎么办？", "只选一个最小范围，例如床头柜表面或床边一块地面，先做 10 分钟。卧室页的目标不是一次做到完美，而是先把这个房间从视觉噪音里拉出来。"],
      ] as Array<[string, string]>,
      blockersTitle: "卧室杂物的情绪卡点" as string | undefined,
      blockersBody:
        "卧室是情感杂物最容易藏的地方——床底堆着 \"以后再决定\" 的盒子、椅子上永远在 \"等会再叠\" 的衣服、抽屉里前任送的卡片、那件 \"减肥就能穿\" 的衣服。这些不是杂物的问题，是自我认同的问题。\"用，或者放手\" 在这里几乎是终极测试：如果过去 12 个月你没有用过、穿过、需要过它，下一个 12 个月也不会。" as string | undefined,
      relatedTitle: "相关阅读" as string | undefined,
      relatedIntro: "如果你接下来要处理的是不同问题：" as string | undefined,
      relatedLinks: [
        { href: "/how-to-declutter-your-closet", label: "如何整理衣柜" },
        { href: "/how-to-declutter-sentimental-items", label: "如何整理情感物品" },
        { href: "/adhd-cleaning-checklist", label: "ADHD 友好的家务清单" },
        { href: "/how-to-declutter-your-living-room", label: "如何整理客厅" },
      ] as Array<{ href: string; label: string }> | undefined,
    };
  }

  if (locale === "ja") {
    return {
      title: "寝室の片付け方 | 眠りやすい空間へ戻す寝室リセットガイド | DeclutterYourHome",
      description:
        "床、ナイトテーブル、ベッドまわり、ベッド下収納を順番に見直しながら、寝室を落ち着いて眠りやすい空間へ整える方法を紹介します。",
      eyebrow: "寝室リセットガイド",
      heroTitle: "寝室を休める部屋に戻す 7 つのステップ",
      heroSubtitle:
        "寝室がごちゃついて見えたり、落ち着いて休めなかったりするなら、最初にやるべきは収納用品を増やすことではありません。床、ベッドまわり、視界に入り続ける表面を整えて、眠るための部屋としての役割を取り戻しましょう。",
      introTitle: "寝室の片付けは、服より先に部屋を戻すこと",
      introBody:
        "寝室は一日の始まりと終わりを過ごす場所なので、ここにある散らかりはほかの部屋以上に重く感じやすいものです。床に置いた服、物が多いナイトテーブル、あふれたベッド下収納、見えるままのコードや雑貨は、眠る前も起きた直後も小さなストレスになります。ここで最初に効くのは、クローゼット全体を作り直すことではなく、部屋そのものを静かに戻すことです。",
      stepsTitle: "寝室を片付ける 7 つのステップ",
      steps: [
        ["1. まず床と目につく散らかりを片付ける", "床の服、バッグ、紙類、カップ、寝室に置く理由のないものから先にどかします。視界のノイズが減るだけで、すぐに動きやすくなります。"],
        ["2. ナイトテーブルは睡眠まわりの必需品だけにする", "夜や朝に本当に使うランプ、本、メガネ、充電器、耳栓などだけを残します。それ以外は別の場所へ移しましょう。"],
        ["3. クローゼットは明らかな no から減らす", "サイズが合わない服、シミや毛玉が目立つ服、長くタグが付いたままの服、着心地が悪くて避けている服から手放します。"],
        ["4. ベッド下収納を後回しゾーンにしない", "ベッド下は『あとで決める』物の避難場所になりがちです。見えない散らかりでも注意力と空間を奪うので、意図を持って見直します。"],
        ["5. 部屋を忙しく見せる視覚的なストレス源を減らす", "多すぎるクッション、ほこりをかぶった飾り、見えたままのコード、服置き場になった椅子は、寝室を休む場所ではなく作業待ちの場所に変えてしまいます。"],
        ["6. 過去の自分に結びつくものを分ける", "昔の制服、今の暮らしに合わない服、高かった失敗買い、感情の重い思い出の品は、日常品と混ぜたままにせず意識して見直します。"],
        ["7. 行動にはチェックリスト、迷う物には判断ガイドを使う", "今すぐ判断できる物は片付け、迷う物は期限つきの判断ガイドに移します。保留の山を寝室に残し続けないことが大切です。"],
      ],
      removeTitle: "寝室で最初に減らしたいもの",
      removeItems: [
        "3 か月触っていないナイトテーブルの物",
        "この 1 年サイズが合っていない服",
        "ほこりを集めるだけで使っていないバッグ",
        "ベッド下で眠っている未使用の収納物",
        "睡眠の質を下げている古い寝具や枕",
        "罪悪感で残している高かった買い物",
      ],
      emotionTitle: "寝室の物は「自分らしさ」にまつわる物になりやすい",
      emotionBody:
        "寝室には、物以上のものが残りやすい場所です。昔の関係の名残、理想だけが先に立つ服、終わっていない計画、もったいなくて残した買い物。だから寝室の片付けは、キッチンより感情的に重く感じることがあります。大事なのは、持ち物を減らすこと自体ではなく、この部屋が今の自分を支える状態に戻ることです。",
      toolTitle: "寝室チェックリストから始める",
      toolDesc:
        "このインタラクティブなチェックリストは、専用の寝室チェックリストページと同じライブデータを使っています。どちらのページからでも項目のチェック、追加、進捗の保存ができます。",
      toolPage: "寝室チェックリストのページを開く",
      mistakesTitle: "寝室の片付けでよくある失敗" as string | undefined,
      mistakes: [
        "何を減らすか決める前に収納ボックスを買う",
        "中身を見直さず、クローゼットに押し込む力だけを強める",
        "ベッド下を迷っている物の長期保管場所にする",
        "今の体ではなく『いつかの体型』に合う服を残し続ける",
      ],
      keepTitle: "寝室の一等地に置くべきもの" as string | undefined,
      keepBody:
        "ベッドの近くや着替えやすい場所には、今の暮らしで本当に役立つものを優先して置きましょう。今季ちゃんと着ている服、肌ざわりの良い寝具、夜に手を伸ばすランプや本。理想だけのアイテム、思い入れだけの名残、『念のため』の物は、ナイトテーブルや毎日の動線の外で十分です。" as string | undefined,
      quickResetTitle: "15 分で寝室を片付ける方法" as string | undefined,
      quickResetSteps: [
        "床の服、バッグ、寝室に不要な物をどける",
        "ナイトテーブルを空にして、夜に使う物だけ戻す",
        "クローゼットから明らかな no を 10 点抜く",
        "ベッド下を見て、用途を説明できない物を外に出す",
      ],
      faqTitle: "寝室の片付けのよくある質問" as string | undefined,
      faqs: [
        ["寝室を最速で片付けるには？", "まず床を空け、ナイトテーブルを整え、クローゼットから明らかな no を抜きます。この 3 つだけでも 15 分で部屋の印象がかなり変わります。"],
        ["圧倒されて寝室を片付けられないときは？", "部屋全体ではなく、机や棚の上など平らな面を 1 か所だけ選び、10 分だけタイマーをかけてください。全部終わらなくても、見える変化があるほうが次につながります。"],
        ["寝室に置かないほうがいいものは？", "仕事の書類、途中のクラフト用品、使っていない運動器具、壊れた電子機器、昨日の服置き場にしかなっていない椅子です。『まだやることがある』と感じさせる物は、睡眠と回復の邪魔になります。"],
      ] as Array<[string, string]>,
      blockersTitle: "寝室の散らかりの奥にある感情的なつまずき" as string | undefined,
      blockersBody:
        "寝室は思い入れのある物がいちばん隠れやすい場所です。ベッド下の『あとで決める』の山、たたむつもりで椅子に積まれた服、元恋人からのカードが入った引き出し、『痩せたら履く』デニム。問題は物そのものではなく『自分らしさ』にあります。ここでは『使うか、手放すか』が最後のテストになります。過去 12 か月で使わなかった、着なかった、必要にならなかったなら、次の 12 か月でも同じ可能性が高いです。" as string | undefined,
      relatedTitle: "関連ガイド" as string | undefined,
      relatedIntro: "部屋の外まで整えたいなら：" as string | undefined,
      relatedLinks: [
        { href: "/how-to-declutter-sentimental-items", label: "思い出の品を片付ける方法" },
        { href: "/how-to-declutter-your-closet", label: "クローゼットの片付け方" },
        { href: "/adhd-cleaning-checklist", label: "ADHD フレンドリーな掃除チェックリスト" },
        { href: "/things-to-declutter", label: "家から手放せる 60 のもの" },
      ] as Array<{ href: string; label: string }> | undefined,
    };
  }

  return {
    title: "How to Declutter Your Bedroom | Reset a Restful Sleep Space | DeclutterYourHome",
    description:
      "Learn how to declutter your bedroom by clearing floors, nightstands, bed-adjacent clutter, and under-bed storage so the room feels calmer and easier to rest in.",
    eyebrow: "Bedroom Reset Guide",
    heroTitle: "How to Declutter Your Bedroom So It Feels Restful Again",
    heroSubtitle:
      "If your bedroom feels crowded, visually noisy, or hard to relax in, do not start with storage bins. Start by clearing the floor, the bed zone, and the surfaces that keep signaling unfinished life in a room meant for sleep and recovery.",
    introTitle: "Bedroom decluttering is really a room reset",
    introBody:
      "Your bedroom is where your day begins and ends, so clutter here tends to feel heavier than clutter elsewhere. Clothes on the floor, crowded nightstands, under-bed overflow, visible cords, and random drop-zone items all create friction before sleep and first thing in the morning. The fastest wins usually come from resetting the room itself, not from rebuilding your closet system first.",
    stepsTitle: "How to declutter your bedroom in 7 steps",
    steps: [
      ["1. Clear the floor and obvious surface clutter first", "Start with clothes on the floor, bags, paper, cups, and anything that does not belong in the bedroom. Removing visual noise creates quick momentum."],
      ["2. Reset your nightstand to sleep-only essentials", "Keep only what you genuinely use at night or first thing in the morning, such as a lamp, book, glasses, charger, or earplugs. Everything else can move out."],
      ["3. Declutter your closet by removing easy noes", "Start with what is easiest to decide: clothes that do not fit, pieces with stains or heavy pilling, tags still attached after months, and items you avoid because they are uncomfortable or high maintenance."],
      ["4. Check under-bed storage before it becomes a delay zone", "Under the bed often turns into a holding area for things you do not want to decide on. Review it with intention so hidden clutter does not keep draining space and attention."],
      ["5. Remove visual stressors that make the room feel busy", "Extra throw pillows, dusty decor, visible cords, and the chair covered in clothes all make a bedroom feel less restful. The goal is calm, not just containment."],
      ["6. Separate items tied to a past version of you", "Old uniforms, clothes from a different lifestyle, expensive mistakes, and emotionally loaded keepsakes should be reviewed on purpose instead of staying mixed into everyday use."],
      ["7. Use a checklist for action and the decision guide for maybes", "Clear the easy items now, then move the maybe pile into a deadline-based process so your bedroom does not stay stuck in permanent hesitation."],
    ],
    removeTitle: "What to declutter from your bedroom first",
    removeItems: [
      "Nightstand items untouched for three months",
      "Clothes that have not fit in the past year",
      "Dust-collecting bags you no longer carry",
      "Unused storage under the bed",
      "Worn bedding or pillows that hurt sleep quality",
      "Expensive purchases you keep out of guilt",
    ],
    emotionTitle: "Bedroom clutter is often identity clutter",
    emotionBody:
      "Bedrooms collect more than objects. They collect old versions of you: relationship relics, aspirational clothes, unfinished plans, and guilt purchases. That is why bedroom decluttering can feel emotionally heavier than tidying the kitchen. The win is not owning less for its own sake. The win is making the room support who you are now.",
    toolTitle: "Start with the bedroom checklist",
    toolDesc:
      "This interactive checklist shares the same live data as the dedicated bedroom checklist page, so you can check off tasks, add items, and keep progress saved from either page.",
    toolPage: "Open the Bedroom Checklist page",
    mistakesTitle: "Common bedroom decluttering mistakes" as string | undefined,
    mistakes: [
      "Buying storage bins before deciding what to remove",
      "Stuffing the closet harder instead of editing what is inside",
      "Treating under-bed space as long-term limbo for undecided items",
      "Keeping clothes that fit a hoped-for future body instead of dressing the one you have now",
    ],
    keepTitle: "What deserves prime bedroom space" as string | undefined,
    keepBody:
      "Reserve the spots closest to where you sleep and dress for what genuinely serves daily life: clothes that fit and get worn this season, bedding that feels good against your skin, and the lamp and book you actually reach for at night. Aspirational items, sentimental holdovers, and \"just in case\" pieces belong out of the daily flow, not on the nightstand." as string | undefined,
    quickResetTitle: "How to declutter your bedroom in 15 minutes" as string | undefined,
    quickResetSteps: [
      "Clear the floor of clothes, bags, and anything that does not belong",
      "Empty the nightstand surface and put back only what you use at night",
      "Pull ten obvious noes from the closet: wrong fit, stained, never worn",
      "Look under the bed and remove anything you cannot name a use for",
    ],
    faqTitle: "Bedroom decluttering FAQ" as string | undefined,
    faqs: [
      ["What is the fastest way to declutter a bedroom?", "Clear the floor, reset the nightstand, and pull obvious noes from the closet. Those three moves change how the room feels within fifteen minutes, before you have to make any harder decisions."],
      ["How do I declutter my bedroom when I feel overwhelmed?", "Pick one surface, not the whole room, and time-box yourself to ten minutes. Stop when the timer ends even if the rest is messy. A small visible win beats a perfect plan you do not start."],
      ["What should you not keep in a bedroom?", "Working files, unfinished craft projects, exercise gear you do not use, broken electronics, and the chair that exists only to hold yesterday's clothes. Anything that signals \"there is work to do\" works against sleep and recovery."],
    ] as Array<[string, string]>,
    blockersTitle: "The emotional blockers behind bedroom clutter" as string | undefined,
    blockersBody:
      "The bedroom is where sentimental clutter hides best — the doom pile under the bed (a box of \"I'll decide later\"), the chair holding clothes you swear you'll fold, the drawer of cards from an ex, the \"when I lose weight\" jeans. None of it is really about objects. It is about identity. Use it or lose it becomes a final test in here: if the past twelve months did not bring it out, the next twelve will not either." as string | undefined,
    relatedTitle: "Related guides" as string | undefined,
    relatedIntro: "Pair this room reset with broader habit changes:" as string | undefined,
    relatedLinks: [
      { href: "/how-to-declutter-sentimental-items", label: "How to declutter sentimental items" },
      { href: "/how-to-declutter-your-closet", label: "How to declutter your closet" },
      { href: "/adhd-cleaning-checklist", label: "ADHD-friendly cleaning checklist" },
      { href: "/things-to-declutter", label: "60 things to declutter from your home" },
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
    alternates: buildLanguageAlternates(locale, "/how-to-declutter-your-bedroom"),
  };
}

export default async function BedroomPage({ params }: Props) {
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
              href={`/${locale}/declutter-checklist/bedroom`}
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
            href={`/${locale}/declutter-checklist/bedroom`}
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
