import Image from "next/image";
import Link from "next/link";
import getDictionary from "@/i18n/getDictionary";
import {
  ChecklistLink,
  GuideBody,
  GuideShell,
  GuideSources,
  type GuideSource,
} from "./ReviewedGuide";

const sources: GuideSource[] = [
  {
    id: "E1",
    label: "Dana K. White: How to Declutter Without Making a Bigger Mess",
    url: "https://www.aslobcomesclean.com/2014/04/how-to-declutter-without-making-a-bigger-mess/",
  },
  {
    id: "E2",
    label: "APDO: Let’s get back to basics",
    url: "https://www.apdo.co.uk/resource/blog-240916-get-back-to-basics.html",
  },
  {
    id: "R2",
    label:
      "Personal discussion: getting rid of items without driving (archived)",
    url: "https://web.archive.org/web/20250211160607/https://www.reddit.com/r/declutter/comments/17yyn38/how_do_i_get_rid_of_stuff_if_im_unable_to_drive/",
  },
  {
    id: "R5",
    label:
      "Personal discussion: accumulating boxes and donation difficulties (archived)",
    url: "https://web.archive.org/web/20250311174910/https://www.reddit.com/r/adhdwomen/comments/1f80mqf/how_do_you_manage_the_overwhelming_number_of_doom/",
  },
  {
    id: "R7",
    label: "Personal account: income needs and the work of selling (archived)",
    url: "https://web.archive.org/web/20250726230259/https://www.reddit.com/r/declutter/comments/1jojy0b/have_you_ever_considered_donating_stuff_that_has/",
  },
  {
    id: "R9",
    label: "Personal discussion: shared space and ownership (archived)",
    url: "https://web.archive.org/web/20241214095015/https://www.reddit.com/r/declutter/comments/1270nem/partner_struggling_with_declutteringnot_taking_on/",
  },
  {
    id: "S1",
    label: "GOV.UK: Dispose of household waste",
    url: "https://www.gov.uk/dispose-household-waste",
  },
  {
    id: "E5",
    label: "British Heart Foundation: Item condition",
    url: "https://www.bhf.org.uk/shop/donating-goods/book-furniture-collection-near-me/item-condition",
  },
  {
    id: "S2",
    label: "US EPA: Used Household Batteries",
    url: "https://www.epa.gov/recycle/used-household-batteries",
  },
];

const firstSession = `## Your first session

You do not need to buy storage or empty a room. Start with one item and a bag for ordinary rubbish. If you know where an item belongs, you can put it there now instead of creating a pile to put away later.

If repeated trips are difficult, use a small return container instead. Leave time to empty it before you finish; do not begin another container while this one is waiting. Choose the route that leaves you with less to clear up if you need to stop. These are options, not a rule that one method works for everyone. [E1, E2]

### 1. Choose an area you can put back before you stop

Try the cutlery drawer, one bedside surface, or the space where you prepare a meal. If you have one room for sleeping, working and eating, choose one function: make room to sit down or put your plate down.

Leave sentimental items and large piles of paperwork for another session unless they are what you came to work on.

### 2. Remove only the obvious rubbish first

Start with packaging and other items you can confidently identify as ordinary household waste. Keep receipts, letters and unfamiliar parts aside if you need to check them.

Do not put batteries or unknown chemicals into a general rubbish bag. Use the relevant local disposal guidance below.

### 3. Decide what this space needs to hold

Return the items you use here. For something that belongs elsewhere, put it away now or use the small return container described above. For duplicates, ask whether you actually need a spare; there is no rule that every household should keep the same number.

If an item belongs to someone else, ask them before removing it. If you are unsure about your own item, label it with the question you need to answer: “Does this charger fit anything we still own?” is more useful than “miscellaneous”.

### 4. Give unwanted items a destination

Choose a destination you can realistically use: a person who has agreed to take it, a shop that accepts it, a suitable collection, or the correct waste service. Check acceptance before making a trip.

If you want to sell something, allow for photographs, listing it, replying to messages and handing it over. Consider whether you need the income and what replacing the item would cost, as well as the work of selling it. Choose one item to assess rather than committing to sell everything. You can keep or postpone a decision; there is no universal price below which you should donate.

If you choose collection or a local handover, confirm what is accepted, who will carry it and when it will leave. Decide what to do if nobody comes. Do not assume that you have to leave items outside while you wait. [R2, R5, R7]

### 5. Finish with the area usable

Put back what belongs here. Keep the floor, doors and access routes clear. Write down the next action for anything waiting to leave, including who will take it and when.

A labelled bag waiting for an arranged collection is a pending task, not a completed donation. If you cannot leave home or carry it, choose a route that fits that constraint rather than another drop-off list.

## Example: a drawer that will not close

Illustrative example, not a customer story.

You find cutlery, takeaway packets, a spare key, receipts and a power bank. Return the cutlery. Put the key in a labelled place after checking what it opens. Check the receipts before recycling any paper. Keep the power bank out of the rubbish bag and look up an appropriate collection route. Decide which packets you will use rather than automatically keeping or throwing away all of them.

Stop when the drawer closes and the items you need are easy to reach. You do not have to sort every kitchen cupboard to finish this session.`;

