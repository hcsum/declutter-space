import type { Metadata } from "next";
import Link from "next/link";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { buildLanguageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

type RoomBlock = {
  heading: string;
  intro: string;
  microTasks: string[];
};

type Copy = {
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introBody: string;
  whyHardTitle: string;
  whyHardItems: Array<[string, string]>;
  checklistTitle: string;
  checklistIntro: string;
  rooms: RoomBlock[];
  methodsTitle: string;
  methodsIntro: string;
  doomBoxHeading: string;
  doomBoxBody: string;
  maybeBoxHeading: string;
  maybeBoxBody: string;
  timeBoxTitle: string;
  timeBoxIntro: string;
  timeBoxBlocks: Array<{ heading: string; body: string }>;
  stepsTitle: string;
  steps: Array<[string, string]>;
  declutterComboTitle: string;
  declutterComboBody: string;
  mistakesTitle: string;
  mistakes: string[];
  quickWinsTitle: string;
  quickWins: Array<{ heading: string; body: string }>;
  faqTitle: string;
  faqs: Array<[string, string]>;
  relatedTitle: string;
  relatedIntro: string;
  relatedLinks: Array<{ href: string; label: string }>;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
};

function getCopy(locale: string): Copy {
  if (locale === "zh") {
    return {
      title: "ADHD 友好的家务清洁 + 整理清单 | DeclutterYourHome",
      description:
        "为 ADHD 大脑设计的家务清单：按房间分类的 micro-task、doom box / maybe box 方法、5/15/30 分钟时间盒，以及决策疲劳和感官过载的应对。",
      eyebrow: "ADHD Guide",
      heroTitle: "ADHD-Friendly Home Cleaning & Decluttering Checklist",
      heroSubtitle:
        "ADHD 大脑做家务最难的不是体力，是 executive function（执行功能）和 decision fatigue（决策疲劳）。这份清单按 micro-task 切碎每一个房间，配合 doom box、time-boxing 等 ADHD 友好的方法，让 \"不知道从哪开始\" 变成 \"做完一项算一项\"。",
      introTitle: "为什么 ADHD 大脑做家务会卡住",
      introBody:
        "和神经典型大脑不一样，ADHD 用户面对乱屋子时常常同时遇到 3 件事：决策疲劳让每个选择都消耗能量、time blindness 让 \"我等会再做\" 一直延后、感官过载让杂乱的视觉本身就让人想逃跑。所以解决方法不是 \"再努力一点\"，而是改变任务的结构——把大任务拆成不需要思考的 micro-task，用计时器替代意志力，用容器替代决定。",
      whyHardTitle: "ADHD 让家务难做的 3 个核心原因",
      whyHardItems: [
        ["Executive dysfunction（执行功能障碍）", "知道该做什么 ≠ 能开始做。从沙发起身到拿起抹布之间的那一步，对 ADHD 大脑来说常常是最难的一步。"],
        ["Decision fatigue（决策疲劳）", "每件杂物都问一次 \"留还是扔\"，能量很快用完。前 10 件能决定，第 30 件已经在乱选。"],
        ["Sensory overload（感官过载）", "视觉混乱本身就是触发器。看到乱的房间，大脑反应不是 \"我来收拾\"，而是 \"我要离开这里\"。"],
      ],
      checklistTitle: "按房间分类的 ADHD 家务清单",
      checklistIntro:
        "这是一份 ADHD house cleaning checklist——每一项都设计成 5 分钟以内可以完成的 micro-task，每个房间挑 1-3 项就算成功，不需要做完所有。",
      rooms: [
        {
          heading: "厨房（5 个 micro-task）",
          intro: "厨房乱的时候不要开始洗碗，先做 1-2 个视觉冲击最大的小动作。",
          microTasks: [
            "清掉水槽里的食物残渣（仅仅这一步就能让厨房感觉不一样）",
            "把所有杯子集中到水槽里（不洗也行，先集中）",
            "擦一下灶台旁边那一块台面（不是全厨房，就那一块）",
            "把过期食物从冰箱前面那一层挑出来（不是全冰箱）",
            "倒掉那个一直没倒的垃圾袋",
          ],
        },
        {
          heading: "卧室（5 个 micro-task）",
          intro: "床整理好 = 一天有起点，这是 ADHD 屋里最高 ROI 的动作之一。",
          microTasks: [
            "整理床（不需要完美，把被子拉上去就够）",
            "把地上和椅子上的衣服分两堆：脏的放进洗衣篮，干净的挂回去（不要叠）",
            "清空床头柜的表面（杯子、纸巾、充电线归位）",
            "拉一下窗帘、开个窗——感官重启",
            "把任何不属于卧室的东西放进一个篮子，等会带出去",
          ],
        },
        {
          heading: "浴室（5 个 micro-task）",
          intro: "浴室的乱通常来自小但多。挑一项做完，就停。",
          microTasks: [
            "把所有空瓶子或几乎空的瓶子扔进垃圾桶",
            "擦一下镜子（最显眼的一处）",
            "把脏毛巾换成干净的",
            "把洗手台台面上的东西全收进抽屉或柜子",
            "倒掉垃圾桶",
          ],
        },
        {
          heading: "客厅（5 个 micro-task）",
          intro: "客厅最容易因为 \"东西不属于客厅\" 而乱。最先做的是分类，不是收纳。",
          microTasks: [
            "拿一个空篮子，走一圈，把所有不属于客厅的东西扔进去",
            "把所有遥控器集中到一个托盘",
            "把抱枕和盖毯拍蓬、叠好",
            "整理咖啡桌（杯子、纸张、零食包装收走）",
            "拔掉地上缠在一起的充电线，收进抽屉",
          ],
        },
        {
          heading: "衣柜（5 个 micro-task）",
          intro: "衣柜整理不要从 \"全部拿出来\" 开始——那是 ADHD 大脑最容易崩溃的方式。",
          microTasks: [
            "在 5 分钟内挑出 5 件确定不会再穿的衣服，放进捐赠袋",
            "把所有空衣架集中到一边",
            "把单只袜子放进一个 \"等配对\" 的小盒",
            "把脏衣服篮里超过一周的东西先洗了",
            "把上次穿过没挂回去的衣服挂回去",
          ],
        },
        {
          heading: "家庭办公（5 个 micro-task）",
          intro: "工作区的乱最容易触发 \"先收完才能开始工作\" 的拖延循环。",
          microTasks: [
            "把桌面上所有杯子、垃圾清掉",
            "扔掉所有干涸的笔",
            "把散落的线缆缠好或绑起来",
            "把桌面上的纸张分两堆：要处理的、可以扔的",
            "擦一下键盘和屏幕",
          ],
        },
      ],
      methodsTitle: "两个 ADHD 专属方法：doom box & maybe box",
      methodsIntro:
        "这两个方法是 r/declutteringadhd 和 r/adhdwomen 反复提到的——它们不解决整理本身，但解决 ADHD 大脑无法做决定时的卡顿。",
      doomBoxHeading: "The doom box method",
      doomBoxBody:
        "Doom box 是一个 ADHD 社区流行的概念：一个专门装 \"我现在没有精力决定\" 的物品的容器。看到一件不知道放哪、不知道是否要扔的东西，丢进 doom box，关上盖子，继续做眼前的事。Doom box 的目标不是永远装着东西，而是不让 \"决定\" 阻塞 \"前进\"。设一个固定时间——比如每周日 15 分钟——专门处理 doom box，那时大脑专注于决策一件事。",
      maybeBoxHeading: "The maybe box method",
      maybeBoxBody:
        "Maybe box 是 doom box 的近亲，但用法不同。Maybe box 装的是你 \"觉得可能要扔但又不敢扔\" 的东西。封箱、写日期、收到看不见的地方。30-90 天后，如果你没有打开找过任何东西，整箱可以处理掉——不用再做一次决定。Maybe box 让决策变成 \"等待\"，对 ADHD 大脑友好得多。",
      timeBoxTitle: "Time-boxing：用计时器替代意志力",
      timeBoxIntro:
        "ADHD 大脑对 \"完成一整件事\" 没有概念，但对 \"做 X 分钟\" 有。用计时器把任务切成段，比 \"今天要收拾完整个客厅\" 现实得多。",
      timeBoxBlocks: [
        {
          heading: "5 分钟启动",
          body: "选一个最小的 micro-task，设 5 分钟计时器，时间到就停。这个方法叫 the 5-minute rule。它绕过 ADHD 大脑的启动障碍——因为 5 分钟感觉不像承诺。多数情况下你会做超过 5 分钟，但 \"被允许 5 分钟就停\" 是动起来的关键。",
        },
        {
          heading: "10-15 分钟单房间冲刺",
          body: "选一个房间，设 15 分钟计时器，能做多少做多少。结束就停，不要 \"再 5 分钟\"。让大脑知道你说停就会停，下一次启动会更容易。",
        },
        {
          heading: "25/5 番茄钟",
          body: "如果你能进入 hyperfocus 状态（ADHD 的双刃剑），用 25 分钟工作 + 5 分钟休息的节奏。休息时强制离开当前房间，喝水或拉伸——不要看手机，否则容易卡进另一个 hyperfocus。",
        },
      ],
      stepsTitle: "适配 ADHD 的 7 步整理流程",
      steps: [
        ["1. 先关掉所有干扰", "ADHD 大脑对环境刺激极敏感。把手机调静音放在另一个房间，关掉电视，戴上耳机放 lo-fi 或纯白噪音。先减少进来的信号。"],
        ["2. 选最小的一个区域，不是整个房间", "\"整理客厅\" 太大。\"整理咖啡桌\" 刚刚好。\"整理咖啡桌上的杯子和纸张\" 最好。任务越具体，启动越容易。"],
        ["3. 设计一个 5 分钟版本", "无论目标多大，先设计一个 5 分钟就能做完的简化版。\"在 5 分钟内拿走客厅里所有不属于这里的东西\"——做完即胜。"],
        ["4. 拿一个容器，不要一边整理一边决定", "Body double 没人陪也行：用篮子或 doom box 替代决策。所有不知道怎么办的东西先丢进去，统一时间处理。"],
        ["5. 做完后给自己一个明确的奖励", "ADHD 大脑对延迟奖励反应弱。做完一段就立刻奖励——一杯咖啡、5 分钟手机、一集喜剧。把奖励和动作绑定，下次启动更容易。"],
        ["6. 视觉化进度", "用计时器、checklist、贴纸都可以——把无形的 \"我做了一些\" 变成有形的 \"我完成了 3/5 项\"。ADHD 大脑需要看到进度。"],
        ["7. 不追求完美的一次，追求重复的多次", "比起一次完美的大扫除，每天 10 分钟的小整理对 ADHD 屋更有效。频率比强度更重要。"],
      ],
      declutterComboTitle: "Declutter as you clean：ADHD 友好的合并法",
      declutterComboBody:
        "对 ADHD 大脑，分开做 \"先打扫再整理\" 通常等于两次都不做完。更现实的做法是合并：擦灶台时顺手把过期香料扔了，整理床时顺手把不会再穿的衣服丢进捐赠袋，倒垃圾时顺手把抽屉里的过期票根带出去。把 declutter 嵌入清洁动作里，而不是当作独立任务——这就是 decluttering with ADHD 真正可执行的版本。",
      mistakesTitle: "ADHD 整理最容易踩的 4 个坑",
      mistakes: [
        "perfectionism trap：要么完美做完整个房间，要么不开始。结果：永远不开始。",
        "all-or-nothing thinking：今天没做完所有，等于今天没做。结果：放弃整个一周。",
        "没系统就想靠记忆：依靠记忆是 ADHD 大脑最大的陷阱。永远要用 checklist、计时器、容器外化决策。",
        "买更多收纳：在没有先 declutter 之前买收纳箱，等于又增加了需要整理的东西。",
      ],
      quickWinsTitle: "30 秒 / 5 分钟 / 15 分钟分级 quick wins",
      quickWins: [
        {
          heading: "30 秒能做的事",
          body: "整理床；把杯子端到厨房；把脏衣服扔进洗衣篮；倒一杯水（也是给大脑充电）；把鞋摆整齐。",
        },
        {
          heading: "5 分钟能做的事",
          body: "擦一块台面；处理一个抽屉；把所有遥控器集中起来；扔掉所有空瓶子；把地上散落的衣服分两堆。",
        },
        {
          heading: "15 分钟能做的事",
          body: "做完一个房间的所有 micro-task；处理一次 doom box；整理一个小柜子；洗碗 + 擦灶台；做一次浴室快速重置。",
        },
      ],
      faqTitle: "常见问题",
      faqs: [
        ["ADHD 大脑应该多久整理一次？", "频率比强度重要。每天 5-15 分钟的小整理，比每月一次的大扫除更可持续。ADHD 大脑对 \"维持\" 的难度高于 \"启动\"，所以让启动门槛尽可能低——每天同一个时间、同一个动作，让它变成不需要决定的事。"],
        ["如何让 ADHD 孩子做家务？", "用计时器、视觉清单和明确奖励。\"打扫房间\" 对 ADHD 孩子来说太抽象——\"在 10 分钟内把地上的玩具放进玩具箱\" 才可执行。和大人一样，分级 micro-task 是关键。"],
        ["ADHD 整理和普通整理的最大区别是什么？", "普通整理靠流程；ADHD 整理靠基础设施。神经典型大脑可以靠 \"今天打扫卧室\" 这种笼统目标完成任务；ADHD 大脑需要 micro-task、计时器、容器、外化提示。把 \"该做什么\" 放到外部环境里，不依靠大脑记住。"],
      ],
      relatedTitle: "相关阅读",
      relatedIntro: "想配合具体房间的深入指南：",
      relatedLinks: [
        { href: "/declutter-checklist", label: "互动整理清单（可勾选保存进度）" },
        { href: "/things-to-declutter", label: "60 件可以从家里清掉的东西" },
        { href: "/things-to-stop-buying", label: "10 件该停止买的东西" },
        { href: "/how-to-declutter-sentimental-items", label: "如何整理情感物品" },
        { href: "/how-to-declutter-your-bedroom", label: "如何整理卧室" },
        { href: "/how-to-declutter-your-kitchen", label: "如何整理厨房" },
      ],
      ctaTitle: "把这份清单变成可勾选的进度",
      ctaBody: "在互动清单里逐项勾选，进度自动保存，可按房间筛选——对 ADHD 大脑特别有效。",
      ctaButton: "打开互动整理清单",
    };
  }

  return {
    title: "ADHD-Friendly Home Cleaning & Decluttering Checklist | DeclutterYourHome",
    description:
      "A practical ADHD house cleaning checklist with room-by-room micro-tasks, the doom box and maybe box methods, time-boxing, and quick wins designed for executive dysfunction and decision fatigue.",
    eyebrow: "ADHD Guide",
    heroTitle: "ADHD-Friendly Home Cleaning & Decluttering Checklist",
    heroSubtitle:
      "ADHD homes do not stay messy because of laziness. They stay messy because of executive dysfunction, decision fatigue, and sensory overload. This checklist breaks every room into 5-minute micro-tasks and pairs them with ADHD-friendly methods — doom boxes, maybe boxes, time-boxing — so \"I don't know where to start\" turns into \"I finished three things.\"",
    introTitle: "Why cleaning is harder with an ADHD brain",
    introBody:
      "Neurotypical advice — \"just do it, ten minutes a day\" — does not address the actual blockers an ADHD brain hits. Decision fatigue burns through energy on every choice. Time blindness pushes \"I'll start in a minute\" into hours. Sensory overload makes a messy room itself feel like a reason to leave. The solution is not more willpower. The solution is changing the structure of the task: smaller pieces, external prompts, timers instead of intention, containers instead of decisions.",
    whyHardTitle: "Three reasons ADHD makes home cleaning harder",
    whyHardItems: [
      ["Executive dysfunction", "Knowing what to do is not the same as being able to start. The step from sitting on the couch to picking up the cloth is often the hardest step of the entire task."],
      ["Decision fatigue", "Each item asks \"keep or toss?\" and burns a unit of energy. The first ten decisions are fine. By item thirty, you are choosing badly and starting to keep things you should release."],
      ["Sensory overload", "Visual chaos is its own trigger. The ADHD brain sees a messy room and responds with \"leave\" before \"clean,\" because the input is already too much."],
    ],
    checklistTitle: "The ADHD house cleaning checklist (room by room)",
    checklistIntro:
      "Every item below is designed as a micro-task — five minutes or less, no decision-making required. Pick one to three per room. Finishing any of them counts as a successful session.",
    rooms: [
      {
        heading: "Kitchen (5 micro-tasks)",
        intro: "If the kitchen is overwhelming, do not start by washing dishes. Start with one or two high-visual-impact actions.",
        microTasks: [
          "Clear food bits and debris out of the sink (this single step changes how the room feels)",
          "Gather every dirty mug and glass into the sink (you do not have to wash yet, just gather)",
          "Wipe just the strip of counter next to the stove (not the whole counter)",
          "Pull expired food from the front shelf of the fridge only (not the whole fridge)",
          "Take the trash bag out, even if it is not full",
        ],
      },
      {
        heading: "Bedroom (5 micro-tasks)",
        intro: "Making the bed is one of the highest-ROI ADHD actions in the entire home. It signals \"the day has a starting line.\"",
        microTasks: [
          "Make the bed (does not have to be perfect; just pull the covers up)",
          "Sort clothes from the floor and \"the chair\" into two piles: dirty goes to the hamper, clean goes back on hangers (no folding)",
          "Clear the nightstand surface — cups, tissues, charging cables go back where they belong",
          "Open the curtains or window for a quick sensory reset",
          "Put anything that does not belong in the bedroom into a basket to deal with later",
        ],
      },
      {
        heading: "Bathroom (5 micro-tasks)",
        intro: "Bathroom clutter is usually small but plentiful. Pick one and stop.",
        microTasks: [
          "Throw out every empty or nearly-empty bottle",
          "Wipe the mirror — the most visible surface",
          "Swap dirty towels for clean ones",
          "Sweep everything off the sink counter into a drawer or cabinet",
          "Empty the trash",
        ],
      },
      {
        heading: "Living Room (5 micro-tasks)",
        intro: "The living room usually feels messy because of things that do not actually belong there. Sort first, organize never.",
        microTasks: [
          "Take an empty basket, walk one loop, and collect everything that does not belong in the living room",
          "Gather all remotes onto one tray",
          "Fluff and fold the throws and pillows",
          "Clear the coffee table (cups, paper, snack wrappers)",
          "Untangle the floor cables and drop them in a drawer",
        ],
      },
      {
        heading: "Closet (5 micro-tasks)",
        intro: "Do not start by pulling everything out — that is the fastest way to crash an ADHD brain mid-task.",
        microTasks: [
          "Pull five obvious noes in five minutes (wrong fit, never worn, stained) — straight into a donation bag",
          "Gather all empty hangers to one side",
          "Drop unmatched socks into a small \"pairing\" box",
          "Wash anything in the hamper that has been there over a week",
          "Re-hang clothes you wore last but did not put back",
        ],
      },
      {
        heading: "Home Office (5 micro-tasks)",
        intro: "A cluttered desk triggers the \"I need to clean this first before I can work\" stall pattern. Break the stall with one micro-task.",
        microTasks: [
          "Clear all cups, wrappers, and trash off the desk",
          "Throw out every dried-out pen",
          "Bundle and tie the cables, or drop them in a drawer",
          "Sort loose paper into two piles: to-process and to-toss",
          "Wipe the keyboard and screen",
        ],
      },
    ],
    methodsTitle: "Two ADHD-specific methods: doom box & maybe box",
    methodsIntro:
      "These two tools show up repeatedly in r/declutteringadhd and r/adhdwomen. They do not solve cleaning. They solve the moment when an ADHD brain hits a decision it cannot make right now.",
    doomBoxHeading: "The doom box method",
    doomBoxBody:
      "A doom box is a container — a drawer, a bin, a designated cardboard box — for any item you do not have the energy to decide on right now. See the random charger you do not recognize? Doom box. See the unopened mail? Doom box. The goal is not to keep items in there forever. The goal is to keep \"deciding\" from blocking \"moving forward.\" Schedule one focused session (15 minutes, once a week) to process the doom box. During that session, you decide on one box of stuff — that focused effort beats trying to decide on each item individually as you move through the home.",
    maybeBoxHeading: "The maybe box method",
    maybeBoxBody:
      "A maybe box is a close cousin but used differently. It holds items you suspect you should let go of but cannot quite release in the moment. Seal it. Write today's date on the outside. Put it somewhere out of sight. After 30 to 90 days, if you have not opened the box to retrieve anything, the whole box can go — no second decision required. The maybe box turns letting go into waiting, which is much friendlier to an ADHD brain than a hard yes/no.",
    timeBoxTitle: "Time-boxing: use timers instead of willpower",
    timeBoxIntro:
      "ADHD brains do not have a strong concept of \"finish a task.\" They do have a strong concept of \"do this for X minutes.\" Use timers to slice the work — \"clean for 15 minutes\" is far more realistic than \"clean the whole living room.\"",
    timeBoxBlocks: [
      {
        heading: "5-minute starter",
        body: "Pick the smallest possible micro-task, set a 5-minute timer, stop when it ends. This is the 5-minute rule. It works because 5 minutes does not feel like a commitment, so the start-up barrier collapses. Most of the time you will keep going past 5. But being allowed to stop is what gets you to start.",
      },
      {
        heading: "10 to 15-minute single-room sprint",
        body: "Pick one room, set a 15-minute timer, do whatever you can. When the timer ends, stop — do not extend with \"just five more.\" Teaching your brain that you mean it when you say stop makes starting easier next time.",
      },
      {
        heading: "25/5 Pomodoro",
        body: "If you can enter hyperfocus (the ADHD double-edged sword), use 25 minutes of work plus 5 minutes off. During the break, leave the room — drink water, stretch, do not scroll. Scrolling pulls you into a different hyperfocus and the cleaning session dies.",
      },
    ],
    stepsTitle: "A 7-step process adapted for ADHD",
    steps: [
      ["1. Cut the input first", "ADHD brains are sensitive to environmental signals. Put the phone on silent in another room, turn off the TV, and put on lo-fi or white noise. Reduce input before you ask your brain to output."],
      ["2. Pick the smallest possible scope, not the whole room", "\"Clean the living room\" is too big. \"Clean the coffee table\" is better. \"Clean the cups and paper off the coffee table\" is best. Specificity is what unlocks the start."],
      ["3. Design a 5-minute version of every task", "Whatever the larger goal, design a 5-minute version of it first. \"In 5 minutes, remove everything from the living room that does not belong here.\" Done = win. Anything beyond is bonus."],
      ["4. Use a container instead of deciding mid-task", "Carry a basket. Anything you encounter that does not have an obvious home goes in the basket. Decide later — not while you have a wet cloth in one hand."],
      ["5. Reward immediately, not later", "ADHD brains respond weakly to delayed rewards. Pair every completed session with an immediate reward: a coffee, 5 minutes of phone, an episode of comedy. The brain learns to associate cleaning with reward, which makes the next start easier."],
      ["6. Make progress visible", "Use a timer, a checklist, or sticker chart — whatever externalizes \"I did some.\" An ADHD brain needs to see progress to feel progress."],
      ["7. Aim for repetition, not perfection", "Ten minutes a day beats one perfect Saturday every quarter. The win is frequency. An imperfect daily ten minutes keeps the home livable better than any deep-clean fantasy."],
    ],
    declutterComboTitle: "Declutter as you clean: the ADHD-friendly combo",
    declutterComboBody:
      "For neurotypical brains, separating \"clean first, then declutter\" works fine. For ADHD brains, it usually means doing neither. The realistic move is to combine them. While wiping the stove, toss the expired spices in arm's reach. While making the bed, drop two unworn shirts into a donation bag. While taking out the trash, bring along the dried-out pens from the desk. Embedding decluttering into cleaning actions — instead of treating it as a separate project — is the version of decluttering with ADHD that actually gets done.",
    mistakesTitle: "Four ADHD-specific cleaning mistakes",
    mistakes: [
      "Perfectionism trap: finish the whole room perfectly or do not start. Result: never start.",
      "All-or-nothing thinking: did not finish today, therefore today did not count. Result: abandon the whole week.",
      "Trying to use memory as the system: relying on your brain to remember what needs doing is the biggest ADHD trap. Externalize everything — checklists, timers, containers, alarms.",
      "Buying more storage before decluttering: storage bins purchased before you have decided what to remove just add more stuff that needs managing later.",
    ],
    quickWinsTitle: "Tiered quick wins: 30 seconds, 5 minutes, 15 minutes",
    quickWins: [
      {
        heading: "30 seconds",
        body: "Make the bed. Move a cup to the kitchen. Throw a dirty shirt into the hamper. Pour a glass of water for yourself. Line up the shoes by the door.",
      },
      {
        heading: "5 minutes",
        body: "Wipe one counter strip. Tackle one drawer. Gather every remote. Throw out every empty bottle. Sort clothes from the floor into two piles.",
      },
      {
        heading: "15 minutes",
        body: "Run the full set of micro-tasks for one room. Process the doom box once. Tidy one small cabinet. Wash dishes plus wipe the stove. Run a quick bathroom reset.",
      },
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      ["How often should someone with ADHD clean?", "Frequency beats intensity. A short daily session — five to fifteen minutes — is more sustainable than a monthly deep clean. ADHD brains find maintenance harder than starting, so keep the start-up barrier as low as possible. Same time, same trigger, same small action — let it become something that does not require a decision."],
      ["How do I get a kid with ADHD to clean their room?", "Use timers, visual checklists, and specific micro-tasks. \"Clean your room\" is too abstract for an ADHD kid — \"in ten minutes, put every toy into the toy bin\" is executable. Same principle as adults: micro-tasks, externalized prompts, immediate rewards."],
      ["What is the difference between ADHD cleaning and regular cleaning?", "Neurotypical cleaning relies on process. ADHD cleaning relies on infrastructure. A neurotypical brain can hold \"clean the bedroom today\" as a goal. An ADHD brain needs micro-tasks, timers, containers, and external prompts. Put the \"what to do next\" outside of your brain — in checklists, sticky notes, timers, and visible bins — instead of asking your brain to hold it."],
    ],
    relatedTitle: "Related guides",
    relatedIntro: "Pair this checklist with focused room guides:",
    relatedLinks: [
      { href: "/declutter-checklist", label: "Interactive declutter checklist (saves progress)" },
      { href: "/things-to-declutter", label: "60 things to declutter from your home" },
      { href: "/things-to-stop-buying", label: "10 things to stop buying for a clutter-free home" },
      { href: "/how-to-declutter-sentimental-items", label: "How to declutter sentimental items" },
      { href: "/how-to-declutter-your-bedroom", label: "How to declutter your bedroom" },
      { href: "/how-to-declutter-your-kitchen", label: "How to declutter your kitchen" },
    ],
    ctaTitle: "Turn this checklist into trackable progress",
    ctaBody:
      "Use the interactive declutter checklist to tick each micro-task off room by room. Progress saves automatically — essential for ADHD brains that lose track of what they did last session.",
    ctaButton: "Open the interactive checklist",
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = getCopy(locale);

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLanguageAlternates(locale, "/adhd-cleaning-checklist"),
  };
}

export default async function AdhdCleaningPage({ params }: Props) {
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
              href={`/${locale}/declutter-checklist`}
              className="rounded-full bg-[#002d1c] px-5 py-3 text-white"
            >
              {copy.ctaButton}
            </Link>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
            {copy.introTitle}
          </h2>
          <p className="mt-4 text-base leading-7 text-[#414844]">{copy.introBody}</p>
        </section>

        <section className="rounded-[2rem] bg-[#fff4df] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#573611] md:text-3xl">
            {copy.whyHardTitle}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {copy.whyHardItems.map(([heading, body]) => (
              <div key={heading} className="rounded-[1.5rem] bg-white/80 px-5 py-5">
                <h3 className="text-lg font-bold text-[#573611]">{heading}</h3>
                <p className="mt-2 text-sm leading-6 text-[#7a5228] md:text-base md:leading-7">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
            {copy.checklistTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#414844]">{copy.checklistIntro}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {copy.rooms.map((room) => (
              <article key={room.heading} className="rounded-[1.5rem] bg-[#f9faf2] px-5 py-5">
                <h3 className="text-lg font-bold text-[#002d1c]">{room.heading}</h3>
                <p className="mt-2 text-sm leading-6 text-[#414844] md:text-base md:leading-7">
                  {room.intro}
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-[#414844] md:text-base">
                  {room.microTasks.map((task) => (
                    <li key={task} className="rounded-2xl bg-white px-3 py-2">
                      ☐ {task}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-[#dcebdd] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
            {copy.methodsTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#335748]">{copy.methodsIntro}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.5rem] bg-white/80 px-5 py-5">
              <h3 className="text-lg font-bold text-[#002d1c]">{copy.doomBoxHeading}</h3>
              <p className="mt-3 text-sm leading-6 text-[#335748] md:text-base md:leading-7">
                {copy.doomBoxBody}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/80 px-5 py-5">
              <h3 className="text-lg font-bold text-[#002d1c]">{copy.maybeBoxHeading}</h3>
              <p className="mt-3 text-sm leading-6 text-[#335748] md:text-base md:leading-7">
                {copy.maybeBoxBody}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
            {copy.timeBoxTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#414844]">{copy.timeBoxIntro}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {copy.timeBoxBlocks.map((block) => (
              <div key={block.heading} className="rounded-[1.5rem] bg-[#f9faf2] px-5 py-5">
                <h3 className="text-lg font-bold text-[#002d1c]">{block.heading}</h3>
                <p className="mt-2 text-sm leading-6 text-[#414844] md:text-base md:leading-7">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
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
            {copy.declutterComboTitle}
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-7 text-[#7a5228]">
            {copy.declutterComboBody}
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
              {copy.quickWinsTitle}
            </h2>
            <div className="mt-5 space-y-4">
              {copy.quickWins.map((win) => (
                <div key={win.heading} className="rounded-2xl bg-white/80 px-4 py-3">
                  <h3 className="text-sm font-bold text-[#002d1c] md:text-base">{win.heading}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#335748] md:leading-7">{win.body}</p>
                </div>
              ))}
            </div>
          </aside>
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

        <section className="rounded-[2rem] bg-[#002d1c] px-6 py-10 text-white md:px-10">
          <h2 className="text-2xl font-bold tracking-[-0.04em] md:text-3xl">{copy.ctaTitle}</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-white/80 md:text-lg">
            {copy.ctaBody}
          </p>
          <div className="mt-6">
            <Link
              href={`/${locale}/declutter-checklist`}
              className="inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#002d1c]"
            >
              {copy.ctaButton}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
