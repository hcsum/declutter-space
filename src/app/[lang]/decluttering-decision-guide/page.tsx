import ClientPage from "./ClientPage";
import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import getDictionary from "@/i18n/getDictionary";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { buildLanguageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const seoContent = {
  en: {
    eyebrow: "How to use this decision guide",
    title: "Use the guide for anything that feels useful, expensive, or emotionally loaded",
    intro:
      "This page works best when you move doubtful items out of your active space instead of forcing an immediate yes-or-no decision. The goal is not to keep more things. The goal is to stop low-grade indecision from clogging your home.",
    points: [
      {
        title: "Put only true maybes into the timer system",
        body: "Trash, duplicates, broken items, and obvious noes do not need a deadline. Reserve this guide for the items that are still creating mental friction because they might be useful, sentimental, or identity-loaded.",
      },
      {
        title: "Keep the maybe zone small and visible",
        body: "A single box, shelf, or basket is better than letting undecided items spread across different rooms. Containment makes the experiment real and gives Google a clearer topic cluster on this page.",
      },
      {
        title: "Pair the guide with room-by-room cleanup",
        body: "The decision guide is strongest when it supports action elsewhere. Use it to remove hesitation from bedrooms, kitchens, closets, and home offices without leaving those rooms full of pending choices.",
      },
    ],
    faqTitle: "Decision guide FAQ",
    faqs: [
      {
        question: "What kinds of items belong here?",
        answer:
          "Good candidates are sentimental objects, expensive mistakes, backup gadgets, hobby supplies, and clothes you feel unsure about. If the item is clearly trash or clearly useful, do not send it here.",
      },
      {
        question: "How long should I give a maybe item?",
        answer:
          "Long enough for real life to reveal the answer. For everyday household items, a few weeks to a few months is usually enough. If the deadline passes and nothing changed, that is the signal.",
      },
      {
        question: "What should I read next if indecision is tied to a room?",
        answer:
          "Switch to a room guide or checklist once the hesitation is contained. The checklist, sentimental-items guide, and ADHD-friendly cleaning checklist are the best next steps depending on what is slowing you down.",
      },
    ],
    relatedLinks: [
      { href: "/declutter-checklist", label: "Interactive declutter checklist" },
      { href: "/how-to-declutter-sentimental-items", label: "How to declutter sentimental items" },
      { href: "/adhd-cleaning-checklist", label: "ADHD-friendly cleaning checklist" },
    ],
  },
  zh: {
    eyebrow: "这份判断页怎么用",
    title: "把它用在那些“好像还有用、又总让你卡住”的东西上",
    intro:
      "这页最适合处理那些你暂时不想立刻扔掉、但继续留在原地又会反复消耗注意力的物品。目标不是替自己找更多保留理由，而是把犹豫从日常空间里隔离出来，让家里先恢复流动。",
    points: [
      {
        title: "只有真正的犹豫项才值得进这个系统",
        body: "垃圾、损坏物、明显重复物和显然不会再用的东西，不需要再给期限。这个判断页应该留给情绪物品、昂贵失误、备用电子设备、兴趣残留和身份感很重的物品。",
      },
      {
        title: "让 maybe 区有明确边界",
        body: "用一个盒子、一层架子或一个篮子集中这些待判断物，而不是让它们继续散落在不同房间。边界越清楚，你越容易真的回来看，也越能让搜索引擎理解这页的主题。",
      },
      {
        title: "把它和按房间整理配合起来用",
        body: "这页最有价值的地方，是帮你把卧室、厨房、衣柜和家庭办公室里的犹豫项先移出去。这样你能继续推进整理，而不是被少数难决定的东西拖住整页进度。",
      },
    ],
    faqTitle: "犹豫物品判断 FAQ",
    faqs: [
      {
        question: "哪些东西最适合放进这个判断页？",
        answer:
          "情感物品、昂贵却没用上的购买、备用设备、兴趣用品、拿不准是否还会穿的衣服，都很适合。明显垃圾和明显必需品都不该进来。",
      },
      {
        question: "期限要设多久才合理？",
        answer:
          "要长到让真实生活替你给答案。对大多数家居物品来说，几周到几个月通常就够了。期限到了仍然没有被拿出来用，本身就是信号。",
      },
      {
        question: "如果犹豫和某个房间强相关，下一步看什么？",
        answer:
          "先把犹豫项装进期限系统，再回到对应房间页继续整理。大多数情况下，接下来最值得看的会是断舍离清单、情感物品页，或者 ADHD 友好的家务清单。",
      },
    ],
    relatedLinks: [
      { href: "/declutter-checklist", label: "互动断舍离清单" },
      { href: "/how-to-declutter-sentimental-items", label: "如何整理情感物品" },
      { href: "/adhd-cleaning-checklist", label: "ADHD 友好的家务清单" },
    ],
  },
  ja: {
    eyebrow: "この判断ページの使い方",
    title: "まだ使うかもしれない物、でも考えるたびに止まる物に使う",
    intro:
      "このページは、今すぐ捨てる決断はしたくないけれど、元の場所に置き続けると毎回気持ちが止まる物に向いています。目的は持ち物を増やすことではなく、迷いを生活空間から一度切り離すことです。",
    points: [
      {
        title: "本当に迷う物だけを期限つきにする",
        body: "ゴミ、壊れた物、明らかな重複、はっきりした no はここに入れません。思い出の品、高かった失敗買い、予備のガジェット、趣味の残り、手放しにくい服などに使います。",
      },
      {
        title: "maybe 置き場は小さく、見える形にする",
        body: "箱 1 つ、棚 1 段、バスケット 1 つに集めて、複数の部屋へ広げないのがコツです。境界がはっきりしているほど、後で見直しやすくなります。",
      },
      {
        title: "部屋別の片付けとセットで使う",
        body: "寝室、キッチン、クローゼット、ホームオフィスで止まる物を一度ここへ逃がすと、部屋の片付け自体は前に進めやすくなります。迷いを隔離して、部屋を止めないためのページです。",
      },
    ],
    faqTitle: "迷う物の判断 FAQ",
    faqs: [
      {
        question: "どんな物を入れるべきですか？",
        answer:
          "思い出の品、高かったけれど使わない物、予備の機器、趣味用品、着るか迷う服が向いています。明らかなゴミや明らかな必需品はここに入れません。",
      },
      {
        question: "期限はどれくらいがいいですか？",
        answer:
          "実生活が答えを出してくれるだけの長さです。日常の家の物なら、数週間から数か月で十分なことが多いです。期限が来ても動かなかったなら、それ自体が答えです。",
      },
      {
        question: "迷いが特定の部屋に関係しているなら次に何を見るべきですか？",
        answer:
          "まずはこのページで迷いを隔離し、そのあと部屋別ガイドやチェックリストへ戻るのが効果的です。片付けチェックリスト、思い出の品ガイド、ADHD 向けチェックリストが次の候補になります。",
      },
    ],
    relatedLinks: [
      { href: "/declutter-checklist", label: "インタラクティブ片付けチェックリスト" },
      { href: "/how-to-declutter-sentimental-items", label: "思い出の品を片付ける方法" },
      { href: "/adhd-cleaning-checklist", label: "ADHD フレンドリーな掃除チェックリスト" },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);

  return {
    title: dict.declutteringTips.metaTitle,
    description: dict.declutteringTips.metaDescription,
    keywords: [
      "decluttering decision guide",
      "should I keep it",
      "declutter maybe box",
      "how to decide what to keep",
      "decluttering guide",
    ],
    alternates: buildLanguageAlternates(locale, "/decluttering-decision-guide"),
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = seoContent[locale as keyof typeof seoContent] ?? seoContent.en;

  return (
    <>
      <Suspense fallback={null}>
        <ClientPage />
      </Suspense>

      <section className="bg-[#fbf9f8] px-6 pb-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#e6ddd8] bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b5c47]">
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#1f2d24] md:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[#52645a]">
            {copy.intro}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {copy.points.map((point) => (
              <div
                key={point.title}
                className="rounded-[1.5rem] bg-[#f7f3ec] p-5 ring-1 ring-black/5"
              >
                <h3 className="text-lg font-bold text-[#1f2d24]">{point.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#52645a]">{point.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-bold tracking-[-0.03em] text-[#1f2d24]">
              {copy.faqTitle}
            </h3>
            <div className="mt-5 space-y-4">
              {copy.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-[1.5rem] border border-[#e6ddd8] bg-white p-5"
                >
                  <h4 className="text-base font-semibold text-[#1f2d24]">{faq.question}</h4>
                  <p className="mt-2 text-sm leading-7 text-[#52645a]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="flex flex-wrap gap-3">
              {copy.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className="rounded-full border border-[#d4c4bb] px-4 py-2 text-sm font-semibold text-[#7b5137] transition-colors hover:bg-[#f7f3ec]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
