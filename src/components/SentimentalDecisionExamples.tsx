import Link from "next/link";

const examples = [
  [
    "Cards and letters",
    "Keep personal messages or handwriting you value.",
    "Photograph a decorative cover if the picture matters more than the paper.",
    "Recycle generic cards you do not want; check local rules for glitter or foil.",
  ],
  [
    "Photographs",
    "Keep meaningful originals and identify people while you can.",
    "Scan fragile photos and back up the files before releasing originals.",
    "Start with duplicates and blurred copies, not the only photo of someone.",
  ],
  [
    "Childhood belongings",
    "Choose a few pieces whose stories you can actually tell.",
    "Photograph a bulky project with a note about who made it and when.",
    "Ask the owner before giving away someone else’s belongings.",
  ],
  [
    "A loved one’s clothing",
    "Keep a piece you want to wear, hold, or remember them by.",
    "Photograph details if that feels helpful; a photo need not replace the object.",
    "Offer suitable clothing to family or a donation service when you are ready.",
  ],
  [
    "Souvenirs and gifts",
    "Keep what you enjoy seeing or using now.",
    "Record the trip or occasion in a photo caption.",
    "Offer useful items to someone who wants them; do not pass on an obligation.",
  ],
];

export default function SentimentalDecisionExamples() {
  return (
    <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
      <h2 className="text-2xl font-bold text-[#002d1c] md:text-3xl">
        What to keep, photograph, or let go: examples by item
      </h2>
      <p className="mt-3 max-w-3xl leading-7 text-[#414844]">
        These are starting points, not quotas. An item does not have to be
        useful or on display to deserve a place in your life.
      </p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-black/10">
        <table className="w-full min-w-[680px] text-left text-sm leading-6">
          <caption className="sr-only">
            Sentimental item decisions by category
          </caption>
          <thead className="bg-[#dcebdd] text-[#002d1c]">
            <tr>
              {["Item", "Keep", "Capture the memory", "Release when ready"].map(
                (title) => (
                  <th key={title} scope="col" className="p-4">
                    {title}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {examples.map(([item, ...cells]) => (
              <tr key={item} className="border-t border-black/10">
                <th scope="row" className="p-4 align-top text-[#002d1c]">
                  {item}
                </th>
                {cells.map((cell) => (
                  <td key={cell} className="p-4 align-top text-[#414844]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 rounded-2xl bg-[#f9faf2] p-5 leading-7 text-[#414844]">
        <h3 className="text-lg font-bold text-[#002d1c]">
          Worked example: one box of birthday cards
        </h3>
        <p className="mt-2">
          Imagine a box containing cards with handwritten stories, repeated
          printed greetings, and a few photographs. First separate the
          photographs so they are not lost with the envelopes. Read a small
          handful of cards. Keep the messages you want to read again, photograph
          a cover you like, and recycle unwanted plain-paper duplicates. Put
          names and dates on the chosen cards and give them one labelled home.
          Leave difficult decisions for another session.
        </p>
        <p className="mt-2 text-sm">
          Illustrative example, not a user testimonial. There is no target
          number you must reduce the box to.
        </p>
      </div>
      <div className="mt-5 flex flex-wrap gap-4 text-sm font-bold text-[#002d1c]">
        <Link
          className="underline underline-offset-4"
          href="/en/how-to-declutter-old-cards-and-letters"
        >
          Follow the cards and letters guide →
        </Link>
        <Link
          className="underline underline-offset-4"
          href="/en/decluttering-decision-guide"
        >
          Still unsure? Open the decision guide →
        </Link>
      </div>
    </section>
  );
}
