import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

const LandingPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight font-signika">
            Overwhelmed by Clutter? Take Control Today!
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-400">
            Clutter isn&apos;t just stuff—it&apos;s stress. Upload photos of
            your spaces, track your belongings, and declutter with confidence.
            Set deadlines and free yourself from the chaos.
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
            alt="Minimalist decluttered space"
          />
        </div>
      </section>

      {/* The Burden of Clutter */}
      <section className="py-16 px-6 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            Are You Feeling Overwhelmed by Clutter?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Clutter steals time, space, and peace of mind. From unused gadgets
            to piles of paper, the weight of &quot;someday&quot; items adds up.
            But what if you could make decluttering easy?
          </p>
        </div>
      </section>

      {/* Common Clutter Struggles */}
      <div className="flex flex-col items-center text-center p-8 max-w-4xl mx-auto my-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-200">
          Why Do We Hold On to So Much Stuff?
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          <strong>Fear of Letting Go:</strong> &quot;What if I need it
          later?&quot;
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          <strong>Sentimental Attachment:</strong> &quot;But this was a
          gift...&quot;
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          <strong>Decision Fatigue:</strong> &quot;I just don&apos;t know where
          to start.&quot;
        </p>
      </div>

      {/* Decluttering Process */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900" id="features">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            How to Declutter Your Home with Ease
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-12">
            Our tool makes the process simple, structured, and stress-free.
          </p>
        </div>
        <div className="space-y-12 max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Identify & Organize
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Upload photos, let our tool list your belongings, and categorize
              them with ease.
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Set Decluttering Deadlines
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Assign deadlines to unused items—use them or lose them.
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Track Your Progress
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Stay motivated with progress tracking and reminders to keep you on
              track.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-800" id="pricing">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Start Decluttering for Free
          </h2>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-xl p-8 border">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Early Access
            </h3>
            <div className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              FREE
              <span className="text-lg text-gray-600 dark:text-gray-400">
                {" "}
                (Limited Time)
              </span>
              <div className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                $4/month after launch
              </div>
            </div>
            <ul className="space-y-4 mb-8 text-gray-600 dark:text-gray-400">
              <li>Declutter up to 1,000 items</li>
              <li>10 photo analyses per month</li>
              <li>Track progress and set deadlines</li>
              <li>Personalized decluttering insights</li>
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
