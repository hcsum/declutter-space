export type GradeKey = "excellent" | "good" | "fair" | "poor" | "bad";

export type CpwCopy = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  homeLabel: string;
  breadcrumbLabel: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  tool: {
    formTitle: string;
    itemLabel: string;
    itemPlaceholder: string;
    priceLabel: string;
    priceHelp: string;
    alterationsLabel: string;
    alterationsHelp: string;
    careLabel: string;
    careHelp: string;
    modeLabel: string;
    modeEveryday: string;
    modeOccasion: string;
    modeHelpEveryday: string;
    modeHelpOccasion: string;
    unitLabel: string;
    unitWears: string;
    unitDays: string;
    countLabelWears: string;
    countLabelDays: string;
    countHelp: string;
    presetsWears: { label: string; value: number }[];
    presetsDays: { label: string; value: number }[];
    resultTitle: string;
    unnamedItem: string;
    totalCostLabel: string;
    cpwLabel: string;
    perWear: string;
    perDay: string;
    grades: Record<GradeKey, { name: string; body: string }>;
    thirtyTitle: string;
    thirtyBody: string;
    thirtyShortfall: string;
    thirtyClear: string;
    targetNote: string;
    targetReached: string;
    incompleteTitle: string;
    incompleteBody: string;
    saveLabel: string;
    savedTitle: string;
    savedEmpty: string;
    removeLabel: string;
    clearAllLabel: string;
    tableItem: string;
    tableTotal: string;
    tableCount: string;
    tableCpw: string;
    tableGrade: string;
    resetLabel: string;
    savedNote: string;
  };
  formulaTitle: string;
  formulaExpression: string;
  formulaBody: string[];
  goodTitle: string;
  goodIntro: string;
  tableRangeHeader: string;
  tableVerdictHeader: string;
  everydayTableTitle: string;
  everydayRows: { range: string; verdict: string }[];
  occasionTableTitle: string;
  occasionRows: { range: string; verdict: string }[];
  occasionNote: string;
  thirtyTestTitle: string;
  thirtyTestBody: string[];
  nonClothingTitle: string;
  nonClothingBody: string[];
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  relatedTitle: string;
  relatedIntro: string;
  relatedLinks: { href: string; label: string }[];
};

