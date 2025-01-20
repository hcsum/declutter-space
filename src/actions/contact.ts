"use server";
import { BrevoAdapter } from "@/lib/brevo";
import { z } from "zod";

const brevo = BrevoAdapter.getInstance();

const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormState = {
  status: string;
  errors?: z.ZodFormattedError<z.infer<typeof ContactFormSchema>>;
};

export const sendContactEmail = async (
  preState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> => {
  if (preState.status === "SUCCESS") {
    return { status: "SUBMITTED" };
  }

  // Parse and validate form data
  const validationResult = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validationResult.success) {
    return {
      status: "VALIDATION_ERROR",
      errors: validationResult.error.format(),
    };
  }

  try {
    await brevo.sendGuestSubmittedEmail(formData);
    return { status: "SUCCESS" };
  } catch (error) {
    console.error(error);
    return { status: "ERROR" };
  }
};
