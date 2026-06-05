import type { Metadata } from "next";
import Link from "next/link";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { buildLanguageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

type Item = {
  title: string;
  body: string;
  guilt: string;
  action: string;
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
  labels: { guilt: string; action: string };
};

function getCopy(locale: string): Copy {
  if (locale === "zh") {
    return {
      title: "如何无内疚地断舍离不想要的礼物 | DeclutterYourHome",
      description:
        "留着用不上的礼物不是感恩，只是替内疚找了个仓库。这份指南拆解 8 种最常见的礼物内疚场景，给出每一种该怎么处理（退、转送、捐、卖、拍照留念），以及如何从源头减少不需要的礼物。",
      eyebrow: "学会放手",
      heroTitle: "如何断舍离不想要的礼物（不带内疚）",
      heroSubtitle:
        "留着一件你从不使用的礼物，并不会让送礼的人更被尊重——它只是把内疚存了起来。这份指南教你怎么放手不想要的礼物，以及每一种到底该怎么处理。",
      introTitle: "内疚才是真正的杂物",
      introBody:
        "一份礼物的意义，在它被送出的那一刻就已经完成了。对方表达了心意，你接收了——这件事已经发生，永远不会被改写。之后那个物品躺在柜子里，并不会让那份心意更深；它只是把一次善意，变成了一份你需要终生保管的义务。你被允许拥有这个物品，但你不必拥有那份义务。真正占地方的，从来不是礼物本身，而是 \"扔了会不会对不起人\" 这个念头。",
      itemsTitle: "8 种最常见的礼物内疚（及对应做法）",
      items: [
        {
          title: "1. 从来没用过的礼物",
          body: "它在抽屉或柜子深处待了一年以上，标签可能都还在。你留着，是因为 \"人家是花了钱的\"。但你保管它，并不能把那笔钱还给对方，也不能让它产生任何价值——它现在唯一的作用，就是占着地方、等一个永远不来的 \"以后\"。",
          guilt: "对方花了钱买的。",
          action: "捐掉或转送。让一个真正会用它的人现在就用上，比它在你家积灰更尊重这份礼物。钱已经花了，留着它并不能挽回什么。",
        },
        {
          title: "2. 来自亲近的人（妈妈 / 伴侣）的礼物",
          body: "这类最难，因为你怕的不是物品，而是 \"对方会受伤\"。但关系不储存在物品里。你和妈妈、和伴侣的连接，不依赖那条你从不戴的围巾继续存在。",
          guilt: "他们会伤心。",
          action: "用 \"我会不会再买一次\" 来判断。会，就留；不会，就安静地转手——不必当面汇报。真正在意你的人，想要的是你过得轻松，而不是你替他们保管东西。",
        },
        {
          title: "3. 重复的 / 尺码不对 / 不合口味的礼物",
          body: "对方是用心的，但用心不等于你有义务终生保管一件不合适的东西。重复的厨房用具、穿不下的衣服、不是你风格的摆件——心意已经收到了。",
          guilt: "这是人家的一片心意。",
          action: "有小票就去退；能转送就转送；都不行就捐。心意你已经收下了，物品可以走。",
        },
        {
          title: "4. 纪念性的 / 手工做的礼物",
          body: "对方亲手做的、或带着特别意义的礼物，扔起来感觉像在否定那份用心。但记忆不住在物品里，住在你心里——而照片可以替你留住它的样子。",
          guilt: "这是人家亲手做的。",
          action: "拍照留念，最多留一件最有代表性的。记忆活在照片和故事里，不需要靠占地方来证明。详见 \"如何整理纪念品\"。",
        },
        {
          title: "5. 一代代传下来的 \"礼物\" / 传家物",
          body: "被郑重交到你手上的家族物件——奶奶的瓷器、长辈的家具——带着一句无声的 \"要好好保管\"。但你不是家族的博物馆管理员。",
          guilt: "这东西在家里传了好几代了。",
          action: "留下你真心喜欢、会用或会摆出来的；把它的故事记下来或拍下来；其余的可以放手。documenting 故事，比堆着一柜子你从不看的物件，更能传承。",
        },
        {
          title: "6. 为一个你已经放弃的爱好买的礼物",
          body: "一整套绘画工具、一台乐器、一堆运动装备——是某次 \"我要开始这个爱好\" 时收到的。现在它们提醒你的，更多是 \"我没坚持下来\" 的愧疚。",
          guilt: "说不定哪天我又捡起来了呢。",
          action: "如果它便宜、又能在需要时轻松买到或借到，就放手。真到了重新开始的那天，再添置不迟——不必为一个 \"假如\" 常年付出收纳空间。",
        },
        {
          title: "7. 孩子收到的太多玩具",
          body: "祖辈、亲戚源源不断地送，玩具的进入速度远超孩子能玩的速度。每一件单独看都没什么，合起来就淹没了整个房间。",
          guilt: "外婆一直在寄，我不好意思。",
          action: "对玩具用 one-in-one-out：进一件，旧的捐一件。并提前告诉常送礼的人，你们更希望收到 experience（一起出去玩）或消耗品。",
        },
        {
          title: "8. 婚礼 / 各种场合的礼物存货",
          body: "婚礼登记清单剩下的、各种场合收到的成套餐具、装饰——你留着，是因为它绑着一个重要的日子。但那个日子、那段关系，并不储存在那只你从不用的船形调味盅里。",
          guilt: "这可是结婚礼物。",
          action: "留下你真正在用的，其余放手。你的婚姻不会因为送走一只调味盅而减损分毫。",
        },
      ],
      principlesTitle: "两个能化解内疚的想法",
      principlesBody: "放手礼物难的从来不是动作，而是情绪。这两个想法专门用来松动那份愧疚。",
      principle1Heading: "礼物的任务在被送出的那一刻就完成了",
      principle1Body:
        "礼物是一次 \"我在乎你\" 的表达，在递到你手上的那一刻就已经送达。之后你怎么处理这个物品，并不会反过来取消那份在乎。把它捐出去，不会穿越时空回到过去、变成对送礼人的拒绝。心意已达，物品自由。",
      principle2Heading: "30 天的 \"安置窗口\"",
      principle2Body:
        "不要让一件不想要的礼物无限期地堆着。给自己大约 30 天，做一个决定：用、退、转送、捐、或卖。东西放得越久，就越显得 \"动不得\"——其实只是惯性，不是它真的重要。",
      faqTitle: "常见问题",
      faqs: [
        ["扔掉礼物是不是很没礼貌 / 不知感恩？", "不是。你的感恩，是针对 \"对方愿意为你花心思\" 这件事，而不是签了一份终生保管合同。礼物的礼貌发生在收下的那一刻；之后这个物品归你，怎么处理是你的自由。"],
        ["如果对方问起、或来家里没看到怎么办？", "绝大多数人根本不会记得自己送过什么、更不会清点。万一真被问到，温和诚实即可：\"我把它转给了更需要、更会用的人。\" 如果是很在意的人，可以留一件能摆出来的，其余照常放手。"],
        ["逝去的人留下的礼物怎么办？", "哀伤不等于义务。你不必靠保管所有遗物来证明思念。留下少数最有代表性的，把其余拍照记录后放手——记忆不会因此变少。具体方法见 \"如何整理纪念品\"。"],
        ["怎么从源头减少收到不想要的礼物？", "提前、明确地告诉常送礼的人你更希望收到什么：一起吃顿饭、一次体验、消耗品，或者干脆给一个 wishlist。在物品进家之前就处理，比进来之后再纠结轻松得多。延伸阅读 \"该停止买的东西\"。"],
      ],
      relatedTitle: "相关阅读",
      relatedIntro: "礼物的内疚，往往和纪念品、购物习惯是同一个结。这几篇可以接着看：",
      relatedLinks: [
        { href: "/how-to-declutter-sentimental-items", label: "如何整理纪念品（不带愧疚）" },
        { href: "/things-to-stop-buying", label: "10 件该停止买的东西" },
        { href: "/decluttering-decision-guide", label: "犹豫物品决策指南" },
        { href: "/things-to-declutter", label: "60 件可以从家里清掉的东西" },
        { href: "/declutter-checklist", label: "互动整理清单" },
      ],
      labels: { guilt: "内疚", action: "怎么做" },
    };
  }

  return {
    title: "How to Declutter Unwanted Gifts (Without the Guilt) | DeclutterYourHome",
    description:
      "Keeping an unused gift isn't gratitude — it just stores the guilt. This guide breaks down the 8 most common gift-guilt situations, what to actually do with each (return, regift, donate, sell, photograph), and how to stop unwanted gifts at the source.",
    eyebrow: "Letting Go",
    heroTitle: "How to Declutter Unwanted Gifts (Without the Guilt)",
    heroSubtitle:
      "Keeping a gift you never use doesn't honor the giver — it just stores the guilt. Here's how to let unwanted gifts go, and what to actually do with each one.",
    introTitle: "The guilt is the real clutter",
    introBody:
      "A gift's purpose is fulfilled the moment it is given. The person expressed they care, you received it — that already happened and can never be undone. The object sitting in a cupboard afterward does not deepen that care. It just turns a kind gesture into an obligation you feel you must store forever. You are allowed to own the object without owning the obligation. What actually takes up space is rarely the gift itself — it is the thought \"would I be a bad person if I let this go?\"",
    itemsTitle: "8 common gift-guilt situations (and what to do)",
    items: [
      {
        title: "1. The gift you've never used",
        body: "It has sat at the back of a drawer or cupboard for over a year, maybe with the tag still on. You keep it because \"they spent money on it.\" But holding onto it does not give them their money back or make it useful — its only job right now is to take up space waiting for a someday that never comes.",
        guilt: "They spent money on it.",
        action: "Donate or regift it. Letting someone who will actually use it have it now honors the gift more than dust does. The money is already spent; keeping the object recovers nothing.",
      },
      {
        title: "2. The gift from someone close (mum, partner)",
        body: "This is the hardest, because what you fear isn't the object — it's that they'll be hurt. But the relationship is not stored in the thing. Your bond with your mum or your partner does not depend on the scarf you never wear continuing to exist.",
        guilt: "They'll be hurt.",
        action: "Use the \"would I buy this again?\" test. If yes, keep it. If no, quietly rehome it — you don't owe a report. People who truly care about you want you to feel light, not to be a storage unit for their purchases.",
      },
      {
        title: "3. Duplicate, wrong size, or not your taste",
        body: "It was thoughtful, but thoughtful does not mean you're obligated to keep something that doesn't fit your life. The duplicate kitchen tool, the clothes that don't fit, the decor that isn't your style — the thought has already landed.",
        guilt: "It was such a thoughtful gesture.",
        action: "Return it with the receipt if you can, regift it, or donate it. You received the thought; the object is free to move on.",
      },
      {
        title: "4. Sentimental or handmade gifts",
        body: "Something a person made by hand, or that carries special meaning, feels like a rejection of their effort to let go of. But the memory does not live in the object — it lives in you, and a photo can hold what it looked like.",
        guilt: "They made it by hand.",
        action: "Photograph it, and keep at most one representative piece. The memory survives in the photo and the story, not in the shelf space. See how to declutter sentimental items for the full method.",
      },
      {
        title: "5. Inherited \"gifts\" and heirlooms passed down",
        body: "Items handed to you with ceremony — grandmother's china, a relative's furniture — arrive with a silent \"keep this safe.\" But you are not the family museum.",
        guilt: "It's been in the family for generations.",
        action: "Keep what you genuinely love, use, or display. Write down or photograph its story, and release the rest. Documenting the story preserves the legacy better than a cabinet of things you never look at.",
      },
      {
        title: "6. Gifts for a hobby you dropped",
        body: "A full set of art supplies, an instrument, a pile of sports gear — received during a \"this is my new thing\" moment. Now they mostly remind you that you didn't stick with it.",
        guilt: "Maybe I'll get back into it someday.",
        action: "If it's inexpensive and you could easily buy or borrow it again when needed, let it go. If you do restart, you can re-acquire then — you don't owe years of storage to a maybe.",
      },
      {
        title: "7. Your kids' gift overflow",
        body: "Grandparents and relatives send a steady stream, and toys arrive faster than a child can play with them. Each one seems minor; together they bury a room.",
        guilt: "Grandma keeps sending them — I'd feel bad.",
        action: "Run one-in-one-out for toys: one comes in, one is donated. And tell frequent gift-givers, ahead of time, that you'd love experiences (a day out) or consumables instead.",
      },
      {
        title: "8. Wedding and occasion-gift leftovers",
        body: "Registry leftovers, sets of occasion dishware, decor — you keep them because they're tied to a milestone. But the day, and the relationship, are not stored in the gravy boat you never use.",
        guilt: "But it was a wedding gift.",
        action: "Keep what you actually use; release the rest. Your marriage is not diminished by one gravy boat leaving the house.",
      },
    ],
    principlesTitle: "Two ideas that dissolve the guilt",
    principlesBody: "Letting go of gifts is never about the action — it's about the feeling. These two ideas are made to loosen it.",
    principle1Heading: "The gift did its job the moment it was given",
    principle1Body:
      "A gift is an act of care, delivered the instant it was handed over. What you do with the object afterward does not reach back in time and cancel that care. Donating it doesn't travel to the past and reject the person. The care has already arrived; the object is free.",
    principle2Heading: "The 30-day rehome window",
    principle2Body:
      "Don't let an unwanted gift sit indefinitely. Give yourself about 30 days to decide: use, return, regift, donate, or sell. The longer it sits, the more load-bearing it feels — which is just inertia, not the object actually mattering.",
    faqTitle: "Frequently asked questions",
    faqs: [
      ["Isn't it rude or ungrateful to get rid of a gift?", "No. Your gratitude was for the gesture — that someone chose to think of you — not a contract to store the object for life. The politeness happened when you received it; what you do with the thing afterward is yours to decide."],
      ["What if they ask where it is, or visit and notice?", "Most people don't remember what they gave, let alone take inventory. If you are asked, gentle honesty works: \"I passed it on to someone who'd use it more.\" For someone you're close to, keep one displayable piece and release the rest."],
      ["What about gifts from someone who has died?", "Grief is not an obligation. You don't have to keep every object to prove you remember. Keep a representative few, photograph the rest, and let them go — the memory does not shrink. See how to declutter sentimental items for the gentle version."],
      ["How do I stop receiving unwanted gifts in the first place?", "Tell frequent givers, clearly and in advance, what you'd actually love: a shared meal, an experience, consumables, or a wishlist. Handling it before things enter the home is far easier than wrestling with them after. See 10 things to stop buying."],
    ],
    relatedTitle: "Related guides",
    relatedIntro: "Gift guilt is usually the same knot as sentimental items and shopping habits. These go next:",
    relatedLinks: [
      { href: "/how-to-declutter-sentimental-items", label: "How to declutter sentimental items (without guilt)" },
      { href: "/things-to-stop-buying", label: "10 things to stop buying" },
      { href: "/decluttering-decision-guide", label: "Decision guide for hard items" },
      { href: "/things-to-declutter", label: "60 things to declutter from your home" },
      { href: "/declutter-checklist", label: "Interactive declutter checklist" },
    ],
    labels: { guilt: "The guilt", action: "What to do" },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = getCopy(locale);

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLanguageAlternates(locale, "/how-to-declutter-unwanted-gifts"),
  };
}

export default async function UnwantedGiftsPage({ params }: Props) {
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
                    <span className="font-semibold text-[#7a2d2d]">{copy.labels.guilt}: </span>
                    <span className="text-[#414844]">{item.guilt}</span>
                  </div>
                  <div className="rounded-2xl bg-[#dcebdd] px-4 py-3 text-sm md:text-base">
                    <span className="font-semibold text-[#335748]">{copy.labels.action}: </span>
                    <span className="text-[#335748]">{item.action}</span>
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
