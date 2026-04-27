import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import getDictionary from "@/i18n/getDictionary";
import { isValidLocale, defaultLocale } from "@/i18n/config";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);
  return {
    title: dict.home.metaTitle,
    description: dict.home.metaDescription,
  };
}

const LandingPage = async ({ params }: Props) => {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
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
                  href={`/${locale}/keep-or-toss`}
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
              { title: dict.home.livingRoomTitle, desc: dict.home.livingRoomDesc },
              { title: dict.home.bedroomTitle, desc: dict.home.bedroomDesc },
              { title: dict.home.kitchenTitle, desc: dict.home.kitchenDesc },
              { title: dict.home.bathroomTitle, desc: dict.home.bathroomDesc },
              { title: dict.home.homeOfficeTitle, desc: dict.home.homeOfficeDesc },
              { title: dict.home.closetsTitle, desc: dict.home.closetsDesc },
            ].map((room) => (
              <div
                key={room.title}
                className="bg-surface dark:bg-gray-700 rounded-2xl p-6 shadow-soft-depth border border-outline-variant dark:border-gray-600"
              >
                <h3 className="text-headline-md mb-3 text-on-surface dark:text-white">
                  {room.title}
                </h3>
                <p className="text-on-surface-variant dark:text-gray-400 text-body-md">
                  {room.desc}
                </p>
              </div>
            ))}
          </div>
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
