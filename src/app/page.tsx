import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

const LandingPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      {/* Main Content */}
      <section
        id="hero-section"
        className="bg-white dark:bg-gray-800 py-16 px-6 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight font-signika">
            Discover peace through decluttering
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-400">
            Upload photos of your drawers, closets, or storage spaces. Our tool
            will help you list, categorize, and set declutter deadlines for
            every item, so you can decide what stays and what goes.
          </p>
          <Link href="/login">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition">
              Join Beta
            </button>
          </Link>
        </div>
        <div className="mt-10">
          <Image
            width={400}
            height={600}
            className="h-auto w-full max-w-xl mx-auto rounded-lg dark:bg-white"
            src="/hero.png"
            alt="Illustration of a minimalist space representing organization and clarity"
          />
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            &quot;Every item in your space affects your mind. Free your
            environment to free yourself.&quot;
          </h2>
        </div>
      </section>

      {/* Get You Thinking Section */}
      <div className="flex flex-col items-center text-center p-8 max-w-4xl mx-auto my-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <p className="text-xl md:text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-200 italic">
          &quot;Do I really need this? Or is it time to let go?&quot;
        </p>

        <div className="space-y-8">
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                THE UNUSED GADGETS:
              </span>{" "}
              It seemed so useful when I bought it, but it hasn&apos;t been
              touched in years. Is it time to reclaim that space?
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                THE FORGOTTEN CLOTHES:
              </span>{" "}
              They still fit and look good, but I haven&apos;t worn them in
              ages. Are they really worth keeping?
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                THE STACK OF BOOKS:
              </span>{" "}
              They inspire me, but they&apos;ve been collecting dust. Should I
              focus on a select few instead?
            </p>
          </div>

          <div className="dark:border-gray-700 pt-8">
            <p className="text-xl md:text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-200 italic">
              &quot;Set a Declutter Deadline: Use It or Let It Go&quot;
            </p>

            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  THE UNUSED GADGETS:
                </span>{" "}
                Give yourself one month to use it. If it doesn&apos;t prove its
                value, it&apos;s time to let it go.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  THE FORGOTTEN CLOTHES:
                </span>{" "}
                Plan an occasion to wear them within three months. If they stay
                in the closet, consider donating them.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  THE STACK OF BOOKS:
                </span>{" "}
                Select one book to finish in two months. If it doesn&apos;t
                captivate you, pass it along to someone else.
              </p>
            </div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg mt-8 italic border-t border-gray-200 dark:border-gray-700 pt-6">
          - Inspired by the Minimalist Movement
        </p>
      </div>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900" id="features">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            How It Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-12">
            Our smart tool makes decluttering simple and actionable.
          </p>
        </div>
        <div className="space-y-12 max-w-3xl mx-auto">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Identify and Organize
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Upload photos of your spaces, and our AI will detect and list the
              items. Gain clarity on what you own.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Set Declutter Deadlines
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Assign deadlines to items. Decide whether to keep, donate, or
              discard. We&apos;ll send reminders when the time comes.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Track Your Progress
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor your decluttering journey with visual progress reports.
              Celebrate each step toward a more organized space.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-800" id="pricing">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Pricing
          </h2>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-xl p-8 border">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Early Access
            </h3>
            <div className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              FREE
              <span className="text-lg text-gray-600 dark:text-gray-400">
                (Limited Time)
              </span>
              <div className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                $3/month after launch
              </div>
            </div>
            <ul className="space-y-4 mb-8 text-gray-600 dark:text-gray-400">
              <li>Up to 1,000 items</li>
              <li>10 AI photo analyses per month</li>
              <li>Progress tracking and insights</li>
              <li>Declutter deadline management</li>
            </ul>
            <Link href="/signup">
              <button className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-600 transition w-full">
                Join Beta
              </button>
            </Link>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
};

export default LandingPage;
