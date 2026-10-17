import Link from "next/link";

const guides = {
  kitchen: {
    title: "Kitchen decluttering checklist: what to keep, donate, or discard",
    intro:
      "Start with one drawer or shelf, not every cupboard at once. Separate your own belongings from shared items before deciding what leaves. Use these checks rather than a fixed number of things you must keep.",
    rows: [
      ["Food storage containers and lids", "Match each lid to a base. Keep intact sets in sizes you actually use for leftovers, lunches, or freezing.", "Set unmatched pieces aside until you have checked the dishwasher and other cupboards. Release unwanted pieces using local waste rules; not all plastic containers are accepted for recycling."],
      ["Mugs, glasses, and dishes", "Base your working set on household meals, washing frequency, and guests you actually host. Keep accessible or adapted items even if they look like duplicates.", "Offer clean, intact extras to someone who wants them. Do not donate chipped or broken tableware."],
      ["Utensils and single-purpose gadgets", "Keep tools that serve a real task. Test similar tools on your next cooking session before choosing a favourite.", "Donate clean, working extras. Put uncertain tools in a labelled review box with a date that suits your routine."],
      ["Small appliances", "Consider actual use, seasonal cooking, accessibility, and storage effort. An occasional-use appliance can still be worth keeping.", "Ask other household users first. Donate or sell working appliances with their parts; use local electrical-waste collection for broken ones."],
      ["Pantry food and spices", "Group duplicates and put items you plan to use soon in front. Read storage instructions and distinguish quality dates from safety-related dates.", "Remove spoiled food and follow product-specific safety instructions. Check a food bank’s rules before donating unopened items; never assume every past-date food is safe or unsafe."],
    ],
    exampleTitle: "Example: finish one food-container drawer",
    example:
      "Imagine a drawer with mixed tubs and loose lids. Empty only that drawer onto a clear surface, match the sets, and check elsewhere for missing pieces. Return intact sets that fit your real meals, nesting them only if they stay easy to retrieve. Put usable extras in a donation bag and deal with damaged pieces according to local rules. Close the drawer before opening another zone.",
    resetTitle: "A 15-minute kitchen reset: choose one small finish",
    reset:
      "Use 15 minutes as a time box, not a promise to finish the room. Choose one container drawer, one pantry shelf, or one section of counter. Sort, wipe the empty surface, return what belongs, and move the outgoing bag to its next destination. If time runs out, stop opening new areas and leave the cooking space usable.",
    checklist: "kitchen",
    checklistLabel: "Use the interactive kitchen decluttering checklist",
    related: "/how-to-declutter-unwanted-gifts",
    relatedLabel: "Stuck on gift cookware? Read the unwanted-gifts guide",
  },
  bathroom: {
    title: "Bathroom decluttering checklist: toiletries, makeup, and backups",
    intro:
      "Choose one drawer, shelf, or shower corner. Sort products by owner and purpose so someone else’s daily essentials do not end up in your outgoing bag. A backup is useful when you have a realistic plan to use and store it.",
    rows: [
      ["Skincare, makeup, and sunscreen", "Check the expiry date, period-after-opening symbol where present, and manufacturer’s storage instructions. Keep products that suit you and are still appropriate to use.", "Do not force yourself to finish an irritating or deteriorated product. Follow local disposal guidance; acceptance of packaging and leftover product varies."],
      ["Shampoo, toothpaste, and other backups", "Group stock by product and owner. Compare what is left with how quickly your household uses it and how easily you can replace it.", "Pause buying categories you already have covered. Offer suitable unopened extras only where the recipient or donation service accepts them."],
      ["Samples and travel toiletries", "Give each keeper a specific purpose, such as an upcoming trip or a product you already use. Store them together where you can find them.", "Release unwanted or expired samples. Do not mix unknown leftovers together or refill a bottle in a way that loses important product information."],
      ["Medicines and first-aid supplies", "Check labels, expiry dates, and storage requirements. Store medicines as directed, away from children; a humid bathroom may not meet the label’s conditions.", "Ask a pharmacist or local authority about medicine take-back and sharps collection. Follow product-specific disposal instructions instead of putting everything in the bin or drain."],
      ["Towels, tools, and cleaning supplies", "Keep usable towels for actual household needs. Separate personal-care items from cleaners and keep chemicals in their original labelled containers.", "Launder and reassess towels before replacing them for appearance alone. Check textile-donation rules; follow local guidance for chemicals, blades, batteries, and electrical tools."],
    ],
    exampleTitle: "Example: sort a shelf of backup toiletries",
    example:
      "Imagine finding several shampoos, sample sachets, and a sunscreen behind your current products. Separate them by owner, check labels and opening information, and return current-use items to the front. Put suitable backups together and add ‘no shampoo needed’ to your shopping list. Offer accepted unopened extras, and set aside expired or unwanted products for the appropriate disposal route. You do not need to empty every bottle to justify letting it go.",
    resetTitle: "A 15-minute bathroom reset: one shelf is enough",
    reset:
      "Treat the timer as a stopping point, not a deadline for the whole bathroom. Clear one shelf, group its products, check their labels, and wipe the empty surface. Return daily-use products and put backups in one visible zone. Keep items awaiting medicine or chemical disposal safely separated rather than rushing them into general waste.",
    checklist: "bathroom-laundry",
    checklistLabel: "Use the interactive bathroom and laundry checklist",
    related: "/things-to-stop-buying",
    relatedLabel: "Reduce repeat purchases with the things-to-stop-buying guide",
  },
} as const;

export default function RoomDecisionGuide({
  room,
}: {
  room: keyof typeof guides;
}) {
  const guide = guides[room];

  return (
    <section
      id="item-decisions"
      className="scroll-mt-24 rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8"
    >
      <h2 className="text-2xl font-bold text-[#002d1c] md:text-3xl">
        {guide.title}
      </h2>
      <p className="mt-4 max-w-4xl leading-7 text-[#414844]">{guide.intro}</p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-black/10">
        <table className="w-full min-w-[640px] text-left text-sm leading-6">
          <caption className="sr-only">{guide.title}</caption>
          <thead className="bg-[#dcebdd] text-[#002d1c]">
            <tr>
              {["Category", "What to keep and check", "What to do with the rest"].map((heading) => (
                <th key={heading} scope="col" className="p-4">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {guide.rows.map(([category, keep, release]) => (
              <tr key={category} className="border-t border-black/10">
                <th scope="row" className="p-4 align-top text-[#002d1c]">{category}</th>
                <td className="p-4 align-top text-[#414844]">{keep}</td>
                <td className="p-4 align-top text-[#414844]">{release}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 rounded-2xl bg-[#f9faf2] p-5 leading-7 text-[#414844]">
        <h3 className="text-lg font-bold text-[#002d1c]">{guide.exampleTitle}</h3>
        <p className="mt-2">{guide.example}</p>
        <p className="mt-2 text-sm">Illustrative example, not a user testimonial.</p>
      </div>
      <h3 className="mt-6 text-lg font-bold text-[#002d1c]">{guide.resetTitle}</h3>
      <p className="mt-2 leading-7 text-[#414844]">{guide.reset}</p>
      <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold text-[#002d1c]">
        <Link className="underline underline-offset-4" href={`/en/declutter-checklist/${guide.checklist}`}>
          {guide.checklistLabel} →
        </Link>
        <Link className="underline underline-offset-4" href={`/en${guide.related}`}>
          {guide.relatedLabel} →
        </Link>
      </div>
    </section>
  );
}
