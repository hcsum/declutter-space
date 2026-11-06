import type { ReactNode } from "react";
import type { BuyCopy } from "./copy";
import {
  BREAKDOWN_FIELDS,
  formatMoney,
  type ResultSummary,
} from "./calculator";
import type { PurchaseResult } from "./results";

export default function ResultCard({
  result,
  copy,
  locale,
  children,
}: {
  result: ResultSummary | PurchaseResult;
  copy: BuyCopy["tool"];
  locale: string;
  children?: ReactNode;
}) {
  const numberFormat = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
  });
  const rows =
    "rows" in result
      ? result.rows
      : (result.breakdown?.flatMap((points, index) =>
          points === null
            ? []
            : [
                {
                  label: copy[BREAKDOWN_FIELDS[index].label],
                  points,
                  max: BREAKDOWN_FIELDS[index].max,
                },
              ],
        ) ?? []);
  const verdict =
    copy.verdicts.find((entry) => result.score >= entry.min) ??
    copy.verdicts[copy.verdicts.length - 1];
  const scoreColor =
    result.score >= 75
      ? "text-[#2b694d]"
      : result.score >= 55
        ? "text-[#7a5228]"
        : result.score >= 35
          ? "text-[#9a5a2b]"
          : "text-[#ba1a1a]";
  return (
    <section
      id="sibi-result"
      tabIndex={-1}
      aria-labelledby="sibi-result-title"
      className="rounded-[1.75rem] border border-[#e6ddd8] bg-[#f7f3ec] p-6 shadow-sm outline-none dark:border-gray-700 dark:bg-gray-900 md:p-8"
    >
      <h2
        id="sibi-result-title"
        className="text-2xl font-bold tracking-[-0.03em] text-[#1f2d24] dark:text-white"
      >
        {copy.resultTitle}
      </h2>
      <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-2">
        <p
          className={`text-6xl font-bold tracking-[-0.05em] ${scoreColor} dark:text-white`}
        >
          {result.score}
        </p>
        <p className="pb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#8b5c47]">
          {copy.scoreOutOf}
        </p>
      </div>
      <h3 className="mt-4 break-words text-2xl font-bold text-[#1f2d24] dark:text-white">
        {result.item || copy.unnamedItem} — {verdict.title}
      </h3>
      {rows.length > 0 && (
        <p className="mt-3 max-w-3xl text-base leading-7 text-[#52645a] dark:text-gray-300">
          {verdict.body}
        </p>
      )}
      {"debtCapped" in result && result.debtCapped && (
        <p className="mt-4 rounded-2xl bg-[#ffdad6] px-4 py-3 text-sm font-semibold leading-6 text-[#93000a]">
          {copy.debtCapNote}
        </p>
      )}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.5rem] bg-white p-5 dark:bg-gray-800">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8b5c47]">
            {copy.costPerUseLabel}
          </p>
          <p className="mt-1 break-words text-3xl font-bold text-[#1f2d24] dark:text-white">
            {formatMoney(result.costPerUse, result.currency, locale)}
            <span className="ml-2 text-base font-semibold text-[#7b8a81]">
              {copy.costPerUseSuffix}
            </span>
          </p>
        </div>
        <div className="rounded-[1.5rem] bg-white p-5 dark:bg-gray-800">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8b5c47]">
            {copy.lifeHoursLabel}
          </p>
          <p className="mt-1 break-words text-3xl font-bold text-[#1f2d24] dark:text-white">
            {result.lifeHours !== null
              ? numberFormat.format(result.lifeHours)
              : "—"}
            <span className="ml-2 text-base font-semibold text-[#7b8a81]">
              {copy.lifeHoursSuffix}
            </span>
          </p>
          {"workingWeeks" in result && result.workingWeeks !== null && (
            <p className="mt-1 text-sm text-[#52645a] dark:text-gray-400">
              {copy.lifeWeeksNote.replace(
                "{weeks}",
                numberFormat.format(result.workingWeeks),
              )}
            </p>
          )}
        </div>
      </div>
      {rows.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-bold text-[#1f2d24] dark:text-white">
            {copy.breakdownTitle}
          </h4>
          <ul className="mt-4 space-y-3">
            {rows.map((row) => (
              <li key={row.label}>
                <div className="flex items-center justify-between gap-3 text-sm font-semibold text-[#52645a] dark:text-gray-300">
                  <span>{row.label}</span>
                  <span>
                    {row.points} / {row.max} {copy.pointsSuffix}
                  </span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[#e4e2e2] dark:bg-gray-700">
                  <div
                    className="h-full rounded-full bg-[#82533f]"
                    style={{ width: `${(row.points / row.max) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {children}
    </section>
  );
}
