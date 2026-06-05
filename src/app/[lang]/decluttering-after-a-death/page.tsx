import type { Metadata } from "next";
import Link from "next/link";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { buildLanguageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

type Item = {
  title: string;
  body: string;
  pressure: string;
  gentle: string;
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
  labels: { pressure: string; gentle: string };
};

function getCopy(): Copy {
  return {
    title: "Decluttering After a Death: A Gentle Guide to a Loved One's Belongings | DeclutterYourHome",
    description:
      "Sorting a deceased loved one's belongings is grief work, not a chore. A gentle, no-deadline guide to going through inherited items and sentimental things — what to keep, what to release, and how to handle the guilt.",
    eyebrow: "Letting Go",
    heroTitle: "Decluttering After a Death: A Gentle Guide to a Loved One's Belongings",
    heroSubtitle:
      "Going through someone's things after they die is grief work, not a chore. You don't have to keep everything to keep them. Here's how to move through it slowly — and what to do with what's left.",
    introTitle: "Keeping it all isn't keeping them",
    introBody:
      "The fear underneath this is that letting go of their things means letting go of them — that you're being disrespectful, or that they would be hurt. But your love and your memories do not live in the objects. They live in you. A house full of someone's belongings can actually keep grief stuck, with every drawer a fresh wave. You are allowed to keep a meaningful few and release the rest. That is not betrayal; it is grief moving forward. There is no deadline here, and no \"right\" amount to keep.",
    itemsTitle: "Going through it, piece by piece",
    items: [
      {
        title: "1. Don't touch the sentimental things yet",
        body: "In the first weeks, well-meaning people may push you to \"clear it out.\" You do not have to. Handle only what is time-sensitive — legal documents, perishables, anything a landlord or estate needs. Everything with a memory attached can wait until you are ready, whether that is months or longer.",
        pressure: "Family or circumstances rushing you to sort it all now.",
        gentle: "Do the urgent, practical items first. Let the sentimental ones wait. Starting before you're ready usually means decisions you later regret.",
      },
      {
        title: "2. The everyday items (clothes, kitchen, furniture)",
        body: "Their clothes, dishes, and furniture carry the least story and take the most space. Giving their coats away can feel unbearable, but these are the items most able to do good somewhere else.",
        pressure: "It feels wrong to give away the clothes they wore.",
        gentle: "Donate so someone uses them — that's a kindness in their name. Keep one or two wearable pieces (a shirt, a scarf) if having something tangible helps.",
      },
      {
        title: "3. The truly sentimental few",
        body: "A watch, a stack of letters, the mug they always used. These are the things that actually hold them for you. The trap is trying to keep everything that was \"theirs\" because all of it feels sacred right now.",
        pressure: "Keep all of it — it was all theirs.",
        gentle: "Choose a small, meaningful set you will actually see or use. A curated few on a shelf honor them more than a storage unit you never open.",
      },
      {
        title: "4. Photos and paper",
        body: "Boxes of photos, cards, and documents pile up fast and feel impossible to cull. But you do not need every blurry duplicate to keep the memory.",
        pressure: "Every photo and note feels like it has to be saved.",
        gentle: "Keep the best, digitize what you can, and share copies with other family. The story survives in a curated album, not in five identical prints.",
      },
      {
        title: "5. Inherited heirlooms (\"it's been in the family\")",
        body: "Items handed down with weight — the china, the furniture, the ring — arrive with a silent \"you're the keeper now.\" That can feel like a duty you can't refuse, even for things you don't love.",
        pressure: "You're the keeper of the family's things now.",
        gentle: "Keep what you genuinely love or use. Write down or photograph its story, offer pieces to other relatives, and release the rest. You are not the family museum.",
      },
      {
        title: "6. Their unfinished projects and hobbies",
        body: "The half-finished quilt, the workshop full of tools, the half-read books. These ache because they represent a life interrupted — but they were never a task you inherited.",
        pressure: "I should finish it / keep all their hobby things.",
        gentle: "Keep one token if you'd like. Pass the materials to someone who'll use them. Their project was theirs; you don't owe it completion or storage.",
      },
      {
        title: "7. The gifts they gave you over the years",
        body: "Now that they're gone, every gift they ever gave can feel untouchable. But the love was in the giving, and that already happened.",
        pressure: "I can't part with anything they gave me.",
        gentle: "Keep the pieces that genuinely mean something; let the rest go. You keep the person, not every object. See how to declutter unwanted gifts for the gentle version.",
      },
      {
        title: "8. The guilt about selling or donating",
        body: "Selling their belongings can feel like putting a price on them, and donating can feel like dismissing them. That guilt is grief, not evidence you're doing something wrong.",
        pressure: "Selling or giving it away feels like a betrayal.",
        gentle: "Passing things to people who need them continues their generosity. The money, or the donation, is not disrespect — it's their things doing good again.",
      },
    ],
    principlesTitle: "Two things to hold onto",
    principlesBody: "When it feels impossible, these two truths take the weight off the decision.",
    principle1Heading: "The memory lives in you, not the object",
    principle1Body:
      "You will not forget them because a sweater left the house. The relationship is carried in you — in stories, habits, the way they shaped you. The objects are reminders, and you only need a few to be reminded. Letting the rest go does not erase a single memory.",
    principle2Heading: "There is no deadline and no quota",
    principle2Body:
      "Grief has no schedule, and neither does this. Take one box at a time, with breaks. Keep what you genuinely want, and know you can revisit later. The goal isn't an empty house or a full one — it's a home you can actually live in while you grieve.",
    faqTitle: "Frequently asked questions",
    faqs: [
      ["How soon should I start going through their things?", "There is no rule. Handle only the time-sensitive and legal items early; the sentimental things can wait months or longer. Don't let anyone rush you — decisions made before you're ready are the ones people most often regret."],
      ["I feel guilty giving their things away. Is that normal?", "Completely. The guilt is grief, not a sign you're doing something wrong. Donating their belongings so others benefit is a gift made in their name, and a way their kindness keeps going."],
      ["What if family disagrees about who keeps what?", "Decide the few high-meaning items together, early and openly. Photograph things so everyone can keep the memory without the object. Don't let belongings fracture relationships that matter far more than the stuff."],
      ["How much should I keep?", "There's no right number. A small, curated set you'll actually see beats boxes you never open. If unsure, keep a little more than you think you'll want for now — you can always revisit once the grief is less raw."],
    ],
    relatedTitle: "Related guides",
    relatedIntro: "Grief, sentimental things, and inherited gifts are the same knot. These go next:",
    relatedLinks: [
      { href: "/how-to-declutter-sentimental-items", label: "How to declutter sentimental items (without guilt)" },
      { href: "/how-to-declutter-unwanted-gifts", label: "How to declutter unwanted gifts" },
      { href: "/decluttering-decision-guide", label: "Decision guide for hard items" },
      { href: "/things-to-declutter", label: "60 things to declutter from your home" },
      { href: "/declutter-checklist", label: "Interactive declutter checklist" },
    ],
    labels: { pressure: "The pressure", gentle: "A gentler way" },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = getCopy();

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildLanguageAlternates(locale, "/decluttering-after-a-death"),
  };
}

export default async function DeclutteringAfterADeathPage({ params }: Props) {
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
                    <span className="font-semibold text-[#7a2d2d]">{copy.labels.pressure}: </span>
                    <span className="text-[#414844]">{item.pressure}</span>
                  </div>
                  <div className="rounded-2xl bg-[#dcebdd] px-4 py-3 text-sm md:text-base">
                    <span className="font-semibold text-[#335748]">{copy.labels.gentle}: </span>
                    <span className="text-[#335748]">{item.gentle}</span>
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
