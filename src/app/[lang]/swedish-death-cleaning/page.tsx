import type { Metadata } from "next";
import Link from "next/link";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { buildLanguageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

type Step = {
  title: string;
  body: string;
  start: string;
};

type Copy = {
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introBody: string;
  stepsTitle: string;
  stepsIntro: string;
  steps: Step[];
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
  startLabel: string;
};

function getCopy(): Copy {
  return {
    title: "Swedish Death Cleaning: A Gentle Checklist (Döstädning) | DeclutterYourHome",
    description:
      "Swedish death cleaning (döstädning) isn't morbid — it's deciding what stays so no one else has to guess. This gentle checklist walks the order to work in, what to do with sentimental things, and how to start small at any age.",
    eyebrow: "Döstädning",
    heroTitle: "Swedish Death Cleaning: A Gentle Checklist",
    heroSubtitle:
      "Döstädning is the slow, kind practice of paring down so the people you love never have to sort through a lifetime of your stuff. You don't have to be old or ill to do it — you just have to decide what's worth keeping.",
    introTitle: "It's not about death — it's about not leaving a burden",
    introBody:
      "Anyone who has cleared out a parent's or relative's home after they died understands döstädning instantly. People describe it as a nightmare that took the better part of a year, often done alone while grieving, renting dumpsters and second-guessing every object: why did they keep this? Swedish death cleaning, popularized by Margareta Magnusson in The Gentle Art of Swedish Death Cleaning, is simply doing that sorting yourself, slowly, while you still can — so the people you love inherit a home, not a project. Despite the name it isn't grim, and it isn't only for the elderly: plenty of people start in their 30s, 40s, or 50s after a friend or parent's death made the burden real. Many realize they're already doing it and just didn't have a word for it. The guiding question is one Magnusson keeps coming back to: \"Will anyone be happier if I keep this?\" If the honest answer is no, it's a candidate to let go.",
    stepsTitle: "The order to work in",
    stepsIntro:
      "Döstädning is deliberate: you save the hardest, most emotional categories for last, when you've built momentum and trust in your own judgment.",
    steps: [
      {
        title: "1. Start with the impersonal bulk",
        body: "Begin where there's no emotion attached — the garage, the basement, duplicate kitchen tools, linens, unused appliances, the cables drawer. These are pure volume with little feeling, so they build momentum fast and free up obvious space.",
        start: "Pick one storage area and remove anything broken, duplicated, or unused for a year.",
      },
      {
        title: "2. Clothes and everyday things",
        body: "Move to wardrobes and daily-use items. Keep what fits the life you actually live now, not the one you're storing clothes for. Donate the rest while it can still help someone.",
        start: "Pull everything you haven't worn in a year; donate what you won't wear again.",
      },
      {
        title: "3. Furniture and large items",
        body: "Decide which big pieces you truly use and which are just filling rooms. Offer the rest to family who actually want them now, or sell and donate — don't leave the deciding to someone grieving later.",
        start: "List the large items no one uses, and start offering or selling them.",
      },
      {
        title: "4. Paperwork — and the digital pile everyone forgets",
        body: "Physical documents are only half of it. The thing people on r/declutter worry about most is digital: \"can my partner even access our accounts if I'm gone?\" Sort photos into folders, delete what you'd never want anyone to see, and write down how to reach the important accounts. This is the most loving part of döstädning — it spares your people a paperwork-and-password scavenger hunt during the worst week of their lives.",
        start: "Make one document with key accounts, passwords/access, contacts, and where papers live.",
      },
      {
        title: "5. Sentimental items — last, and gently",
        body: "Photos, letters, mementos, heirlooms. Save these for the end, when you've practiced deciding. Keep a curated few that truly carry the memory; photograph the rest. Some things you may simply enjoy keeping for yourself — that's allowed.",
        start: "Keep one representative box of mementos; photograph the rest before letting go.",
      },
      {
        title: "6. The 'throw-away box' for the most private things",
        body: "Magnusson's own tip: keep one box of things meant only for you — diaries, private letters — labelled to be discarded unread when you're gone. It lets you keep them now without leaving them for others to find.",
        start: "Set aside one labelled box for private items to be discarded, not read.",
      },
    ],
    principlesTitle: "Two ideas that make it gentle",
    principlesBody: "Döstädning is meant to be slow and kind, not a grim deadline. These two ideas keep it that way.",
    principle1Heading: "Will anyone be happier if I keep this?",
    principle1Body:
      "The whole method fits in one question. Not \"could this be useful\" or \"did it cost money\" — but whether keeping it actually makes someone's life better. If the only thing it does is wait in a box, it's already done its job.",
    principle2Heading: "Do it with people, not secretly",
    principle2Body:
      "A quiet part of death cleaning is conversation. Ask family if they want a particular thing now, while you can hear the story behind their answer — what no one claims, you're free to release without guilt. One caution from people who've been on the receiving end: a parent who quietly cleared everything out can leave grown kids feeling \"robbed\" of going through the memories themselves. The fix isn't to keep everything; it's to talk, and to tell them plainly they're not obligated to keep anything you kept.",
    faqTitle: "Frequently asked questions",
    faqs: [
      ["Isn't Swedish death cleaning only for old people?", "No. Magnusson suggests starting around 50, but the habit suits any age. The earlier you keep only what matters, the lighter your home is to live in — death cleaning is really just decluttering with the long view in mind."],
      ["How is it different from KonMari?", "KonMari asks what sparks joy and is often a single intense purge. Döstädning is slower and other-focused: it asks what you'd be comfortable leaving behind, and works category by category over months or years."],
      ["Where do I start if it feels overwhelming?", "Start with the least emotional category — the garage, duplicates, the junk drawer. Momentum from easy wins makes the sentimental decisions far easier when you reach them. See the decision guide for hard items."],
      ["What about all the sentimental things?", "Save them for last, keep a curated few, and photograph the rest. The memory lives in you and in the photo, not in the shelf space. See how to declutter sentimental items for the gentle method."],
      ["How do I get an aging parent to do this?", "Gently, and rarely all at once. Many parents dig in — \"you can deal with it after I die,\" or they get agitated when you suggest letting anything go. Pushing usually backfires. What tends to work: ask to take things you'd actually want now, offer to handle the donating, and start with one low-stakes category together rather than framing it as clearing out their life. You can't force it; you can make saying yes easy."],
    ],
    relatedTitle: "Related guides",
    relatedIntro: "Death cleaning touches sentimental items, inherited things, and everyday decisions. These go next:",
    relatedLinks: [
      { href: "/how-to-declutter-sentimental-items", label: "How to declutter sentimental items (without guilt)" },
      { href: "/decluttering-after-a-death", label: "Decluttering after a death" },
      { href: "/decluttering-before-a-move", label: "Decluttering before a move (downsizing)" },
      { href: "/decluttering-decision-guide", label: "Decision guide for hard items" },
      { href: "/declutter-checklist", label: "Interactive declutter checklist" },
    ],
    startLabel: "Start here",
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = getCopy();

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLanguageAlternates(locale, "/swedish-death-cleaning"),
  };
}

export default async function SwedishDeathCleaningPage({ params }: Props) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = getCopy();

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
            {copy.stepsTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#414844]">{copy.stepsIntro}</p>
          <div className="mt-6 space-y-5">
            {copy.steps.map((step) => (
              <article key={step.title} className="rounded-[1.5rem] bg-[#f9faf2] px-5 py-5">
                <h3 className="text-lg font-bold text-[#002d1c] md:text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#414844] md:text-base md:leading-7">
                  {step.body}
                </p>
                <div className="mt-4 rounded-2xl bg-[#dcebdd] px-4 py-3 text-sm md:text-base">
                  <span className="font-semibold text-[#335748]">{copy.startLabel}: </span>
                  <span className="text-[#335748]">{step.start}</span>
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
