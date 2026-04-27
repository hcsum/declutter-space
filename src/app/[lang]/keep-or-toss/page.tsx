import { permanentRedirect } from "next/navigation";
import { defaultLocale, isValidLocale } from "@/i18n/config";

type Props = { params: Promise<{ lang: string }> };

export default async function LegacyKeepOrTossPage({ params }: Props) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;

  permanentRedirect(`/${locale}/decluttering-decision-guide`);
}
