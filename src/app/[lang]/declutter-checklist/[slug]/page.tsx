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
      : locale === "ja"
        ? `${category.category}片付けチェックリスト | DeclutterYourHome`
        : locale === "es"
          ? `Lista para ordenar: ${category.category} | DeclutterYourHome`
          : `${category.category} Declutter Checklist | DeclutterYourHome`;
  const description =
    areaCopy?.metaDescription ??
    (locale === "zh"
      ? `用这份${category.category}断舍离清单逐项整理、勾选和保存进度，把这个区域慢慢恢复成更轻松好用的空间。`
      : locale === "ja"
        ? `${category.category}片付けチェックリストで一つずつ片付け、チェックを付けながら進捗を保存できます。`
        : locale === "es"
          ? `Usa esta lista para ordenar ${category.category.toLowerCase()} punto por punto, marca lo que vayas haciendo y guarda tu progreso.`
          : `Use this ${category.category.toLowerCase()} declutter checklist to work through one area at a time, check off tasks, and keep your progress saved.`);

  return {
    title,
    description,
    alternates: buildLanguageAlternates(locale, `/declutter-checklist/${slug}`),
  };
}

/**
 * Room guides that pair with a checklist area. Spanish uses its own
 * keyword-led slugs, and only covers the areas that have a Spanish guide.
 */
const guideLinksByLocale: Record<
  string,
  Record<string, { href: string; label: string; suffix: string }>
> = {
  en: {
    bedroom: { href: "/how-to-declutter-your-bedroom", label: "Read the full bedroom decluttering guide", suffix: " if you want the full step-by-step strategy first." },
    "living-room": { href: "/how-to-declutter-your-living-room", label: "Read the full living room decluttering guide", suffix: " if you want the full step-by-step strategy first." },
    kitchen: { href: "/how-to-declutter-your-kitchen", label: "Read the full kitchen decluttering guide", suffix: " if you want the full step-by-step strategy first." },
    "bathroom-laundry": { href: "/how-to-declutter-your-bathroom", label: "Read the full bathroom decluttering guide", suffix: " if you want the full step-by-step strategy first." },
    "home-office": { href: "/how-to-declutter-your-home-office", label: "Read the full home office decluttering guide", suffix: " if you want the full step-by-step strategy first." },
    closets: { href: "/how-to-declutter-your-closet", label: "Read the full closet decluttering guide", suffix: " if you want the full step-by-step strategy first." },
  },
  zh: {
    bedroom: { href: "/how-to-declutter-your-bedroom", label: "先看卧室整理指南", suffix: "，再回来按清单执行。" },
    "living-room": { href: "/how-to-declutter-your-living-room", label: "先看客厅整理指南", suffix: "，再回来按清单执行。" },
    kitchen: { href: "/how-to-declutter-your-kitchen", label: "先看厨房整理指南", suffix: "，再回来按清单执行。" },
    "bathroom-laundry": { href: "/how-to-declutter-your-bathroom", label: "先看浴室整理指南", suffix: "，再回来按清单执行。" },
    "home-office": { href: "/how-to-declutter-your-home-office", label: "先看家庭办公室整理指南", suffix: "，再回来按清单执行。" },
    closets: { href: "/how-to-declutter-your-closet", label: "先看衣柜整理指南", suffix: "，再回来按清单执行。" },
  },
  ja: {
    bedroom: { href: "/how-to-declutter-your-bedroom", label: "寝室の片付けガイドを先に読む", suffix: "、そのあとこのチェックリストに戻ってきてください。" },
    "living-room": { href: "/how-to-declutter-your-living-room", label: "リビングの片付けガイドを先に読む", suffix: "、そのあとこのチェックリストに戻ってきてください。" },
    kitchen: { href: "/how-to-declutter-your-kitchen", label: "キッチンの片付けガイドを先に読む", suffix: "、そのあとこのチェックリストに戻ってきてください。" },
    "bathroom-laundry": { href: "/how-to-declutter-your-bathroom", label: "バスルームの片付けガイドを先に読む", suffix: "、そのあとこのチェックリストに戻ってきてください。" },
    "home-office": { href: "/how-to-declutter-your-home-office", label: "ホームオフィスの片付けガイドを先に読む", suffix: "、そのあとこのチェックリストに戻ってきてください。" },
    closets: { href: "/how-to-declutter-your-closet", label: "クローゼットの片付けガイドを先に読む", suffix: "、そのあとこのチェックリストに戻ってきてください。" },
  },
  es: {
    bedroom: { href: "/como-ordenar-la-habitacion", label: "Lee antes la guía para ordenar la habitación", suffix: " si prefieres tener la estrategia completa antes de empezar." },
    kitchen: { href: "/como-ordenar-la-cocina", label: "Lee antes la guía para ordenar la cocina", suffix: " si prefieres tener la estrategia completa antes de empezar." },
    closets: { href: "/como-ordenar-armarios", label: "Lee antes la guía para ordenar armarios", suffix: " si prefieres tener la estrategia completa antes de empezar." },
  },
};

