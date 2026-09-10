"use client";

import { useEffect, useMemo, useState } from "react";
import type { CpwCopy, GradeKey } from "./copy";

const STORAGE_KEY = "cost-per-wear-calculator-state";

type Mode = "everyday" | "occasion";
type Unit = "wears" | "days";

type Form = {
  item: string;
  price: string;
  alterations: string;
  care: string;
  count: string;
  mode: Mode;
  unit: Unit;
};

type SavedRow = {
  id: string;
  item: string;
  total: number;
  count: number;
  costPer: number;
  grade: GradeKey;
  unit: Unit;
};

const EMPTY_FORM: Form = {
  item: "",
  price: "",
  alterations: "",
  care: "",
  count: "",
  mode: "everyday",
  unit: "wears",
};

/** Everyday pieces get hundreds of chances to earn their price; occasion pieces get a handful. */
const THRESHOLDS: Record<Mode, { excellent: number; good: number; fair: number; poor: number; target: number }> = {
  everyday: { excellent: 1, good: 5, fair: 10, poor: 25, target: 5 },
  occasion: { excellent: 10, good: 25, fair: 50, poor: 100, target: 25 },
};

const GRADE_STYLES: Record<GradeKey, string> = {
  excellent: "bg-[#dcebdd] text-[#1f5137]",
  good: "bg-[#dcebdd] text-[#335748]",
  fair: "bg-[#fff4df] text-[#7a5228]",
  poor: "bg-[#ffdbcd] text-[#8b3d1c]",
  bad: "bg-[#ffdad6] text-[#93000a]",
};

