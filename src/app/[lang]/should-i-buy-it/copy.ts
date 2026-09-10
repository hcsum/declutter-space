export type ChoiceOption = {
  value: string;
  label: string;
  points: number;
};

export type BuyCopy = {
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
    usesLabel: string;
    usesHelp: string;
    usesPresets: { label: string; value: number }[];
    wageTitle: string;
    wageIntro: string;
    payLabel: string;
    payHelp: string;
    hoursLabel: string;
    hoursHelp: string;
    extraHoursLabel: string;
    extraHoursHelp: string;
    workCostsLabel: string;
    workCostsHelp: string;
    nominalWageLabel: string;
    realWageLabel: string;
    perHourSuffix: string;
    wageDropNote: string;
    questionsTitle: string;
    duplicateLabel: string;
    duplicateOptions: ChoiceOption[];
    moneyLabel: string;
    moneyOptions: ChoiceOption[];
    waitedLabel: string;
    waitedOptions: ChoiceOption[];
    storageLabel: string;
    storageOptions: ChoiceOption[];
    resultTitle: string;
    unnamedItem: string;
    scoreOutOf: string;
    costPerUseLabel: string;
    costPerUseSuffix: string;
    lifeHoursLabel: string;
    lifeHoursSuffix: string;
    lifeWeeksNote: string;
    breakdownTitle: string;
    breakdownCostPerUse: string;
    breakdownLifeHours: string;
    breakdownDuplicate: string;
    breakdownMoney: string;
    breakdownWaited: string;
    breakdownStorage: string;
    pointsSuffix: string;
    debtCapNote: string;
    incompleteTitle: string;
    incompleteBody: string;
    resetLabel: string;
    savedNote: string;
    verdicts: { min: number; title: string; body: string }[];
  };
  flowchartTitle: string;
  flowchartIntro: string;
  flowchartSteps: { question: string; no: string; yes: string }[];
  flowchartOutro: string;
  wageSectionTitle: string;
  wageSectionBody: string[];
  wageExampleTitle: string;
  wageExampleRows: { label: string; value: string }[];
  wageExampleNote: string;
  scoreSectionTitle: string;
  scoreSectionIntro: string;
  scoreRows: { name: string; points: string; body: string }[];
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  relatedTitle: string;
  relatedIntro: string;
  relatedLinks: { href: string; label: string }[];
};

