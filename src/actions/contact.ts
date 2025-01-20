"use server";
import { BrevoAdapter } from "@/lib/brevo";

const brevo = BrevoAdapter.getInstance();

export const sendContactEmail = async (
  preState: { status: string },
  formData: FormData,
) => {
  if (preState.status) {
    return { status: "SUBMITTED" };
  }

  try {
    await brevo.sendGuestSubmittedEmail(formData);
    return { status: "SUCCESS" };
  } catch (error) {
    console.error(error);
    return { status: "ERROR" };
  }
};
