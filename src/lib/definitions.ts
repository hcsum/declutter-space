import { z } from "zod";
import { JWTPayload } from "jose";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
});

export const ResetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
    confirmPassword: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type AuthFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      formData?: {
        name?: string;
        email?: string;
      };
      message?: string;
      errmsg?: string;
    }
  | undefined;

export type ItemFormState =
  | {
      errors?: {
        name?: string[];
        pieces?: string[];
        deadline?: string[];
      };
    }
  | undefined;

export interface SessionPayload extends JWTPayload {
  userId: string;
}

export const MAX_FILE_SIZE_ALLOWED_MB = 15;
export const MAX_FILE_SIZE_FOR_UPLOAD_MB = 0.5;
export const FREE_TRAIL_IMAGE_ANALYSIS_COUNT_PER_MONTH = 3;
export const MEMBERSHIP_IMAGE_ANALYSIS_COUNT_PER_MONTH = 10;
export const MEMBERSHIP_PRICE = 2;
export const FREE_TRAIL_ITEMS_LIMIT = 30;
export const MEMBERSHIP_ITEMS_LIMIT = 3000;

export const ERROR_FREE_TRAIL_ITEM_LIMIT =
  "Free trail items limit reached. To add more items, please consider joining membership.";
