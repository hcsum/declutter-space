import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AreaChecklistSection from "../components/AreaChecklistSection";
import { getChecklistCategoryBySlug } from "@/lib/checklist/checklist";
import { getAreaContent } from "@/lib/checklist/area-content";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { buildBreadcrumbSchema, buildLanguageAlternates } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const category = getChecklistCategoryBySlug(slug, locale);

  if (!category) {
    return {};
  }

  const areaCopy = getAreaContent(slug, locale);

  const title =
    locale === "zh"
      ? `${category.category}断舍离清单 | DeclutterYourHome`
      : `${category.category} Declutter Checklist | DeclutterYourHome`;
  const description =
    areaCopy?.metaDescription ??
    (locale === "zh"
      ? `用这份${category.category}断舍离清单逐项整理、勾选和保存进度，把这个区域慢慢恢复成更轻松好用的空间。`
      : `Use this ${category.category.toLowerCase()} declutter checklist to work through one area at a time, check off tasks, and keep your progress saved.`);

  return {
    title,
    description,
    alternates: buildLanguageAlternates(locale, `/declutter-checklist/${slug}`),
  };
}

export default async function ChecklistAreaPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const category = getChecklistCategoryBySlug(slug, locale);

  if (!category) notFound();

  const areaCopy = getAreaContent(slug, locale);
  const homeLabel = locale === "ja" ? "ホーム" : "Home";
  const checklistLabel = locale === "zh" ? "断舍离清单" : locale === "ja" ? "断捨離チェックリスト" : "Declutter Checklist";

  const isBedroom = slug === "bedroom";
  const isLivingRoom = slug === "living-room";
  const isKitchen = slug === "kitchen";
  const isBathroom = slug === "bathroom-laundry";
  const isHomeOffice = slug === "home-office";
  const isClosets = slug === "closets";

  return (
    <main className="min-h-screen bg-[#f3f4ec] px-5 pb-20 pt-24 text-[#1a1c18] md:px-8">
      <JsonLd
        data={buildBreadcrumbSchema(locale, [
          { name: homeLabel, path: "/" },
          { name: checklistLabel, path: "/declutter-checklist" },
          { name: category.category, path: `/declutter-checklist/${slug}` },
        ])}
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-10 md:py-10">
          <div className="print-hidden mb-4">
            <Link
              href={`/${locale}/declutter-checklist`}
              className="inline-flex items-center rounded-full bg-[#f3f4ec] px-3 py-2 text-sm font-semibold text-[#2b694d] transition-colors hover:bg-[#e7eadf]"
            >
              <span>{locale === "zh" ? "总清单" : "Full checklist"}</span>
            </Link>
          </div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#59615d]">
            {locale === "zh" ? "断舍离清单" : "Declutter Checklist"}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.05em] text-[#002d1c] md:text-5xl">
            {locale === "zh"
              ? `${category.category}断舍离清单`
              : `${category.category} Declutter Checklist`}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#414844] md:text-lg">
            {areaCopy?.intro ??
              (locale === "zh"
                ? `从这个区域开始，逐项清理真正占空间、占注意力、却没有继续服务你生活的东西。勾选、补充和保存进度，慢慢把 ${category.category} 变得更轻松好用。`
                : `Focus on one space, clear what no longer earns its place, and keep your progress moving. This dedicated ${category.category.toLowerCase()} checklist gives you a practical place to start.`)}
          </p>
          {isBedroom && (
            <p className="mt-4 text-sm leading-6 text-[#59615d]">
              <Link
                href={`/${locale}/how-to-declutter-your-bedroom`}
                className="font-semibold text-[#2b694d] underline decoration-[#b7d1c4] underline-offset-4"
              >
                {locale === "zh"
                  ? "先看卧室整理指南"
                  : "Read the full bedroom decluttering guide"}
              </Link>
              {locale === "zh"
                ? "，再回来按清单执行。"
                : " if you want the full step-by-step strategy first."}
            </p>
          )}
          {isLivingRoom && (
            <p className="mt-4 text-sm leading-6 text-[#59615d]">
              <Link
                href={`/${locale}/how-to-declutter-your-living-room`}
                className="font-semibold text-[#2b694d] underline decoration-[#b7d1c4] underline-offset-4"
              >
                {locale === "zh"
                  ? "先看客厅整理指南"
                  : "Read the full living room decluttering guide"}
              </Link>
              {locale === "zh"
                ? "，再回来按清单执行。"
                : " if you want the full step-by-step strategy first."}
            </p>
          )}
          {isKitchen && (
            <p className="mt-4 text-sm leading-6 text-[#59615d]">
              <Link
                href={`/${locale}/how-to-declutter-your-kitchen`}
                className="font-semibold text-[#2b694d] underline decoration-[#b7d1c4] underline-offset-4"
              >
                {locale === "zh"
                  ? "先看厨房整理指南"
                  : "Read the full kitchen decluttering guide"}
              </Link>
              {locale === "zh"
                ? "，再回来按清单执行。"
                : " if you want the full step-by-step strategy first."}
            </p>
          )}
          {isBathroom && (
            <p className="mt-4 text-sm leading-6 text-[#59615d]">
              <Link
                href={`/${locale}/how-to-declutter-your-bathroom`}
                className="font-semibold text-[#2b694d] underline decoration-[#b7d1c4] underline-offset-4"
              >
                {locale === "zh"
                  ? "先看浴室整理指南"
                  : "Read the full bathroom decluttering guide"}
              </Link>
              {locale === "zh"
                ? "，再回来按清单执行。"
                : " if you want the full step-by-step strategy first."}
            </p>
          )}
          {isHomeOffice && (
            <p className="mt-4 text-sm leading-6 text-[#59615d]">
              <Link
                href={`/${locale}/how-to-declutter-your-home-office`}
                className="font-semibold text-[#2b694d] underline decoration-[#b7d1c4] underline-offset-4"
              >
                {locale === "zh"
                  ? "先看家庭办公室整理指南"
                  : "Read the full home office decluttering guide"}
              </Link>
              {locale === "zh"
                ? "，再回来按清单执行。"
                : " if you want the full step-by-step strategy first."}
            </p>
          )}
          {isClosets && (
            <p className="mt-4 text-sm leading-6 text-[#59615d]">
              <Link
                href={`/${locale}/how-to-declutter-your-closet`}
                className="font-semibold text-[#2b694d] underline decoration-[#b7d1c4] underline-offset-4"
              >
                {locale === "zh"
                  ? "先看衣柜整理指南"
                  : "Read the full closet decluttering guide"}
              </Link>
              {locale === "zh"
                ? "，再回来按清单执行。"
                : " if you want the full step-by-step strategy first."}
            </p>
          )}
        </section>

        <AreaChecklistSection
          areaSlug={slug}
          heading={
            locale === "zh"
              ? `开始整理${category.category}`
              : `Start Your ${category.category} Reset`
          }
          description={
            areaCopy?.resetDescription ??
            (locale === "zh"
              ? "先完成 1 到 3 项也很好。关键不是一次做完，而是让这个区域今天比昨天更轻一点。"
              : "Even clearing one to three items counts. The goal is not a perfect reset in one sitting, but a space that feels lighter than it did yesterday.")
          }
          nextPath={`/${locale}/declutter-checklist/${slug}`}
        />
      </div>
    </main>
  );
}
