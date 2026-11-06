import "server-only";
import type { ExchangeRates } from "./currency";

export async function getExchangeRates(): Promise<ExchangeRates> {
  try {
    const response = await fetch(
      "https://api.frankfurter.dev/v1/latest?base=USD&symbols=CNY,JPY,EUR",
      { next: { revalidate: 86400 }, signal: AbortSignal.timeout(5000) },
    );
    if (!response.ok) throw new Error("Exchange rates unavailable");
    const data = await response.json();
    if (data.base !== "USD" || !/^\d{4}-\d{2}-\d{2}$/.test(data.date))
      throw new Error("Invalid exchange rates");
    const rates: Record<string, number> = { USD: 1 };
    for (const currency of ["CNY", "JPY", "EUR"]) {
      const rate = data.rates?.[currency];
      if (typeof rate === "number" && Number.isFinite(rate) && rate > 0)
        rates[currency] = rate;
    }
    return { date: data.date, rates };
  } catch {
    return { date: null, rates: { USD: 1 } };
  }
}
