import type { Metadata } from "next";
import Link from "next/link";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildLanguageAlternates,
} from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import ClientPage from "./ClientPage";
import { getBuyCopy } from "./copy";

type Props = { params: Promise<{ lang: string }> };

const PATH = "/should-i-buy-it";

/** Renders `**bold**` spans inside copy strings without pulling in a markdown parser. */
function withEmphasis(text: string) {
  return text.split("**").map((part, index) =>
    index % 2 === 1 ? (
      <strong
        key={part}
        className="font-semibold text-[#002d1c] underline decoration-[#82533f]/50 decoration-2 underline-offset-4 dark:text-white dark:decoration-orange-400/60"
      >
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = getBuyCopy(locale);

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    keywords: [...copy.keywords],
    alternates: buildLanguageAlternates(locale, PATH),
  };
}

export default async function ShouldIBuyItPage({ params }: Props) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = getBuyCopy(locale);

  return (
    <>
      <JsonLd data={buildFaqPageSchema(copy.faqs)} />
      <JsonLd
        data={buildBreadcrumbSchema(locale, [
          { name: copy.homeLabel, path: "/" },
          { name: copy.breadcrumbLabel, path: PATH },
        ])}
      />

      <main className="min-h-screen bg-[#f3f4ec] px-5 pb-20 pt-24 text-[#1a1c18] dark:bg-gray-900 dark:text-gray-200 md:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-5">
          <section className="rounded-[2rem] bg-white px-6 py-10 shadow-sm ring-1 ring-black/5 dark:bg-gray-800 md:px-10 md:py-14">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#59615d] dark:text-gray-400">
              {copy.eyebrow}
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-[-0.05em] text-[#002d1c] dark:text-white md:text-6xl">
              {copy.heroTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#414844] dark:text-gray-300 md:text-lg md:leading-8">
              {withEmphasis(copy.heroSubtitle)}
            </p>
          </section>
        </div>

        <div className="mt-5">
          <ClientPage copy={copy.tool} locale={locale} />
        </div>

        <div className="mx-auto mt-5 flex max-w-5xl flex-col gap-5">
          <section
            id="should-i-buy-it-flowchart"
            className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 dark:bg-gray-800 md:px-8"
          >
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] dark:text-white md:text-3xl">
              {copy.flowchartTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#414844] dark:text-gray-300">
              {copy.flowchartIntro}
            </p>
            <ol className="mt-6 space-y-4">
              {copy.flowchartSteps.map((step) => (
                <li
                  key={step.question}
                  className="rounded-[1.5rem] bg-[#f9faf2] px-5 py-5 dark:bg-gray-900"
                >
                  <h3 className="text-lg font-bold text-[#002d1c] dark:text-white md:text-xl">
                    {step.question}
                  </h3>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <p className="rounded-2xl bg-[#dcebdd] px-4 py-3 text-sm leading-6 text-[#335748] md:text-base">
                      {step.yes}
                    </p>
                    <p className="rounded-2xl bg-white px-4 py-3 text-sm leading-6 text-[#414844] dark:bg-gray-800 dark:text-gray-300 md:text-base">
                      {step.no}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#414844] dark:text-gray-300">
              {copy.flowchartOutro}
            </p>
          </section>

          <section className="rounded-[2rem] bg-[#fff4df] px-6 py-8 shadow-sm ring-1 ring-black/5 dark:bg-gray-800 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#573611] dark:text-amber-200 md:text-3xl">
              {copy.wageSectionTitle}
            </h2>
            <div className="mt-4 max-w-3xl space-y-4">
              {copy.wageSectionBody.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-base leading-7 text-[#7a5228] dark:text-amber-100/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-white/80 px-5 py-5 dark:bg-gray-900">
              <h3 className="text-lg font-bold text-[#573611] dark:text-amber-200">
                {copy.wageExampleTitle}
              </h3>
              <dl className="mt-4 divide-y divide-[#e6ddd8] dark:divide-gray-700">
                {copy.wageExampleRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 py-2"
                  >
                    <dt className="text-sm text-[#7a5228] dark:text-amber-100/70 md:text-base">
                      {row.label}
                    </dt>
                    <dd className="text-sm font-bold text-[#573611] dark:text-amber-200 md:text-base">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm leading-6 text-[#7a5228] dark:text-amber-100/80 md:text-base md:leading-7">
                {copy.wageExampleNote}
              </p>
            </div>
          </section>

          <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 dark:bg-gray-800 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] dark:text-white md:text-3xl">
              {copy.scoreSectionTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#414844] dark:text-gray-300">
              {copy.scoreSectionIntro}
            </p>
            <div className="mt-6 space-y-4">
              {copy.scoreRows.map((row) => (
                <article
                  key={row.name}
                  className="rounded-[1.5rem] bg-[#f9faf2] px-5 py-5 dark:bg-gray-900"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-bold text-[#002d1c] dark:text-white">
                      {row.name}
                    </h3>
                    <span className="rounded-full bg-[#dcebdd] px-3 py-1 text-xs font-bold text-[#335748]">
                      {row.points}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#414844] dark:text-gray-300 md:text-base md:leading-7">
                    {row.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 dark:bg-gray-800 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] dark:text-white md:text-3xl">
              {copy.faqTitle}
            </h2>
            <div className="mt-6 space-y-4">
              {copy.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-[1.5rem] bg-[#f9faf2] px-5 py-5 dark:bg-gray-900"
                >
                  <h3 className="text-lg font-bold text-[#002d1c] dark:text-white">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#414844] dark:text-gray-300 md:text-base md:leading-7">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] bg-[#dcebdd] px-6 py-8 shadow-sm ring-1 ring-black/5 dark:bg-gray-800 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] dark:text-white md:text-3xl">
              {copy.relatedTitle}
            </h2>
            <p className="mt-3 text-base leading-7 text-[#335748] dark:text-gray-300">
              {copy.relatedIntro}
            </p>
            <ul className="mt-5 grid gap-3 text-sm font-semibold md:grid-cols-2 md:text-base">
              {copy.relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="block rounded-2xl bg-white/80 px-4 py-3 text-[#002d1c] hover:bg-white dark:bg-gray-900 dark:text-gray-100"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
