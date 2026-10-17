import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SentimentalWorksheet from "@/components/SentimentalWorksheet";
import { JsonLd } from "@/components/json-ld";
import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildLanguageAlternates,
} from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };
const PATH = "/how-to-declutter-old-cards-and-letters";
const faqs = [
  {
    question: "Is it OK to throw away old birthday and Christmas cards?",
    answer:
      "Yes, if you do not want to keep them. A greeting does not create a lifelong storage obligation. You can keep meaningful personal messages and let go of unwanted generic cards. Check local recycling rules for glitter, foil, ribbon, and photographic paper.",
  },
  {
    question: "How many cards and letters should I keep?",
    answer:
      "There is no correct number. Choose a storage boundary that works for you, then keep messages you value rather than filling it automatically. A small envelope per person or life stage can be easier to revisit than an unsorted box.",
  },
  {
    question: "Should I scan letters before getting rid of them?",
    answer:
      "Only if you want the digital copy. Photograph or scan both sides in good light, check that the handwriting is legible, add names and dates, and back up the files before releasing the original. Keep an original if the physical paper or handwriting matters to you.",
  },
  {
    question: "What about letters from someone who has died?",
    answer:
      "You do not have to start with those. Separate irreplaceable correspondence from routine cards and keep it safe while you decide. You may keep the originals indefinitely. If you want help reducing the collection, work in small sessions and pause when it feels too much.",
  },
];
const steps = [
  [
    "1. Set a small boundary",
    "Choose one handful, one person’s correspondence, or one year. Set aside ten to fifteen minutes and leave the rest of the box closed. You are sorting a small collection, not making a decision about every relationship.",
  ],
  [
    "2. Separate documents and photographs",
    "Check envelopes for photos, cash, addresses you need, and documents with legal or financial significance. Move these out of the card-sorting pile. Do not treat an important record as disposable just because it arrived in a personal letter.",
  ],
  [
    "3. Read for what is personal",
    "Look for a story, a distinctive phrase, a drawing, handwriting, or a message that still matters to you. A printed greeting with only a signature may still be valuable; you get to decide. Group repetitive cards separately so they do not obscure the messages you love.",
  ],
  [
    "4. Choose originals, digital copies, or neither",
    "Keep originals where the object itself matters. For a cover you enjoy but do not need to store, take a photo. For a long letter, photograph every page in order. You can also decide that a card has served its purpose and does not need an archive.",
  ],
  [
    "5. Label before you put things away",
    "Write the sender’s full name and an approximate date on an envelope or archival sleeve rather than over the message. For digital files, use names such as 2018-06-birthday-from-Maya-page-01. Store sensitive letters somewhere private, not in a publicly shared album.",
  ],
  [
    "6. Finish the handoff",
    "Give chosen originals a named home. Check digital files and their backup. Recycle unwanted plain-paper cards if accepted locally; separate decorative materials as required. Shred sensitive personal information when appropriate. Put uncertain items in a labelled review envelope instead of forcing a decision.",
  ],
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if ((await params).lang !== "en") return {};
  return {
    title:
      "How to Declutter Old Cards and Letters (What to Keep) | DeclutterYourHome",
    description:
      "Sort birthday cards, Christmas cards, and personal letters without a keep-everything rule. Includes a worked example, scanning tips, and a free printable decision worksheet.",
    alternates: buildLanguageAlternates("en", PATH),
  };
}

