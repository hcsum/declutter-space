import LandingPageHeader from "@/components/LandingPageHeader";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <LandingPageHeader />
      <section className="bg-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Clear the Clutter, Clear Your Mind
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Organize your life by sorting through your belongings, reducing the
            physical and mental burden of clutter, and creating a more peaceful
            space.
          </p>
          <Link href="/product">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition">
              Get Started
            </button>
          </Link>
        </div>
        <div className="mt-10">
          <Image
            width={400}
            height={600}
            className="h-auto w-full max-w-xl mx-auto rounded-lg"
            src="/hero.webp"
            alt="A minimalist illustration representing decluttering and peace"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50" id="features">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Features</h2>
          <p className="text-gray-600 text-lg mb-12">
            Discover how our tool helps you organize, declutter, and reclaim
            your space.
          </p>
        </div>

        <div className="space-y-12 max-w-3xl mx-auto">
          {/* Feature 1 */}
          <div className="text-center">
            <div className="h-48 bg-gray-300 w-full rounded-lg mb-6">
              {/* Placeholder for Feature 1 Image */}
            </div>
            <h3 className="text-2xl font-semibold mb-4">Identify Your Items</h3>
            <p className="text-gray-600">
              Our AI-powered tool analyzes your photos to identify and count all
              your items, giving you a clear overview of your possessions.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center">
            <div className="h-48 bg-gray-300 w-full rounded-lg mb-6">
              {/* Placeholder for Feature 2 Image */}
            </div>
            <h3 className="text-2xl font-semibold mb-4">Set Deadlines</h3>
            <p className="text-gray-600">
              Mark items with deadlines to decide their future—keep, donate, or
              discard. Get notified when deadlines are reached.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center">
            <div className="h-48 bg-gray-300 w-full rounded-lg mb-6">
              {/* Placeholder for Feature 3 Image */}
            </div>
            <h3 className="text-2xl font-semibold mb-4">Stay Organized</h3>
            <p className="text-gray-600">
              Track your progress and see how your decluttering journey unfolds
              over time.
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
          <button className="bg-white text-blue-500 px-6 py-3 rounded-lg text-lg hover:bg-gray-100 transition">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 bg-gray-50" id="contact">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
          <p className="text-gray-600 text-lg mb-8">
            Have questions or feedback? We’d love to hear from you. Reach out to
            us anytime.
          </p>
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-white text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Declutter.zen. All rights
            reserved.
          </p>
          <p className="text-sm mt-2">
            Built with love to help you simplify your life.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
