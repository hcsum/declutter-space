import type { BuyCopy } from "./copy";
import {
  calculateWage,
  parseAmount,
  type ResultSummary,
  type State,
} from "./calculator";

export type PurchaseResult = ResultSummary & {
  workingWeeks: number | null;
  debtCapped: boolean;
  rows: { label: string; points: number; max: number; dimension: number }[];
};

export function calculatePurchase(
  state: State,
  copy: BuyCopy["tool"],
  currencyRate = 1,
): PurchaseResult | null {
  const price = parseAmount(state.price);
  const uses = parseAmount(state.uses);
  if (
    price === null ||
    uses === null ||
    price <= 0 ||
    uses <= 0 ||
    !Number.isFinite(price / uses) ||
    price / uses <= 0
  )
    return null;
  const costPerUse = price / uses;
  const usdCostPerUse = costPerUse / currencyRate;
  const { realWage, weeklyHours } = calculateWage(state);
  const lifeHours =
    realWage !== null &&
    Number.isFinite(price / realWage) &&
    price / realWage > 0
      ? price / realWage
      : null;
  const rows = [
    {
      label: copy.breakdownCostPerUse,
      dimension: 0,
      points:
        usdCostPerUse <= 1
          ? 25
          : usdCostPerUse <= 5
            ? 20
            : usdCostPerUse <= 10
              ? 14
              : usdCostPerUse <= 25
                ? 7
                : 2,
      max: 25,
    },
  ];
  if (lifeHours !== null)
    rows.push({
      label: copy.breakdownLifeHours,
      dimension: 1,
      points:
        lifeHours <= 1
          ? 20
          : lifeHours <= 3
            ? 16
            : lifeHours <= 8
              ? 12
              : lifeHours <= 40
                ? 6
                : lifeHours <= 80
                  ? 3
                  : 0,
      max: 20,
    });
  for (const [index, [label, options, answer, max]] of (
    [
      [copy.breakdownDuplicate, copy.duplicateOptions, state.duplicate, 15],
      [copy.breakdownMoney, copy.moneyOptions, state.money, 15],
      [copy.breakdownWaited, copy.waitedOptions, state.waited, 15],
      [copy.breakdownStorage, copy.storageOptions, state.storage, 10],
    ] as const
  ).entries()) {
    const option = options.find((entry) => entry.value === answer);
    if (option)
      rows.push({ label, points: option.points, max, dimension: index + 2 });
  }
  const earned = rows.reduce((sum, row) => sum + row.points, 0);
  const available = rows.reduce((sum, row) => sum + row.max, 0);
  const rawScore = Math.round((earned / available) * 100);
  const debtCapped = state.money === "debt" && rawScore > 49;
  return {
    item: state.item.trim(),
    currency: state.currency,
    score: debtCapped ? 49 : rawScore,
    costPerUse,
    lifeHours,
    workingWeeks:
      lifeHours !== null && weeklyHours !== null && lifeHours > weeklyHours
        ? lifeHours / weeklyHours
        : null,
    debtCapped,
    rows,
    breakdown: Array.from(
      { length: 6 },
      (_, dimension) =>
        rows.find((row) => row.dimension === dimension)?.points ?? null,
    ),
  };
}

export function publicResult(result: ResultSummary): ResultSummary {
  return {
    item: result.item,
    currency: result.currency,
    score: result.score,
    costPerUse: result.costPerUse,
    lifeHours: result.lifeHours,
    ...(result.breakdown ? { breakdown: [...result.breakdown] } : {}),
  };
}