const en: BuyCopy = {
  metaTitle: "Should I Buy It? Free Purchase Decision Scorer | DeclutterYourHome",
  metaDescription:
    "Should I buy it? Answer six questions and get a 0-100 score, the cost per use, and how many hours of your life the price really costs. Free, no signup.",
  keywords: [
    "should i buy it",
    "should i buy",
    "should i buy this",
    "should i buy it flowchart",
    "which one should i get",
    "cost per use calculator",
    "purchase decision tool",
  ],
  homeLabel: "Home",
  breadcrumbLabel: "Should I buy it?",
  eyebrow: "Buy-it-or-not scorer",
  heroTitle: "Should I buy it?",
  heroSubtitle:
    "Six questions, one score. This free tool turns a price tag into two numbers you can actually feel: **what each use costs**, and **how many hours of your life the price is worth**. Nothing to install, nothing sent to a server.",
  tool: {
    formTitle: "Score this purchase",
    itemLabel: "What are you thinking about buying?",
    itemPlaceholder: "Air fryer, winter coat, second monitor...",
    priceLabel: "Price",
    priceHelp: "Use whatever currency you spend in — the math works the same.",
    usesLabel: "How many times will you realistically use it?",
    usesHelp:
      "Be honest, not hopeful. Count the uses you can picture in the next two years, not the ones you can imagine over a lifetime.",
    usesPresets: [
      { label: "Daily for a year (365)", value: 365 },
      { label: "Weekly for 2 years (104)", value: 104 },
      { label: "Monthly for 3 years (36)", value: 36 },
      { label: "A handful of times (5)", value: 5 },
    ],
    wageTitle: "Your real hourly wage",
    wageIntro:
      "A price is easier to judge in hours than in money. But your real wage is not what your contract says — it is what is left after the time and money that only exist because you have a job.",
    payLabel: "Take-home pay per week (after tax)",
    payHelp: "What actually lands in your account, divided into weeks.",
    hoursLabel: "Paid hours per week",
    hoursHelp: "The hours you are paid for. Usually 35-40.",
    extraHoursLabel: "Unpaid work hours per week",
    extraHoursHelp:
      "Commute, getting ready, the extra half hour nobody logs, work calls at home. This time is spent on the job even though nobody pays for it.",
    workCostsLabel: "Work-only spending per week",
    workCostsHelp:
      "Gas, parking, transit passes, lunches out, coffee runs, work clothes, childcare you would not need otherwise.",
    nominalWageLabel: "Wage on paper",
    realWageLabel: "Your real wage",
    perHourSuffix: "per hour",
    wageDropNote: "That is {percent}% lower than the number on your payslip.",
    questionsTitle: "Four questions the calculator cannot answer for you",
    duplicateLabel: "Do you already own something that does this job?",
    duplicateOptions: [
      { value: "no", label: "No, nothing close", points: 15 },
      { value: "sort-of", label: "Something similar, but it is worse", points: 7 },
      { value: "yes", label: "Yes, and it still works", points: 0 },
    ],
    moneyLabel: "Where is the money coming from?",
    moneyOptions: [
      { value: "spare", label: "Spare cash I will not miss", points: 15 },
      { value: "tight", label: "It fits, but the month gets tight", points: 8 },
      { value: "debt", label: "Credit card or buy-now-pay-later", points: 0 },
    ],
    waitedLabel: "How long have you wanted this?",
    waitedOptions: [
      { value: "months", label: "Months — it keeps coming back", points: 15 },
      { value: "weeks", label: "A few weeks", points: 11 },
      { value: "days", label: "A few days", points: 6 },
      { value: "today", label: "I found out it existed today", points: 0 },
    ],
    storageLabel: "Where will it live in your home?",
    storageOptions: [
      { value: "spot", label: "It has a spot already", points: 10 },
      { value: "make-room", label: "I would have to make room", points: 5 },
      { value: "no-idea", label: "No idea", points: 0 },
    ],
    resultTitle: "Your result",
    unnamedItem: "This purchase",
    scoreOutOf: "out of 100",
    costPerUseLabel: "Cost per use",
    costPerUseSuffix: "per use",
    lifeHoursLabel: "Hours of your life",
    lifeHoursSuffix: "hours of work",
    lifeWeeksNote: "About {weeks} working weeks.",
    breakdownTitle: "Where the points came from",
    breakdownCostPerUse: "Cost per use",
    breakdownLifeHours: "Price in life hours",
    breakdownDuplicate: "Not a duplicate",
    breakdownMoney: "Money source",
    breakdownWaited: "How long you waited",
    breakdownStorage: "It has a home",
    pointsSuffix: "pts",
    debtCapNote:
      "Score capped at 49: paying interest on this turns a one-time price into a recurring one. If you still want it in a month, buy it with money you already have.",
    incompleteTitle: "Fill in the price and the number of uses",
    incompleteBody:
      "The score needs a price and a realistic use count. Everything else sharpens the answer, but those two carry most of it.",
    resetLabel: "Clear and start over",
    savedNote:
      "Your answers stay in this browser only. No account, no server, no email.",
    verdicts: [
      {
        min: 75,
        title: "Buy it",
        body: "This one holds up from every angle: the per-use cost is reasonable, the price is a fair trade for your hours, and you are not solving a problem you already solved. Go ahead.",
      },
      {
        min: 55,
        title: "Probably — but fix the weak spot first",
        body: "Most of this checks out. Look at the lowest row in the breakdown below: that is the part you have not thought through. If it is storage, decide where the thing lives before it arrives. If it is patience, wait one more week and see whether you still want it.",
      },
      {
        min: 35,
        title: "Not yet",
        body: "Too much of this is running on wanting it rather than using it. Put it on a list with today's date and come back in 30 days. Most items never get picked up again — that is the answer, and it costs nothing.",
      },
      {
        min: 0,
        title: "Don't buy it",
        body: "The numbers and the answers point the same way. Whatever this would fix, it is cheaper to fix by using what you own, borrowing once, or letting the urge pass. If you buy it anyway, you already know which shelf it ends up on.",
      },
    ],
  },
  flowchartTitle: "The should I buy it flowchart",
  flowchartIntro:
    "If you want the short version, walk these five questions in order. Stop at the first no — that is your answer, and nothing further down the list will rescue it.",
  flowchartSteps: [
    {
      question: "1. Do I already own something that does this job?",
      no: "No — keep going.",
      yes: "Yes → stop. Use what you own for two more weeks first. Upgrades bought while the old one still works are how homes fill up.",
    },
    {
      question: "2. Can I pay for it with money I already have?",
      no: "No → stop. Financing turns one price into several. Wait until it is cash.",
      yes: "Yes — keep going.",
    },
    {
      question: "3. Does the cost per use land under a few dollars?",
      no: "No → stop, unless it is a genuine occasion item. Otherwise you are paying rental prices to own something.",
      yes: "Yes — keep going.",
    },
    {
      question: "4. Is the price worth that many hours of my life?",
      no: "No → stop. Divide the price by your real hourly wage. If the answer is a full work week for something you will use twice, the price tag was never the real cost.",
      yes: "Yes — keep going.",
    },
    {
      question: "5. Do I know exactly where it will live?",
      no: "No → wait. An item with no home becomes clutter on day one.",
      yes: "Yes → buy it, and enjoy it without the second-guessing.",
    },
  ],
  flowchartOutro:
    "The scorer above is the same flowchart with numbers attached, so a strong yes on four questions can carry a soft maybe on the fifth.",
  wageSectionTitle: "Why your real hourly wage is lower than you think",
  wageSectionBody: [
    "Vicki Robin's Your Money or Your Life made the case in 1992 that money is life energy: you traded hours for it, so every price is a number of hours you cannot get back. The catch is that the hours in that trade are more than the hours on your timesheet.",
    "Getting to work costs time. Getting ready costs time. So does the commute back, the checking of messages at night, and the recovery evening you spend doing nothing because the day drained you. Then there is money that only leaves your account because you have a job: transit, parking, lunches out, work clothes, the coffee that makes the morning survivable.",
    "Subtract both and you get your real hourly wage. For most office workers it lands 30-45% below the number on the payslip — which means most prices cost noticeably more hours than they appear to.",
  ],
  wageExampleTitle: "A worked example",
  wageExampleRows: [
    { label: "Take-home pay", value: "$962 per week" },
    { label: "Paid hours", value: "40 per week" },
    { label: "Wage on paper", value: "$24.04 per hour" },
    { label: "Commute + getting ready", value: "9 hours per week" },
    { label: "Work-only spending", value: "$261 per week" },
    { label: "Real wage", value: "$14.30 per hour" },
  ],
  wageExampleNote:
    "Same job, same payslip, 41% less per hour. A $200 purchase is not 8 hours of work — it is 14. Run your own numbers in the tool above and the gap is usually wider than you expected.",
  scoreSectionTitle: "How the score works",
  scoreSectionIntro:
    "One hundred points, six dimensions. Nothing here is a mystery — you can recompute it on paper if you disagree with the weights.",
  scoreRows: [
    {
      name: "Cost per use",
      points: "25 points",
      body: "Price divided by realistic uses. Under $1 per use scores full marks, over $25 per use scores almost nothing. This is the number that separates a coat you wear all winter from a coat you wear at one wedding.",
    },
    {
      name: "Price in life hours",
      points: "20 points",
      body: "Price divided by your real hourly wage. Under an hour is free-feeling; a full work week for one object almost never survives contact with hindsight.",
    },
    {
      name: "Not a duplicate",
      points: "15 points",
      body: "Owning a working version of the same thing is the most common reason a purchase becomes clutter within a month.",
    },
    {
      name: "Money source",
      points: "15 points",
      body: "Cash you will not miss scores full marks. Credit and buy-now-pay-later score zero, and also cap the total at 49.",
    },
    {
      name: "How long you waited",
      points: "15 points",
      body: "A want that survived months is a different animal from one that was born in an ad twenty minutes ago. Time is the cheapest filter there is.",
    },
    {
      name: "It has a home",
      points: "10 points",
      body: "Every object needs somewhere to be. An item with no assigned spot starts life as clutter, no matter how good the deal was.",
    },
  ],
  faqTitle: "Should I buy it: FAQ",
  faqs: [
    {
      question: "How does the should I buy it score work?",
      answer:
        "It splits 100 points across six things: cost per use (25), the price measured in hours of your real wage (20), whether you already own something similar (15), where the money is coming from (15), how long you have wanted it (15), and whether you know where it will live (10). Above 75 is a buy, 55-74 means fix your weakest answer first, 35-54 means wait, and below 35 means the honest answer is no.",
    },
    {
      question: "What is a good cost per use?",
      answer:
        "For things you use in ordinary life, under $1 per use is excellent and anything over $10 per use deserves a second look. Occasion items follow a different scale — a suit worn five times at $40 per wear is normal and fine. The mistake is measuring an occasion item with an everyday ruler.",
    },
    {
      question: "Is cost per use the same as cost per wear?",
      answer:
        "Same formula, different word. Cost per wear is the clothing version. If you are pricing a garment, use the cost per wear calculator, which also separates everyday pieces from occasion pieces and runs the 30-wear test.",
    },
    {
      question: "It is on sale. Does that change the answer?",
      answer:
        "Only through the price field. A discount lowers cost per use and lowers the hours it costs you, and the score moves accordingly. What a discount never changes is whether you already own one, whether you have somewhere to put it, or whether you wanted it before you saw the tag. Those three carry 40 of the 100 points for exactly that reason.",
    },
    {
      question: "How long should I wait before buying something?",
      answer:
        "Thirty days for anything above a trivial amount is the rule most people converge on, and this tool agrees: wanting something for months earns full points, wanting it since this morning earns none. Put it on a list, date it, and revisit. The items that survive a month are worth buying; the rest quietly answer the question for you.",
    },
    {
      question: "Do you store my answers?",
      answer:
        "No. Everything stays in your own browser through local storage. There is no account, no server copy, and no email. Clear your browser data and it is gone.",
    },
  ],
  relatedTitle: "Keep going",
  relatedIntro:
    "Deciding not to buy is the cheap half. Here is what handles the things already in the house:",
  relatedLinks: [
    { href: "/cost-per-wear-calculator", label: "Cost per wear calculator" },
    { href: "/things-to-stop-buying", label: "10 things to stop buying for a clutter-free home" },
    { href: "/decluttering-decision-guide", label: "Decision guide for items you are unsure about" },
    { href: "/declutter-checklist", label: "Interactive declutter checklist" },
  ],
};

