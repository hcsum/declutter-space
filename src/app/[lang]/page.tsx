import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import getDictionary from "@/i18n/getDictionary";
import { isValidLocale, defaultLocale } from "@/i18n/config";
import { buildLanguageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;

  if (locale === "ja") {
    return {
      title: "片付け・断捨離のコツ | 部屋別チェックリスト | DeclutterYourHome",
      description:
        "片付け、断捨離、部屋別の整理、捨てるか迷う物の判断、生前整理、ADHD 片付けまで。日本語で使える実践ガイドとチェックリストをまとめました。",
      alternates: buildLanguageAlternates(locale, ""),
    };
  }

  const dict = getDictionary(locale);
  return {
    title: dict.home.metaTitle,
    description: dict.home.metaDescription,
    alternates: buildLanguageAlternates(locale, ""),
  };
}

const LandingPage = async ({ params }: Props) => {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;

  if (locale === "ja") {
    return (
      <main className="overflow-x-hidden bg-[#f7f3ec] pt-16 text-[#1f2a21]">
        <section className="mx-auto flex max-w-7xl flex-col gap-12 px-8 py-20 md:flex-row md:items-center">
          <div className="md:w-1/2">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8c5a2b]">
              片付け / 断捨離 / 部屋別ガイド
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-tight tracking-[-0.05em] text-[#173223] md:text-6xl">
              片付けを、気合いではなく
              <br />
              手順で進めるための日本語ガイド
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#46534b]">
              日本語の検索では、
              <span className="font-semibold text-[#173223]">断捨離</span>、
              <span className="font-semibold text-[#173223]">片付け</span>、
              <span className="font-semibold text-[#173223]">生前整理</span>、
              <span className="font-semibold text-[#173223]">ADHD 片付け</span>
              のように、悩みごとごとに言葉が分かれます。DeclutterYourHome はその言葉に合わせて、部屋別の手順、捨てる判断、実行しやすいチェックリストをまとめています。
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
              <Link
                href={`/${locale}/declutter-checklist`}
                className="rounded-full bg-[#173223] px-6 py-3 text-white"
              >
                片付けチェックリストを見る
              </Link>
              <Link
                href={`/${locale}/decluttering-decision-guide`}
                className="rounded-full border border-[#173223] px-6 py-3 text-[#173223]"
              >
                捨てるか迷う物を整理する
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute -inset-4 rounded-full bg-[#d9b88f]/20 blur-3xl" />
            <Image
              width={600}
              height={500}
              alt="片付いて落ち着いた部屋のイメージ"
              className="relative h-[500px] w-full rounded-[1.5rem] object-cover"
              src="/hero.webp"
              priority
            />
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["断捨離", "まず大きな方向を変えたい人向け。『何を残すか』ではなく『何を入れないか、何を手放すか』から考える。"],
                ["片付け", "今日すぐ部屋を動かしたい人向け。床、机、キッチン、リビングなど、今見えている散らかりを小さく減らす。"],
                ["生前整理", "年齢に限らず、これからの暮らしを軽くしたい人向け。残される側の負担も含めて物を見直す。"],
                ["ADHD 片付け", "気合いより仕組みが必要な人向け。小さなタスク、時間を区切る、とりあえず箱で始めやすくする。"],
              ].map(([title, body]) => (
                <div key={title} className="rounded-[1.75rem] bg-[#f7f3ec] p-6 shadow-sm ring-1 ring-black/5">
                  <h2 className="text-2xl font-bold tracking-[-0.04em] text-[#173223]">{title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#546259] md:text-base">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-8">
            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8c5a2b]">部屋別ガイド</p>
              <h2 className="mt-3 text-4xl font-bold tracking-[-0.05em] text-[#173223]">
                日本語で検索されやすい「部屋 × 片付け」から入る
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#546259]">
                英語の {"\""}declutter{"\""} をそのまま直訳するより、日本語では
                <span className="font-semibold text-[#173223]">寝室 片付け</span>、
                <span className="font-semibold text-[#173223]">キッチン 片付け</span>、
                <span className="font-semibold text-[#173223]">リビング 片付け</span>、
                <span className="font-semibold text-[#173223]">クローゼット 断捨離</span>
                のような入口のほうが意図が揃いやすいです。
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                ["寝室 片付け", "床、ナイトテーブル、ベッド下収納、クローゼットから進める。", "/how-to-declutter-your-bedroom"],
                ["キッチン 片付け", "重複ツール、期限切れ食品、保存容器から減らす。", "/how-to-declutter-your-kitchen"],
                ["リビング 片付け", "表に出ている物を減らして、家族が戻れる場所にする。", "/how-to-declutter-your-living-room"],
                ["クローゼット 断捨離", "着ていない服、サイズが合わない服、高かった失敗買いを見直す。", "/how-to-declutter-your-closet"],
                ["浴室 片付け", "期限切れの化粧品、使いかけ、予備の置きすぎを整理する。", "/how-to-declutter-your-bathroom"],
                ["在宅ワーク周りの片付け", "デスク、書類、ケーブル、保留箱を処理して集中を戻す。", "/how-to-declutter-your-home-office"],
              ].map(([title, body, href]) => (
                <Link
                  key={href}
                  href={`/${locale}${href}`}
                  className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-black/5 transition-transform hover:-translate-y-1"
                >
                  <h3 className="text-2xl font-bold tracking-[-0.04em] text-[#173223]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#546259] md:text-base">{body}</p>
                  <p className="mt-5 text-sm font-semibold text-[#8c5a2b]">ガイドを見る →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#173223] py-16 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d8c19d]">悩み別ガイド</p>
              <h2 className="mt-3 text-4xl font-bold tracking-[-0.05em]">
                「片付けたい」だけでは検索しきれない悩みへ
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-white/80">
                日本語では、ただの片付けではなく、
                <span className="font-semibold text-white">生前整理</span>、
                <span className="font-semibold text-white">思い出の品</span>、
                <span className="font-semibold text-white">いらないプレゼント</span>、
                <span className="font-semibold text-white">ADHD 片付け</span>
                のように検索意図が細かく分かれます。ここは直訳ではなく、その悩み単位でページを分けています。
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["家の断捨離で手放せるもの60選", "/things-to-declutter"],
                ["物が増える前にやめたい買い物10選", "/things-to-stop-buying"],
                ["思い出の品を罪悪感なく手放す方法", "/how-to-declutter-sentimental-items"],
                ["いらないギフトを手放す方法", "/how-to-declutter-unwanted-gifts"],
                ["大切な人が亡くなった後の片付け方", "/decluttering-after-a-death"],
                ["ADHD向け掃除・片付けチェックリスト", "/adhd-cleaning-checklist"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={`/${locale}${href}`}
                  className="rounded-[1.5rem] border border-white/15 bg-white/10 px-5 py-5 text-sm font-semibold leading-7 text-white transition-colors hover:bg-white/15 md:text-base"
                >
                  {label} →
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-white px-8 py-12 shadow-sm ring-1 ring-black/5">
            <h2 className="text-4xl font-bold tracking-[-0.05em] text-[#173223]">
              まずは 2 つの入口から始める
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-[1.5rem] bg-[#f7f3ec] p-6">
                <h3 className="text-2xl font-bold text-[#173223]">片付けチェックリスト</h3>
                <p className="mt-3 text-base leading-7 text-[#546259]">
                  部屋別に小さなタスクへ分けて、今日やることを前に進めるための入口です。「片付けチェックリスト」に沿って一つずつ進められます。
                </p>
                <Link href={`/${locale}/declutter-checklist`} className="mt-5 inline-block text-sm font-semibold text-[#8c5a2b]">
                  チェックリストへ →
                </Link>
              </div>
              <div className="rounded-[1.5rem] bg-[#f7f3ec] p-6">
                <h3 className="text-2xl font-bold text-[#173223]">捨てるか迷う物の判断ガイド</h3>
                <p className="mt-3 text-base leading-7 text-[#546259]">
                  「断捨離のコツ」の中でも一番詰まりやすい「迷う物」のための入口です。期限を置いて見直すやり方に寄せています。
                </p>
                <Link href={`/${locale}/decluttering-decision-guide`} className="mt-5 inline-block text-sm font-semibold text-[#8c5a2b]">
                  判断ガイドへ →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const dict = getDictionary(locale);

  return (
    <main className="pt-16 overflow-x-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 space-y-8 text-center md:text-left">
          <h1 className="text-display font-display text-on-surface dark:text-white">
            {dict.home.heroTitle}
          </h1>
          <p className="text-body-lg text-on-surface-variant dark:text-gray-400 max-w-lg">
            {dict.home.heroSubtitle}
          </p>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute -inset-4 bg-primary-container/20 blur-3xl rounded-full" />
          <Image
            width={600}
            height={500}
            alt="Minimalist organized living space"
            className="relative w-full h-[500px] object-cover rounded-[1.5rem]"
            style={{ boxShadow: "0 10px 40px -15px rgba(130, 83, 63, 0.08)" }}
            src="/hero.webp"
            priority
          />
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="intentional-tools" className="bg-surface-container-low dark:bg-gray-800 py-section-gap">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="text-label-sm uppercase tracking-widest text-primary dark:text-orange-400 mb-4 block">
              {dict.home.coreFeatures}
            </span>
            <h2 className="text-headline-lg font-headline-lg text-on-surface dark:text-white">
              {dict.home.intentionalTools}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-gutter">
            {/* Declutter Checklist */}
            <div className="bg-surface dark:bg-gray-700 rounded-2xl p-8 shadow-soft-depth border border-outline-variant dark:border-gray-600 flex flex-col items-start gap-6 group hover:border-primary/30 transition-all duration-300">
              <div className="w-16 h-16 bg-primary-container/30 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary dark:text-orange-400">
                <span className="material-symbols-outlined text-4xl">
                  task_alt
                </span>
              </div>
              <div>
                <h3 className="text-headline-md mb-2 text-on-surface dark:text-white">
                  {dict.home.featureChecklistTitle}
                </h3>
                <p className="text-on-surface-variant dark:text-gray-400 text-body-md mb-6">
                  {dict.home.featureChecklistDesc}
                </p>
                <Link
                  href={`/${locale}/declutter-checklist`}
                  className="px-8 py-3 bg-primary text-on-primary rounded-full text-label-sm uppercase tracking-widest transition-all duration-300 hover:px-10"
                >
                  {dict.home.featureChecklistCta}
                </Link>
              </div>
            </div>
            {/* Second Look */}
            <div className="bg-surface dark:bg-gray-700 rounded-2xl p-8 shadow-soft-depth border border-outline-variant dark:border-gray-600 flex flex-col items-start gap-6 group hover:border-secondary/30 transition-all duration-300">
              <div className="w-16 h-16 bg-secondary-container/30 dark:bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary dark:text-blue-400">
                <span className="material-symbols-outlined text-4xl">
                  visibility
                </span>
              </div>
              <div>
                <h3 className="text-headline-md mb-2 text-on-surface dark:text-white">
                  {dict.home.featureSecondLookTitle}
                </h3>
                <p className="text-on-surface-variant dark:text-gray-400 text-body-md mb-6">
                  {dict.home.featureSecondLookDesc}
                </p>
                <Link
                  href={`/${locale}/decluttering-decision-guide`}
                  className="px-8 py-3 bg-secondary/5 border border-secondary text-secondary dark:text-blue-400 dark:border-blue-400 rounded-full text-label-sm uppercase tracking-widest transition-all duration-300 hover:px-10"
                >
                  {dict.home.featureSecondLookCta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reflective Quote Section */}
      <section className="bg-surface-container-low dark:bg-gray-800 py-section-gap">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-headline-md text-center text-on-surface-variant dark:text-gray-300 mb-12">
            {dict.home.quoteTitle}
          </p>

          <div className="bg-surface dark:bg-gray-700 rounded-[2rem] p-10 md:p-14 shadow-soft-depth border border-outline-variant dark:border-gray-600">
            <p className="text-headline-lg text-center italic text-on-surface dark:text-white mb-12">
              {dict.home.thinkingQuote1}
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-container/40 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-orange-400">
                  <span className="material-symbols-outlined text-xl">devices</span>
                </div>
                <div>
                  <p className="text-label-sm uppercase tracking-widest text-primary dark:text-orange-400 mb-1">
                    {dict.home.unusedGadgets}
                  </p>
                  <p className="text-on-surface-variant dark:text-gray-400 text-body-md">
                    {dict.home.unusedGadgetsDesc}
                  </p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-container/40 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-orange-400">
                  <span className="material-symbols-outlined text-xl">checkroom</span>
                </div>
                <div>
                  <p className="text-label-sm uppercase tracking-widest text-primary dark:text-orange-400 mb-1">
                    {dict.home.forgottenClothes}
                  </p>
                  <p className="text-on-surface-variant dark:text-gray-400 text-body-md">
                    {dict.home.forgottenClothesDesc}
                  </p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-container/40 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-orange-400">
                  <span className="material-symbols-outlined text-xl">menu_book</span>
                </div>
                <div>
                  <p className="text-label-sm uppercase tracking-widest text-primary dark:text-orange-400 mb-1">
                    {dict.home.stackOfBooks}
                  </p>
                  <p className="text-on-surface-variant dark:text-gray-400 text-body-md">
                    {dict.home.stackOfBooksDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-outline-variant dark:border-gray-600 pt-10">
              <p className="text-headline-lg text-center italic text-on-surface dark:text-white mb-10">
                {dict.home.deadlineQuote}
              </p>
              <div className="space-y-6">
                <div className="bg-primary-container/20 dark:bg-primary/10 rounded-xl px-6 py-4">
                  <p className="text-label-sm uppercase tracking-widest text-primary dark:text-orange-400 mb-1">
                    {dict.home.unusedGadgets}
                  </p>
                  <p className="text-on-surface-variant dark:text-gray-400 text-body-md">
                    {dict.home.unusedGadgetsDeadline}
                  </p>
                </div>
                <div className="bg-primary-container/20 dark:bg-primary/10 rounded-xl px-6 py-4">
                  <p className="text-label-sm uppercase tracking-widest text-primary dark:text-orange-400 mb-1">
                    {dict.home.forgottenClothes}
                  </p>
                  <p className="text-on-surface-variant dark:text-gray-400 text-body-md">
                    {dict.home.forgottenClothesDeadline}
                  </p>
                </div>
                <div className="bg-primary-container/20 dark:bg-primary/10 rounded-xl px-6 py-4">
                  <p className="text-label-sm uppercase tracking-widest text-primary dark:text-orange-400 mb-1">
                    {dict.home.stackOfBooks}
                  </p>
                  <p className="text-on-surface-variant dark:text-gray-400 text-body-md">
                    {dict.home.stackOfBooksDeadline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Content - Mindful Guides */}
      <section className="bg-surface-container dark:bg-gray-800 py-section-gap">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-headline-lg font-headline-lg text-on-surface dark:text-white">
                {dict.home.mindfulGuides}
              </h2>
              <p className="text-on-surface-variant dark:text-gray-400">
                {dict.home.guideSubtitle}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Guide 1 - 5 Steps */}
            <Link
              href={`/${locale}#how-to-declutter`}
              className="bg-surface dark:bg-gray-700 rounded-2xl overflow-hidden shadow-soft-depth hover:-translate-y-2 transition-transform duration-300 group"
            >
              <img
                alt="Declutter guide"
                className="w-full h-48 object-cover"
                src="/5-steps.webp"
              />
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <span className="bg-surface-container-high dark:bg-gray-600 px-3 py-1 rounded-full text-label-sm text-on-surface-variant dark:text-gray-300">
                    {dict.home.guide1Tag1}
                  </span>
                  <span className="bg-surface-container-high dark:bg-gray-600 px-3 py-1 rounded-full text-label-sm text-on-surface-variant dark:text-gray-300">
                    {dict.home.guide1Tag2}
                  </span>
                </div>
                <h3 className="text-headline-md mb-3 text-on-surface dark:text-white">
                  {dict.home.guide1Title}
                </h3>
                <p className="text-on-surface-variant dark:text-gray-400 text-body-md mb-6">
                  {dict.home.guide1Desc}
                </p>
                <span className="text-primary dark:text-orange-400 font-semibold group-hover:underline">
                  {dict.home.guide1Link}
                </span>
              </div>
            </Link>
            {/* Guide 2 - Room by Room */}
          <Link
            href={`/${locale}#room-by-room`}
            className="bg-surface dark:bg-gray-700 rounded-2xl overflow-hidden shadow-soft-depth hover:-translate-y-2 transition-transform duration-300 group"
          >
              <img
                alt="Room by room guide"
                className="w-full h-48 object-cover"
                src="/room-by-room.webp"
              />
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <span className="bg-surface-container-high dark:bg-gray-600 px-3 py-1 rounded-full text-label-sm text-on-surface-variant dark:text-gray-300">
                    {dict.home.guide2Tag1}
                  </span>
                  <span className="bg-surface-container-high dark:bg-gray-600 px-3 py-1 rounded-full text-label-sm text-on-surface-variant dark:text-gray-300">
                    {dict.home.guide2Tag2}
                  </span>
                </div>
                <h3 className="text-headline-md mb-3 text-on-surface dark:text-white">
                  {dict.home.guide2Title}
                </h3>
                <p className="text-on-surface-variant dark:text-gray-400 text-body-md mb-6">
                  {dict.home.guide2Desc}
                </p>
                <span className="text-primary dark:text-orange-400 font-semibold group-hover:underline">
                  {dict.home.guide2Link}
                </span>
              </div>
            </Link>
            {/* Guide 3 - Psychology */}
            <Link
              href={`/${locale}#mindful-discernment`}
              className="bg-surface dark:bg-gray-700 rounded-2xl overflow-hidden shadow-soft-depth hover:-translate-y-2 transition-transform duration-300 group"
            >
              <img
                alt="Psychology of space"
                className="w-full h-48 object-cover"
                src="/psychology.webp"
              />
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <span className="bg-surface-container-high dark:bg-gray-600 px-3 py-1 rounded-full text-label-sm text-on-surface-variant dark:text-gray-300">
                    {dict.home.guide3Tag1}
                  </span>
                  <span className="bg-surface-container-high dark:bg-gray-600 px-3 py-1 rounded-full text-label-sm text-on-surface-variant dark:text-gray-300">
                    {dict.home.guide3Tag2}
                  </span>
                </div>
                <h3 className="text-headline-md mb-3 text-on-surface dark:text-white">
                  {dict.home.guide3Title}
                </h3>
                <p className="text-on-surface-variant dark:text-gray-400 text-body-md mb-6">
                  {dict.home.guide3Desc}
                </p>
                <span className="text-primary dark:text-orange-400 font-semibold group-hover:underline">
                  {dict.home.guide3Link}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How to Declutter - 5 Steps */}
      <section className="max-w-7xl mx-auto px-8 py-section-gap" id="how-to-declutter">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-headline-lg font-headline-lg mb-4 text-center text-on-surface dark:text-white">
            {dict.home.howToTitle}
          </h2>
          <p className="text-on-surface-variant dark:text-gray-400 text-body-lg mb-12 text-center">
            {dict.home.howToSubtitle}
          </p>
          <div className="space-y-8">
            {[
              { num: "1", title: dict.home.step1Title, desc: dict.home.step1Desc },
              { num: "2", title: dict.home.step2Title, desc: dict.home.step2Desc },
              { num: "3", title: dict.home.step3Title, desc: dict.home.step3Desc },
              { num: "4", title: dict.home.step4Title, desc: dict.home.step4Desc },
              { num: "5", title: dict.home.step5Title, desc: dict.home.step5Desc },
            ].map((step) => (
              <div key={step.num} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xl">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-headline-md mb-2 text-on-surface dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-on-surface-variant dark:text-gray-400 text-body-md">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Room by Room */}
      <section className="bg-surface-container-low dark:bg-gray-800 py-section-gap" id="room-by-room">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-headline-lg font-headline-lg mb-4 text-center text-on-surface dark:text-white">
            {dict.home.roomByRoomTitle}
          </h2>
          <p className="text-on-surface-variant dark:text-gray-400 text-body-lg mb-12 text-center">
            {dict.home.roomByRoomSubtitle}
          </p>
          <div className="grid gap-gutter md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: dict.home.livingRoomTitle,
                desc: dict.home.livingRoomDesc,
                href: `/${locale}/how-to-declutter-your-living-room`,
              },
              {
                title: dict.home.bedroomTitle,
                desc: dict.home.bedroomDesc,
                href: `/${locale}/how-to-declutter-your-bedroom`,
              },
              {
                title: dict.home.kitchenTitle,
                desc: dict.home.kitchenDesc,
                href: `/${locale}/how-to-declutter-your-kitchen`,
              },
              {
                title: dict.home.bathroomTitle,
                desc: dict.home.bathroomDesc,
                href: `/${locale}/how-to-declutter-your-bathroom`,
              },
              {
                title: dict.home.homeOfficeTitle,
                desc: dict.home.homeOfficeDesc,
                href: `/${locale}/how-to-declutter-your-home-office`,
              },
              {
                title: dict.home.closetsTitle,
                desc: dict.home.closetsDesc,
                href: `/${locale}/how-to-declutter-your-closet`,
              },
            ].map((room) => (
              <div
                key={room.title}
                className="bg-surface dark:bg-gray-700 rounded-2xl p-6 shadow-soft-depth border border-outline-variant dark:border-gray-600"
              >
                <h3 className="text-headline-md mb-3 text-on-surface dark:text-white">
                  {room.href ? (
                    <Link href={room.href} className="hover:underline">
                      {room.title}
                    </Link>
                  ) : (
                    room.title
                  )}
                </h3>
                <p className="text-on-surface-variant dark:text-gray-400 text-body-md">
                  {room.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Room by Room */}
      <section className="max-w-7xl mx-auto px-8 py-section-gap" id="beyond-rooms">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-headline-lg font-headline-lg mb-4 text-on-surface dark:text-white">
            {dict.home.beyondRoomsTitle}
          </h2>
          <p className="text-on-surface-variant dark:text-gray-400 text-body-lg">
            {dict.home.beyondRoomsSubtitle}
          </p>
        </div>
        <div className="grid gap-gutter md:grid-cols-2">
          {[
            {
              title: dict.home.beyondList60Title,
              desc: dict.home.beyondList60Desc,
              href: `/${locale}/things-to-declutter`,
            },
            {
              title: dict.home.beyondStopBuyingTitle,
              desc: dict.home.beyondStopBuyingDesc,
              href: `/${locale}/things-to-stop-buying`,
            },
            {
              title: dict.home.beyondSentimentalTitle,
              desc: dict.home.beyondSentimentalDesc,
              href: `/${locale}/how-to-declutter-sentimental-items`,
            },
            {
              title: dict.home.beyondGiftsTitle,
              desc: dict.home.beyondGiftsDesc,
              href: `/${locale}/how-to-declutter-unwanted-gifts`,
            },
            {
              title: dict.home.beyondLossTitle,
              desc: dict.home.beyondLossDesc,
              href: `/${locale}/decluttering-after-a-death`,
            },
            {
              title: dict.home.beyondAdhdTitle,
              desc: dict.home.beyondAdhdDesc,
              href: `/${locale}/adhd-cleaning-checklist`,
            },
            {
              title: "Swedish death cleaning",
              desc: "A gentle döstädning checklist: pare down so no one else has to sort through a lifetime of your things.",
              href: `/${locale}/swedish-death-cleaning`,
            },
            {
              title: "Decluttering before a move",
              desc: "A downsizing checklist so you only pay to move what belongs in the next home — no moving-day regret.",
              href: `/${locale}/decluttering-before-a-move`,
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="bg-surface dark:bg-gray-700 rounded-2xl p-8 shadow-soft-depth border border-outline-variant dark:border-gray-600 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group"
            >
              <h3 className="text-headline-md mb-3 text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-orange-400 transition-colors">
                {card.title}
              </h3>
              <p className="text-on-surface-variant dark:text-gray-400 text-body-md mb-5">
                {card.desc}
              </p>
              <span className="text-primary dark:text-orange-400 font-semibold group-hover:underline">
                {dict.home.beyondReadGuide} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* The Psychology of Mindful Discernment */}
      <section className="max-w-7xl mx-auto px-8 py-section-gap" id="mindful-discernment">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-headline-lg font-headline-lg mb-4 text-on-surface dark:text-white">
              {dict.home.psychTitle}
            </h2>
            <p className="text-body-lg text-on-surface-variant dark:text-gray-400">
              {dict.home.psychSubtitle}
            </p>
          </div>

          {/* Why We Hold On */}
          <div className="mb-16">
            <h3 className="text-headline-md font-medium mb-8 text-primary dark:text-orange-400">
              {dict.home.psychWhyTitle}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-surface dark:bg-gray-700 rounded-2xl p-6 border border-outline-variant dark:border-gray-600">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-primary dark:text-orange-400">favorite</span>
                  <h4 className="text-lg font-semibold text-on-surface dark:text-white">{dict.home.psychWhy1Title}</h4>
                </div>
                <p className="text-on-surface-variant dark:text-gray-400 text-body-md">{dict.home.psychWhy1Desc}</p>
              </div>
              <div className="bg-surface dark:bg-gray-700 rounded-2xl p-6 border border-outline-variant dark:border-gray-600">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-primary dark:text-orange-400">payments</span>
                  <h4 className="text-lg font-semibold text-on-surface dark:text-white">{dict.home.psychWhy2Title}</h4>
                </div>
                <p className="text-on-surface-variant dark:text-gray-400 text-body-md">{dict.home.psychWhy2Desc}</p>
              </div>
              <div className="bg-surface dark:bg-gray-700 rounded-2xl p-6 border border-outline-variant dark:border-gray-600">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-primary dark:text-orange-400">person</span>
                  <h4 className="text-lg font-semibold text-on-surface dark:text-white">{dict.home.psychWhy3Title}</h4>
                </div>
                <p className="text-on-surface-variant dark:text-gray-400 text-body-md">{dict.home.psychWhy3Desc}</p>
              </div>
              <div className="bg-surface dark:bg-gray-700 rounded-2xl p-6 border border-outline-variant dark:border-gray-600">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-primary dark:text-orange-400">help</span>
                  <h4 className="text-lg font-semibold text-on-surface dark:text-white">{dict.home.psychWhy4Title}</h4>
                </div>
                <p className="text-on-surface-variant dark:text-gray-400 text-body-md">{dict.home.psychWhy4Desc}</p>
              </div>
            </div>
          </div>

          {/* How to Let Go */}
          <div>
            <h3 className="text-headline-md font-medium mb-8 text-secondary dark:text-blue-400">
              {dict.home.psychHowTitle}
            </h3>
            <div className="space-y-6">
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-secondary-container/30 dark:bg-secondary/20 flex items-center justify-center text-secondary dark:text-blue-400">
                  <span className="text-lg font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-on-surface dark:text-white">{dict.home.psychHow1Title}</h4>
                  <p className="text-on-surface-variant dark:text-gray-400 text-body-md">{dict.home.psychHow1Desc}</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-secondary-container/30 dark:bg-secondary/20 flex items-center justify-center text-secondary dark:text-blue-400">
                  <span className="text-lg font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-on-surface dark:text-white">{dict.home.psychHow2Title}</h4>
                  <p className="text-on-surface-variant dark:text-gray-400 text-body-md">{dict.home.psychHow2Desc}</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-secondary-container/30 dark:bg-secondary/20 flex items-center justify-center text-secondary dark:text-blue-400">
                  <span className="text-lg font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-on-surface dark:text-white">{dict.home.psychHow3Title}</h4>
                  <p className="text-on-surface-variant dark:text-gray-400 text-body-md">{dict.home.psychHow3Desc}</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-secondary-container/30 dark:bg-secondary/20 flex items-center justify-center text-secondary dark:text-blue-400">
                  <span className="text-lg font-bold">4</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1 text-on-surface dark:text-white">{dict.home.psychHow4Title}</h4>
                  <p className="text-on-surface-variant dark:text-gray-400 text-body-md">{dict.home.psychHow4Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-section-gap">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-on-surface-variant dark:text-gray-400 text-body-lg">
            {dict.home.contactText}{" "}
            <a href={`mailto:${dict.home.contactEmail}`} className="text-primary dark:text-orange-400 font-semibold hover:underline">
              {dict.home.contactEmail}
            </a>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-8 mb-20">
        <div className="bg-primary-container/30 dark:bg-primary/10 rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-display font-display text-on-primary-container dark:text-white mb-6">
              {dict.home.ctaTitle}
            </h2>
            <p className="text-body-lg text-on-primary-container dark:text-gray-300 mb-10 opacity-80">
              {dict.home.ctaDesc}
            </p>
            <Link
              href="#intentional-tools"
              className="inline-block px-10 py-5 bg-primary text-on-primary rounded-xl font-headline-md shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            >
              {dict.home.ctaButton}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