const en: CpwCopy = {
  metaTitle: "Cost Per Wear Calculator (Everyday + Occasion) | DeclutterYourHome",
  metaDescription:
    "Free cost per wear calculator. Add price, alterations and care, then get the cost per wear with separate thresholds for everyday pieces and occasion pieces, plus the 30-wear test.",
  keywords: [
    "cost per wear calculator",
    "cost per wear",
    "cost per use",
    "how to calculate cost per wear",
    "cost per wear tracker",
    "30 wear test",
  ],
  homeLabel: "Home",
  breadcrumbLabel: "Cost per wear calculator",
  eyebrow: "Before you buy it",
  heroTitle: "Cost per wear calculator",
  heroSubtitle:
    "Price tells you what something costs once. Cost per wear tells you what it costs every time you use it. Add the price, the alterations and the cleaning, choose whether this is an everyday piece or an occasion piece — because those are judged on completely different scales — and get an honest number in a few seconds.",
  tool: {
    formTitle: "Calculate cost per wear",
    itemLabel: "What are you pricing?",
    itemPlaceholder: "Wool coat, running shoes, wedding suit...",
    priceLabel: "Purchase price",
    priceHelp: "The amount you actually pay, after any discount.",
    alterationsLabel: "Alterations (optional)",
    alterationsHelp: "Hemming, tailoring, resizing, resoling.",
    careLabel: "Care and cleaning over its life (optional)",
    careHelp:
      "Dry cleaning, specialist washing, repairs, waterproofing. A coat that needs $20 of dry cleaning twice a winter is not priced like one you throw in the machine.",
    modeLabel: "What kind of item is it?",
    modeEveryday: "Everyday piece",
    modeOccasion: "Occasion piece",
    modeHelpEveryday:
      "Things you wear or use in ordinary life: coats, jeans, boots, work bags, kitchen tools. Judged on a strict scale, because there are hundreds of chances to use them.",
    modeHelpOccasion:
      "Formal wear, wedding outfits, ski gear, a suit for interviews. A high cost per wear is normal here — the alternative is renting, and renting is rarely cheaper across a handful of uses.",
    unitLabel: "Count in",
    unitWears: "Wears / uses",
    unitDays: "Days owned",
    countLabelWears: "How many times will you realistically wear or use it?",
    countLabelDays: "How many days will you actually use it?",
    countHelp:
      "Use the number you believe on an ordinary Tuesday, not the number you believe in the shop.",
    presetsWears: [
      { label: "Twice a week for 2 years (200)", value: 200 },
      { label: "Weekly for a year (52)", value: 52 },
      { label: "The 30-wear test (30)", value: 30 },
      { label: "A few times (5)", value: 5 },
    ],
    presetsDays: [
      { label: "Daily for a year (365)", value: 365 },
      { label: "Daily for 3 months (90)", value: 90 },
      { label: "One month (30)", value: 30 },
      { label: "One week (7)", value: 7 },
    ],
    resultTitle: "Your cost per wear",
    unnamedItem: "This item",
    totalCostLabel: "True total cost",
    cpwLabel: "Cost per wear",
    perWear: "per wear",
    perDay: "per day",
    grades: {
      excellent: {
        name: "Excellent",
        body: "This is what a well-chosen piece looks like. The price stopped mattering a long time before the last wear.",
      },
      good: {
        name: "Good",
        body: "A reasonable trade. Most things you actually reach for land in this band, and nothing here needs a second thought.",
      },
      fair: {
        name: "Fair",
        body: "Defensible, but only if you are honest about the wear count. Add ten more realistic wears and this becomes good; drop ten and it becomes poor.",
      },
      poor: {
        name: "Poor",
        body: "You are paying rental prices to own something. Either the price is too high for how you live, or the wear count is optimistic. Look hard at which one.",
      },
      bad: {
        name: "Expensive per wear",
        body: "At this rate the item costs more each time you use it than most people would pay to rent it. Unless it is genuinely irreplaceable, this is the purchase to walk away from.",
      },
    },
    thirtyTitle: "The 30-wear test",
    thirtyBody: "Worn 30 times, this costs {value} each time.",
    thirtyShortfall:
      "You expect {count} wears, which is below 30. That is the classic sign of a piece bought for a mood rather than a life.",
    thirtyClear: "Your estimate clears 30 wears, so the test is already passed.",
    targetNote:
      "To bring this under {target} per wear, you need {count} wears in total.",
    targetReached: "You are already under {target} per wear.",
    incompleteTitle: "Add a price and a wear count",
    incompleteBody:
      "Cost per wear needs two numbers. Alterations and cleaning are optional, but they are where most people underestimate what a garment really costs.",
    saveLabel: "Save to compare",
    savedTitle: "Saved comparisons",
    savedEmpty:
      "Nothing saved yet. Save two or three options and the choice usually makes itself.",
    removeLabel: "Remove",
    clearAllLabel: "Clear all",
    tableItem: "Item",
    tableTotal: "Total cost",
    tableCount: "Wears",
    tableCpw: "Per wear",
    tableGrade: "Verdict",
    resetLabel: "Clear the form",
    savedNote:
      "Everything stays in this browser. No account, no server, no email — close the tab and nothing follows you.",
  },
  formulaTitle: "How to calculate cost per wear",
  formulaExpression:
    "Cost per wear = (price + alterations + care) ÷ number of wears",
  formulaBody: [
    "The formula is simple; the honesty is the hard part. Most cost per wear numbers online are wrong in the same two ways: they use the price on the tag and ignore everything spent afterwards, and they use the number of wears people hope for rather than the number they get.",
    "Alterations and care belong in the top of the fraction. A $180 suit that needs $60 of tailoring and $15 of dry cleaning four times a year is not a $180 suit. Over three years it is a $435 suit, and the cost per wear is more than double what the tag suggested.",
    "The bottom of the fraction should be the number you would bet money on. A useful trick: think about the last item you bought in this category and count how many times you actually wore it. That number, not your optimism, is the right starting point.",
  ],
  goodTitle: "What is a good cost per wear?",
  goodIntro:
    "There is no single answer, and that is where most calculators go wrong. An everyday coat and a wedding suit cannot be measured with the same ruler — one gets hundreds of chances to earn its price, the other gets five. Here are both scales.",
  tableRangeHeader: "Cost per wear",
  tableVerdictHeader: "What it means",
  everydayTableTitle: "Everyday pieces",
  everydayRows: [
    { range: "Under $1", verdict: "Excellent. The item has long since paid for itself." },
    { range: "$1 - $5", verdict: "Good. This is where most well-used wardrobe staples land." },
    { range: "$5 - $10", verdict: "Fair. Fine for a heavier piece like a coat or boots, questionable for a t-shirt." },
    { range: "$10 - $25", verdict: "Poor. You are close to what renting would cost." },
    { range: "Over $25", verdict: "Expensive per wear. Either the price is too high or the wear count is fantasy." },
  ],
  occasionTableTitle: "Occasion pieces",
  occasionRows: [
    { range: "Under $10", verdict: "Excellent for something you wear a handful of times." },
    { range: "$10 - $25", verdict: "Good. Normal territory for formal wear you own rather than rent." },
    { range: "$25 - $50", verdict: "Fair. Acceptable for a suit or a gown; compare it against rental prices." },
    { range: "$50 - $100", verdict: "Poor. Renting is probably cheaper unless you need it on short notice." },
    { range: "Over $100", verdict: "Expensive per wear. Rent it, borrow it, or rewear something you own." },
  ],
  occasionNote:
    "This split is the reason a wedding guest dress at $40 per wear is not a mistake and a pair of jeans at $40 per wear is. Same number, different question.",
  thirtyTestTitle: "The 30-wear test",
  thirtyTestBody: [
    "Before you buy anything you plan to wear regularly, ask one question: will I wear this at least 30 times? The 30-wear test came out of the anti-fast-fashion campaigns of the mid-2010s, and it survives because it is short enough to ask in a shop.",
    "Thirty is not a magic number — it is a filter. Anything you would genuinely wear thirty times has to fit your actual body, your actual weather and your actual week, which quietly eliminates most impulse buys. If you cannot picture thirty specific occasions, you are buying a mood rather than a garment.",
    "The calculator above runs this automatically: it always shows what the item would cost at 30 wears, so you can compare a piece you are unsure about against the one already in your closet.",
  ],
  nonClothingTitle: "Cost per use for things that are not clothes",
  nonClothingBody: [
    "The same maths prices appliances, tools, gear and subscriptions — the word just changes from wear to use. A $400 espresso machine used every morning for two years is about $0.55 per use, which beats almost any cafe. A $250 pasta maker used four times is $62.50 per use, which is takeout money for something living in a cupboard.",
    "For things you own by time rather than by session — a subscription, a storage unit, a second fridge — switch the calculator to days. Cost per day is the honest unit there, and it tends to be uncomfortable in a useful way.",
  ],
  faqTitle: "Cost per wear FAQ",
  faqs: [
    {
      question: "What does cost per wear mean?",
      answer:
        "Cost per wear is the price of an item divided by the number of times you wear it, including alterations and cleaning. It converts a one-off price into the number you actually experience — what the item costs each time it does its job. A $300 coat worn 200 times costs $1.50 a wear; a $60 dress worn twice costs $30.",
    },
    {
      question: "How do you calculate cost per wear?",
      answer:
        "Add the purchase price, any alterations and the expected care costs, then divide by the number of times you will realistically wear it. The calculator on this page does it for you and grades the result against everyday or occasion thresholds, which is the part that decides whether a number is good or bad.",
    },
    {
      question: "What is a good cost per wear?",
      answer:
        "For everyday pieces, under $1 per wear is excellent, $1-5 is good, and anything over $10 deserves scrutiny. For occasion pieces the scale shifts up by roughly four times: $20-40 per wear for a suit or formal dress is normal and widely accepted. Judging an occasion item by the everyday scale is the most common way people reach the wrong conclusion.",
    },
    {
      question: "Is there a cost per wear app or spreadsheet?",
      answer:
        "There are wardrobe apps that log every outfit and calculate cost per wear over months — useful if you enjoy tracking. This page is deliberately the other thing: a calculator for the thirty seconds before you buy, when the decision is still reversible. No account, no logging, no habit to maintain.",
    },
    {
      question: "Should dry cleaning count in cost per wear?",
      answer:
        "Yes, and it is the most commonly ignored cost. Two dry cleans a season across five years can add more than half the original price for a coat or a suit. If a garment needs professional care, that is part of what owning it costs, so put it in the care field.",
    },
    {
      question: "Does cost per wear work for shoes, bags and non-clothing?",
      answer:
        "Yes. The same formula prices shoes, bags, appliances, tools and gear — it is called cost per use once it leaves the wardrobe. Switch the calculator's unit to days for anything you own by time rather than by session, such as a subscription or a storage unit.",
    },
  ],
  relatedTitle: "Related tools and guides",
  relatedIntro:
    "Cost per wear answers one question. These handle the rest of the decision:",
  relatedLinks: [
    { href: "/should-i-buy-it", label: "Should I buy it? Purchase decision scorer" },
    { href: "/how-to-declutter-your-closet", label: "How to declutter your closet" },
    { href: "/things-to-stop-buying", label: "10 things to stop buying for a clutter-free home" },
    { href: "/decluttering-decision-guide", label: "Decision guide for items you are unsure about" },
  ],
};

