"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { BuyCopy, ChoiceOption } from "./copy";

const STORAGE_KEY = "should-i-buy-it-state";

type State = {
  item: string;
  price: string;
  uses: string;
  pay: string;
  paidHours: string;
  extraHours: string;
  workCosts: string;
  duplicate: string;
  money: string;
  waited: string;
  storage: string;
};

const EMPTY_STATE: State = {
  item: "",
  price: "",
  uses: "",
  pay: "",
  paidHours: "40",
  extraHours: "",
  workCosts: "",
  duplicate: "",
  money: "",
  waited: "",
  storage: "",
};

function num(value: string): number {
  const parsed = Number.parseFloat(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function costPerUsePoints(costPerUse: number): number {
  if (costPerUse <= 1) return 25;
  if (costPerUse <= 5) return 20;
  if (costPerUse <= 10) return 14;
  if (costPerUse <= 25) return 7;
  return 2;
}

function lifeHourPoints(hours: number): number {
  if (hours <= 1) return 20;
  if (hours <= 3) return 16;
  if (hours <= 8) return 12;
  if (hours <= 40) return 6;
  if (hours <= 80) return 3;
  return 0;
}

function pointsFor(options: ChoiceOption[], value: string): number | null {
  const match = options.find((option) => option.value === value);
  return match ? match.points : null;
}

const cardClass =
  "rounded-[1.75rem] border border-[#e6ddd8] bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-8";
const labelClass =
  "block text-sm font-semibold text-[#1f2d24] dark:text-gray-100";
const helpClass = "mt-1 text-sm leading-6 text-[#7b8a81] dark:text-gray-400";
const inputClass =
  "mt-2 w-full rounded-xl border border-[#d6c2bb] bg-[#fbf9f8] px-4 py-3 text-base text-[#1f2d24] outline-none transition-colors focus:border-[#82533f] focus:ring-1 focus:ring-[#82533f] dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100";

export default function ClientPage({
  copy,
  locale,
}: {
  copy: BuyCopy["tool"];
  locale: string;
}) {
  const [state, setState] = useState<State>(EMPTY_STATE);
  const [hydrated, setHydrated] = useState(false);
  const hasUserInteractedRef = useRef(false);
  const lastTrackedResultRef = useRef("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setState({ ...EMPTY_STATE, ...JSON.parse(stored) });
    } catch {
      /* ignore unreadable storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore full or blocked storage */
    }
  }, [state, hydrated]);

  const numberFormat = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }),
    [locale],
  );

  function set<K extends keyof State>(key: K, value: State[K]) {
    hasUserInteractedRef.current = true;
    setState((previous) => ({ ...previous, [key]: value }));
  }

  const price = num(state.price);
  const uses = num(state.uses);
  const pay = num(state.pay);
  const paidHours = num(state.paidHours);
  const extraHours = num(state.extraHours);
  const workCosts = num(state.workCosts);

  const hasBasics = price > 0 && uses > 0;
  const costPerUse = hasBasics ? price / uses : null;

  const nominalWage = pay > 0 && paidHours > 0 ? pay / paidHours : null;
  const totalHours = paidHours + extraHours;
  const realWage =
    pay > 0 && totalHours > 0 ? (pay - workCosts) / totalHours : null;
  const wageDrop =
    nominalWage && realWage && realWage < nominalWage
      ? Math.round(((nominalWage - realWage) / nominalWage) * 100)
      : null;
  const lifeHours =
    realWage && realWage > 0 && price > 0 ? price / realWage : null;

  const rows = useMemo(() => {
    const collected: { label: string; points: number; max: number }[] = [];

    if (costPerUse !== null) {
      collected.push({
        label: copy.breakdownCostPerUse,
        points: costPerUsePoints(costPerUse),
        max: 25,
      });
    }
    if (lifeHours !== null) {
      collected.push({
        label: copy.breakdownLifeHours,
        points: lifeHourPoints(lifeHours),
        max: 20,
      });
    }

    const optional: [string, ChoiceOption[], string, number][] = [
      [copy.breakdownDuplicate, copy.duplicateOptions, state.duplicate, 15],
      [copy.breakdownMoney, copy.moneyOptions, state.money, 15],
      [copy.breakdownWaited, copy.waitedOptions, state.waited, 15],
      [copy.breakdownStorage, copy.storageOptions, state.storage, 10],
    ];

    for (const [label, options, value, max] of optional) {
      const points = pointsFor(options, value);
      if (points !== null) collected.push({ label, points, max });
    }

    return collected;
  }, [
    copy,
    costPerUse,
    lifeHours,
    state.duplicate,
    state.money,
    state.storage,
    state.waited,
  ]);

  const earned = rows.reduce((sum, row) => sum + row.points, 0);
  const available = rows.reduce((sum, row) => sum + row.max, 0);
  const rawScore = available > 0 ? Math.round((earned / available) * 100) : 0;
  const debtCapped = state.money === "debt" && rawScore > 49;
  const score = debtCapped ? 49 : rawScore;

  const verdict =
    copy.verdicts.find((entry) => score >= entry.min) ??
    copy.verdicts[copy.verdicts.length - 1];

  const scoreColor =
    score >= 75
      ? "text-[#2b694d]"
      : score >= 55
        ? "text-[#7a5228]"
        : score >= 35
          ? "text-[#9a5a2b]"
          : "text-[#ba1a1a]";

  useEffect(() => {
    if (!hydrated || !hasUserInteractedRef.current || !hasBasics) return;

    const answers = [
      state.duplicate,
      state.money,
      state.waited,
      state.storage,
    ].filter(Boolean).length;
    const scoreBand =
      score >= 75
        ? "high"
        : score >= 55
          ? "medium"
          : score >= 35
            ? "low"
            : "very_low";
    const fingerprint = [
      price,
      uses,
      score,
      answers,
      realWage,
      debtCapped,
    ].join("|");
    const timeout = window.setTimeout(() => {
      if (lastTrackedResultRef.current === fingerprint) return;
      lastTrackedResultRef.current = fingerprint;
      trackEvent("should_i_buy_it_scored", {
        score_band: scoreBand,
        answered_questions: answers,
        has_real_wage: realWage !== null,
        debt_capped: debtCapped,
      });
    }, 800);

    return () => window.clearTimeout(timeout);
  }, [
    debtCapped,
    hasBasics,
    hydrated,
    price,
    realWage,
    score,
    state.duplicate,
    state.money,
    state.storage,
    state.waited,
    uses,
  ]);

  function resetCalculator() {
    trackEvent("should_i_buy_it_reset");
    lastTrackedResultRef.current = "";
    setState(EMPTY_STATE);
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5">
      <section className={cardClass}>
        <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#1f2d24] dark:text-white">
          {copy.formTitle}
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className={labelClass} htmlFor="sibi-item">
              {copy.itemLabel}
            </label>
            <input
              id="sibi-item"
              type="text"
              value={state.item}
              onChange={(event) => set("item", event.target.value)}
              placeholder={copy.itemPlaceholder}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="sibi-price">
              {copy.priceLabel}
            </label>
            <input
              id="sibi-price"
              type="number"
              inputMode="decimal"
              min="0"
              value={state.price}
              onChange={(event) => set("price", event.target.value)}
              className={inputClass}
            />
            <p className={helpClass}>{copy.priceHelp}</p>
          </div>

          <div>
            <label className={labelClass} htmlFor="sibi-uses">
              {copy.usesLabel}
            </label>
            <input
              id="sibi-uses"
              type="number"
              inputMode="numeric"
              min="0"
              value={state.uses}
              onChange={(event) => set("uses", event.target.value)}
              className={inputClass}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {copy.usesPresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => set("uses", String(preset.value))}
                  className="rounded-full border border-[#d4c4bb] px-3 py-1.5 text-xs font-semibold text-[#7b5137] transition-colors hover:bg-[#f7f3ec] dark:border-gray-600 dark:text-orange-300 dark:hover:bg-gray-700"
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <p className={helpClass}>{copy.usesHelp}</p>
          </div>
        </div>
      </section>

      <section className={cardClass}>
        <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#1f2d24] dark:text-white">
          {copy.wageTitle}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[#52645a] dark:text-gray-300">
          {copy.wageIntro}
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="sibi-pay">
              {copy.payLabel}
            </label>
            <input
              id="sibi-pay"
              type="number"
              inputMode="decimal"
              min="0"
              value={state.pay}
              onChange={(event) => set("pay", event.target.value)}
              className={inputClass}
            />
            <p className={helpClass}>{copy.payHelp}</p>
          </div>
          <div>
            <label className={labelClass} htmlFor="sibi-paid-hours">
              {copy.hoursLabel}
            </label>
            <input
              id="sibi-paid-hours"
              type="number"
              inputMode="decimal"
              min="0"
              value={state.paidHours}
              onChange={(event) => set("paidHours", event.target.value)}
              className={inputClass}
            />
            <p className={helpClass}>{copy.hoursHelp}</p>
          </div>
          <div>
            <label className={labelClass} htmlFor="sibi-extra-hours">
              {copy.extraHoursLabel}
            </label>
            <input
              id="sibi-extra-hours"
              type="number"
              inputMode="decimal"
              min="0"
              value={state.extraHours}
              onChange={(event) => set("extraHours", event.target.value)}
              className={inputClass}
            />
            <p className={helpClass}>{copy.extraHoursHelp}</p>
          </div>
          <div>
            <label className={labelClass} htmlFor="sibi-work-costs">
              {copy.workCostsLabel}
            </label>
            <input
              id="sibi-work-costs"
              type="number"
              inputMode="decimal"
              min="0"
              value={state.workCosts}
              onChange={(event) => set("workCosts", event.target.value)}
              className={inputClass}
            />
            <p className={helpClass}>{copy.workCostsHelp}</p>
          </div>
        </div>

        {nominalWage !== null && realWage !== null && (
          <div className="mt-6 grid gap-4 rounded-[1.5rem] bg-[#f7f3ec] p-5 dark:bg-gray-900 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8b5c47]">
                {copy.nominalWageLabel}
              </p>
              <p className="mt-1 text-2xl font-bold text-[#52645a] dark:text-gray-400">
                <span className="line-through">
                  {numberFormat.format(nominalWage)}
                </span>
                <span className="ml-2 text-base font-semibold text-[#7b8a81]">
                  {copy.perHourSuffix}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8b5c47]">
                {copy.realWageLabel}
              </p>
              <p className="mt-1 text-3xl font-bold text-[#1f2d24] dark:text-white">
                {numberFormat.format(Math.max(0, realWage))}
                <span className="ml-2 text-base font-semibold text-[#7b8a81]">
                  {copy.perHourSuffix}
                </span>
              </p>
              {wageDrop !== null && wageDrop > 0 && (
                <p className="mt-1 text-sm font-semibold text-[#ba1a1a] dark:text-red-400">
                  {copy.wageDropNote.replace("{percent}", String(wageDrop))}
                </p>
              )}
            </div>
          </div>
        )}
      </section>

      <section className={cardClass}>
        <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#1f2d24] dark:text-white">
          {copy.questionsTitle}
        </h2>

        <div className="mt-6 space-y-6">
          {(
            [
              [copy.duplicateLabel, copy.duplicateOptions, "duplicate"],
              [copy.moneyLabel, copy.moneyOptions, "money"],
              [copy.waitedLabel, copy.waitedOptions, "waited"],
              [copy.storageLabel, copy.storageOptions, "storage"],
            ] as [string, ChoiceOption[], keyof State][]
          ).map(([label, options, key]) => (
            <fieldset key={key}>
              <legend className={labelClass}>{label}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {options.map((option) => {
                  const selected = state[key] === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() =>
                        set(
                          key,
                          selected ? "" : (option.value as State[typeof key]),
                        )
                      }
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                        selected
                          ? "border-[#82533f] bg-[#82533f] text-white"
                          : "border-[#d4c4bb] text-[#52645a] hover:bg-[#f7f3ec] dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </section>

      <section
        className="rounded-[1.75rem] border border-[#e6ddd8] bg-[#f7f3ec] p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 md:p-8"
        aria-live="polite"
      >
        <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#1f2d24] dark:text-white">
          {copy.resultTitle}
        </h2>

        {!hasBasics ? (
          <div className="mt-4">
            <p className="text-lg font-semibold text-[#1f2d24] dark:text-gray-100">
              {copy.incompleteTitle}
            </p>
            <p className="mt-2 max-w-2xl text-base leading-7 text-[#52645a] dark:text-gray-300">
              {copy.incompleteBody}
            </p>
          </div>
        ) : (
          <>
            <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-2">
              <p
                className={`text-6xl font-bold tracking-[-0.05em] ${scoreColor} dark:text-white`}
              >
                {score}
              </p>
              <p className="pb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#8b5c47]">
                {copy.scoreOutOf}
              </p>
            </div>

            <h3 className="mt-4 text-2xl font-bold text-[#1f2d24] dark:text-white">
              {state.item.trim() || copy.unnamedItem} — {verdict.title}
            </h3>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#52645a] dark:text-gray-300">
              {verdict.body}
            </p>

            {debtCapped && (
              <p className="mt-4 rounded-2xl bg-[#ffdad6] px-4 py-3 text-sm font-semibold leading-6 text-[#93000a]">
                {copy.debtCapNote}
              </p>
            )}

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] bg-white p-5 dark:bg-gray-800">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8b5c47]">
                  {copy.costPerUseLabel}
                </p>
                <p className="mt-1 text-3xl font-bold text-[#1f2d24] dark:text-white">
                  {costPerUse !== null ? numberFormat.format(costPerUse) : "—"}
                  <span className="ml-2 text-base font-semibold text-[#7b8a81]">
                    {copy.costPerUseSuffix}
                  </span>
                </p>
              </div>
              <div className="rounded-[1.5rem] bg-white p-5 dark:bg-gray-800">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8b5c47]">
                  {copy.lifeHoursLabel}
                </p>
                <p className="mt-1 text-3xl font-bold text-[#1f2d24] dark:text-white">
                  {lifeHours !== null ? numberFormat.format(lifeHours) : "—"}
                  <span className="ml-2 text-base font-semibold text-[#7b8a81]">
                    {copy.lifeHoursSuffix}
                  </span>
                </p>
                {lifeHours !== null && lifeHours > 40 && (
                  <p className="mt-1 text-sm text-[#52645a] dark:text-gray-400">
                    {copy.lifeWeeksNote.replace(
                      "{weeks}",
                      numberFormat.format(lifeHours / 40),
                    )}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-bold text-[#1f2d24] dark:text-white">
                {copy.breakdownTitle}
              </h4>
              <ul className="mt-4 space-y-3">
                {rows.map((row) => (
                  <li key={row.label}>
                    <div className="flex items-center justify-between text-sm font-semibold text-[#52645a] dark:text-gray-300">
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
          </>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={resetCalculator}
            className="rounded-full border border-[#d4c4bb] px-5 py-2.5 text-sm font-semibold text-[#7b5137] transition-colors hover:bg-white dark:border-gray-600 dark:text-orange-300"
          >
            {copy.resetLabel}
          </button>
          <p className="text-sm text-[#7b8a81] dark:text-gray-400">
            {copy.savedNote}
          </p>
        </div>
      </section>
    </div>
  );
}
