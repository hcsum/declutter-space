"use client";

import { useEffect, useRef, useState } from "react";
import { ShareIcon } from "@heroicons/react/24/outline";
import { trackEvent } from "@/lib/analytics";
import type { BuyCopy, ChoiceOption } from "./copy";
import PurchasePresets, { type PurchasePreset } from "./PurchasePresets";
import ResultCard from "./ResultCard";
import { currencyForLocale, type ExchangeRates } from "./currency";
import { calculatePurchase, type PurchaseResult } from "./results";
import {
  calculateWage,
  buildShareUrl,
  clearShareUrl,
  EMPTY_STATE,
  isPayPeriod,
  parseAmount,
  restoreState,
  type State,
  type WageField,
} from "./calculator";

const STORAGE_KEY = "should-i-buy-it-state";

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
  exchangeRates,
}: {
  copy: BuyCopy["tool"];
  locale: string;
  exchangeRates: ExchangeRates;
}) {
  const storageKey = `${STORAGE_KEY}-${locale}`;
  const [state, setState] = useState<State>({ ...EMPTY_STATE, currency: currencyForLocale(locale) });
  const [hydrated, setHydrated] = useState(false);
  const [result, setResult] = useState<PurchaseResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const calculationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "manual">(
    "idle",
  );
  const shareRequestRef = useRef(0);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey) ?? window.localStorage.getItem(STORAGE_KEY);
      const restored = stored ? restoreState(JSON.parse(stored)) : { ...EMPTY_STATE };
      setState({ ...restored, currency: restored.currency || currencyForLocale(locale) });
    } catch {
      /* ignore unreadable storage */
    }
    setHydrated(true);
  }, [locale, storageKey]);

  useEffect(
    () => () => {
      if (calculationTimer.current) clearTimeout(calculationTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (result && !isCalculating)
      document.getElementById("sibi-result")?.focus({ preventScroll: true });
  }, [result, isCalculating]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      /* ignore full or blocked storage */
    }
  }, [state, hydrated, storageKey]);

  function clearShareFeedback() {
    shareRequestRef.current += 1;
    setShareUrl("");
    setShareStatus("idle");
  }

  async function shareCalculation() {
    if (!result) return;
    const url = buildShareUrl(window.location.href, result);
    const request = ++shareRequestRef.current;
    setShareUrl(url);
    setShareStatus("idle");
    trackEvent("should_i_buy_it_shared");
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(url);
      if (request === shareRequestRef.current) setShareStatus("copied");
    } catch {
      if (request === shareRequestRef.current) setShareStatus("manual");
    }
  }

  function set<K extends keyof State>(key: K, value: State[K]) {
    setSubmitError("");
    setState((previous) => ({ ...previous, [key]: value }));
  }

  function selectProduct(preset: PurchasePreset) {
    setSubmitError("");
    setState((previous) => ({
      ...previous,
      item: preset.item,
      price: String(preset.price),
      currency: previous.currency,
    }));
    trackEvent("should_i_buy_it_preset_selected", { product_id: preset.id });
  }

  const { realWage, errors: wageErrors } = calculateWage(state);

  function wageError(field: WageField) {
    const error = wageErrors[field];
    return error ? (
      <p
        id={`sibi-${field}-error`}
        className="mt-2 text-sm leading-6 text-[#ba1a1a] dark:text-red-400"
      >
        {copy.wageErrors[error]}
      </p>
    ) : null;
  }

  function calculateResult() {
    if (isCalculating) return;
    const currencyCode = state.currency.trim().toUpperCase();
    const rate = Object.hasOwn(exchangeRates.rates, currencyCode)
      ? exchangeRates.rates[currencyCode]
      : 1;
    const next = calculatePurchase(state, copy, rate);
    if (!next) {
      setSubmitError(copy.incompleteBody);
      document
        .getElementById(
          parseAmount(state.price) && parseAmount(state.price)! > 0
            ? "sibi-uses"
            : "sibi-price",
        )
        ?.focus();
      return;
    }
    if (
      Object.keys(wageErrors).length ||
      (state.pay.trim() && realWage === null)
    ) {
      setSubmitError(copy.wageIncomplete);
      const field = Object.keys(wageErrors)[0] ?? "paidHours";
      document
        .getElementById(
          (
            {
              pay: "sibi-pay",
              paidHours: "sibi-paid-hours",
              extraHours: "sibi-extra-hours",
              workCosts: "sibi-work-costs",
            } as Record<string, string>
          )[field],
        )
        ?.focus();
      return;
    }
    setSubmitError("");
    clearShareFeedback();
    setIsCalculating(true);
    calculationTimer.current = setTimeout(() => {
      setResult(next);
      setIsCalculating(false);
      calculationTimer.current = null;
      trackEvent("should_i_buy_it_scored", {
        score_band:
          next.score >= 75
            ? "high"
            : next.score >= 55
              ? "medium"
              : next.score >= 35
                ? "low"
                : "very_low",
        answered_questions: [
          state.duplicate,
          state.money,
          state.waited,
          state.storage,
        ].filter(Boolean).length,
        has_real_wage: next.lifeHours !== null,
        debt_capped: next.debtCapped,
      });
    }, 450);
  }

  function resetCalculator() {
    trackEvent("should_i_buy_it_reset");
    if (calculationTimer.current) clearTimeout(calculationTimer.current);
    calculationTimer.current = null;
    setResult(null);
    setIsCalculating(false);
    setSubmitError("");
    clearShareFeedback();
    window.history.replaceState(
      window.history.state,
      "",
      clearShareUrl(window.location.href),
    );
    setState({ ...EMPTY_STATE, currency: currencyForLocale(locale) });
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5">
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          calculateResult();
        }}
      >
        <fieldset
          disabled={isCalculating || !hydrated}
          className="flex min-w-0 flex-col gap-5"
        >
          <section className={cardClass}>
            <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#1f2d24] dark:text-white">
              {copy.formTitle}
            </h2>

            <PurchasePresets
                locale={locale}
                currency={state.currency}
                exchangeRates={exchangeRates}
                item={state.item}
                price={state.price}
                onSelect={selectProduct}
              />

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="sibi-item">
                  {copy.itemLabel}
                </label>
                <input
                  id="sibi-item"
                  type="text"
                  maxLength={200}
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
                  step="any"
                  value={state.price}
                  onChange={(event) => set("price", event.target.value)}
                  className={inputClass}
                />
                <p className={helpClass}>{copy.priceHelp}</p>
              </div>

              <div>
                <label className={labelClass} htmlFor="sibi-currency">
                  {copy.currencyLabel}
                </label>
                <input
                  id="sibi-currency"
                  type="text"
                  value={state.currency}
                  onChange={(event) => set("currency", event.target.value)}
                  placeholder={copy.currencyPlaceholder}
                  maxLength={24}
                  autoComplete="off"
                  aria-describedby="sibi-currency-help"
                  className={inputClass}
                />
                <p id="sibi-currency-help" className={helpClass}>
                  {copy.currencyHelp}
                </p>
              </div>

              <div className="md:col-span-2">
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
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
                  <div>
                    <label className={labelClass} htmlFor="sibi-pay">
                      {copy.payLabel}
                    </label>
                    <input
                      id="sibi-pay"
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="any"
                      value={state.pay}
                      onChange={(event) => set("pay", event.target.value)}
                      aria-invalid={Boolean(wageErrors.pay)}
                      aria-describedby={`sibi-pay-help sibi-pay-period-help${wageErrors.pay ? " sibi-pay-error" : ""}`}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="sibi-pay-period">
                      {copy.payPeriodLabel}
                    </label>
                    <select
                      id="sibi-pay-period"
                      value={state.payPeriod}
                      onChange={(event) => {
                        if (isPayPeriod(event.target.value))
                          set("payPeriod", event.target.value);
                      }}
                      aria-describedby="sibi-pay-period-help"
                      className={inputClass}
                    >
                      {copy.payPeriods.map((period) => (
                        <option key={period.value} value={period.value}>
                          {period.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <p id="sibi-pay-help" className={helpClass}>
                  {copy.payHelp}
                </p>
                {wageError("pay")}
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
                  step="any"
                  value={state.paidHours}
                  onChange={(event) => set("paidHours", event.target.value)}
                  className={inputClass}
                  aria-invalid={Boolean(wageErrors.paidHours)}
                  aria-describedby={`sibi-paid-hours-help${wageErrors.paidHours ? " sibi-paidHours-error" : ""}`}
                />
                <p id="sibi-paid-hours-help" className={helpClass}>
                  {copy.hoursHelp}
                </p>
                {wageError("paidHours")}
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
                  step="any"
                  value={state.extraHours}
                  onChange={(event) => set("extraHours", event.target.value)}
                  className={inputClass}
                  aria-invalid={Boolean(wageErrors.extraHours)}
                  aria-describedby={`sibi-extra-hours-help${wageErrors.extraHours ? " sibi-extraHours-error" : ""}`}
                />
                <p id="sibi-extra-hours-help" className={helpClass}>
                  {copy.extraHoursHelp}
                </p>
                {wageError("extraHours")}
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
                  step="any"
                  value={state.workCosts}
                  onChange={(event) => set("workCosts", event.target.value)}
                  className={inputClass}
                  aria-invalid={Boolean(wageErrors.workCosts)}
                  aria-describedby={`sibi-work-costs-help${wageErrors.workCosts ? " sibi-workCosts-error" : ""}`}
                />
                <p id="sibi-work-costs-help" className={helpClass}>
                  {copy.workCostsHelp}
                </p>
                {wageError("workCosts")}
              </div>
            </div>

            <p
              id="sibi-pay-period-help"
              className="mt-5 text-sm leading-6 text-[#52645a] dark:text-gray-400"
            >
              {copy.payPeriodHelp}
            </p>
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
                              selected
                                ? ""
                                : (option.value as State[typeof key]),
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
        </fieldset>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={!hydrated || isCalculating}
            className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#82533f] px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-[#663c29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#82533f] disabled:cursor-wait disabled:opacity-60 dark:bg-orange-200 dark:text-gray-900"
          >
            {isCalculating && (
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
              />
            )}
            {isCalculating
              ? copy.calculating
              : result
                ? copy.recalculate
                : copy.calculateLabel}
          </button>
          <button
            type="button"
            onClick={resetCalculator}
            className="min-h-11 rounded-full border border-[#d4c4bb] px-5 py-2.5 text-sm font-semibold text-[#7b5137] dark:border-gray-600 dark:text-orange-300"
          >
            {copy.resetLabel}
          </button>
          <p className="text-sm text-[#7b8a81] dark:text-gray-400">
            {copy.savedNote}
          </p>
        </div>
        {submitError && (
          <p
            role="alert"
            className="mt-3 text-sm text-[#ba1a1a] dark:text-red-400"
          >
            {submitError}
          </p>
        )}
      </form>
      {isCalculating && (
        <div
          role="status"
          aria-busy="true"
          className={`${cardClass} text-[#52645a] dark:text-gray-300`}
        >
          {copy.calculating}
        </div>
      )}
      {result && !isCalculating && (
        <ResultCard result={result} copy={copy} locale={locale}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={shareCalculation}
              disabled={!hydrated}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#82533f] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#663c29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#82533f] disabled:opacity-50 dark:bg-orange-200 dark:text-gray-900 dark:hover:bg-orange-300"
            >
              <ShareIcon aria-hidden="true" className="h-4 w-4" />
              {copy.shareLabel}
            </button>
          </div>
          {shareUrl && (
            <div className="mt-5 min-w-0 rounded-2xl bg-white p-5 dark:bg-gray-800">
              <p
                role="status"
                className="text-sm font-semibold text-[#82533f] dark:text-orange-300"
              >
                {shareStatus === "copied"
                  ? copy.shareCopied
                  : shareStatus === "manual"
                    ? copy.shareManual
                    : copy.shareLinkLabel}
              </p>
              <label htmlFor="sibi-share-link" className="sr-only">
                {copy.shareLinkLabel}
              </label>
              <input
                id="sibi-share-link"
                readOnly
                value={shareUrl}
                onFocus={(event) => event.currentTarget.select()}
                className={inputClass}
              />
              <p className={helpClass}>{copy.shareHelp}</p>
            </div>
          )}
        </ResultCard>
      )}
    </div>
  );
}
