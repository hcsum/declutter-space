"use client";

import { useRef } from "react";
import { printWorksheet } from "@/lib/print-worksheet";
import { trackEvent } from "@/lib/analytics";

const prompts = [
  [
    "item",
    "What is the item or small group of items?",
    "For example: birthday cards from my sister",
  ],
  [
    "memory",
    "What memory or feeling do I want to keep?",
    "A person, a story, handwriting, a moment…",
  ],
  [
    "representative",
    "What would preserve that best?",
    "The original, one representative item, a photo, a written story…",
  ],
  [
    "next",
    "What is my next small action?",
    "For example: keep the handwritten letter; photograph the card",
  ],
  [
    "home",
    "Where will it go, or when will I revisit it?",
    "A named album, a memory box, a recipient, or a review date",
  ],
] as const;

export default function SentimentalWorksheet() {
  const sheet = useRef<HTMLDivElement>(null);

  function print() {
    if (!sheet.current) return;
    trackEvent("worksheet_print_requested", { worksheet: "sentimental_items" });
    printWorksheet(sheet.current, "Sentimental items decision worksheet");
  }

  return (
    <section
      id="decision-worksheet"
      className="scroll-mt-24 rounded-[2rem] bg-[#dcebdd] px-6 py-8 ring-1 ring-black/5 md:px-8"
    >
      <div ref={sheet} lang="en">
        <p className="text-xs font-bold uppercase tracking-widest text-[#335748]">
          One item at a time
        </p>
        <h2 className="mt-3 text-2xl font-bold text-[#002d1c] md:text-3xl">
          Sentimental items decision worksheet
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-[#335748]">
          Pick one item, not the entire box. Keeping it, letting it go, and
          postponing the decision are all valid outcomes. Fill this in, or print
          it blank to write by hand.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {prompts.map(([id, label, placeholder]) => (
            <label
              key={id}
              className="block text-sm font-semibold text-[#002d1c]"
            >
              {label}
              <textarea
                name={id}
                rows={3}
                placeholder={placeholder}
                className="mt-2 block w-full resize-y rounded-xl border border-[#335748]/30 bg-white p-3 font-normal leading-6 text-[#1a1c18] focus:outline-none focus:ring-2 focus:ring-[#335748]"
              />
            </label>
          ))}
          <label className="block text-sm font-semibold text-[#002d1c]">
            My decision for now
            <select
              name="decision"
              className="mt-2 min-h-12 w-full rounded-xl border border-[#335748]/30 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-[#335748]"
              defaultValue=""
            >
              <option value="">Choose when ready</option>
              <option>Keep and give it a home</option>
              <option>Photograph or record the story, then release</option>
              <option>Offer it to someone who wants it</option>
              <option>Recycle or dispose of it appropriately</option>
              <option>Keep for now and revisit on my chosen date</option>
            </select>
          </label>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={print}
          className="min-h-12 rounded-full bg-[#002d1c] px-6 py-3 text-sm font-bold text-white hover:bg-[#335748] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#002d1c]"
        >
          Print worksheet / Save as PDF
        </button>
        <p className="max-w-lg text-sm leading-6 text-[#335748]">
          Use “Save as PDF” in your browser’s print dialog. Your answers are not
          sent to us or saved after you leave this page.
        </p>
      </div>
    </section>
  );
}
