import type { Metadata } from "next";
import Link from "next/link";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { buildLanguageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

type Item = {
  title: string;
  body: string;
  stop: string;
  instead: string;
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
  rulesTitle: string;
  rulesBody: string;
  oneInOneOutHeading: string;
  oneInOneOutBody: string;
  twentyTwentyHeading: string;
  twentyTwentyBody: string;
  faqTitle: string;
  faqs: Array<[string, string]>;
  relatedTitle: string;
  relatedIntro: string;
  relatedLinks: Array<{ href: string; label: string }>;
  labels: { stop: string; instead: string };
};

function getCopy(locale: string): Copy {
  if (locale === "zh") {
    return {
      title: "10 件该停止买的东西，让家里少堆杂物 | DeclutterYourHome",
      description:
        "10 种最常导致家里东西越来越多的购物习惯。少买比多扔更可持续，列出每一类的常见陷阱、替代行为和实用判断规则。",
      eyebrow: "Clutter-Free Home",
      heroTitle: "10 件该停止买的东西，让家里保持 clutter-free",
      heroSubtitle:
        "想要 clutter-free home，多扔的效果会被持续不断的购买抵消。这份清单列出 10 类最容易让家里再次堆满的东西，每一类都给出停止买什么、替代行为是什么。",
      introTitle: "为什么 \"少买\" 比 \"多扔\" 更可持续",
      introBody:
        "整理半天换来的空间，常常几个月之内又被填满。不是你不够努力，而是 consumption loop 没有停下来——每周新的东西仍然进来，而离开的速度跟不上。真正的 clutter-free home 维护不在 declutter 周末，而在每次按下 \"加入购物车\" 之前那一秒。停止购买 10 类最容易堆积的东西，比再 declutter 一遍要省力得多。",
      itemsTitle: "10 类让家里持续堆积的购买",
      items: [
        {
          title: "1. 便宜的收纳箱",
          body: "买收纳箱常常感觉像在 \"变整齐\"。但便宜的塑料箱真正做的，是让你推迟关于里面那些东西的决定。箱子不是用来装真正在用的东西，而是用来装那些 \"以后再决定\" 的东西。Target、Amazon 大促时一冲动搬回来的箱子，最后装着的往往就是它本来要整理的那堆 maybe pile，外加一个对不上内容的标签。",
          stop: "促销时 \"以后说不定用得上\" 的塑料收纳箱。",
          instead: "先清空你已经有的箱子。需要被装起来的东西，常常比货架上的收纳箱数量少 30-50%。先 declutter，再针对留下的东西买对应的收纳。",
        },
        {
          title: "2. 免费赠品和样品",
          body: "免费试用装、活动赠送的 tote bag、消费满赠的小礼物——这些东西因为不花钱，几乎没有被审视就进了家。但每一件都占地方、都需要某一天决定怎么处理，多数最后躺在一个永远不会被打开的抽屉里。",
          stop: "你不会用的免费香水试用装、不需要的活动 tote、签到送的小本子。",
          instead: "学会在源头拒绝。\"不用了，谢谢\" 比三个月后扔掉它要快得多。家里干净，往往不是因为东西收得好，而是因为进来的更少。",
        },
        {
          title: "3. 单一用途的厨房工具",
          body: "鳄梨切片器、香蕉切片器、大蒜剥皮器、草莓去蒂器、taco 支架——每一个解决的问题，一把刀其实都能搞定。它们容易堆积，因为单价不高、当下看起来很聪明；它们让你输，是因为占抽屉位置是永久的。",
          stop: "任何只解决一种你也不常做的事的工具。",
          instead: "一把刀、一块板、一个锅能应付大部分烹饪。等你连续几个月反复想要这个工具时再买，不要因为结账时看到它。",
        },
        {
          title: "4. 跟潮流买的衣服",
          body: "micro-trend 推动了巨大的购物量。但潮流单品的穿着周期越来越短——cottagecore 长裙、Y2K 低腰裤、coastal grandma 毛衣，每一波只穿两次就被衣柜拒收。潮流型衣服比任何衣柜消化得都快，绝大多数一年内进了捐赠袋。",
          stop: "因为 \"现在到处都是\" 才显得诱人的单品。",
          instead: "看到想买的潮流单品，先等 30 天。多数潮流在这段时间里就会褪色。能挺过 30 天的，通常是和你真实穿衣方式契合的款。",
        },
        {
          title: "5. 冲动网购（Amazon / 拼多多 / Shein / TikTok shop）",
          body: "网购摩擦已经接近零。一键下单意味着决定发生在几秒之内，常常是在晚上刷手机、判断力最低的时候。两天后东西到家，在房间里显得突兀。",
          stop: "任何来自 \"你可能也喜欢\" 推荐位的、开 app 之前不在你购物清单上的东西。",
          instead: "用 wishlist 取代购物车。先加进去，等 7 天，再回去看那个清单。周二晚上很急的东西，周一早上看常常已经没必要了。",
        },
        {
          title: "6. 旅行纪念马克杯、磁贴和小摆件",
          body: "纪念品行业之所以存在，是因为人们想用一个实物给记忆做锚。但 Niagara Falls 的杯子、迪士尼的钥匙扣、去过每个州的磁贴——它们带回旅行的能力，远不如照片和文字。它们最后只是需要除尘的东西。",
          stop: "马克杯、磁贴、迷你艾菲尔铁塔。",
          instead: "多拍照片，在手机备忘录里为每次旅行写一段。50 张照片 + 一段文字，比一架子 40 件你一周后就不再看的东西，是更好的记录。",
        },
        {
          title: "7. 用不完的大容量洗护",
          body: "Costco 装洗发水、巨型牙膏、6 磅装润肤露——单位价格非常划算，但收纳空间、过期风险、以及你用到一半就想换牌子的概率，常常吃掉所谓的省钱。",
          stop: "保质期不到两年的产品，不要买大容量装。",
          instead: "买当前牌子的常规装，用完再买。单位价格只是众多变量之一，收纳和用得完的速度，比省下来的钱重要。",
        },
        {
          title: "8. 装饰蜡烛和节日装饰",
          body: "蜡烛不会被点；节日装饰拆出来两次，下一波审美来了就换掉。两类东西都会悄悄堆积，因为每次单笔购买都很小、都带 \"过节\" 借口。",
          stop: "为每个节日和季节买新装饰。",
          instead: "节日装饰每类（秋、冬、春）封顶一箱。箱子装满后，新买一件就要换出一件旧的。蜡烛？把你已经有的烧完再买下一个。",
        },
        {
          title: "9. 礼物包装和派对用品",
          body: "包装纸卷会悄悄繁殖。丝带卷、礼品袋、纸巾、上次派对剩下的一次性盘子 \"留着下次用\"——这些低频使用品塞满了整层柜子。",
          stop: "促销时 \"明年用得上\" 的包装和派对用品。",
          instead: "用完再买。礼品袋可以重复使用。一个抽屉量的包装库存，对一个家庭已经足够。",
        },
        {
          title: "10. 单一功能的小家电",
          body: "意面机、面包机、只能煮米饭的电饭煲、因为 TikTok 上大家都买了你也买了的电压力锅。每一台都是在某个 \"这会改变我做饭方式\" 的时刻被买回来，每一台在 6 个月内进了储物间。",
          stop: "基于一个食谱潮流而买的专用电器。",
          instead: "买之前先借或者租。用普通工具做三次同样的菜。如果三次真实使用之后你还想要那台机器，它再值得空间。",
        },
      ],
      rulesTitle: "两条简单规则",
      rulesBody: "停止买东西需要一些防呆规则，让决策不靠意志力。",
      oneInOneOutHeading: "The one-in-one-out rule",
      oneInOneOutBody:
        "每买进一件，同类的另一件必须离开。新买的衬衫进衣柜，旧的一件就要捐掉；新买的锅进厨房，旧的一只就要出门。这个规则的目的不是惩罚，而是把 \"持有的总量\" 锁定。任何想破例的情况，都迫使你先决定要放手什么。",
      twentyTwentyHeading: "The 20/20 rule",
      twentyTwentyBody:
        "对那些 \"留着以防万一\" 的东西：如果它价格在 20 美元以下、又能在 20 分钟内从当前位置买到或借到，那你不需要留着它。这条规则由 The Minimalists 提出，对 \"just in case\" 这种最难放手的类别特别有效——绝大多数留着的备用品都满足这两个条件，但感觉上像是必须留下。",
      faqTitle: "常见问题",
      faqs: [
        ["应该先停止买什么？", "从摩擦最低、累积最快的类别开始：冲动网购和免费赠品。这两类东西最容易在意识不到的情况下进家，停掉它们见效最快。其他类别可以按你家最严重的方向逐个加。"],
        ["礼物和别人带进家的东西怎么办？", "你不能控制别人送什么。但可以控制你怎么对待。允许自己捐出礼物——不是不感激，而是礼物的意义在 \"被送出\" 那一刻已经完成，物品本身不必终生绑定。如果是亲近的人，可以提前说 \"今年我想要 experience 类的礼物\"，避免实物累积。"],
        ["这些年累积的东西怎么办？", "已经在家的东西按 declutter 流程处理；这份清单解决的是入口端的问题，不解决存量。两条线必须同时做：一边减少新进来的，一边稳定地放出已经在家的。只做一边都会失败。"],
      ],
      relatedTitle: "相关阅读",
      relatedIntro: "想看具体房间怎么 declutter，可以从这些指南开始：",
      relatedLinks: [
        { href: "/things-to-declutter", label: "60 件可以从家里清掉的东西" },
        { href: "/how-to-declutter-your-kitchen", label: "如何整理厨房" },
        { href: "/how-to-declutter-your-closet", label: "如何整理衣柜" },
        { href: "/declutter-checklist", label: "互动整理清单" },
        { href: "/decluttering-decision-guide", label: "犹豫物品决策指南" },
        { href: "/how-to-declutter-unwanted-gifts", label: "如何断舍离不想要的礼物" },
      ],
      labels: { stop: "停止买", instead: "替代行为" },
    };
  }

  return {
    title: "10 Things to Stop Buying for a Clutter-Free Home | DeclutterYourHome",
    description:
      "Ten purchases that quietly fill homes back up after every declutter. Each comes with the trap, the alternative, and the rule to apply so a clutter-free home actually stays that way.",
    eyebrow: "Clutter-Free Home",
    heroTitle: "10 Things to Stop Buying for a Clutter-Free Home",
    heroSubtitle:
      "Decluttering only stays done if buying slows down. These are the ten categories that quietly refill homes after every reset. Each comes with what to stop buying and what to do instead.",
    introTitle: "Why \"buy less\" beats \"throw out more\"",
    introBody:
      "A weekend declutter buys you a few months at best. The consumption loop keeps running: new things arrive every week, and the exit rate cannot keep up. A clutter-free home is not maintained on the weekend. It is maintained in the second before you tap \"add to cart.\" Stopping ten categories of recurring purchases takes far less effort than running another full declutter every quarter.",
    itemsTitle: "10 categories that keep refilling your home",
    items: [
      {
        title: "1. Cheap storage bins",
        body: "Buying storage often feels productive — like getting organized. But cheap plastic bins do the opposite. They let you postpone decisions about what is inside. The bin becomes a container for postponed decisions, not for things you actually use. Most bins grabbed on impulse at Target or Amazon end up holding the same maybe-pile they were supposed to organize, plus a label that lies about what is inside.",
        stop: "Plastic bins on sale \"just in case I need them.\"",
        instead: "Empty the bins you already own first. The amount of stuff that needs containing is usually 30 to 50 percent less than the shelves at the store suggest. Declutter first, then buy storage only for what stays.",
      },
      {
        title: "2. Free-with-purchase items and freebies",
        body: "Free samples, swag bags, branded tote bags, \"thank you\" notepads — they enter the home with no scrutiny because they did not cost anything. But every one of them takes up space, asks for a decision later, and most of them end up in a drawer that never gets opened.",
        stop: "Free perfume samples you will not use, free tote bags you do not need, branded notepads from events.",
        instead: "Practice declining at the source. \"No thanks, I don't need one\" is faster than throwing it away three months later. The home stays cleaner when fewer things enter, not when the entry is organized better.",
      },
      {
        title: "3. Single-use kitchen gadgets",
        body: "Avocado slicers, banana cutters, garlic peelers, strawberry hullers, taco holders. Every one of these solves a problem a regular knife already handles. They accumulate because each is cheap and seems clever in the moment. They lose because each takes drawer real estate forever.",
        stop: "Any gadget that only does one thing you do not do often.",
        instead: "A knife, a cutting board, and a pan handle most cooking. Add a gadget only after you have wanted one repeatedly for months — not because you saw it at the checkout aisle.",
      },
      {
        title: "4. Trend-driven clothing",
        body: "Micro-trends drive enormous purchase volume. They also have shorter wear cycles than ever — the cottagecore dress, the Y2K low-rise jeans, the coastal grandmother sweater each get worn twice before the closet stops asking for them. Trend clothing accumulates faster than wardrobes can absorb, and most of it ends up in donation bags within a year.",
        stop: "Pieces that look exciting because they are everywhere right now.",
        instead: "Wait thirty days before buying. Most trends fade in that window. The ones that survive are usually the ones that match how you actually dress.",
      },
      {
        title: "5. Impulse online buys (Amazon, Temu, Shein, TikTok Shop)",
        body: "Online shopping friction is near zero. One-click checkout means decisions happen in seconds, often during evening scroll sessions when judgment is at its lowest. The item arrives two days later and feels random in the room.",
        stop: "Anything from a \"you might also like\" tile that was not on your list before you opened the app.",
        instead: "Use a wishlist instead of the cart. Add the item, wait seven days, then revisit the list. What felt urgent on Tuesday night usually looks pointless on Monday morning.",
      },
      {
        title: "6. Souvenir mugs, magnets, and travel tchotchkes",
        body: "The souvenir industry exists because people want a physical anchor for memories. But the mug from Niagara Falls, the keychain from Disney, the magnet from each visited state — they do not bring back the trip the way photos and journals do. They become objects that need dusting.",
        stop: "Mugs, magnets, mini Eiffel Towers, anything labeled \"I went there.\"",
        instead: "Take more photos and write one paragraph in your phone notes about the trip. Fifty photos plus a paragraph beat a shelf of forty objects you stopped looking at within a week.",
      },
      {
        title: "7. Bulk-discount toiletries you cannot finish",
        body: "Costco-size shampoo, jumbo packs of toothpaste, six-pound bottles of moisturizer. The per-ounce price is undeniable, but the storage real estate, the expiry risk, and the chance you change preferences halfway through usually erase the savings.",
        stop: "Bulk amounts of any product with a shelf life under two years.",
        instead: "Buy the regular size of what you currently use. Replace it when it runs out. Per-ounce price is one input, not the only one — storage and finish rate matter more than the savings tag suggests.",
      },
      {
        title: "8. Decorative candles and seasonal decor",
        body: "Candles never get burned. Seasonal decor gets unpacked twice and replaced when the next aesthetic cycle arrives. Both categories quietly accumulate because each purchase is small and \"festive.\"",
        stop: "New decor for each holiday or season.",
        instead: "Cap holiday decor at one storage bin per category — autumn, winter, spring. When the bin is full, every new item requires removing an existing one. Burn the candles you already own before buying another.",
      },
      {
        title: "9. Gift wrap, ribbons, and party supplies",
        body: "Wrapping paper rolls multiply silently. Ribbon spools, gift bags, tissue paper, leftover party plates from \"just in case the next party needs them\" — they fill closet shelves with low-frequency-use items.",
        stop: "Wrap and party supplies on sale \"for next year.\"",
        instead: "Use what you have until it is gone before buying more. Reuse gift bags. A drawer-sized wrap stash is plenty for a household.",
      },
      {
        title: "10. Single-use specialty appliances",
        body: "The pasta maker, the bread maker, the rice cooker that only makes rice, the electric pressure cooker bought because everyone on TikTok had one. Each was bought during a \"this will change my cooking\" moment. Each ended up in storage within six months.",
        stop: "Specialty appliances bought because of a single recipe trend.",
        instead: "Rent or borrow before buying. Cook the same recipe three times using improvised tools. If you still want the appliance after three real uses, then it earns its space.",
      },
    ],
    rulesTitle: "Two simple rules to lock in the habit",
    rulesBody: "Behavior change needs friction, not willpower. These two rules apply at the moment of purchase and at the moment of regret.",
    oneInOneOutHeading: "The one-in-one-out rule",
    oneInOneOutBody:
      "For every new item, one similar item leaves. A new shirt comes in, an old one goes to donation. A new pan enters the kitchen, an old one leaves. The point is not punishment; it is capping the total volume. Any \"exception\" forces a real choice about what to release first.",
    twentyTwentyHeading: "The 20/20 rule",
    twentyTwentyBody:
      "For \"just in case\" items: if it costs under $20 and you could replace it within 20 minutes from where you are now, you do not need to keep it. Popularized by The Minimalists. It works because most \"just in case\" items meet both criteria but feel impossible to release.",
    faqTitle: "Frequently asked questions",
    faqs: [
      ["What should I stop buying first?", "Start with the categories that have the lowest friction and the fastest accumulation: impulse online buys and freebies. They enter the home below conscious awareness, so stopping them produces the fastest visible change. Add other categories afterward based on what your home accumulates most."],
      ["What about gifts and things other people bring in?", "You cannot control what others give. You can control how you treat it. Allow yourself to donate gifts — the gift's meaning was complete the moment it was given; the object does not have to be lifelong. With close family, signal early: \"This year I'd love experience gifts instead of things\" prevents accumulation before it starts."],
      ["How do I undo years of accumulation?", "What's already in the house gets handled through decluttering. This list addresses the inflow side. Both lines have to run at the same time — slow new things coming in, and steadily release what is already here. Either alone tends to fail."],
    ],
    relatedTitle: "Related guides",
    relatedIntro: "Want to focus on what is already in the house? These guides take you room by room:",
    relatedLinks: [
      { href: "/things-to-declutter", label: "60 things to declutter from your home" },
      { href: "/how-to-declutter-your-kitchen", label: "How to declutter your kitchen" },
      { href: "/how-to-declutter-your-closet", label: "How to declutter your closet" },
      { href: "/declutter-checklist", label: "Interactive declutter checklist" },
      { href: "/decluttering-decision-guide", label: "Decision guide for hard items" },
      { href: "/how-to-declutter-unwanted-gifts", label: "How to declutter unwanted gifts" },
    ],
    labels: { stop: "Stop buying", instead: "Instead" },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = getCopy(locale);

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLanguageAlternates(locale, "/things-to-stop-buying"),
  };
}

export default async function ThingsToStopBuyingPage({ params }: Props) {
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
                    <span className="font-semibold text-[#7a2d2d]">{copy.labels.stop}: </span>
                    <span className="text-[#414844]">{item.stop}</span>
                  </div>
                  <div className="rounded-2xl bg-[#dcebdd] px-4 py-3 text-sm md:text-base">
                    <span className="font-semibold text-[#335748]">{copy.labels.instead}: </span>
                    <span className="text-[#335748]">{item.instead}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-[#fff4df] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#573611] md:text-3xl">
            {copy.rulesTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#7a5228]">{copy.rulesBody}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.5rem] bg-white/80 px-5 py-5">
              <h3 className="text-lg font-bold text-[#573611]">{copy.oneInOneOutHeading}</h3>
              <p className="mt-3 text-sm leading-6 text-[#7a5228] md:text-base md:leading-7">
                {copy.oneInOneOutBody}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/80 px-5 py-5">
              <h3 className="text-lg font-bold text-[#573611]">{copy.twentyTwentyHeading}</h3>
              <p className="mt-3 text-sm leading-6 text-[#7a5228] md:text-base md:leading-7">
                {copy.twentyTwentyBody}
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
