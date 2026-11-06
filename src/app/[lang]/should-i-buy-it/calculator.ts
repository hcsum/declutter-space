export type PayPeriod = "weekly" | "monthly" | "yearly";
export type WageField = "pay" | "paidHours" | "extraHours" | "workCosts";
export type WageError =
  | "invalidNumber"
  | "positivePay"
  | "positiveHours"
  | "totalHours"
  | "netPay"
  | "range";

export type State = {
  item: string;
  price: string;
  currency: string;
  uses: string;
  pay: string;
  payPeriod: PayPeriod;
  paidHours: string;
  extraHours: string;
  workCosts: string;
  duplicate: string;
  money: string;
  waited: string;
  storage: string;
};

export const EMPTY_STATE: State = {
  item: "",
  price: "",
  currency: "",
  uses: "",
  pay: "",
  payPeriod: "weekly",
  paidHours: "40",
  extraHours: "",
  workCosts: "",
  duplicate: "",
  money: "",
  waited: "",
  storage: "",
};

export function isPayPeriod(value: unknown): value is PayPeriod {
  return value === "weekly" || value === "monthly" || value === "yearly";
}

export function restoreState(value: unknown): State {
  const restored = { ...EMPTY_STATE };
  if (!value || typeof value !== "object" || Array.isArray(value))
    return restored;
  const stored = value as Record<string, unknown>;
  for (const key of Object.keys(EMPTY_STATE) as (keyof State)[]) {
    if (key !== "payPeriod" && typeof stored[key] === "string") {
      restored[key] = stored[key].slice(
        0,
        key === "item" ? 200 : key === "currency" ? 24 : 128,
      );
    }
  }
  // Old saves contain weekly pay without a period. Unknown explicit periods
  // cannot safely be interpreted as weekly pay, so discard only that amount.
  if (isPayPeriod(stored.payPeriod)) restored.payPeriod = stored.payPeriod;
  else if (stored.payPeriod !== undefined) restored.pay = "";
  return restored;
}

/** Shared URLs are complete snapshots; they never inherit the recipient's pay. */
export function readSharedState(search: string): State | null {
  const params = new URLSearchParams(search);
  if (params.get("share") !== "1") return null;
  const fields: Record<string, string> = {};
  for (const key of Object.keys(EMPTY_STATE)) {
    const value = params.get(key);
    if (value !== null) fields[key] = value;
  }
  return restoreState(fields);
}

export type ResultSummary = {
  item: string;
  currency: string;
  score: number;
  costPerUse: number;
  lifeHours: number | null;
  breakdown?: (number | null)[];
};

export const BREAKDOWN_FIELDS = [
  { label: "breakdownCostPerUse", max: 25 },
  { label: "breakdownLifeHours", max: 20 },
  { label: "breakdownDuplicate", max: 15 },
  { label: "breakdownMoney", max: 15 },
  { label: "breakdownWaited", max: 15 },
  { label: "breakdownStorage", max: 10 },
] as const;

function validBreakdown(value: unknown): value is (number | null)[] {
  return (
    Array.isArray(value) &&
    value.length === BREAKDOWN_FIELDS.length &&
    value.every(
      (points, index) =>
        points === null ||
        (Number.isInteger(points) &&
          points >= 0 &&
          points <= BREAKDOWN_FIELDS[index].max),
    )
  );
}

export function buildShareUrl(base: string, result: ResultSummary): string {
  const url = new URL(base);
  url.search = "";
  url.hash = "";
  // Explicit allowlist: never serialize state, salary, wage, schedule or answers.
  url.searchParams.set("result", "1");
  url.searchParams.set("item", result.item.slice(0, 200));
  url.searchParams.set("currency", result.currency.slice(0, 24));
  url.searchParams.set("score", String(result.score));
  url.searchParams.set("costPerUse", String(result.costPerUse));
  url.searchParams.set(
    "lifeHours",
    result.lifeHours === null ? "" : String(result.lifeHours),
  );
  if (validBreakdown(result.breakdown))
    url.searchParams.set("breakdown", JSON.stringify(result.breakdown));
  return url.toString();
}

