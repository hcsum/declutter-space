"use client";

import { sendContactEmail } from "@/actions/contact";
import { useActionState, useEffect } from "react";
import { useSnackbarState } from "./SnackbarProvider";
import { useI18n } from "@/i18n/i18n-provider";

const ContactForm = () => {
  const [state, formAction, pending] = useActionState(sendContactEmail, {
    status: "",
  });
  const { setSnackBarContent } = useSnackbarState();
  const { t } = useI18n();

  useEffect(() => {
    const { status } = state;
    if (status === "SUCCESS") {
      setSnackBarContent({
        message: t("contact.emailSentSuccess"),
        level: "success",
      });
    } else if (status === "ERROR") {
      setSnackBarContent({
        message: t("contact.emailSentError"),
        level: "error",
      });
    } else if (status === "SUBMITTED") {
      setSnackBarContent({
        message: t("contact.alreadySubmitted"),
        level: "info",
      });
    }
  }, [state, setSnackBarContent, t]);

  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900" id="contact">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {t("contact.title")}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
          {t("contact.subtitle")}
        </p>
        <form className="space-y-6" action={formAction}>
          <div>
            <input
              name="name"
              type="text"
              placeholder={t("contact.namePlaceholder")}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            {state.errors?.name?._errors && (
              <p className="text-amber-600 dark:text-amber-400 text-sm mt-1 text-left">
                {state.errors.name._errors.join(", ")}
              </p>
            )}
          </div>
          <div>
            <input
              name="email"
              type="email"
              placeholder={t("contact.emailPlaceholder")}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            {state.errors?.email?._errors && (
              <p className="text-amber-600 dark:text-amber-400 text-sm mt-1 text-left">
                {state.errors.email._errors.join(", ")}
              </p>
            )}
          </div>
          <div>
            <textarea
              name="message"
              placeholder={t("contact.messagePlaceholder")}
              rows={4}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            ></textarea>
            {state.errors?.message?._errors && (
              <p className="text-amber-600 dark:text-amber-400 text-sm mt-1 text-left">
                {state.errors.message._errors.join(", ")}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={pending}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? t("contact.sending") : t("contact.send")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
