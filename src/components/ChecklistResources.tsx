import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getAreaContent } from "@/lib/checklist/area-content";
import {
  getChecklistPrintable,
  printableAreas,
  printableCopy,
} from "@/lib/checklist/printables";
import ChecklistPdfLink from "./ChecklistPdfLink";

export default function ChecklistResources({
  locale,
  excludeSlug,
}: {
  locale: Locale;
  excludeSlug?: string;
}) {
  const copy = printableCopy[locale];
  return (
    <section
      id={excludeSlug ? undefined : "printable-checklists"}
      className="print-hidden scroll-mt-24 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8"
    >
      <h2 className="text-3xl font-bold tracking-[-0.04em] text-[#002d1c]">
        {excludeSlug ? copy.relatedTitle : copy.collectionTitle}
      </h2>
      {!excludeSlug && (
        <p className="mt-3 max-w-3xl text-base leading-7 text-[#414844]">
          {copy.collectionIntro}
        </p>
      )}
      <div
        className={`mt-6 grid gap-6 ${excludeSlug ? "sm:grid-cols-2" : "sm:grid-cols-2 xl:grid-cols-3"}`}
      >
        {printableAreas
          .filter((area) => area.slug !== excludeSlug)
          .map(({ slug }) => {
            const resource = getChecklistPrintable(slug, locale);
            if (!resource) return null;
            const href = `/${locale}/declutter-checklist/${slug}`;
            return (
              <article
                key={slug}
                className="flex flex-col overflow-hidden rounded-3xl border border-[#dfe4d7] bg-[#f9faf2]"
              >
                <Link
                  href={href}
                  className="block bg-[#e7eadf] p-5 transition-colors hover:bg-[#dcebdd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2b694d]"
                >
                  <Image
                    src={resource.preview}
                    alt={resource.previewAlt}
                    width={960}
                    height={1358}
                    sizes="(min-width: 1280px) 320px, (min-width: 640px) 45vw, 90vw"
                    className="mx-auto h-auto w-full max-w-[280px] rounded-sm shadow-md"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-bold tracking-tight text-[#002d1c]">
                    <Link href={href} className="hover:underline">
                      {resource.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs font-semibold leading-6 text-[#59615d]">
                    {resource.specs}
                  </p>
                  <p className="mb-5 mt-3 text-sm leading-6 text-[#414844]">
                    {getAreaContent(slug, locale)?.resetDescription}
                  </p>
                  <div className="mt-auto flex flex-col gap-3">
                    <ChecklistPdfLink
                      href={resource.pdf}
                      area={slug}
                      source="checklist_resources"
                      className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#002d1c] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#00432a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2b694d]"
                    >
                      {copy.download}
                    </ChecklistPdfLink>
                    <Link
                      href={`${href}#interactive-checklist`}
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#b7d1c4] px-4 py-2 text-center text-sm font-semibold text-[#2b694d] transition-colors hover:bg-[#e7eadf]"
                    >
                      {copy.online} →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
      </div>
    </section>
  );
}
