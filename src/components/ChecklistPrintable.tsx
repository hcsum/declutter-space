import Image from "next/image";
import type { Locale } from "@/i18n/config";
import {
  getChecklistPrintable,
  printableCopy,
} from "@/lib/checklist/printables";
import ChecklistPdfLink from "./ChecklistPdfLink";

export default function ChecklistPrintable({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const resource = getChecklistPrintable(slug, locale);
  if (!resource) return null;
  const copy = printableCopy[locale];

  return (
    <section className="print-hidden grid items-center gap-8 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:grid-cols-2 md:p-10">
      <figure className="rounded-3xl bg-[#e7eadf] p-5 md:p-7">
        <a
          href={resource.pdf}
          aria-label={copy.download}
          className="block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2b694d]"
        >
          <Image
            src={resource.preview}
            alt={resource.previewAlt}
            width={960}
            height={1358}
            sizes="(min-width: 768px) 400px, 85vw"
            className="mx-auto h-auto w-full max-w-[340px] rounded-sm shadow-lg"
            priority
          />
        </a>
        <figcaption className="mt-4 text-center text-xs leading-5 text-[#414844]">
          {copy.previewCaption}
        </figcaption>
      </figure>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2b694d]">
          {copy.format}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#002d1c]">
          {resource.title}
        </h2>
        <p className="mt-4 text-base leading-7 text-[#414844]">{copy.intro}</p>
        <p className="mt-4 text-sm font-semibold leading-6 text-[#59615d]">
          {resource.specs}
        </p>
        <div className="mt-6 flex flex-col items-start gap-3">
          <ChecklistPdfLink
            href={resource.pdf}
            area={slug}
            source="checklist_printable"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#002d1c] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#00432a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2b694d]"
          >
            {copy.download}
          </ChecklistPdfLink>
          <a
            href="#interactive-checklist"
            className="inline-flex min-h-11 items-center py-2 text-sm font-semibold text-[#2b694d] underline underline-offset-4"
          >
            {copy.online} ↓
          </a>
        </div>
      </div>
    </section>
  );
}
