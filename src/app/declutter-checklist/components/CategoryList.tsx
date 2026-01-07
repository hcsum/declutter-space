"use client";

import data from "@/const/declutter-checklist.json";

type DeclutterCategory = { category: string; items: string[] };
type DeclutterData = DeclutterCategory[];
const checklist = data as DeclutterData;

export default function CategoryList({
  onSelect,
}: {
  onSelect: (c: DeclutterCategory, index: number) => void;
}) {
  return (
    // Full-height column: header stays fixed; list scrolls
    <div className="flex flex-col h-full overflow-hidden">
      <header className="pb-10 flex-none">
        <h1 className="text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.05]">
          Declutter Checklist
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-neutral-600 max-w-2xl">
          Declutter your home, one space at a time. Choose a category to begin.
        </p>
      </header>

      {/* Edge fade as a scroll hint */}
      <div className="flex-1 pr-2 min-h-0 scrollbar-stable scroll-area edge-fade">
        <ul className="divide-y divide-transparent">
          {checklist.map((c, idx) => (
            <li key={idx} className="py-6 sm:py-8">
            <button
              onClick={() => onSelect(c, idx)}
              className="block text-left w-full text-3xl sm:text-4xl md:text-5xl font-medium outline-none text-neutral-900"
            >
              <span className="align-baseline">{c.category}</span>
            </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