function getGuideLink(slug: string, locale: string) {
  return guideLinksByLocale[locale]?.[slug];
}

export default async function ChecklistAreaPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const category = getChecklistCategoryBySlug(slug, locale);

  if (!category) notFound();

  const areaCopy = getAreaContent(slug, locale);
  const homeLabel =
    locale === "ja" ? "ホーム" : locale === "es" ? "Inicio" : "Home";
  const checklistLabel =
    locale === "zh"
      ? "断舍离清单"
      : locale === "ja"
        ? "断捨離チェックリスト"
        : locale === "es"
          ? "Lista de orden y limpieza"
          : "Declutter Checklist";

  const guideLink = getGuideLink(slug, locale);

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
              <span>
                {locale === "zh"
                  ? "总清单"
                  : locale === "ja"
                    ? "全チェックリスト"
                    : locale === "es"
                      ? "Lista completa"
                      : "Full checklist"}
              </span>
            </Link>
          </div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#59615d]">
            {checklistLabel}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.05em] text-[#002d1c] md:text-5xl">
            {locale === "zh"
              ? `${category.category}断舍离清单`
              : locale === "ja"
                ? `${category.category}片付けチェックリスト`
                : locale === "es"
                  ? `Lista para ordenar: ${category.category}`
                  : `${category.category} Declutter Checklist`}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#414844] md:text-lg">
            {areaCopy?.intro ??
              (locale === "zh"
                ? `从这个区域开始，逐项清理真正占空间、占注意力、却没有继续服务你生活的东西。勾选、补充和保存进度，慢慢把 ${category.category} 变得更轻松好用。`
                : locale === "ja"
                  ? `この場所から始めて、場所や注意力を奪っているのにもう役に立っていない物を一つずつ片付けましょう。チェックを付けて、追加して、進捗を保存しながら${category.category}を少しずつ使いやすくしていきます。`
                  : locale === "es"
                    ? `Céntrate en una zona, saca lo que ya no se gana su sitio y ve guardando el progreso. Esta lista de ${category.category.toLowerCase()} te da un punto de partida concreto.`
                    : `Focus on one space, clear what no longer earns its place, and keep your progress moving. This dedicated ${category.category.toLowerCase()} checklist gives you a practical place to start.`)}
          </p>
          {guideLink && (
            <p className="mt-4 text-sm leading-6 text-[#59615d]">
              <Link
                href={`/${locale}${guideLink.href}`}
                className="font-semibold text-[#2b694d] underline decoration-[#b7d1c4] underline-offset-4"
              >
                {guideLink.label}
              </Link>
              {guideLink.suffix}
            </p>
          )}
        </section>

        <AreaChecklistSection
          areaSlug={slug}
          heading={
            locale === "zh"
              ? `开始整理${category.category}`
              : locale === "ja"
                ? `${category.category}のリセットを始める`
                : locale === "es"
                  ? `Empieza a ordenar: ${category.category}`
                  : `Start Your ${category.category} Reset`
          }
          description={
            areaCopy?.resetDescription ??
            (locale === "zh"
              ? "先完成 1 到 3 项也很好。关键不是一次做完，而是让这个区域今天比昨天更轻一点。"
              : locale === "ja"
                ? "まず 1〜3 個片付けるだけでも十分です。大切なのは一度で完璧に終わらせることではなく、この場所を昨日より少し軽くすることです。"
                : locale === "es"
                  ? "Aunque solo saques una o tres cosas, cuenta. El objetivo no es dejarlo perfecto de una sentada, sino que la zona pese un poco menos que ayer."
                  : "Even clearing one to three items counts. The goal is not a perfect reset in one sitting, but a space that feels lighter than it did yesterday.")
          }
          nextPath={`/${locale}/declutter-checklist/${slug}`}
        />
      </div>
    </main>
  );
}
