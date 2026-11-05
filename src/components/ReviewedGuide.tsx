import Link from "next/link";
import type { ReactNode } from "react";

export type GuideSource = { id: string; label: string; url: string };

function ReferenceText({
  text,
  sources,
}: {
  text: string;
  sources: GuideSource[];
}) {
  return text.split(/(\[(?:[REJS]\d+(?:, )?)+\])/g).map((part, index) => {
    if (!part.startsWith("[")) return part;
    const ids = part.slice(1, -1).split(", ");
    return (
      <span key={index} className="whitespace-nowrap text-sm">
        [
        {ids.map((id, i) => (
          <span key={id}>
            {i > 0 && ", "}
            <a
              href={`#source-${id}`}
              aria-label={
                sources.find((source) => source.id === id)?.label ?? id
              }
              className="underline underline-offset-4"
            >
              {id}
            </a>
          </span>
        ))}
        ]
      </span>
    );
  });
}

// A deliberately small, static editorial format: headings, paragraphs and lists.
// It never interprets HTML or arbitrary URLs from the body copy.
export function GuideBody({
  body,
  sources,
  firstSectionId,
}: {
  body: string;
  sources: GuideSource[];
  firstSectionId?: string;
}) {
  const sections = body.trim().split(/\n(?=## )/);
  return (
    <>
      {sections.map((section, sectionIndex) => (
        <section
          key={sectionIndex}
          id={sectionIndex === 0 ? firstSectionId : undefined}
          className="scroll-mt-24 rounded-[2rem] border border-outline-variant bg-surface px-6 py-8 shadow-soft-depth dark:border-gray-600 dark:bg-gray-800 md:px-10 md:py-10"
        >
          {section
            .trim()
            .split(/\n\n+/)
            .map((block, index) => {
              const text = (value: string) => (
                <ReferenceText text={value} sources={sources} />
              );
              if (block.startsWith("## "))
                return (
                  <h2
                    key={index}
                    className="mb-6 text-2xl font-bold leading-snug text-on-surface dark:text-white md:text-3xl"
                  >
                    {block.slice(3)}
                  </h2>
                );
              if (block.startsWith("### "))
                return (
                  <h3
                    key={index}
                    className="mb-3 mt-8 text-xl font-semibold leading-snug text-on-surface dark:text-white"
                  >
                    {block.slice(4)}
                  </h3>
                );
              if (block.startsWith("- "))
                return (
                  <ul key={index} className="mb-5 list-disc space-y-3 pl-5">
                    {block.split("\n").map((line) => (
                      <li key={line}>{text(line.slice(2))}</li>
                    ))}
                  </ul>
                );
              return (
                <p key={index} className="mb-5 last:mb-0">
                  {text(block)}
                </p>
              );
            })}
        </section>
      ))}
    </>
  );
}

export function GuideSources({
  sources,
  japanese = false,
}: {
  sources: GuideSource[];
  japanese?: boolean;
}) {
  return (
    <section className="rounded-[2rem] border border-outline-variant bg-surface px-6 py-8 dark:border-gray-600 dark:bg-gray-800 md:px-10">
      <h2 className="text-2xl font-bold text-on-surface dark:text-white">
        {japanese ? "参考資料" : "Sources and reading notes"}
      </h2>
      <p className="mt-4">
        {japanese
          ? "個人の体験談は方法を選ぶための参考であり、全ての人への効果や医療的な有効性を示すものではありません。Reddit のリンクは過去の保存ページです。自治体や支援先の最新の案内をご確認ください。"
          : "Personal accounts inform optional approaches; they are not evidence of clinical effectiveness or community consensus. Reddit links are archived discussions. Check the current guidance of the organisation or service you plan to use."}
      </p>
      <ul className="mt-6 space-y-3 text-sm leading-6">
        {sources.map((source) => (
          <li
            key={source.id}
            id={`source-${source.id}`}
            className="scroll-mt-24"
          >
            <a
              href={source.url}
              className="underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              [{source.id}] {source.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function GuideShell({ children }: { children: ReactNode }) {
  return (
    <main className="bg-surface-container-low px-5 pb-20 pt-24 text-base leading-8 text-on-surface-variant dark:bg-gray-900 dark:text-gray-300 md:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 [overflow-wrap:anywhere]">
        {children}
      </div>
    </main>
  );
}

export function ChecklistLink({ japanese = false }: { japanese?: boolean }) {
  return (
    <Link
      href={`/${japanese ? "ja" : "en"}/declutter-checklist`}
      className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold leading-6 text-on-primary transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      {japanese
        ? "部屋別の片付けチェックリストを見る"
        : "Choose a room checklist"}
    </Link>
  );
}
