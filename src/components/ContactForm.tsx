"use client";

import { sendContactEmail } from "@/actions/contact";
import { useActionState, useEffect } from "react";
import { useSnackbarState } from "./SnackbarProvider";

const ContactForm = () => {
  const [state, formAction, pending] = useActionState(sendContactEmail, {
    status: "",
  });
  const { setSnackBarContent } = useSnackbarState();

  useEffect(() => {
    const { status } = state;
    if (status === "SUCCESS") {
      setSnackBarContent({
        message: "Email sent successfully",
        level: "success",
      });
    } else if (status === "ERROR") {
      setSnackBarContent({
        message: "Email failed to send",
        level: "error",
      });
    } else if (status === "SUBMITTED") {
      setSnackBarContent({
        message: "You have already submitted the form",
        level: "info",
      });
    }
  }, [state, setSnackBarContent]);

  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900" id="contact">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
          Have questions or feedback? We&apos;d love to hear from you. Reach out
          to us anytime.
        </p>
        <form className="space-y-6" action={formAction}>
          <div>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
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
              placeholder="Your Email"
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
              placeholder="Your Message"
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
            {pending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
