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
import { getCpwCopy } from "./copy";

type Props = { params: Promise<{ lang: string }> };

const PATH = "/cost-per-wear-calculator";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = getCpwCopy(locale);

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    keywords: [...copy.keywords],
    alternates: buildLanguageAlternates(locale, PATH),
  };
}

function Table({
  title,
  rangeHeader,
  verdictHeader,
  rows,
}: {
  title: string;
  rangeHeader: string;
  verdictHeader: string;
  rows: { range: string; verdict: string }[];
}) {
  return (
    <div className="rounded-[1.5rem] bg-[#f9faf2] px-5 py-5 dark:bg-gray-900">
      <h3 className="text-lg font-bold text-[#002d1c] dark:text-white md:text-xl">
        {title}
      </h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[380px] border-collapse text-left text-sm md:text-base">
          <thead>
            <tr className="border-b border-[#dcd8cf] text-[#59615d] dark:border-gray-700 dark:text-gray-400">
              <th className="py-2 pr-4 font-semibold">{rangeHeader}</th>
              <th className="py-2 font-semibold">{verdictHeader}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.range}
                className="border-b border-[#e9e6dd] text-[#414844] last:border-0 dark:border-gray-800 dark:text-gray-300"
              >
                <td className="whitespace-nowrap py-3 pr-4 font-bold text-[#002d1c] dark:text-white">
                  {row.range}
                </td>
                <td className="py-3 leading-6">{row.verdict}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function CostPerWearCalculatorPage({ params }: Props) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const copy = getCpwCopy(locale);

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
              {copy.heroSubtitle}
            </p>
          </section>
        </div>

        <div className="mt-5">
          <ClientPage copy={copy.tool} locale={locale} />
        </div>

        <div className="mx-auto mt-5 flex max-w-5xl flex-col gap-5">
          <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 dark:bg-gray-800 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] dark:text-white md:text-3xl">
              {copy.formulaTitle}
            </h2>
            <p className="mt-4 rounded-2xl bg-[#dcebdd] px-5 py-4 text-base font-bold text-[#1f5137] md:text-lg">
              {copy.formulaExpression}
            </p>
            <div className="mt-5 max-w-3xl space-y-4">
              {copy.formulaBody.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-base leading-7 text-[#414844] dark:text-gray-300"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 dark:bg-gray-800 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] dark:text-white md:text-3xl">
              {copy.goodTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#414844] dark:text-gray-300">
              {copy.goodIntro}
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Table
                title={copy.everydayTableTitle}
                rangeHeader={copy.tableRangeHeader}
                verdictHeader={copy.tableVerdictHeader}
                rows={copy.everydayRows}
              />
              <Table
                title={copy.occasionTableTitle}
                rangeHeader={copy.tableRangeHeader}
                verdictHeader={copy.tableVerdictHeader}
                rows={copy.occasionRows}
              />
            </div>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#414844] dark:text-gray-300">
              {copy.occasionNote}
            </p>
          </section>

          <section className="rounded-[2rem] bg-[#fff4df] px-6 py-8 shadow-sm ring-1 ring-black/5 dark:bg-gray-800 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#573611] dark:text-amber-200 md:text-3xl">
              {copy.thirtyTestTitle}
            </h2>
            <div className="mt-4 max-w-3xl space-y-4">
              {copy.thirtyTestBody.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-base leading-7 text-[#7a5228] dark:text-amber-100/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 dark:bg-gray-800 md:px-8">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#002d1c] dark:text-white md:text-3xl">
              {copy.nonClothingTitle}
            </h2>
            <div className="mt-4 max-w-3xl space-y-4">
              {copy.nonClothingBody.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-base leading-7 text-[#414844] dark:text-gray-300"
                >
                  {paragraph}
                </p>
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