export function readSharedResult(search: string): ResultSummary | null {
  const params = new URLSearchParams(search);
  if (params.get("result") !== "1") return null;
  const score = parseAmount(params.get("score") ?? "");
  const costPerUse = parseAmount(params.get("costPerUse") ?? "");
  const hours = params.get("lifeHours") ?? "";
  const lifeHours = hours === "" ? null : parseAmount(hours);
  let breakdown: (number | null)[] | undefined;
  if (params.has("breakdown")) {
    try {
      const parsed: unknown = JSON.parse(params.get("breakdown")!);
      if (!validBreakdown(parsed)) return null;
      breakdown = parsed;
    } catch {
      return null;
    }
  }
  if (
    score === null ||
    !Number.isInteger(score) ||
    score < 0 ||
    score > 100 ||
    costPerUse === null ||
    costPerUse <= 0 ||
    (hours !== "" && (lifeHours === null || lifeHours <= 0))
  )
    return null;
  return {
    item: (params.get("item") ?? "").slice(0, 200),
    currency: (params.get("currency") ?? "").slice(0, 24),
    score,
    costPerUse,
    lifeHours,
    ...(breakdown ? { breakdown } : {}),
  };
}

export function clearShareUrl(base: string): string {
  const url = new URL(base);
  if (url.searchParams.has("share") || url.searchParams.has("result")) {
    for (const key of [
      "share",
      "result",
      "score",
      "costPerUse",
      "lifeHours",
      "breakdown",
      ...Object.keys(EMPTY_STATE),
    ])
      url.searchParams.delete(key);
  }
  return url.toString();
}

export function formatMoney(
  amount: number,
  currency: string,
  locale: string,
): string {
  const value = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
  }).format(amount);
  const label = currency.trim().slice(0, 24);
  return label ? `${value} ${label}` : value;
}

export function parseAmount(value: string): number | null {
  let text = value.trim();
  if (!text) return null;
  if (/^[+-]?\d{1,3}(,\d{3})+(\.\d+)?$/.test(text)) {
    text = text.replace(/,/g, "");
  }
  if (!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(text)) return null;
  const amount = Number(text);
  return Number.isFinite(amount) ? amount : null;
}

export function calculateWage(input: Pick<State, WageField | "payPeriod">) {
  const errors: Partial<Record<WageField, WageError>> = {};
  const parse = (field: WageField, optional = false) => {
    const text = input[field].trim();
    if (!text) return optional ? 0 : null;
    const value = parseAmount(text);
    if (value === null || value < 0) {
      errors[field] = "invalidNumber";
      return null;
    }
    return value;
  };
  const pay = parse("pay");
  const paidHours = parse("paidHours");
  const extraHours = parse("extraHours", true);
  const workCosts = parse("workCosts", true);

  if (pay === 0) errors.pay = "positivePay";
  if (paidHours === 0) errors.paidHours = "positiveHours";
  if (paidHours !== null && paidHours > 168) errors.paidHours = "totalHours";
  if (
    extraHours !== null &&
    (extraHours > 168 || (paidHours !== null && paidHours + extraHours > 168))
  ) {
    errors.extraHours = "totalHours";
  }

  const converted =
    pay !== null && pay > 0
      ? input.payPeriod === "monthly"
        ? (pay / 52) * 12
        : input.payPeriod === "yearly"
          ? pay / 52
          : pay
      : null;
  const weeklyPay =
    converted !== null && converted > 0 && Number.isFinite(converted)
      ? converted
      : null;
  if (converted !== null && weeklyPay === null) errors.pay = "range";

  const weeklyHours =
    paidHours !== null &&
    paidHours > 0 &&
    extraHours !== null &&
    !errors.paidHours &&
    !errors.extraHours
      ? paidHours + extraHours
      : null;
  let nominalWage: number | null = null;
  let realWage: number | null = null;
  if (
    weeklyPay !== null &&
    paidHours !== null &&
    paidHours > 0 &&
    !errors.paidHours
  ) {
    const nominal = weeklyPay / paidHours;
    if (Number.isFinite(nominal) && nominal > 0) nominalWage = nominal;
    else errors.pay = "range";
  }
  if (weeklyPay !== null && workCosts !== null && workCosts >= weeklyPay) {
    errors.workCosts = "netPay";
  }
  if (
    nominalWage !== null &&
    weeklyPay !== null &&
    weeklyHours !== null &&
    workCosts !== null &&
    Object.keys(errors).length === 0
  ) {
    const real = (weeklyPay - workCosts) / weeklyHours;
    if (Number.isFinite(real) && real > 0) realWage = real;
    else errors.pay = "range";
  }

  return { weeklyPay, weeklyHours, nominalWage, realWage, errors };
}
