export function currencyForLocale(locale: string): string {
  return ({ en: "USD", zh: "CNY", ja: "JPY", es: "EUR", de: "EUR" } as Record<string, string>)[locale.split("-")[0]] ?? "USD";
}

export function convertPresetPrice(price: number, currency: string, rate: number): number {
  const digits = currency === "JPY" ? 0 : 2;
  return Number((price * rate).toFixed(digits));
}

export type ExchangeRates = {
  date: string | null;
  rates: Record<string, number>;
};
