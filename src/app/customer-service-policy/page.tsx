import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false },
};

const RefundPolicy = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Customer Service Policy
        </h1>

        <p className="text-lg mb-4">
          At <span className="font-bold">DeclutterSpace</span>, we value your
          satisfaction and strive to provide a seamless and enjoyable
          experience. This Refund and Dispute Policy outlines the process for
          refunds and resolving disputes related to our services.
        </p>

        <h2 className="text-2xl font-semibold mb-4">1. Refund Eligibility</h2>
        <ul className="list-disc list-inside mb-6">
          <li>
            Refunds are available for subscription-based services if requested
            within 14 days of the original purchase, provided you have not
            extensively used the service.
          </li>
          <li>
            If a technical issue occurs and we are unable to resolve it within a
            reasonable timeframe, you may be eligible for a refund.
          </li>
          <li>
            Refunds are not available for services already rendered or
            completed.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">2. Non-Refundable Items</h2>
        <p className="mb-6">
          Certain purchases, such as one-time downloadable content or special
          promotions, are non-refundable. These items will be clearly marked at
          the time of purchase.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          3. Refund Request Process
        </h2>
        <ol className="list-decimal list-inside mb-6">
          <li>
            Submit your refund request by emailing us at{" "}
            <a
              href="mailto:hi@declutterspace.net"
              className="text-blue-500 hover:underline"
            >
              hi@declutterspace.net
            </a>{" "}
            with the subject line “Refund Request.”
          </li>
          <li>
            Include your name, email address, and proof of purchase in the email
            body.
          </li>
          <li>
            Our team will review your request and respond within 5-7 business
            days.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mb-4">4. Dispute Resolution</h2>
        <p className="mb-6">
          If you are dissatisfied with our service, we encourage you to contact
          us to resolve the issue before filing a dispute. We are committed to
          finding a solution that works for you.
        </p>
        <ol className="list-decimal list-inside mb-6">
          <li>
            Contact our support team at{" "}
            <a
              href="mailto:hi@declutterspace.net"
              className="text-blue-500 hover:underline"
            >
              hi@declutterspace.net
            </a>{" "}
            and provide details of the issue.
          </li>
          <li>
            If the issue cannot be resolved, you may escalate it to a formal
            dispute through your payment provider.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
        <p className="mb-6">
          For any questions or concerns regarding this Refund and Dispute
          Policy, please email us at{" "}
          <a
            href="mailto:hi@declutterspace.net"
            className="text-blue-500 hover:underline"
          >
            hi@declutterspace.net
          </a>
          . We’re here to help!
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