const destinations = `## Where will it go? Check the local route

### UK

Check your council website for accepted waste, collection days, large-item collection and recycling centres. A charity shop is an option for reusable items, but check that particular shop before taking them. [S1]

For furniture collection, check the condition requirements before booking. For example, the British Heart Foundation needs items it can sell: its guidance covers working condition, missing parts and fire safety labels for upholstered items. Its collection crew can refuse unsuitable items. These are BHF’s conditions, not a promise that every charity has the same rules or can collect from your address. [E5]

### US

Check your local solid-waste service for collection options. For batteries, use battery-specific guidance rather than assuming all types go in the same bin. EPA says rechargeable batteries should not go in household rubbish or municipal recycling bins; its guide explains collection routes and precautions. [S2]

### Elsewhere

Use your local authority or waste provider’s guidance. The UK and US examples above do not establish the rules where you live.

These are routing instructions, not a directory of verified nearby services. We do not promise that a particular shop offers free collection or accepts every item.

## Questions people have before starting

### Should I buy organisers first?

Try the space with what you already own. Once you know what needs to stay, measure the storage you need before buying anything.

### What if I have no spare room to sort things?

Keep the sorting area small enough to pack away. Work on one shelf or surface, and leave the bed, seating and walking routes usable. You can take the next session from there.

### Do I need to throw away things I have not used for a year?

No. Seasonal equipment, occasional clothing and essential spares can still have a purpose. Ask whether you expect to need the item, whether it is usable, and what replacing it would involve.

### What if the donation bag never leaves?

Check why it is waiting. Choose one bag or item and confirm a destination, whether it is accepted, how it will get there, and when. If transport is the problem, look for an appropriate collection or an agreed handover. Check costs and what happens if the item is refused. If no destination is confirmed, finding one is the next task; making another bag will not resolve that.

### Can I declutter things my partner leaves out?

For a shared surface, agree what it needs to stay usable for, such as eating a meal. Each person decides about their own possessions; agree where items can wait without taking over that space. A new box or drawer is only an option if the person can and will use it. Start with your own items while you make that agreement. [R9]`;

export default function EnglishHome() {
  const { home } = getDictionary("en");
  return (
    <GuideShell>
      <section className="py-8 md:py-12">
        <h1 className="text-4xl font-display leading-tight text-on-surface dark:text-white md:text-6xl">
          {home.heroTitle}
        </h1>
        <p className="mt-6 text-lg leading-8">{home.heroSubtitle}</p>
        <p className="mt-4">
          Start with your own belongings. Shared items need a shared decision.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <ChecklistLink />
          <a
            href="#first-steps"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4 dark:text-orange-300"
          >
            Show me the first steps
          </a>
        </div>
        <Image
          src="/hero.webp"
          alt="An organised living space"
          width={900}
          height={400}
          priority
          className="mt-10 h-56 w-full rounded-[1.5rem] object-cover md:h-80"
        />
      </section>
      <GuideBody
        body={firstSession}
        sources={sources}
        firstSectionId="first-steps"
      />
      <section
        className="rounded-[2rem] bg-surface px-6 py-8 dark:bg-gray-800 md:px-10"
        id="room-by-room"
      >
        <h2 className="text-2xl font-bold text-on-surface dark:text-white md:text-3xl">
          Choose the area you need next
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            [
              "Kitchen",
              "Start with the surface or drawer that makes preparing food difficult.",
              "how-to-declutter-your-kitchen",
            ],
            [
              "Bedroom",
              "Make the sleeping space usable; deal with clothes and unrelated objects separately.",
              "how-to-declutter-your-bedroom",
            ],
            [
              "Closet",
              "Review one clothing category without emptying every shelf onto the bed.",
              "how-to-declutter-your-closet",
            ],
            [
              "Bathroom",
              "Check one shelf, including product instructions and any special disposal needs.",
              "how-to-declutter-your-bathroom",
            ],
            [
              "Home office or shared desk",
              "Separate papers needing action from papers needing review before discarding anything.",
              "how-to-declutter-your-home-office",
            ],
            [
              "Sentimental items",
              "Work through individual decisions without imposing a deadline to throw things away.",
              "how-to-declutter-sentimental-items",
            ],
          ].map(([title, description, path]) => (
            <Link
              key={path}
              href={`/en/${path}`}
              className="rounded-2xl border border-outline-variant p-5 transition-colors hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary dark:border-gray-600"
            >
              <h3 className="text-lg font-semibold text-primary dark:text-orange-300">
                {title} →
              </h3>
              <p className="mt-2">{description}</p>
            </Link>
          ))}
        </div>
        <Link
          href="/en/decluttering-decision-guide"
          className="mt-6 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4 dark:text-orange-300"
        >
          Need help deciding about an item? Open the decision guide →
        </Link>
      </section>
      <GuideBody body={destinations} sources={sources} />
      <GuideSources sources={sources} />
      <div className="py-4">
        <ChecklistLink />
      </div>
    </GuideShell>
  );
}
