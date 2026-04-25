import React from "react";
import type { Metadata } from "next";
import getDictionary from "@/i18n/getDictionary";
import { isValidLocale, defaultLocale } from "@/i18n/config";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  robots: { index: false },
};

const RefundPolicy = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);
  const c = dict.customerService;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">{c.title}</h1>

        <p className="text-lg mb-4">
          At <span className="font-bold">DeclutterSpace</span>, we value your
          satisfaction and strive to provide a seamless and enjoyable
          experience. This Refund and Dispute Policy outlines the process for
          refunds and resolving disputes related to our services.
        </p>

        <h2 className="text-2xl font-semibold mb-4">{c.refundEligibility}</h2>
        <ul className="list-disc list-inside mb-6">
          <li>{c.refund1}</li>
          <li>{c.refund2}</li>
          <li>{c.refund3}</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">{c.nonRefundable}</h2>
        <p className="mb-6">{c.nonRefundableDesc}</p>

        <h2 className="text-2xl font-semibold mb-4">{c.refundProcess}</h2>
        <ol className="list-decimal list-inside mb-6">
          <li>
            Submit your refund request by emailing us at{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="text-blue-500 hover:underline"
            >
              {contactEmail}
            </a>{" "}
            with the subject line &ldquo;Refund Request.&rdquo;
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

        <h2 className="text-2xl font-semibold mb-4">{c.disputeResolution}</h2>
        <p className="mb-6">{c.disputeIntro}</p>
        <ol className="list-decimal list-inside mb-6">
          <li>
            Contact our support team at{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="text-blue-500 hover:underline"
            >
              {contactEmail}
            </a>{" "}
            and provide details of the issue.
          </li>
          <li>
            If the issue cannot be resolved, you may escalate it to a formal
            dispute through your payment provider.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mb-4">{c.contactUs}</h2>
        <p className="mb-6">
          For any questions or concerns regarding this Refund and Dispute
          Policy, please email us at{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-blue-500 hover:underline"
          >
            {contactEmail}
          </a>
          . We&apos;re here to help!
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
