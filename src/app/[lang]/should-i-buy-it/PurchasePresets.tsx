"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import { convertPresetPrice, type ExchangeRates } from "./currency";

export const purchasePresets = [
  {
    id: "iphone-duo",
    name: "iPhone Duo",
    configuration: "256GB · unlocked · U.S. model",
    item: "Apple iPhone Duo 256GB (unlocked)",
    price: 1999,
  },
  {
    id: "brompton-c-line",
    name: "Brompton bicycle",
    configuration: "Folding bicycle",
    item: "Brompton bicycle",
    price: 2150,
  },
  {
    id: "dyson-v12",
    name: "Dyson vacuum cleaner",
    configuration: "Cordless vacuum",
    item: "Dyson vacuum cleaner",
    price: 429.99,
  },
] as const;

export type PurchasePreset = {
  id: string;
  name: string;
  configuration: string;
  item: string;
  price: number;
};

export default function PurchasePresets({
  item,
  price,
  onSelect,
  locale,
  currency,
  exchangeRates,
}: {
  item: string;
  price: string;
  onSelect: (preset: PurchasePreset) => void;
  locale: string;
  currency: string;
  exchangeRates: ExchangeRates;
}) {
  const code = currency.trim().toUpperCase();
  const rate = Object.hasOwn(exchangeRates.rates, code) ? exchangeRates.rates[code] : undefined;
  if (!rate) return null;
  const text = locale === "zh" ? {
    intro: "选择下方商品，或自行填写。",
    names: ["iPhone Duo", "小布自行车", "戴森吸尘器"],
    configurations: ["256GB · 无锁 · 美版", "折叠自行车", "无线吸尘器"],
    select: "选择",
    note: "参考价由美元价格换算，不代表当地售价。汇率日期：",
  } : locale === "ja" ? {
    intro: "商品を選ぶか、自分で入力してください。",
    names: ["iPhone Duo", "ブロンプトンの自転車", "ダイソンの掃除機"],
    configurations: ["256GB · SIMフリー · 米国モデル", "折りたたみ自転車", "コードレス掃除機"],
    select: "選択",
    note: "米ドル価格を換算した参考価格です。現地の販売価格とは異なります。為替レートの日付：",
  } : locale === "es" ? {
    intro: "Elige un producto o introduce el tuyo.",
    names: ["iPhone Duo", "Bicicleta Brompton", "Aspiradora Dyson"],
    configurations: ["256 GB · libre · modelo de EE. UU.", "Bicicleta plegable", "Aspiradora sin cable"],
    select: "Seleccionar",
    note: "Precios orientativos convertidos de USD, no precios de venta locales. Fecha del tipo de cambio: ",
  } : locale === "de" ? {
    intro: "Wähle ein Produkt oder gib ein eigenes ein.",
    names: ["iPhone Duo", "Brompton-Fahrrad", "Dyson-Staubsauger"],
    configurations: ["256 GB · ohne SIM-Lock · US-Modell", "Faltrad", "Kabelloser Staubsauger"],
    select: "Auswählen",
    note: "Aus USD umgerechnete Richtpreise, keine lokalen Verkaufspreise. Wechselkurs vom: ",
  } : {
    intro: "Choose a product below or enter your own.",
    names: purchasePresets.map((preset) => preset.name),
    configurations: purchasePresets.map((preset) => preset.configuration),
    select: "Select",
    note: "Reference prices converted from USD, not local retail prices. Exchange rate date: ",
  };
  const presets: PurchasePreset[] = purchasePresets.map((preset, index) => ({
    ...preset,
    name: text.names[index],
    item: text.names[index],
    configuration: text.configurations[index],
    price: convertPresetPrice(preset.price, code, rate),
  }));
  const priceFormat = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: code,
    maximumFractionDigits: code === "JPY" ? 0 : 2,
    minimumFractionDigits: 0,
  });
  const selected = presets.find(
    (preset) => preset.item === item && String(preset.price) === price,
  );

  return (
    <div className="mt-6 border-b border-[#e6ddd8] pb-7 dark:border-gray-700">
      <p className="text-sm leading-6 text-[#52645a] dark:text-gray-400">
        {text.intro}
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {presets.map((preset) => {
          const isSelected = selected?.id === preset.id;

          return (
            <div
              key={preset.id}
              className={`flex flex-col rounded-2xl border transition-colors ${
                isSelected
                  ? "border-[#82533f] bg-[#f7f3ec] ring-1 ring-[#82533f] dark:border-orange-300 dark:bg-gray-900 dark:ring-orange-300"
                  : "border-[#e6ddd8] bg-[#fbf9f8] dark:border-gray-600 dark:bg-gray-900/40"
              }`}
            >
              <button
                type="button"
                aria-pressed={isSelected}
                aria-label={`${text.select} ${preset.item}, ${priceFormat.format(preset.price)} ${code}`}
                onClick={() => onSelect(preset)}
                className="flex flex-1 flex-col items-start rounded-2xl p-5 text-left transition-colors hover:bg-[#82533f]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#82533f] dark:hover:bg-orange-200/5 dark:focus-visible:outline-orange-300"
              >
                <span className="flex w-full items-center justify-end">
                  <span
                    aria-hidden="true"
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${isSelected ? "border-[#82533f] bg-[#82533f] text-white dark:border-orange-300 dark:bg-orange-300 dark:text-gray-900" : "border-[#d6c2bb] dark:border-gray-600"}`}
                  >
                    {isSelected && <CheckIcon className="h-3 w-3" />}
                  </span>
                </span>
                <span className="mt-5 text-lg font-bold tracking-tight text-[#1f2d24] dark:text-white">
                  {preset.name}
                </span>
                <span className="mt-2 text-xs leading-5 text-[#52645a] dark:text-gray-400">
                  {preset.configuration}
                </span>
                <span className="mt-auto pt-6 text-3xl font-semibold tracking-tight text-[#1f2d24] dark:text-white">
                  {priceFormat.format(preset.price)}
                  <span className="ml-1.5 text-xs font-medium tracking-normal text-[#52645a] dark:text-gray-400">
                    {code}
                  </span>
                </span>
              </button>
            </div>
          );
        })}
      </div>
      {code !== "USD" && exchangeRates.date && (
        <p className="mt-3 text-xs leading-5 text-[#52645a] dark:text-gray-400">
          {text.note}{exchangeRates.date}
        </p>
      )}
    </div>
  );
}