const zh: CpwCopy = {
  metaTitle: "Cost Per Wear 计算器（日常款 / 场合款分开算）| DeclutterYourHome",
  metaDescription:
    "免费的 cost per wear 计算器。填入价格、改衣费和保养费，得到每次穿着成本，并按日常款和场合款两套标准分别评级，附带 30-wear test。",
  keywords: [
    "cost per wear 计算器",
    "每次穿着成本",
    "每次使用成本",
    "cost per wear",
    "30 wear test",
    "衣服值不值得买",
  ],
  homeLabel: "首页",
  breadcrumbLabel: "Cost per wear 计算器",
  eyebrow: "买之前先算一次",
  heroTitle: "Cost per wear 计算器",
  heroSubtitle:
    "价格只告诉你它花了多少钱一次，cost per wear 告诉你每穿一次花多少钱。填入价格、改衣费和清洗保养费，再选它是日常款还是场合款——这两类必须用完全不同的尺子衡量——几秒钟就能得到一个诚实的数字。",
  tool: {
    formTitle: "计算每次穿着成本",
    itemLabel: "你要算的是什么？",
    itemPlaceholder: "羊毛大衣、跑鞋、婚礼西装……",
    priceLabel: "购买价格",
    priceHelp: "实际付出去的钱，折扣后的金额。",
    alterationsLabel: "改衣费（可选）",
    alterationsHelp: "收腰、改长、改码、换鞋底。",
    careLabel: "整个使用周期的保养清洗费（可选）",
    careHelp:
      "干洗、特殊洗护、修补、防水处理。一件每个冬天要干洗两次、每次 20 块的大衣，和一件直接扔洗衣机的大衣，成本完全不是一回事。",
    modeLabel: "它属于哪一类？",
    modeEveryday: "日常款",
    modeOccasion: "场合款",
    modeHelpEveryday:
      "日常生活里会穿会用的东西：外套、牛仔裤、靴子、通勤包、厨房工具。标准更严，因为它们有几百次机会把价格摊薄。",
    modeHelpOccasion:
      "礼服、婚礼装、滑雪装备、面试西装。这类东西单次成本高是正常的——替代方案是租，而只穿几次的情况下，租未必更便宜。",
    unitLabel: "按什么计算",
    unitWears: "按次数",
    unitDays: "按天数",
    countLabelWears: "你现实中会穿 / 用它多少次？",
    countLabelDays: "你实际会用它多少天？",
    countHelp: "填你在一个平常日子里会相信的数字，不是站在店里时相信的那个。",
    presetsWears: [
      { label: "每周两次，穿两年（200）", value: 200 },
      { label: "每周一次，穿一年（52）", value: 52 },
      { label: "30-wear test（30）", value: 30 },
      { label: "只穿几次（5）", value: 5 },
    ],
    presetsDays: [
      { label: "每天用，用一年（365）", value: 365 },
      { label: "每天用，用三个月（90）", value: 90 },
      { label: "一个月（30）", value: 30 },
      { label: "一周（7）", value: 7 },
    ],
    resultTitle: "你的每次穿着成本",
    unnamedItem: "这件东西",
    totalCostLabel: "真实总成本",
    cpwLabel: "每次成本",
    perWear: "每次",
    perDay: "每天",
    grades: {
      excellent: {
        name: "非常好",
        body: "这就是选对了的样子。早在最后一次穿之前，价格就已经不重要了。",
      },
      good: {
        name: "不错",
        body: "划算的交换。大多数你真的会伸手去拿的东西都落在这一档，不需要再纠结。",
      },
      fair: {
        name: "一般",
        body: "说得过去，前提是使用次数填得诚实。再多十次就进入「不错」，少十次就掉到「偏贵」。",
      },
      poor: {
        name: "偏贵",
        body: "你在用接近租金的价格买下所有权。要么价格相对你的生活方式偏高，要么使用次数估得太乐观，得想清楚是哪一个。",
      },
      bad: {
        name: "单次成本过高",
        body: "按这个价格，你每用一次花的钱比多数人租一次还多。除非它真的无可替代，否则这就是该放下的那一件。",
      },
    },
    thirtyTitle: "30-wear test",
    thirtyBody: "如果穿满 30 次，每次成本是 {value}。",
    thirtyShortfall:
      "你预计只会穿 {count} 次，不到 30 次。这通常说明它是为一时的心情买的，而不是为生活买的。",
    thirtyClear: "你的估计已经超过 30 次，这一关过了。",
    targetNote: "要把单次成本压到 {target} 以内，总共需要穿 {count} 次。",
    targetReached: "已经低于 {target} 每次了。",
    incompleteTitle: "先填价格和使用次数",
    incompleteBody:
      "算 cost per wear 至少需要两个数字。改衣费和清洗费可以不填，但绝大多数人低估一件衣服的真实成本，恰恰就漏在这两项上。",
    saveLabel: "保存以便比较",
    savedTitle: "已保存的对比",
    savedEmpty: "还没有保存。存两三个候选，答案通常会自己浮出来。",
    removeLabel: "删除",
    clearAllLabel: "全部清空",
    tableItem: "物品",
    tableTotal: "总成本",
    tableCount: "次数",
    tableCpw: "每次",
    tableGrade: "评级",
    resetLabel: "清空表单",
    savedNote:
      "所有内容只留在这台浏览器里。不用账号、不上传、不要邮箱——关掉页面就没有任何东西跟着你。",
  },
  formulaTitle: "cost per wear 怎么算",
  formulaExpression: "每次穿着成本 =（购买价 + 改衣费 + 保养费）÷ 穿着次数",
  formulaBody: [
    "公式很简单，难的是诚实。网上大部分 cost per wear 都错在同样两处：只用吊牌价、忽略买回来之后花的钱；以及用「希望穿的次数」代替「实际会穿的次数」。",
    "改衣和保养属于分子。一件 180 块的西装，改衣 60 块、一年干洗四次每次 15 块，它就不是一件 180 块的西装。三年下来是 435 块，单次成本比吊牌价暗示的翻了一倍还多。",
    "分母要填你敢下注的那个数。一个好用的办法：想想上一件同类物品，你实际穿了多少次。那个数字才是起点，而不是你的乐观。",
  ],
  goodTitle: "每次穿着成本多少算好？",
  goodIntro:
    "没有唯一答案，而这正是大多数计算器出错的地方。日常大衣和婚礼西装不能用同一把尺子量——前者有几百次机会摊薄价格，后者只有五次。下面是两套标准。",
  tableRangeHeader: "每次成本",
  tableVerdictHeader: "含义",
  everydayTableTitle: "日常款",
  everydayRows: [
    { range: "低于 $1", verdict: "非常好。这件东西早就把自己的钱赚回来了。" },
    { range: "$1 – $5", verdict: "不错。大多数被反复穿的衣柜主力都落在这一档。" },
    { range: "$5 – $10", verdict: "一般。大衣、靴子这类重件可以接受，T 恤就说不过去。" },
    { range: "$10 – $25", verdict: "偏贵。已经接近租一次的价格了。" },
    { range: "高于 $25", verdict: "单次成本过高。要么价格太贵，要么使用次数是幻想。" },
  ],
  occasionTableTitle: "场合款",
  occasionRows: [
    { range: "低于 $10", verdict: "对只穿几次的东西来说非常好。" },
    { range: "$10 – $25", verdict: "不错。自己买而不是租的礼服，正常就在这个区间。" },
    { range: "$25 – $50", verdict: "一般。西装或礼服可以接受，但值得和租赁价格比一比。" },
    { range: "$50 – $100", verdict: "偏贵。除非要临时应急，租大概率更划算。" },
    { range: "高于 $100", verdict: "单次成本过高。去租、去借，或者重新穿已有的那件。" },
  ],
  occasionNote:
    "这套区分正是为什么：一条婚礼客装 $40 一次并不算错，而一条牛仔裤 $40 一次就是错的。同一个数字，问的却是不同的问题。",
  thirtyTestTitle: "30-wear test（会穿够 30 次吗）",
  thirtyTestBody: [
    "买任何打算常穿的东西之前，先问一句：我会穿够 30 次吗？这个问题来自 2010 年代中期反快时尚的行动，它能留下来，是因为它短到可以在店里问出口。",
    "30 不是什么神奇数字，它是个过滤器。真能穿 30 次的东西，必须适配你真实的身材、真实的天气和真实的一周，这条件本身就淘汰掉了大部分冲动购买。如果你想不出 30 个具体场合，你买的是心情，不是衣服。",
    "上面的计算器会自动跑这一项：它始终显示「穿满 30 次时每次多少钱」，方便你把犹豫中的这件，和衣柜里已有的那件放在一起比。",
  ],
  nonClothingTitle: "不是衣服的东西怎么算",
  nonClothingBody: [
    "同一套算法可以给家电、工具、装备和订阅定价，只是「穿」换成了「用」。一台 400 块的咖啡机每天早上用、用两年，大约 $0.55 一次，比几乎任何咖啡馆都便宜。一台 250 块的压面机用了四次，就是 $62.5 一次——够点几顿外卖，而它躺在柜子里。",
    "对那些按时间而不是按次数拥有的东西——订阅、仓储、第二台冰箱——把计算器切到「按天数」。每天多少钱才是诚实的单位，而且它通常会让人不太舒服，那正是它有用的地方。",
  ],
  faqTitle: "Cost per wear 常见问题",
  faqs: [
    {
      question: "cost per wear 是什么意思？",
      answer:
        "cost per wear 就是把一件物品的成本（含改衣和保养）除以你穿它的次数，把一次性的价格换成你真正会体验到的数字：它每发挥一次作用要多少钱。一件 300 块的大衣穿 200 次是 $1.5 一次；一条 60 块的裙子穿两次是 $30 一次。",
    },
    {
      question: "cost per wear 怎么计算？",
      answer:
        "把购买价、改衣费和预计的保养清洗费加起来，再除以你现实中会穿的次数。这页的计算器会替你算，并且按日常款或场合款的标准给出评级——决定一个数字好不好的，正是这一步。",
    },
    {
      question: "每次穿着成本多少算好？",
      answer:
        "日常款低于 $1/次很优秀，$1–5 不错，超过 $10 就该仔细想想。场合款整体上移大约四倍：西装或礼服 $20–40 一次是普遍接受的正常范围。用日常款的标准去衡量场合款，是人们得出错误结论最常见的方式。",
    },
    {
      question: "有 cost per wear 的 app 或表格吗？",
      answer:
        "有一类衣橱 app 会记录每天的搭配、长期统计每件衣服的 cost per wear，喜欢记录的人会觉得好用。这页刻意做的是另一件事：服务于「买之前的三十秒」，那时决定还可以撤回。不用账号，不用记录，不用维持任何习惯。",
    },
    {
      question: "干洗费要算进去吗？",
      answer:
        "要，而且这是最常被忽略的一项。一件大衣或西装，五年里每季干洗两次，累计能超过原价的一半。如果一件衣服必须专业护理，那就是拥有它的成本的一部分，填进保养一栏。",
    },
    {
      question: "鞋、包和非服装类也能这样算吗？",
      answer:
        "可以。同一个公式适用于鞋、包、家电、工具和装备——离开衣柜之后，它通常叫 cost per use。对订阅、仓储这类按时间拥有的东西，把计算器的单位切成「按天数」。",
    },
  ],
  relatedTitle: "相关工具与指南",
  relatedIntro: "cost per wear 只回答一个问题，剩下的交给这些：",
  relatedLinks: [
    { href: "/should-i-buy-it", label: "该不该买？购买决策打分器" },
    { href: "/how-to-declutter-your-closet", label: "如何整理衣柜" },
    { href: "/things-to-stop-buying", label: "10 件该停止买的东西" },
    { href: "/decluttering-decision-guide", label: "犹豫物品决策指南" },
  ],
};

