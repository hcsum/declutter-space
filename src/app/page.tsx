import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

// https://www.livelifeorganised.com.au/blog/5-reasons-we-hold-on#:~:text=Fear%20is%20another%20reason%20we,are%20old%20cords%20and%20cables.
// https://practicalfamily.org/declutter-deadline-use-it-or-lose-it/
// key word: app for decluttering
// himym S6E3

const LandingPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      {/* Hero Section */}
      <section
        id="hero-section"
        className="bg-white dark:bg-gray-800 py-16 px-6 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight font-signika">
            Wondering How to Declutter Your Home? Try Our Deadline-based App
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-400">
            Clutter isn&apos;t just stuff—it&apos;s stress. Our app for
            decluttering helps you keep track of the items you thought you might
            need someday. Set deadlines for them, when the day comes, you can
            decide what goes and what stays.
          </p>
          <div className="space-y-4 text-center">
            <Link href="/signup">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg text-lg transition-colors duration-200 w-full sm:w-auto">
                Get Early Access
              </button>
            </Link>
            <div>
              <Link
                href="/login"
                className="text-blue-500 hover:text-blue-600 text-lg transition-colors duration-200"
              >
                Already have an account? Login
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Image
            width={400}
            height={600}
            className="h-auto w-full max-w-xl mx-auto rounded-lg dark:bg-white"
            src="/hero.png"
            alt="Illustration of a decluttered minimalist space"
          />
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            Every item in your space shapes your mindset. Create a clutter-free
            environment to unlock a calmer, more focused you.
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
              ages. Are they worth keeping, or should I declutter my closet and
              donate them?
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                THE STACK OF BOOKS:
              </span>{" "}
              They inspire me, but they&apos;ve been collecting dust. Should I
              focus on a select few and donate the rest?
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
                value, it&apos;s time to declutter.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  THE FORGOTTEN CLOTHES:
                </span>{" "}
                Plan an occasion to wear them within three months. If they stay
                in the closet, it&apos;s time to declutter and donate.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  THE STACK OF BOOKS:
                </span>{" "}
                Select one book to finish in two months. If it doesn&apos;t
                captivate you, declutter your shelf and pass it along to someone
                else.
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
            How Decluttering Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-12">
            Discover how to declutter your home with our intuitive app that
            makes simplifying your space easy and actionable. Get started with
            the most intuitive app for decluttering your home.
          </p>
        </div>
        <div className="space-y-12 max-w-3xl mx-auto">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Identify and Organize
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Adding your items in bulk by uploading photos of them, this app
              for decluttering uses AI to help you easily identify and list
              belongings.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Set Decluttering Deadlines
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Assign deadlines to declutter specific items. We&apos;ll remind
              you when it&apos;s time to decide.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Track Your Progress
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor your decluttering journey with progress reports. As the
              leading app for decluttering, we help you celebrate your steps
              toward a clutter-free home.
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
          <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
            {/* Free Plan Container */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-xl p-8 border">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Get Started for
              </h3>
              <div className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                FREE
              </div>
              <ul className="space-y-4 mb-8 text-gray-600 dark:text-gray-400">
                <li>Declutter up to 15 items</li>
                <li>3 photo analyses per month</li>
                <li>Set deadlines and get email reminders</li>
              </ul>
              <Link href="/signup">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg text-lg transition-colors duration-200 w-full sm:w-auto">
                  Get Started
                </button>
              </Link>
            </div>

            {/* Premium Plan Container */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-xl p-8 border">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Premium Plan
              </h3>
              <div className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                $3/month
              </div>
              <ul className="space-y-4 mb-8 text-gray-600 dark:text-gray-400">
                <li>Declutter up to 2000 items</li>
                <li>10 photo analyses per month</li>
                <li>Set deadlines and get email reminders</li>
                <li>Personalized decluttering insights</li>
              </ul>
              <Link href="/signup">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg text-lg transition-colors duration-200 w-full sm:w-auto">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-8">
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-600 text-lg transition-colors duration-200"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800 dark:text-gray-200">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                How is this different from other decluttering apps?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Unlike other solutions that just teach you how to declutter your
                home, our app for decluttering focuses specifically on helping
                you make decisions about items you&apos;re unsure about. Instead
                of just organizing everything, we help you determine what truly
                deserves space in your life through our unique deadline-based
                approach.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                Will this really help me declutter?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! We don&apos;t just show you how to declutter your home - we
                combine psychological insights with practical tools. By setting
                concrete deadlines and tracking your usage of items, you&apos;ll
                make more informed decisions about what to keep or let go.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                Why I didn&apos;t receive notification emails when my items are
                due?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                It might be because your email provider mistakenly spammed our
                email. Please look for them in the spam folder. If problem
                persists, please contact us for further assistance.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                What if I&apos;m not satisfied?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We offer a 30-day money-back guarantee. If you&apos;re not
                completely satisfied, just let us know and we&apos;ll refund
                your subscription fee.
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