const zh: BuyCopy = {
  metaTitle: "该不该买？免费购买决策打分器 | DeclutterYourHome",
  metaDescription:
    "该不该买这件东西？回答六个问题，得到 0-100 分的判断，同时看到每次使用成本，以及这个价格换算成多少小时的人生。免费，无需注册。",
  keywords: [
    "该不该买",
    "要不要买",
    "购买决策工具",
    "每次使用成本",
    "冲动消费",
    "should i buy it",
  ],
  homeLabel: "首页",
  breadcrumbLabel: "该不该买？",
  eyebrow: "买或不买打分器",
  heroTitle: "这东西，该不该买？",
  heroSubtitle:
    "六个问题，一个分数。这个免费工具把价签换算成两个你真能感觉到的数字：**每用一次花多少钱**，以及**这笔钱值你多少小时的人生**。不用安装，也不会上传到任何服务器。",
  tool: {
    formTitle: "给这笔消费打分",
    itemLabel: "你在考虑买什么？",
    itemPlaceholder: "空气炸锅、冬季外套、第二块显示器……",
    priceLabel: "价格",
    priceHelp: "用你平时花的货币填就行，算法是一样的。",
    usesLabel: "你现实中会用它多少次？",
    usesHelp:
      "按实际会发生的次数填，不要按理想状态填。只算未来两年里你能具体想象出来的使用场景。",
    usesPresets: [
      { label: "每天用，用一年（365）", value: 365 },
      { label: "每周用，用两年（104）", value: 104 },
      { label: "每月用，用三年（36）", value: 36 },
      { label: "偶尔用几次（5）", value: 5 },
    ],
    wageTitle: "你的真实时薪",
    wageIntro:
      "价格换成小时比换成钱更容易判断。但真实时薪不是合同上写的那个数，而是扣掉「只因为你要上班才存在」的时间和开销之后，真正剩下的部分。",
    payLabel: "每周到手收入（税后）",
    payHelp: "真正进账的钱，折算成每周。",
    hoursLabel: "每周计薪工时",
    hoursHelp: "公司按这个时长付你钱，通常是 35–40 小时。",
    extraHoursLabel: "每周不计薪但为工作花掉的时间",
    extraHoursHelp:
      "通勤、出门前的准备、每天多待的那半小时、下班后回的工作消息。这些时间同样花在了工作上，只是没人付钱。",
    workCostsLabel: "每周只因上班才会有的开销",
    workCostsHelp:
      "油钱、停车费、通勤卡、在外吃的午饭、咖啡、通勤穿的衣服、以及不上班就不需要的托管费用。",
    nominalWageLabel: "名义时薪",
    realWageLabel: "真实时薪",
    perHourSuffix: "每小时",
    wageDropNote: "比工资条上的数字低了 {percent}%。",
    questionsTitle: "四个计算器替你答不了的问题",
    duplicateLabel: "家里已经有能干这件事的东西了吗？",
    duplicateOptions: [
      { value: "no", label: "没有，也没有接近的", points: 15 },
      { value: "sort-of", label: "有类似的，但那个不太好用", points: 7 },
      { value: "yes", label: "有，而且还能正常用", points: 0 },
    ],
    moneyLabel: "这笔钱从哪来？",
    moneyOptions: [
      { value: "spare", label: "闲钱，花了也不影响", points: 15 },
      { value: "tight", label: "买得起，但这个月会紧一点", points: 8 },
      { value: "debt", label: "信用卡或者分期", points: 0 },
    ],
    waitedLabel: "你想要它多久了？",
    waitedOptions: [
      { value: "months", label: "好几个月了，一直反复想起", points: 15 },
      { value: "weeks", label: "几周", points: 11 },
      { value: "days", label: "几天", points: 6 },
      { value: "today", label: "今天才知道有这东西", points: 0 },
    ],
    storageLabel: "它买回来放在家里哪儿？",
    storageOptions: [
      { value: "spot", label: "位置已经有了", points: 10 },
      { value: "make-room", label: "得先腾个地方", points: 5 },
      { value: "no-idea", label: "还没想过", points: 0 },
    ],
    resultTitle: "你的结果",
    unnamedItem: "这笔消费",
    scoreOutOf: "满分 100",
    costPerUseLabel: "每次使用成本",
    costPerUseSuffix: "每次",
    lifeHoursLabel: "折合人生小时",
    lifeHoursSuffix: "小时的工作",
    lifeWeeksNote: "大约 {weeks} 个工作周。",
    breakdownTitle: "分数是怎么来的",
    breakdownCostPerUse: "每次使用成本",
    breakdownLifeHours: "价格折合工时",
    breakdownDuplicate: "不是重复购买",
    breakdownMoney: "资金来源",
    breakdownWaited: "想了多久",
    breakdownStorage: "有固定位置",
    pointsSuffix: "分",
    debtCapNote:
      "分数被压到 49：一旦要付利息，一次性的价格就变成了长期支出。如果一个月后你还想要，用手头已有的钱再买。",
    incompleteTitle: "先填价格和使用次数",
    incompleteBody:
      "打分至少需要价格和一个现实的使用次数。其余问题让结论更准，但这两个决定了大部分分数。",
    resetLabel: "清空重来",
    savedNote: "你的答案只留在这台浏览器里。不用账号，不上传，不要邮箱。",
    verdicts: [
      {
        min: 75,
        title: "可以买",
        body: "从各个角度看都站得住：每次使用成本合理，价格和你付出的工时对得上，也不是在解决一个已经解决过的问题。买吧。",
      },
      {
        min: 55,
        title: "大概可以，但先补上最弱的那一项",
        body: "大部分条件都过关了。看下面明细里得分最低的那一行，那就是你还没想清楚的地方。如果是收纳位置，就在东西到家前先定好放哪；如果是「想了多久」，再等一周，看你是不是还想要。",
      },
      {
        min: 35,
        title: "先别买",
        body: "现在支撑这笔消费的更多是「想要」而不是「会用」。把它记到清单上、标上今天的日期，30 天后再回来看。大多数东西不会被再想起来——那就是答案，而且一分钱不花。",
      },
      {
        min: 0,
        title: "别买",
        body: "数字和你的回答指向同一个方向。不管它想解决什么问题，用现有的东西、借一次，或者让这股冲动过去，都更划算。真买了，你也大概知道它最后会躺在哪一层柜子上。",
      },
    ],
  },
  flowchartTitle: "「该不该买」决策流程图（should i buy it flowchart）",
  flowchartIntro:
    "想要简版就按顺序走这五个问题。走到第一个「否」就停下——那就是答案，后面的问题救不回来。",
  flowchartSteps: [
    {
      question: "1. 家里已经有能干这件事的东西了吗？",
      no: "没有 → 继续。",
      yes: "有 → 停。先用手上那个再撑两周。旧的还能用就先买新的，正是家里越堆越满的主要原因。",
    },
    {
      question: "2. 能用手头已有的钱付吗？",
      no: "不能 → 停。分期会把一个价格变成好几笔。等到能一次付清再说。",
      yes: "能 → 继续。",
    },
    {
      question: "3. 每次使用成本能压到几块钱以内吗？",
      no: "不能 → 停，除非它确实是场合用品。否则你是在用租金的价格买下所有权。",
      yes: "能 → 继续。",
    },
    {
      question: "4. 这个价格值得用这么多小时的人生去换吗？",
      no: "不值 → 停。用价格除以真实时薪。如果一件只用两次的东西要花掉整整一个工作周，那价签从来就不是真正的成本。",
      yes: "值 → 继续。",
    },
    {
      question: "5. 你确切知道它放在哪儿吗？",
      no: "不知道 → 等。没有固定位置的东西，从进门第一天起就是杂物。",
      yes: "知道 → 买，然后别再回头纠结。",
    },
  ],
  flowchartOutro:
    "上面的打分器就是这张流程图加上了权重，所以四项明确通过时，可以带上第五项的犹豫一起过关。",
  wageSectionTitle: "为什么你的真实时薪比想象中低",
  wageSectionBody: [
    "Vicki Robin 在 1992 年的《Your Money or Your Life》里提出：钱就是生命能量（money is life energy）。你用小时换来了它，所以每个价格都等于一段拿不回来的时间。问题在于，这笔交易里的小时数，比考勤表上的多。",
    "去上班要花时间，出门前的准备要花时间，回程、晚上翻工作消息、以及被一天掏空之后什么都不想干的那个晚上，同样都要花时间。此外还有一类钱：只因为你有工作才会离开账户——通勤、停车、外食午餐、通勤穿的衣服、让早晨能撑下去的那杯咖啡。",
    "把这两类都扣掉，才是真实时薪。对多数上班族来说，它比工资条低 30–45%——也就是说，大多数商品消耗的小时数，都明显多于它看上去的样子。",
  ],
  wageExampleTitle: "一个算给你看的例子",
  wageExampleRows: [
    { label: "每周到手", value: "$962" },
    { label: "计薪工时", value: "每周 40 小时" },
    { label: "名义时薪", value: "$24.04 / 小时" },
    { label: "通勤 + 准备时间", value: "每周 9 小时" },
    { label: "只因上班产生的开销", value: "每周 $261" },
    { label: "真实时薪", value: "$14.30 / 小时" },
  ],
  wageExampleNote:
    "同一份工作、同一张工资条，每小时少了 41%。一件 200 美元的东西不是 8 小时工作，而是 14 小时。用上面的工具填自己的数字，差距通常比你预期的还大。",
  scoreSectionTitle: "分数是怎么算的",
  scoreSectionIntro:
    "总分 100，六个维度。这里没有黑箱，你不同意权重的话，可以自己在纸上重算一遍。",
  scoreRows: [
    {
      name: "每次使用成本",
      points: "25 分",
      body: "价格除以现实使用次数。低于 $1/次拿满分，高于 $25/次几乎拿不到分。整个冬天都在穿的外套和只在一场婚礼上穿的外套，区别就在这一项。",
    },
    {
      name: "价格折合人生小时",
      points: "20 分",
      body: "价格除以真实时薪。不到一小时基本没感觉；为一件东西花掉整整一个工作周，事后几乎都会后悔。",
    },
    {
      name: "不是重复购买",
      points: "15 分",
      body: "家里已经有一个还能用的同类物品，是新买的东西一个月内变成杂物的最常见原因。",
    },
    {
      name: "资金来源",
      points: "15 分",
      body: "不影响生活的闲钱拿满分。信用卡和分期拿零分，并且会把总分压到 49 以内。",
    },
    {
      name: "想了多久",
      points: "15 分",
      body: "持续几个月的想要，和二十分钟前被一条广告激起的想要，完全是两回事。时间是最便宜的过滤器。",
    },
    {
      name: "有固定位置",
      points: "10 分",
      body: "每件东西都得有地方待。没有指定位置的物品，从第一天就是杂物，折扣再大也一样。",
    },
  ],
  faqTitle: "该不该买：常见问题",
  faqs: [
    {
      question: "这个分数是怎么算出来的？",
      answer:
        "100 分拆成六项：每次使用成本 25 分、价格折合真实时薪的工时 20 分、是否已有同类物品 15 分、这笔钱的来源 15 分、你想要它多久 15 分、是否知道它放哪 10 分。75 分以上可以买，55–74 分先补上最弱的一项，35–54 分建议等一等，35 分以下诚实的答案就是不买。",
    },
    {
      question: "每次使用成本多少算好？",
      answer:
        "日常使用的东西，低于 $1/次很优秀，超过 $10/次就值得再想想。场合用品是另一把尺子——一套西装穿五次、$40/次，完全正常。常见的错误是拿日常品的标准去量场合品。",
    },
    {
      question: "cost per use 和 cost per wear 是一回事吗？",
      answer:
        "公式一样，只是说法不同，cost per wear 是衣服版本。如果你算的是衣服，用 cost per wear 计算器更合适——那里还区分了日常款和场合款，并带 30-wear test。",
    },
    {
      question: "正在打折，会改变结论吗？",
      answer:
        "只通过价格这一项起作用。折扣会拉低每次使用成本、也拉低它花掉的工时，分数会跟着变。但折扣永远改变不了三件事：你是不是已经有一个、有没有地方放、以及你在看到价签之前是否想要它。这三项一共占 40 分，原因正在于此。",
    },
    {
      question: "买之前该等多久？",
      answer:
        "只要不是小钱，多数人最后收敛到的答案是 30 天，这个工具也是同一个立场：想了几个月拿满分，今天早上才想要拿零分。把它记到清单上、写上日期、过阵子再看。撑过一个月的东西值得买，剩下的会自己替你回答。",
    },
    {
      question: "我的答案会被保存吗？",
      answer:
        "不会。所有内容只通过 local storage 存在你自己的浏览器里。没有账号、没有服务器副本、也不要邮箱。清掉浏览器数据就没了。",
    },
  ],
  relatedTitle: "接着看",
  relatedIntro: "不买只是省事的那一半。已经在家里的东西，用下面这些处理：",
  relatedLinks: [
    { href: "/cost-per-wear-calculator", label: "Cost per wear 计算器" },
    { href: "/things-to-stop-buying", label: "10 件该停止买的东西" },
    { href: "/decluttering-decision-guide", label: "犹豫物品决策指南" },
    { href: "/declutter-checklist", label: "互动断舍离清单" },
  ],
};

