import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import HomeCtas from "@/components/HomeCtas";
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
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <section
        id="hero-section"
        className="bg-white dark:bg-gray-800 py-16 px-6 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight font-signika">
            {dict.home.heroTitle}
          </h1>
          <div className="mb-6 text-center">
            <HomeCtas showChecklistLink={false} showTaskButton={false} />
          </div>
          <p className="text-lg md:text-xl mb-12 text-gray-700 dark:text-gray-400">
            {dict.home.heroSubtitle}
          </p>
          <div className="space-y-4 text-center">
            <HomeCtas showTaskButton={false} />
          </div>
        </div>
        <div className="mt-10">
          <Image
            width={400}
            height={600}
            className="h-auto w-full max-w-xl mx-auto rounded-lg dark:bg-white"
            src="/hero.png"
            alt={dict.home.heroImageAlt}
          />
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            {dict.home.quoteTitle}
          </h2>
        </div>
      </section>

      <div className="flex flex-col items-center text-center p-8 max-w-4xl mx-auto my-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <p className="text-xl md:text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-200 italic">
          {dict.home.thinkingQuote1}
        </p>

        <div className="space-y-8">
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {dict.home.unusedGadgets}
              </span>{" "}
              {dict.home.unusedGadgetsDesc}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {dict.home.forgottenClothes}
              </span>{" "}
              {dict.home.forgottenClothesDesc}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {dict.home.stackOfBooks}
              </span>{" "}
              {dict.home.stackOfBooksDesc}
            </p>
          </div>

          <div className="dark:border-gray-700 pt-8">
            <p className="text-xl md:text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-200 italic">
              {dict.home.deadlineQuote}
            </p>

            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {dict.home.unusedGadgets}
                </span>{" "}
                {dict.home.unusedGadgetsDeadline}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {dict.home.forgottenClothes}
                </span>{" "}
                {dict.home.forgottenClothesDeadline}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {dict.home.stackOfBooks}
                </span>{" "}
                {dict.home.stackOfBooksDeadline}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900" id="features">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 dark:text-gray-200">
            {dict.home.howAppWorksTitle}
          </h2>
        </div>
        <div className="space-y-12 max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {dict.home.feature1Title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {dict.home.feature1Desc}
            </p>
          </div>

          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {dict.home.feature2Title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {dict.home.feature2Desc}
            </p>
          </div>

          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {dict.home.feature3Title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {dict.home.feature3Desc}
            </p>
          </div>
        </div>
      </section>

      <section
        className="py-20 px-6 bg-white dark:bg-gray-800"
        id="how-to-declutter"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
            {dict.home.howToTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-12 text-center">
            {dict.home.howToSubtitle}
          </p>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {dict.home.step1Title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dict.home.step1Desc}
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {dict.home.step2Title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dict.home.step2Desc}
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {dict.home.step3Title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dict.home.step3Desc}
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {dict.home.step4Title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dict.home.step4Desc}
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {dict.home.step5Title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dict.home.step5Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20 px-6 bg-gray-50 dark:bg-gray-900"
        id="room-by-room"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
            {dict.home.roomByRoomTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-12 text-center">
            {dict.home.roomByRoomSubtitle}
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {dict.home.livingRoomTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {dict.home.livingRoomDesc}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {dict.home.bedroomTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {dict.home.bedroomDesc}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {dict.home.kitchenTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {dict.home.kitchenDesc}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {dict.home.bathroomTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {dict.home.bathroomDesc}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {dict.home.homeOfficeTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {dict.home.homeOfficeDesc}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {dict.home.closetsTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {dict.home.closetsDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800 dark:text-gray-200">
            {dict.home.faqTitle}
          </h2>
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {dict.home.faq1Title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {dict.home.faq1Desc}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {dict.home.faq2Title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {dict.home.faq2Desc}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {dict.home.faq3Title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {dict.home.faq3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
};

export default LandingPage;
