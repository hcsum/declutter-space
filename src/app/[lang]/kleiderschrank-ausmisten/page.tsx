import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GermanGuide from "@/components/GermanGuide";
import { buildLanguageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "de") notFound();
  return {
    title: "Kleiderschrank ausmisten: Anleitung & kostenlose PDF-Checkliste",
    description:
      "Kleiderschrank ausmisten in kleinen Schritten: Kleidung prüfen, leichter entscheiden und sinnvoll weitergeben. Mit kostenloser deutscher PDF-Checkliste.",
    alternates: buildLanguageAlternates("de", "/kleiderschrank-ausmisten"),
  };
}
export default async function Page({ params }: Props) {
  if ((await params).lang !== "de") notFound();
  return <GermanGuide closet />;
}