const ja: BuyCopy = {
  metaTitle: "これ、買うべき？ 無料の購入判断スコア | DeclutterYourHome",
  metaDescription:
    "買うべきか迷ったら。6つの質問に答えると 0-100 のスコア、1回あたりのコスト、そしてその値段が人生の何時間分かが出ます。無料・登録不要。",
  keywords: [
    "買うべきか",
    "買い物 判断",
    "衝動買い 防止",
    "1回あたりのコスト",
    "should i buy it",
  ],
  homeLabel: "ホーム",
  breadcrumbLabel: "これ、買うべき？",
  eyebrow: "買う / 買わない スコア",
  heroTitle: "これ、買うべき？",
  heroSubtitle:
    "6つの質問で1つのスコア。値札を、実感できる2つの数字に変えます。**1回使うたびにいくらかかるのか**、そして**その値段は人生の何時間分か**。インストール不要、サーバーには何も送りません。",
  tool: {
    formTitle: "この買い物を採点する",
    itemLabel: "何を買おうとしていますか？",
    itemPlaceholder: "エアフライヤー、冬のコート、2枚目のモニター…",
    priceLabel: "価格",
    priceHelp: "普段使っている通貨のままで大丈夫です。計算は同じです。",
    usesLabel: "現実的に何回使いますか？",
    usesHelp:
      "理想ではなく実際の回数で。これから2年のあいだに具体的に想像できる使用回数だけを数えてください。",
    usesPresets: [
      { label: "毎日1年（365）", value: 365 },
      { label: "毎週2年（104）", value: 104 },
      { label: "毎月3年（36）", value: 36 },
      { label: "数回だけ（5）", value: 5 },
    ],
    wageTitle: "あなたの本当の時給",
    wageIntro:
      "値段は金額より時間で見るほうが判断しやすくなります。ただし本当の時給は契約書の数字ではなく、仕事があるからこそ発生する時間とお金を引いたあとに残る額です。",
    payLabel: "週あたりの手取り",
    payHelp: "実際に口座に入る金額を週で割ったもの。",
    hoursLabel: "週あたりの有給労働時間",
    hoursHelp: "給料が支払われる時間。通常は35〜40時間です。",
    extraHoursLabel: "週あたりの無給の仕事時間",
    extraHoursHelp:
      "通勤、身支度、誰も記録しない残りの30分、帰宅後の仕事の連絡。給料は出ませんが、仕事に使われている時間です。",
    workCostsLabel: "週あたりの仕事専用の出費",
    workCostsHelp:
      "ガソリン、駐車場、定期代、外食のランチ、コーヒー、通勤用の服、仕事がなければ不要な預かり費用など。",
    nominalWageLabel: "額面の時給",
    realWageLabel: "本当の時給",
    perHourSuffix: "／時",
    wageDropNote: "給与明細の数字より {percent}% 低い金額です。",
    questionsTitle: "計算では答えが出ない4つの質問",
    duplicateLabel: "同じ役割の物をすでに持っていますか？",
    duplicateOptions: [
      { value: "no", label: "いいえ、近い物もない", points: 15 },
      { value: "sort-of", label: "似た物はあるが使い勝手が悪い", points: 7 },
      { value: "yes", label: "はい、まだ問題なく使える", points: 0 },
    ],
    moneyLabel: "お金はどこから出しますか？",
    moneyOptions: [
      { value: "spare", label: "余裕資金で、生活に影響しない", points: 15 },
      { value: "tight", label: "買えるが今月は少し苦しくなる", points: 8 },
      { value: "debt", label: "クレジットや後払い・分割", points: 0 },
    ],
    waitedLabel: "どのくらい前から欲しいですか？",
    waitedOptions: [
      { value: "months", label: "数か月、何度も思い出している", points: 15 },
      { value: "weeks", label: "数週間", points: 11 },
      { value: "days", label: "数日", points: 6 },
      { value: "today", label: "存在を知ったのは今日", points: 0 },
    ],
    storageLabel: "家のどこに置きますか？",
    storageOptions: [
      { value: "spot", label: "置き場所はもう決まっている", points: 10 },
      { value: "make-room", label: "場所を空ける必要がある", points: 5 },
      { value: "no-idea", label: "考えていない", points: 0 },
    ],
    resultTitle: "結果",
    unnamedItem: "この買い物",
    scoreOutOf: "100点満点",
    costPerUseLabel: "1回あたりのコスト",
    costPerUseSuffix: "／回",
    lifeHoursLabel: "人生の時間に換算",
    lifeHoursSuffix: "時間の労働",
    lifeWeeksNote: "およそ {weeks} 週間分の労働です。",
    breakdownTitle: "点数の内訳",
    breakdownCostPerUse: "1回あたりのコスト",
    breakdownLifeHours: "労働時間に換算した値段",
    breakdownDuplicate: "重複していない",
    breakdownMoney: "お金の出どころ",
    breakdownWaited: "待った期間",
    breakdownStorage: "置き場所がある",
    pointsSuffix: "点",
    debtCapNote:
      "スコアは49点で頭打ちです。利息を払うと、一度きりの値段が継続的な支出に変わります。1か月後もまだ欲しければ、手持ちのお金で買いましょう。",
    incompleteTitle: "価格と使用回数を入力してください",
    incompleteBody:
      "採点には価格と現実的な使用回数が必要です。他の質問は精度を上げますが、この2つが大半を決めます。",
    resetLabel: "入力をクリアする",
    savedNote:
      "回答はこのブラウザーの中だけに残ります。アカウントもサーバー保存もメールも不要です。",
    verdicts: [
      {
        min: 75,
        title: "買っていい",
        body: "どの角度から見ても筋が通っています。1回あたりのコストは妥当で、値段と労働時間の交換も納得でき、すでに解決した問題を解決し直してもいません。買いましょう。",
      },
      {
        min: 55,
        title: "たぶん買っていい。ただし弱点を先に潰す",
        body: "ほとんどの条件は通っています。下の内訳で点数が一番低い行を見てください。そこがまだ考えきれていない部分です。置き場所なら届く前に決める。待った期間なら、もう1週間置いてまだ欲しいか確かめる。",
      },
      {
        min: 35,
        title: "今はまだ",
        body: "「使う」より「欲しい」で成り立っている割合が高すぎます。今日の日付を添えてリストに書き、30日後に見直してください。ほとんどの物は二度と取り上げられません。それが答えで、しかも無料です。",
      },
      {
        min: 0,
        title: "買わない",
        body: "数字も回答も同じ方向を指しています。これで解決したい問題は、今ある物を使う、一度借りる、あるいは衝動が過ぎるのを待つほうが安く済みます。それでも買うなら、最後にどの棚に置かれるかは自分でもわかっているはずです。",
      },
    ],
  },
  flowchartTitle: "「買うべきか」フローチャート",
  flowchartIntro:
    "短く済ませたいなら、この5問を順番に。最初の「いいえ」で止めてください。それが答えで、その先の質問では取り返せません。",
  flowchartSteps: [
    {
      question: "1. 同じ役割の物をすでに持っている？",
      no: "いいえ → 次へ。",
      yes: "はい → 終了。まず今ある物をあと2週間使ってください。古い物がまだ使えるうちに買う買い替えが、家が埋まる主な原因です。",
    },
    {
      question: "2. 今あるお金で払える？",
      no: "いいえ → 終了。分割は1つの値段を複数の支払いに変えます。現金で買えるようになるまで待ちましょう。",
      yes: "はい → 次へ。",
    },
    {
      question: "3. 1回あたりのコストは数百円台に収まる？",
      no: "いいえ → 本当の「特別な日」用でなければ終了。そうでなければ、レンタル並みの単価を払って所有していることになります。",
      yes: "はい → 次へ。",
    },
    {
      question: "4. その値段は人生の時間と釣り合う？",
      no: "いいえ → 終了。価格を本当の時給で割ってください。2回しか使わない物に丸1週間分の労働が必要なら、値札は本当のコストではありません。",
      yes: "はい → 次へ。",
    },
    {
      question: "5. 置き場所を正確に言える？",
      no: "いいえ → 待つ。置き場所のない物は初日から散らかりの一部になります。",
      yes: "はい → 買って、あとは迷わず使いましょう。",
    },
  ],
  flowchartOutro:
    "上のスコアは、このフローチャートに重みを付けたものです。4問がはっきり通れば、5問目の迷いは一緒に通過できます。",
  wageSectionTitle: "本当の時給が思ったより低い理由",
  wageSectionBody: [
    "Vicki Robin は 1992 年の『Your Money or Your Life』で、お金は life energy（生命エネルギー）だと書きました。時間と引き換えに得たものだから、あらゆる値段は取り戻せない時間の量でもあります。問題は、その交換に使われた時間が勤務表の時間より多いことです。",
    "職場へ行くのに時間がかかり、身支度にも時間がかかります。帰り道、夜に見る仕事の連絡、消耗して何もできない夜も同じです。さらに、仕事があるからこそ口座から出ていくお金があります。交通費、駐車場代、外食のランチ、通勤用の服、朝をしのぐためのコーヒー。",
    "その両方を引いた残りが本当の時給です。多くの会社員では給与明細より 30〜45% 低くなります。つまり、たいていの値段は見かけよりずっと多くの時間を消費しています。",
  ],
  wageExampleTitle: "計算してみた例",
  wageExampleRows: [
    { label: "手取り", value: "週 $962" },
    { label: "有給労働時間", value: "週 40 時間" },
    { label: "額面の時給", value: "$24.04 / 時" },
    { label: "通勤 + 身支度", value: "週 9 時間" },
    { label: "仕事専用の出費", value: "週 $261" },
    { label: "本当の時給", value: "$14.30 / 時" },
  ],
  wageExampleNote:
    "同じ仕事、同じ給与明細で、時給は 41% 下がりました。$200 の買い物は 8 時間ではなく 14 時間分です。上のツールに自分の数字を入れると、差はたいてい想像より大きくなります。",
  scoreSectionTitle: "スコアの仕組み",
  scoreSectionIntro:
    "100点を6項目に配分しています。ブラックボックスはありません。重み付けに納得できなければ、紙の上で計算し直せます。",
  scoreRows: [
    {
      name: "1回あたりのコスト",
      points: "25点",
      body: "価格 ÷ 現実的な使用回数。1回100円台なら満点、1回2,500円を超えるとほぼ0点です。冬じゅう着るコートと、結婚式で一度だけ着るコートを分けるのがこの項目です。",
    },
    {
      name: "労働時間に換算した値段",
      points: "20点",
      body: "価格 ÷ 本当の時給。1時間未満ならほぼ無感覚。1つの物に丸1週間の労働は、後から振り返るとまず正当化できません。",
    },
    {
      name: "重複していない",
      points: "15点",
      body: "同じ物がまだ使える状態で家にあることは、新しい買い物が1か月で不用品になる最大の原因です。",
    },
    {
      name: "お金の出どころ",
      points: "15点",
      body: "生活に影響しない余裕資金なら満点。クレジットや後払いは0点で、合計も49点で頭打ちになります。",
    },
    {
      name: "待った期間",
      points: "15点",
      body: "数か月続いている欲しさと、20分前の広告で生まれた欲しさはまったく別物です。時間はもっとも安いフィルターです。",
    },
    {
      name: "置き場所がある",
      points: "10点",
      body: "物には居場所が要ります。置き場所が決まっていない物は、どれだけ安く買えても初日から散らかりです。",
    },
  ],
  faqTitle: "買うべきか：よくある質問",
  faqs: [
    {
      question: "スコアはどう計算していますか？",
      answer:
        "100点を6項目に配分します。1回あたりのコスト25点、本当の時給で測った労働時間20点、似た物をすでに持っているか15点、お金の出どころ15点、どのくらい前から欲しいか15点、置き場所を決めているか10点です。75点以上は買い、55〜74点は一番弱い項目を先に直す、35〜54点は待つ、35点未満は正直な答えは「買わない」です。",
    },
    {
      question: "1回あたりのコストはいくらなら良いですか？",
      answer:
        "日常的に使う物なら1回あたり150円未満は優秀、1,500円を超えるなら考え直す価値があります。特別な日の物は別のものさしで、スーツを5回着て1回6,000円なら普通です。よくある失敗は、特別な日の物を日常の基準で測ってしまうことです。",
    },
    {
      question: "cost per use と cost per wear は同じですか？",
      answer:
        "式は同じで、cost per wear は衣類版の呼び方です。服の値段を判断するなら cost per wear 計算機のほうが向いています。日常着と特別な日の服を分け、30-wear test も使えます。",
    },
    {
      question: "セール中なら答えは変わりますか？",
      answer:
        "価格の欄を通してだけ変わります。割引は1回あたりのコストと必要な労働時間を下げ、スコアもその分動きます。ただし割引でも変わらないことが3つあります。すでに持っているか、置き場所があるか、値札を見る前から欲しかったか。この3つで合計40点を占めているのはそのためです。",
    },
    {
      question: "買うまでどのくらい待つべきですか？",
      answer:
        "少額でなければ30日というのが多くの人がたどり着く答えで、このツールも同じ立場です。数か月欲しかったなら満点、今朝知ったばかりなら0点。日付を添えてリストに書き、あとで見直してください。1か月生き延びた物は買う価値があり、残りは自然と答えを出してくれます。",
    },
    {
      question: "入力内容は保存されますか？",
      answer:
        "サーバーには保存しません。すべてブラウザーの local storage の中だけに残ります。アカウントもサーバー上の控えもメールも不要で、ブラウザーのデータを消せば消えます。",
    },
  ],
  relatedTitle: "次に読む",
  relatedIntro: "買わないのは簡単なほうの半分です。すでに家にある物はこちらで：",
  relatedLinks: [
    { href: "/cost-per-wear-calculator", label: "cost per wear 計算機" },
    { href: "/things-to-stop-buying", label: "買うのをやめたい10のもの" },
    { href: "/decluttering-decision-guide", label: "迷う物のための判断ガイド" },
    { href: "/declutter-checklist", label: "インタラクティブ片付けチェックリスト" },
  ],
};

const copies: Record<string, BuyCopy> = { en, zh, ja };

export function getBuyCopy(locale: string): BuyCopy {
  return copies[locale] ?? en;
}
