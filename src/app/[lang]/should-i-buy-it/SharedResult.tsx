"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { BuyCopy } from "./copy";
import { buildShareUrl, clearShareUrl, type ResultSummary } from "./calculator";
import ResultCard from "./ResultCard";

export default function SharedResult({
  result,
  copy,
  locale,
}: {
  result: ResultSummary | null;
  copy: BuyCopy["tool"];
  locale: string;
}) {
  useEffect(() => {
    // Also strip private fields from previously generated, legacy share links.
    const url = result
      ? buildShareUrl(window.location.href, result)
      : clearShareUrl(window.location.href);
    window.history.replaceState(window.history.state, "", url);
  }, [result]);
  const action = (
    <Link
      href={`/${locale}/should-i-buy-it`}
      className="mt-8 inline-flex min-h-11 items-center rounded-full bg-[#82533f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#663c29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#82533f] dark:bg-orange-200 dark:text-gray-900"
    >
      {copy.startOwnCalculation}
    </Link>
  );
  return result ? (
    <ResultCard result={result} copy={copy} locale={locale}>
      {action}
    </ResultCard>
  ) : (
    <section className="rounded-3xl bg-white p-8 dark:bg-gray-800">
      <h1 className="text-2xl font-semibold">{copy.invalidShare}</h1>
      {action}
    </section>
  );
}