const ja: CpwCopy = {
  metaTitle: "コストパーウェア計算機（普段着・特別な日を分けて判定）| DeclutterYourHome",
  metaDescription:
    "無料の cost per wear 計算機。価格・お直し代・お手入れ代を入れると1回あたりのコストが出ます。普段着と特別な日の服で基準を分け、30-wear test も表示します。",
  keywords: [
    "コストパーウェア",
    "cost per wear",
    "1回あたりのコスト",
    "服 買うべきか",
    "30 wear test",
  ],
  homeLabel: "ホーム",
  breadcrumbLabel: "コストパーウェア計算機",
  eyebrow: "買う前に一度だけ計算する",
  heroTitle: "コストパーウェア計算機",
  heroSubtitle:
    "値段は「一度いくらか」しか教えてくれません。cost per wear は「1回着るごとにいくらか」を教えてくれます。価格、お直し代、お手入れ代を入れ、普段着か特別な日の服かを選ぶだけ。この2つはまったく別のものさしで測る必要があります。",
  tool: {
    formTitle: "1回あたりのコストを計算する",
    itemLabel: "何を計算しますか？",
    itemPlaceholder: "ウールのコート、ランニングシューズ、結婚式のスーツ…",
    priceLabel: "購入価格",
    priceHelp: "割引後の、実際に支払う金額。",
    alterationsLabel: "お直し代（任意）",
    alterationsHelp: "丈詰め、サイズ調整、靴底の交換など。",
    careLabel: "使い切るまでのお手入れ・クリーニング代（任意）",
    careHelp:
      "ドライクリーニング、特殊な洗濯、修理、防水加工。毎冬2回、1回2,000円のクリーニングが要るコートは、洗濯機に放り込めるコートとは別物です。",
    modeLabel: "どちらのタイプですか？",
    modeEveryday: "普段使いの物",
    modeOccasion: "特別な日の物",
    modeHelpEveryday:
      "日常で着る・使う物。コート、デニム、ブーツ、通勤バッグ、キッチン道具など。使う機会が何百回もあるため、基準は厳しめです。",
    modeHelpOccasion:
      "フォーマル、結婚式の服、スキー用品、面接用のスーツ。1回あたりが高くなるのは普通です。代わりの選択肢はレンタルで、数回の利用ならレンタルが安いとは限りません。",
    unitLabel: "数え方",
    unitWears: "回数で数える",
    unitDays: "日数で数える",
    countLabelWears: "現実的に何回着ますか・使いますか？",
    countLabelDays: "実際に何日使いますか？",
    countHelp: "店頭で信じられる数字ではなく、普通の火曜日に信じられる数字を。",
    presetsWears: [
      { label: "週2回を2年（200）", value: 200 },
      { label: "週1回を1年（52）", value: 52 },
      { label: "30-wear test（30）", value: 30 },
      { label: "数回だけ（5）", value: 5 },
    ],
    presetsDays: [
      { label: "毎日1年（365）", value: 365 },
      { label: "毎日3か月（90）", value: 90 },
      { label: "1か月（30）", value: 30 },
      { label: "1週間（7）", value: 7 },
    ],
    resultTitle: "1回あたりのコスト",
    unnamedItem: "この品物",
    totalCostLabel: "本当の総コスト",
    cpwLabel: "1回あたり",
    perWear: "／回",
    perDay: "／日",
    grades: {
      excellent: {
        name: "とても良い",
        body: "選び方が正しかった証拠です。最後に着るずっと前から、値段は問題ではなくなっています。",
      },
      good: {
        name: "良い",
        body: "納得できる交換です。実際に手が伸びる物のほとんどはこの帯に入ります。迷う必要はありません。",
      },
      fair: {
        name: "ふつう",
        body: "回数を正直に見積もっているなら妥当です。あと10回増えれば「良い」、10回減れば「割高」になります。",
      },
      poor: {
        name: "割高",
        body: "レンタルに近い単価を払って所有していることになります。値段が生活に対して高いのか、回数が楽観的なのか、どちらかを見極めてください。",
      },
      bad: {
        name: "1回あたりが高すぎる",
        body: "この単価では、1回使うたびに多くの人がレンタルに払う額を超えます。本当に代えがきかない物でなければ、見送るべき買い物です。",
      },
    },
    thirtyTitle: "30-wear test",
    thirtyBody: "30回着た場合、1回あたり {value} になります。",
    thirtyShortfall:
      "見積もりは {count} 回で、30回に届いていません。生活のためではなく気分のために買おうとしているサインです。",
    thirtyClear: "見積もりは30回を超えているので、このテストは通過しています。",
    targetNote: "1回あたり {target} 未満にするには、合計 {count} 回必要です。",
    targetReached: "すでに1回あたり {target} を下回っています。",
    incompleteTitle: "価格と回数を入力してください",
    incompleteBody:
      "計算には2つの数字が必要です。お直しとお手入れは任意ですが、服の本当のコストを見誤るのはたいていこの2項目です。",
    saveLabel: "保存して比べる",
    savedTitle: "保存した比較",
    savedEmpty: "まだ保存がありません。候補を2〜3件保存すると、答えはたいてい自然に決まります。",
    removeLabel: "削除",
    clearAllLabel: "すべて消す",
    tableItem: "品物",
    tableTotal: "総コスト",
    tableCount: "回数",
    tableCpw: "1回あたり",
    tableGrade: "判定",
    resetLabel: "入力をクリア",
    savedNote:
      "すべてこのブラウザーの中だけに残ります。アカウントもサーバー保存もメールも不要です。",
  },
  formulaTitle: "cost per wear の計算方法",
  formulaExpression:
    "1回あたりのコスト =（価格 + お直し代 + お手入れ代）÷ 着用回数",
  formulaBody: [
    "式は簡単で、難しいのは正直さのほうです。ネット上の cost per wear は同じ2点で外れます。値札の価格しか使わず購入後の出費を無視すること、そして実際の回数ではなく期待した回数を使うことです。",
    "お直しとお手入れは分子に入ります。18,000円のスーツに6,000円のお直しと年4回×1,500円のクリーニングが必要なら、それは18,000円のスーツではありません。3年で43,500円になり、1回あたりは値札から想像する額の倍以上になります。",
    "分母には、自分が賭けられる数字を入れてください。役に立つ方法があります。同じカテゴリーで前回買った物を、実際に何回着たか数えるのです。楽観ではなくその数字が出発点です。",
  ],
  goodTitle: "1回あたりいくらなら良い？",
  goodIntro:
    "唯一の答えはなく、多くの計算機はここで間違えます。普段のコートと結婚式のスーツを同じものさしでは測れません。前者には価格を薄める機会が何百回もあり、後者には5回しかありません。両方の基準を載せます。",
  tableRangeHeader: "1回あたり",
  tableVerdictHeader: "意味",
  everydayTableTitle: "普段使いの物",
  everydayRows: [
    { range: "150円未満", verdict: "とても良い。とっくに元は取れています。" },
    { range: "150〜750円", verdict: "良い。よく使うワードローブの主力はこの帯に入ります。" },
    { range: "750〜1,500円", verdict: "ふつう。コートやブーツなら妥当、Tシャツなら疑問です。" },
    { range: "1,500〜3,700円", verdict: "割高。レンタル代に近づいています。" },
    { range: "3,700円以上", verdict: "高すぎます。価格が高いか、回数が空想かのどちらかです。" },
  ],
  occasionTableTitle: "特別な日の物",
  occasionRows: [
    { range: "1,500円未満", verdict: "数回しか着ない物としてはとても良い。" },
    { range: "1,500〜3,700円", verdict: "良い。レンタルではなく所有するフォーマルの標準的な範囲です。" },
    { range: "3,700〜7,500円", verdict: "ふつう。スーツやドレスなら許容範囲。レンタル価格と比べてみてください。" },
    { range: "7,500〜15,000円", verdict: "割高。急ぎでなければレンタルのほうが安い可能性が高いです。" },
    { range: "15,000円以上", verdict: "高すぎます。借りる、レンタルする、手持ちを着回すほうが賢明です。" },
  ],
  occasionNote:
    "この区別があるから、結婚式用のドレスが1回6,000円なら失敗ではなく、デニムが1回6,000円なら失敗になります。同じ数字でも、問いが違うのです。",
  thirtyTestTitle: "30-wear test（30回着る？）",
  thirtyTestBody: [
    "普段着るつもりの物を買う前に、1つだけ質問してください。これを30回以上着るだろうか。2010年代半ばのファストファッション反対運動から生まれた問いで、店の中で口に出せるほど短いから今も残っています。",
    "30は魔法の数字ではなくフィルターです。本当に30回着る物は、実際の体型・実際の天気・実際の1週間に合っていなければならず、その条件だけで衝動買いの大半が消えます。具体的な機会を30回思い浮かべられないなら、買っているのは服ではなく気分です。",
    "上の計算機はこれを自動で表示します。30回着たときの単価が常に出るので、迷っている1着と、すでにクローゼットにある1着を並べて比べられます。",
  ],
  nonClothingTitle: "服以外の物の1回あたりコスト",
  nonClothingBody: [
    "同じ計算で家電、工具、道具、サブスクの値段も測れます。「着る」が「使う」に変わるだけです。4万円のエスプレッソマシンを毎朝2年使えば1回およそ55円で、たいていのカフェより安くなります。2万5千円のパスタマシンを4回使ったなら1回6,250円。戸棚で眠っている物に外食1回分を払っている計算です。",
    "回数ではなく時間で持つ物——サブスク、トランクルーム、2台目の冷蔵庫——は、計算機を日数に切り替えてください。1日あたりが正直な単位で、たいてい少し居心地が悪くなります。それが役に立つところです。",
  ],
  faqTitle: "コストパーウェアのよくある質問",
  faqs: [
    {
      question: "cost per wear とは何ですか？",
      answer:
        "cost per wear は、お直しやお手入れも含めた費用を着用回数で割った数字です。一度きりの値段を、実際に体感する数字——1回役に立つごとにいくらかかるか——に変換します。3万円のコートを200回着れば1回150円、6千円のワンピースを2回なら1回3千円です。",
    },
    {
      question: "どうやって計算しますか？",
      answer:
        "購入価格、お直し代、想定されるお手入れ代を足し、現実的な着用回数で割ります。このページの計算機が自動で行い、普段着か特別な日かの基準で判定します。数字が良いか悪いかを決めるのは、この判定の部分です。",
    },
    {
      question: "いくらなら良い数字ですか？",
      answer:
        "普段着なら1回150円未満で優秀、150〜750円で良好、1,500円を超えると再考の価値があります。特別な日の服は基準がおよそ4倍上がり、スーツやドレスで1回3,000〜6,000円は広く受け入れられている範囲です。特別な日の物を普段着の基準で測ることが、間違った結論に至る一番よくある道です。",
    },
    {
      question: "cost per wear のアプリや表計算はありますか？",
      answer:
        "毎日の着用を記録して長期の cost per wear を出すワードローブアプリがあり、記録が好きな人には向いています。このページは意図的に別物です。まだ引き返せる「買う直前の30秒」のための計算機で、アカウントも記録も習慣も要りません。",
    },
    {
      question: "クリーニング代は含めるべきですか？",
      answer:
        "含めるべきで、しかも最も見落とされる費用です。コートやスーツを5年間、毎シーズン2回クリーニングに出すと、購入価格の半分を超えることがあります。専門的な手入れが必要な服なら、それは所有コストの一部です。お手入れ欄に入れてください。",
    },
    {
      question: "靴やバッグ、服以外にも使えますか？",
      answer:
        "使えます。靴、バッグ、家電、工具、道具にも同じ式が当てはまり、クローゼットの外では cost per use と呼ばれます。サブスクやトランクルームのように時間で持つ物は、単位を日数に切り替えてください。",
    },
  ],
  relatedTitle: "関連ツールとガイド",
  relatedIntro: "cost per wear が答えるのは1つの問いだけです。残りはこちらで：",
  relatedLinks: [
    { href: "/should-i-buy-it", label: "これ、買うべき？ 購入判断スコア" },
    { href: "/how-to-declutter-your-closet", label: "クローゼットの片付け方" },
    { href: "/things-to-stop-buying", label: "買うのをやめたい10のもの" },
    { href: "/decluttering-decision-guide", label: "迷う物のための判断ガイド" },
  ],
};

const copies: Record<string, CpwCopy> = { en, zh, ja };

export function getCpwCopy(locale: string): CpwCopy {
  return copies[locale] ?? en;
}