function num(value: string): number {
  const parsed = Number.parseFloat(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function gradeFor(costPer: number, mode: Mode): GradeKey {
  const limits = THRESHOLDS[mode];
  if (costPer <= limits.excellent) return "excellent";
  if (costPer <= limits.good) return "good";
  if (costPer <= limits.fair) return "fair";
  if (costPer <= limits.poor) return "poor";
  return "bad";
}

const cardClass =
  "rounded-[1.75rem] border border-[#e6ddd8] bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-8";
const labelClass = "block text-sm font-semibold text-[#1f2d24] dark:text-gray-100";
const helpClass = "mt-1 text-sm leading-6 text-[#7b8a81] dark:text-gray-400";
const inputClass =
  "mt-2 w-full rounded-xl border border-[#d6c2bb] bg-[#fbf9f8] px-4 py-3 text-base text-[#1f2d24] outline-none transition-colors focus:border-[#82533f] focus:ring-1 focus:ring-[#82533f] dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100";

function toggleClass(active: boolean) {
  return `rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
    active
      ? "border-[#82533f] bg-[#82533f] text-white"
      : "border-[#d4c4bb] text-[#52645a] hover:bg-[#f7f3ec] dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
  }`;
}

export default function ClientPage({
  copy,
  locale,
}: {
  copy: CpwCopy["tool"];
  locale: string;
}) {
  const [form, setForm] = useState<Form>(EMPTY_FORM);
  const [saved, setSaved] = useState<SavedRow[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.form) setForm({ ...EMPTY_FORM, ...parsed.form });
        if (Array.isArray(parsed?.saved)) setSaved(parsed.saved);
      }
    } catch {
      /* ignore unreadable storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, saved }));
    } catch {
      /* ignore full or blocked storage */
    }
  }, [form, saved, hydrated]);

  const numberFormat = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }),
    [locale],
  );

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  const price = num(form.price);
  const total = price + num(form.alterations) + num(form.care);
  const count = num(form.count);
  const ready = price > 0 && count > 0;
  const costPer = ready ? total / count : null;
  const grade = costPer !== null ? gradeFor(costPer, form.mode) : null;
  const unitSuffix = form.unit === "days" ? copy.perDay : copy.perWear;
  const target = THRESHOLDS[form.mode].target;
  const countForTarget = Math.ceil(total / target);
  const presets = form.unit === "days" ? copy.presetsDays : copy.presetsWears;

  function saveRow() {
    if (costPer === null || grade === null) return;
    setSaved((previous) => [
      {
        id: `${Date.now()}`,
        item: form.item.trim() || copy.unnamedItem,
        total,
        count,
        costPer,
        grade,
        unit: form.unit,
      },
      ...previous,
    ]);
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5">
      <section className={cardClass}>
        <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#1f2d24] dark:text-white">
          {copy.formTitle}
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className={labelClass} htmlFor="cpw-item">
              {copy.itemLabel}
            </label>
            <input
              id="cpw-item"
              type="text"
              value={form.item}
              onChange={(event) => set("item", event.target.value)}
              placeholder={copy.itemPlaceholder}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="cpw-price">
              {copy.priceLabel}
            </label>
            <input
              id="cpw-price"
              type="number"
              inputMode="decimal"
              min="0"
              value={form.price}
              onChange={(event) => set("price", event.target.value)}
              className={inputClass}
            />
            <p className={helpClass}>{copy.priceHelp}</p>
          </div>

          <div>
            <label className={labelClass} htmlFor="cpw-alterations">
              {copy.alterationsLabel}
            </label>
            <input
              id="cpw-alterations"
              type="number"
              inputMode="decimal"
              min="0"
              value={form.alterations}
              onChange={(event) => set("alterations", event.target.value)}
              className={inputClass}
            />
            <p className={helpClass}>{copy.alterationsHelp}</p>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass} htmlFor="cpw-care">
              {copy.careLabel}
            </label>
            <input
              id="cpw-care"
              type="number"
              inputMode="decimal"
              min="0"
              value={form.care}
              onChange={(event) => set("care", event.target.value)}
              className={inputClass}
            />
            <p className={helpClass}>{copy.careHelp}</p>
          </div>
        </div>

        <fieldset className="mt-8">
          <legend className={labelClass}>{copy.modeLabel}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={form.mode === "everyday"}
              onClick={() => set("mode", "everyday")}
              className={toggleClass(form.mode === "everyday")}
            >
              {copy.modeEveryday}
            </button>
            <button
              type="button"
              aria-pressed={form.mode === "occasion"}
              onClick={() => set("mode", "occasion")}
              className={toggleClass(form.mode === "occasion")}
            >
              {copy.modeOccasion}
            </button>
          </div>
          <p className={helpClass}>
            {form.mode === "everyday" ? copy.modeHelpEveryday : copy.modeHelpOccasion}
          </p>
        </fieldset>

        <fieldset className="mt-8">
          <legend className={labelClass}>{copy.unitLabel}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={form.unit === "wears"}
              onClick={() => set("unit", "wears")}
              className={toggleClass(form.unit === "wears")}
            >
              {copy.unitWears}
            </button>
            <button
              type="button"
              aria-pressed={form.unit === "days"}
              onClick={() => set("unit", "days")}
              className={toggleClass(form.unit === "days")}
            >
              {copy.unitDays}
            </button>
          </div>
        </fieldset>

        <div className="mt-8">
          <label className={labelClass} htmlFor="cpw-count">
            {form.unit === "days" ? copy.countLabelDays : copy.countLabelWears}
          </label>
          <input
            id="cpw-count"
            type="number"
            inputMode="numeric"
            min="0"
            value={form.count}
            onChange={(event) => set("count", event.target.value)}
            className={inputClass}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => set("count", String(preset.value))}
                className="rounded-full border border-[#d4c4bb] px-3 py-1.5 text-xs font-semibold text-[#7b5137] transition-colors hover:bg-[#f7f3ec] dark:border-gray-600 dark:text-orange-300 dark:hover:bg-gray-700"
              >
                {preset.label}
              </button>
            ))}
          </div>
          <p className={helpClass}>{copy.countHelp}</p>
        </div>
      </section>

      <section
        className="rounded-[1.75rem] border border-[#e6ddd8] bg-[#f7f3ec] p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 md:p-8"
        aria-live="polite"
      >
        <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#1f2d24] dark:text-white">
          {copy.resultTitle}
        </h2>

        {!ready || costPer === null || grade === null ? (
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
              <p className="text-6xl font-bold tracking-[-0.05em] text-[#1f2d24] dark:text-white">
                {numberFormat.format(costPer)}
              </p>
              <p className="pb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#8b5c47]">
                {unitSuffix}
              </p>
              <span
                className={`mb-1 rounded-full px-4 py-1.5 text-sm font-bold ${GRADE_STYLES[grade]}`}
              >
                {copy.grades[grade].name}
              </span>
            </div>

            <p className="mt-4 max-w-3xl text-base leading-7 text-[#52645a] dark:text-gray-300">
              {copy.grades[grade].body}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] bg-white p-5 dark:bg-gray-800">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8b5c47]">
                  {copy.totalCostLabel}
                </p>
                <p className="mt-1 text-3xl font-bold text-[#1f2d24] dark:text-white">
                  {numberFormat.format(total)}
                </p>
              </div>
              <div className="rounded-[1.5rem] bg-white p-5 dark:bg-gray-800">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#8b5c47]">
                  {copy.cpwLabel}
                </p>
                <p className="mt-1 text-3xl font-bold text-[#1f2d24] dark:text-white">
                  {numberFormat.format(costPer)}
                </p>
                <p className="mt-1 text-sm leading-6 text-[#52645a] dark:text-gray-400">
                  {costPer <= target
                    ? copy.targetReached.replace("{target}", numberFormat.format(target))
                    : copy.targetNote
                        .replace("{target}", numberFormat.format(target))
                        .replace("{count}", numberFormat.format(countForTarget))}
                </p>
              </div>
            </div>

            {form.unit === "wears" && (
              <div className="mt-4 rounded-[1.5rem] bg-white p-5 dark:bg-gray-800">
                <h3 className="text-lg font-bold text-[#1f2d24] dark:text-white">
                  {copy.thirtyTitle}
                </h3>
                <p className="mt-2 text-base leading-7 text-[#52645a] dark:text-gray-300">
                  {copy.thirtyBody.replace(
                    "{value}",
                    numberFormat.format(total / 30),
                  )}
                </p>
                <p className="mt-1 text-base leading-7 text-[#52645a] dark:text-gray-300">
                  {count < 30
                    ? copy.thirtyShortfall.replace("{count}", numberFormat.format(count))
                    : copy.thirtyClear}
                </p>
              </div>
            )}

            <div className="mt-6">
              <button
                type="button"
                onClick={saveRow}
                className="rounded-full bg-[#82533f] px-6 py-3 text-sm font-bold text-white transition-all hover:brightness-110"
              >
                {copy.saveLabel}
              </button>
            </div>
          </>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setForm(EMPTY_FORM)}
            className="rounded-full border border-[#d4c4bb] px-5 py-2.5 text-sm font-semibold text-[#7b5137] transition-colors hover:bg-white dark:border-gray-600 dark:text-orange-300"
          >
            {copy.resetLabel}
          </button>
          <p className="text-sm text-[#7b8a81] dark:text-gray-400">{copy.savedNote}</p>
        </div>
      </section>

      <section className={cardClass}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#1f2d24] dark:text-white">
            {copy.savedTitle}
          </h2>
          {saved.length > 0 && (
            <button
              type="button"
              onClick={() => setSaved([])}
              className="rounded-full border border-[#d4c4bb] px-4 py-2 text-sm font-semibold text-[#7b5137] transition-colors hover:bg-[#f7f3ec] dark:border-gray-600 dark:text-orange-300"
            >
              {copy.clearAllLabel}
            </button>
          )}
        </div>

        {saved.length === 0 ? (
          <p className="mt-4 text-base leading-7 text-[#52645a] dark:text-gray-300">
            {copy.savedEmpty}
          </p>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e6ddd8] text-[#7b8a81] dark:border-gray-700 dark:text-gray-400">
                  <th className="py-2 pr-3 font-semibold">{copy.tableItem}</th>
                  <th className="py-2 pr-3 font-semibold">{copy.tableTotal}</th>
                  <th className="py-2 pr-3 font-semibold">{copy.tableCount}</th>
                  <th className="py-2 pr-3 font-semibold">{copy.tableCpw}</th>
                  <th className="py-2 pr-3 font-semibold">{copy.tableGrade}</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody>
                {saved.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-[#f0eae6] text-[#1f2d24] dark:border-gray-700 dark:text-gray-200"
                  >
                    <td className="py-3 pr-3 font-semibold">{row.item}</td>
                    <td className="py-3 pr-3">{numberFormat.format(row.total)}</td>
                    <td className="py-3 pr-3">{numberFormat.format(row.count)}</td>
                    <td className="py-3 pr-3 font-bold">
                      {numberFormat.format(row.costPer)}
                    </td>
                    <td className="py-3 pr-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${GRADE_STYLES[row.grade]}`}
                      >
                        {copy.grades[row.grade].name}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          setSaved((previous) =>
                            previous.filter((entry) => entry.id !== row.id),
                          )
                        }
                        className="text-xs font-semibold text-[#7b8a81] underline hover:text-[#ba1a1a]"
                      >
                        {copy.removeLabel}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