export default async function Page({ params }: Props) {
  if ((await params).lang !== "en") notFound();
  return (
    <main className="min-h-screen bg-[#f3f4ec] px-5 pb-20 pt-24 text-[#1a1c18] md:px-8">
      <JsonLd data={buildFaqPageSchema(faqs)} />
      <JsonLd
        data={buildBreadcrumbSchema("en", [
          { name: "Home", path: "/" },
          {
            name: "Sentimental items",
            path: "/how-to-declutter-sentimental-items",
          },
          { name: "Old cards and letters", path: PATH },
        ])}
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-[2rem] bg-white px-6 py-10 shadow-sm ring-1 ring-black/5 md:px-10 md:py-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#59615d]">
            A smaller, readable memory collection
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-[-0.05em] text-[#002d1c] md:text-6xl">
            How to declutter old cards and letters
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#414844]">
            You can value a person without keeping every envelope they sent.
            Start with one handful of cards, preserve the words that matter, and
            give the collection you keep a home you can actually revisit.
          </p>
          <a
            href="#decision-worksheet"
            className="mt-6 inline-flex rounded-full bg-[#002d1c] px-6 py-3 text-sm font-bold text-white hover:bg-[#335748]"
          >
            Use the free printable worksheet
          </a>
        </section>
        <section className="rounded-[2rem] bg-[#dcebdd] px-6 py-8 md:px-8">
          <h2 className="text-2xl font-bold text-[#002d1c]">
            What is worth keeping?
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-[#335748]">
            <li>
              <strong>Personal words:</strong> stories, advice, private jokes,
              drawings, or messages you want to read again.
            </li>
            <li>
              <strong>Irreplaceable handwriting:</strong> a letter or signature
              whose physical presence matters to you.
            </li>
            <li>
              <strong>Context:</strong> a card that tells a family story, marks
              a transition, or identifies someone in a photo.
            </li>
            <li>
              <strong>Room to pause:</strong> put the hardest letters aside. You
              do not have to reduce every category today.
            </li>
          </ul>
          <p className="mt-4 leading-7 text-[#335748]">
            Begin with duplicates or routine greetings you already feel
            comfortable releasing. There is no universal rule to keep only one
            card per person.
          </p>
        </section>
        <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold text-[#002d1c] md:text-3xl">
            A six-step sort for cards and letters
          </h2>
          <div className="mt-6 space-y-6">
            {steps.map(([title, text]) => (
              <div key={title}>
                <h3 className="text-lg font-bold text-[#002d1c]">{title}</h3>
                <p className="mt-2 max-w-4xl leading-7 text-[#414844]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-[2rem] bg-[#fff4df] px-6 py-8 md:px-8">
          <h2 className="text-2xl font-bold text-[#573611]">
            Worked example: a stack of holiday cards
          </h2>
          <p className="mt-4 max-w-4xl leading-7 text-[#7a5228]">
            Suppose your stack contains repeated seasonal greetings, a letter
            describing a family trip, and a card with a drawing from your niece.
            You might keep the letter and drawing, photograph a cover you love,
            and release the generic cards you do not want. Put the two originals
            in an envelope labelled with names and the year. If a card makes you
            hesitate, leave it in a review envelope; it does not have to hold up
            the rest.
          </p>
          <p className="mt-3 text-sm leading-6 text-[#7a5228]">
            This is an illustrative example, not a testimonial or a target
            amount to keep.
          </p>
        </section>
        <SentimentalWorksheet />
        <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold text-[#002d1c]">
            Questions about keeping old cards and letters
          </h2>
          <div className="mt-5 space-y-6">
            {faqs.map(({ question, answer }) => (
              <div key={question}>
                <h3 className="text-lg font-bold text-[#002d1c]">{question}</h3>
                <p className="mt-2 leading-7 text-[#414844]">{answer}</p>
              </div>
            ))}
          </div>
        </section>
        <nav
          aria-label="Related guides"
          className="flex flex-wrap gap-5 rounded-[2rem] bg-[#dcebdd] p-6 font-semibold text-[#002d1c]"
        >
          <Link
            className="underline underline-offset-4"
            href="/en/how-to-declutter-sentimental-items"
          >
            The full sentimental items guide →
          </Link>
          <Link
            className="underline underline-offset-4"
            href="/en/decluttering-after-a-death"
          >
            Sorting belongings after a death →
          </Link>
          <Link
            className="underline underline-offset-4"
            href="/en/decluttering-decision-guide"
          >
            Help with an uncertain item →
          </Link>
        </nav>
      </div>
    </main>
  );
}
