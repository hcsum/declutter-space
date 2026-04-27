import React from "react";
import type { Metadata } from "next";
import getDictionary from "@/i18n/getDictionary";
import { isValidLocale, defaultLocale } from "@/i18n/config";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  robots: { index: false },
};

const PrivacyPolicy = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);
  const p = dict.privacy;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">{p.title}</h1>

        <p className="text-lg mb-4">
          At <span className="font-bold">DeclutterYourHome</span>, we are
          committed to protecting your privacy and ensuring the security of your
          personal information. This Privacy Policy outlines how we collect,
          use, and safeguard your data when you use our web app and services.
        </p>

        <h2 className="text-2xl font-semibold mb-4">{p.infoWeCollect}</h2>

        <h3 className="text-xl font-semibold mb-2">{p.infoYouProvide}</h3>
        <ul className="list-disc list-inside mb-6">
          <li>
            <strong>Account Information:</strong> {p.accountInfo}
          </li>
          <li>
            <strong>Uploaded Content:</strong> {p.uploadedContent}
          </li>
          <li>
            <strong>Payment Information:</strong> {p.paymentInfo}
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">{p.infoAutoCollect}</h3>
        <ul className="list-disc list-inside mb-6">
          <li>
            <strong>Usage Data:</strong> {p.usageData}
          </li>
          <li>
            <strong>Device Data:</strong> {p.deviceData}
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">{p.howWeUse}</h2>
        <ul className="list-disc list-inside mb-6">
          <li>
            <strong>To Provide Services:</strong> {p.toProvide}
          </li>
          <li>
            <strong>To Communicate:</strong> {p.toCommunicate}
          </li>
          <li>
            <strong>To Improve Our Services:</strong> {p.toImprove}
          </li>
          <li>
            <strong>To Ensure Security:</strong> {p.toSecurity}
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">{p.sharing}</h2>
        <p className="mb-6">{p.sharingIntro}</p>
        <ul className="list-disc list-inside mb-6">
          <li>
            <strong>Service Providers:</strong> {p.serviceProviders}
          </li>
          <li>
            <strong>Legal Obligations:</strong> {p.legalObligations}
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">{p.dataRetention}</h2>
        <p className="mb-6">
          We retain your data for as long as necessary to provide our services
          and comply with legal obligations. You can request deletion of your
          data by contacting us at:{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-blue-500 hover:underline"
          >
            {contactEmail}
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mb-4">{p.yourRights}</h2>
        <ul className="list-disc list-inside mb-6">
          <li>{p.right1}</li>
          <li>{p.right2}</li>
          <li>{p.right3}</li>
        </ul>
        <p className="mb-6">
          To exercise these rights, contact us at:{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-blue-500 hover:underline"
          >
            {contactEmail}
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mb-4">{p.security}</h2>
        <p className="mb-6">{p.securityDesc}</p>

        <h2 className="text-2xl font-semibold mb-4">{p.changes}</h2>
        <p className="mb-6">{p.changesDesc}</p>

        <h2 className="text-2xl font-semibold mb-4">{p.contactUs}</h2>
        <p className="mb-6">
          For questions or concerns about this Privacy Policy, please contact us
          at:{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-blue-500 hover:underline"
          >
            {contactEmail}
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
