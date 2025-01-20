"use client";

import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>

        <p className="text-lg mb-4">
          At <span className="font-bold">DeclutterSpace</span>, we are committed
          to protecting your privacy and ensuring the security of your personal
          information. This Privacy Policy outlines how we collect, use, and
          safeguard your data when you use our web app and services.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          1. Information We Collect
        </h2>

        <h3 className="text-xl font-semibold mb-2">Information You Provide</h3>
        <ul className="list-disc list-inside mb-6">
          <li>
            <strong>Account Information:</strong> When you sign up, we collect
            your name, email address, and password.
          </li>
          <li>
            <strong>Uploaded Content:</strong> Photos or details of your items
            shared through the app.
          </li>
          <li>
            <strong>Payment Information:</strong> If you purchase a subscription
            or service, we collect payment details (processed securely by
            third-party providers).
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          Information We Collect Automatically
        </h3>
        <ul className="list-disc list-inside mb-6">
          <li>
            <strong>Usage Data:</strong> Information about how you interact with
            our app, such as pages visited and features used.
          </li>
          <li>
            <strong>Device Data:</strong> Information about the device you use,
            including IP address, browser type, and operating system.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside mb-6">
          <li>
            <strong>To Provide Services:</strong> To operate and improve our
            app, process transactions, and manage your account.
          </li>
          <li>
            <strong>To Communicate:</strong> To send updates, respond to
            inquiries, and provide customer support.
          </li>
          <li>
            <strong>To Improve Our Services:</strong> To analyze usage data and
            enhance app functionality.
          </li>
          <li>
            <strong>To Ensure Security:</strong> To detect and prevent
            fraudulent or unauthorized activities.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          3. Sharing Your Information
        </h2>
        <p className="mb-6">
          We do not sell or rent your personal information. However, we may
          share your data with:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>
            <strong>Service Providers:</strong> Trusted third parties that
            assist with app functionality, payment processing, and customer
            support.
          </li>
          <li>
            <strong>Legal Obligations:</strong> When required by law or to
            protect the rights and safety of our users.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">4. Data Retention</h2>
        <p className="mb-6">
          We retain your data for as long as necessary to provide our services
          and comply with legal obligations. You can request deletion of your
          data by contacting us at:
          <a
            href="mailto:hi@declutterspace.net"
            className="text-blue-500 hover:underline"
          >
            {" "}
            hi@declutterspace.net
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Access, update, or delete your personal information.</li>
          <li>Opt-out of marketing communications.</li>
          <li>Request a copy of your data in a portable format.</li>
        </ul>
        <p className="mb-6">
          To exercise these rights, contact us at:
          <a
            href="mailto:hi@declutterspace.net"
            className="text-blue-500 hover:underline"
          >
            {" "}
            hi@declutterspace.net
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mb-4">6. Security</h2>
        <p className="mb-6">
          We implement industry-standard security measures to protect your data.
          However, no method of transmission or storage is 100% secure. Please
          use our services at your discretion.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          7. Changes to This Policy
        </h2>
        <p className="mb-6">
          We may update this policy periodically. Changes will be effective
          immediately upon posting. Please review this policy regularly to stay
          informed.
        </p>

        <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
        <p className="mb-6">
          For questions or concerns about this Privacy Policy, please contact us
          at:
          <a
            href="mailto:hi@declutterspace.net"
            className="text-blue-500 hover:underline"
          >
            {" "}
            hi@declutterspace.net
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
