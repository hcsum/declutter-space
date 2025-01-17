import React from "react";
import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      {/* Main Content */}
      <section className="bg-white dark:bg-gray-800 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Simplify Your Life, Clear Your Mind
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
            Experience the power of minimalism by decluttering your space. Let
            go of the unnecessary and make room for peace and clarity.
          </p>
          <Link href="/login">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition">
              Start Now
            </button>
          </Link>
        </div>
        <div className="mt-10">
          <Image
            width={400}
            height={600}
            className="h-auto w-full max-w-xl mx-auto rounded-lg"
            src="/hero.webp"
            alt="A minimalist illustration symbolizing decluttering and tranquility"
          />
        </div>
      </section>

      {/* https://practicalfamily.org/declutter-deadline-use-it-or-lose-it/ */}
      {/* Get You Thinking Section */}
      <h2 className="max-w-xl mx-auto text-xl md:text-2xl font-semibold my-8 text-gray-800 dark:text-gray-200">
        Every item you own occupies not just physical space, but mental space as
        well. It quietly absorbs your attention and energy, leaving you feeling
        more overwhelmed.
      </h2>
      <div className="flex flex-col items-center text-center p-8 max-w-4xl mx-auto my-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <p className="text-lg md:text-xl font-semibold mb-8 text-gray-800 dark:text-gray-200 italic">
          &quot;It&apos;s not useful now, but I might need it in the
          future.&quot;
        </p>

        <div className="space-y-8">
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                THE PASTA MAKER:
              </span>{" "}
              The one time I used it, it was great! The fresh pasta tasted
              better, it was healthier, and the kids had fun using the machine
              with me. But I haven&apos;t made fresh pasta in over two years. Is
              the pasta maker clutter?
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                THE FORMAL DRESSES:
              </span>{" "}
              These three fancy dresses still look nice on me and I really like
              them. But I haven&apos;t been to a formal occasion in five years.
              Are these dresses clutter?
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                THE BOOKS:
              </span>{" "}
              I would love to read all of these books on my shelf. They would
              certainly help me grow intellectually, emotionally, and
              spiritually. But I still haven&apos;t finished the book I started
              last year. Are these books clutter?
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-xl md:text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-200">
              &quot;Give yourself a Declutter Deadline: Use It or Lose It!&quot;
            </p>

            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  THE PASTA MAKER:
                </span>{" "}
                I have three months to make home-made pasta at least once. If I
                can&apos;t find the time, if I don&apos;t have the energy, or if
                I simply don&apos;t care enough to follow through, that&apos;s
                okay! I will say goodbye to the pasta maker and enjoy the extra
                cabinet space.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  THE FORMAL DRESSES:
                </span>{" "}
                My husband and I have six months to do something fancy enough
                for me to wear one of these dresses. If it&apos;s too expensive,
                or if we decide would have more fun doing something more casual,
                that&apos;s okay! I will choose my favorite dress (just in
                case), let go of the others, and enjoy the extra closet space.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  THE BOOKS:
                </span>{" "}
                I have three months to finish the book I&apos;m currently
                reading. If I don&apos;t have the time, the mental energy, and
                the motivation to finish one book, that&apos;s okay! I will
                choose my top three books, let the rest go, and enjoy the extra
                shelf space.
              </p>
            </div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg block mt-2">
          - PracticalFamily.org
        </p>
      </div>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900" id="features">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            How It Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-12">
            Our tool helps you take charge of your possessions and start your
            decluttering journey with ease.
          </p>
        </div>
        <div className="space-y-12 max-w-3xl mx-auto">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Identify Your Possessions
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Use AI-powered photo analysis to categorize and quantify the items
              in your home. Gain a clear overview of what you own and see where
              your clutter accumulates.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Set Timeframes for Decision Making
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Define deadlines for items—decide whether to keep, donate, or
              discard. The time constraints help you make clear decisions and
              minimize the mental burden.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Track Your Progress Over Time
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Visualize your decluttering progress and stay motivated as you
              transform your space. With each step, you’ll feel lighter and more
              at peace.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section
        className="bg-blue-500 py-16 px-6 text-center text-white"
        id="cta"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Simplify?
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Start your decluttering journey today and experience the freedom of
            minimalism.
          </p>
          <Link href="/main">
            <button className="bg-white text-blue-500 px-6 py-3 rounded-lg text-lg hover:bg-gray-100 transition">
              Get Started Now
            </button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900" id="contact">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Have questions or feedback? We’d love to hear from you. Reach out to
            us anytime.
          </p>
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
