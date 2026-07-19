import Link from "next/link";

/**
 * Shared renderer for the Spanish-only keyword pages under `/es`.
 *
 * These pages are not translations of the English guides — they are written
 * around Spanish search terms, so they share a layout rather than a slug.
 */
export type SpanishGuideCopy = {
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaLabel: string;
  ctaHref: string;
  introTitle: string;
  introBody: string;
  removeTitle: string;
  removeItems: string[];
  stepsTitle: string;
  steps: Array<[string, string]>;
  highlightTitle: string;
  highlightBody: string;
  mistakesTitle: string;
  mistakes: string[];
  keepTitle: string;
  keepBody: string;
  quickResetTitle: string;
  quickResetSteps: string[];
  faqTitle: string;
  faqs: Array<[string, string]>;
  toolTitle: string;
  toolDesc: string;
  relatedTitle: string;
  relatedIntro: string;
  relatedLinks: Array<{ href: string; label: string }>;
};

export default function SpanishGuide({ copy }: { copy: SpanishGuideCopy }) {
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
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
            <Link
              href={copy.ctaHref}
              className="rounded-full bg-[#002d1c] px-5 py-3 text-white"
            >
              {copy.ctaLabel}
            </Link>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
              {copy.introTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-[#414844]">
              {copy.introBody}
            </p>
          </article>

          <aside className="rounded-[2rem] bg-[#dcebdd] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
              {copy.removeTitle}
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[#335748]">
              {copy.removeItems.map((item) => (
                <li key={item} className="rounded-2xl bg-white/70 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
            {copy.stepsTitle}
          </h2>
          <div className="mt-6 space-y-5">
            {copy.steps.map(([title, body]) => (
              <div key={title} className="rounded-[1.5rem] bg-[#f9faf2] px-5 py-5">
                <h3 className="text-lg font-bold text-[#002d1c]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#414844] md:text-base md:leading-7">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-[#fff4df] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#573611] md:text-3xl">
            {copy.highlightTitle}
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-7 text-[#7a5228]">
            {copy.highlightBody}
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
              {copy.mistakesTitle}
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[#414844] md:text-base">
              {copy.mistakes.map((item) => (
                <li key={item} className="rounded-2xl bg-[#f9faf2] px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <aside className="rounded-[2rem] bg-[#dcebdd] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
              {copy.keepTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-[#335748]">
              {copy.keepBody}
            </p>
          </aside>
        </section>

        <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
            {copy.quickResetTitle}
          </h2>
          <ol className="mt-6 space-y-3 text-sm leading-6 text-[#414844] md:text-base">
            {copy.quickResetSteps.map((step) => (
              <li key={step} className="rounded-[1.5rem] bg-[#f9faf2] px-5 py-4">
                {step}
              </li>
            ))}
          </ol>
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
            {copy.toolTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#335748]">
            {copy.toolDesc}
          </p>
          <Link
            href={copy.ctaHref}
            className="mt-6 inline-flex items-center rounded-full bg-[#002d1c] px-6 py-3 text-sm font-bold text-white"
          >
            {copy.ctaLabel}
          </Link>
        </section>

        <section className="rounded-[2rem] bg-[#dcebdd] px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] md:text-3xl">
            {copy.relatedTitle}
          </h2>
          <p className="mt-3 text-base leading-7 text-[#335748]">
            {copy.relatedIntro}
          </p>
          <ul className="mt-5 grid gap-3 text-sm font-semibold md:grid-cols-2 md:text-base">
            {copy.relatedLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
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
