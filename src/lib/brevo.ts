import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
  SendSmtpEmail,
} from "@getbrevo/brevo";
import { Item, Prisma } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

export class BrevoAdapter {
  private apiInstance: TransactionalEmailsApi;
  private static instance: BrevoAdapter;

  private constructor() {
    this.apiInstance = new TransactionalEmailsApi();
    this.apiInstance.setApiKey(
      TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY!,
    );
  }

  public static getInstance(): BrevoAdapter {
    if (!BrevoAdapter.instance) {
      BrevoAdapter.instance = new BrevoAdapter();
    }
    return BrevoAdapter.instance;
  }

  async sendGuestSubmittedEmail(formData: FormData) {
    const guestName = formData.get("name");
    const guestEmail = formData.get("email");
    const guestMessage = formData.get("message");

    const sendSmtpEmail = new SendSmtpEmail();

    const sender = {
      name: "Declutter Space",
      email: process.env.BREVO_SENDER_EMAIL!,
    };

    const to = {
      email: process.env.BREVO_CONTACT_FORM_SUBMITTED_TO_EMAIL!,
      name: "Admin",
    };

    const htmlContent = `<p>Name: ${guestName}</p><p>Email: ${guestEmail}</p><p>Message: ${guestMessage}</p>`;

    sendSmtpEmail.subject = `New Contact Form Submission from ${guestEmail}`;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = sender;
    sendSmtpEmail.to = [to];
    sendSmtpEmail.replyTo = sender;

    return this.apiInstance
      .sendTransacEmail(sendSmtpEmail)
      .then(function (data) {
        console.log(
          "API called successfully. Returned data: " + JSON.stringify(data),
        );
      });
  }

  async sendItemDeadlineReachedEmail({
    items,
    user,
  }: {
    items: Item[];
    user: Prisma.UserGetPayload<{ select: { email: true; name: true } }>;
  }) {
    if (items.length === 0) {
      return;
    }

    const item = items[0];

    const sendSmtpEmail = new SendSmtpEmail();

    const sender = {
      name: "Declutter Space",
      email: process.env.BREVO_SENDER_EMAIL!,
    };

    const to = {
      email: user.email,
      name: user.name,
    };

    const relativeTime = formatDistanceToNow(item.startDate);

    sendSmtpEmail.subject = `Hi ${user.name}, have you used ${item.name} in the pass ${relativeTime}?`;
    sendSmtpEmail.htmlContent = `<p>This email is to remind you that, ${relativeTime} ago, you set a deadline for ${item.name}</p>`;
    if (items.length > 1) {
      sendSmtpEmail.htmlContent += `<p>Along with other items, </p>`;
      for (const item of items.slice(1)) {
        sendSmtpEmail.htmlContent += `<p>${item.name},</p>`;
      }
    }
    sendSmtpEmail.htmlContent += `<p>If you haven't used them, maybe it is time to let go, reclaim your space and have a peace of mind.</p>`;
    sendSmtpEmail.htmlContent += `<p>Please take a moment to review your items and decide what to do with them.</p>`;
    sendSmtpEmail.sender = sender;
    sendSmtpEmail.to = [to];
    sendSmtpEmail.replyTo = sender;

    return this.apiInstance.sendTransacEmail(sendSmtpEmail);
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const sendSmtpEmail = new SendSmtpEmail();

    const sender = {
      name: "Declutter Space",
      email: process.env.BREVO_SENDER_EMAIL!,
    };

    const to = {
      email: email,
      name: "DeclutterSpace User",
    };

    sendSmtpEmail.subject = "Password Reset Request";
    sendSmtpEmail.htmlContent = `<p>Click <a href="${process.env.SITE_URL}/forgot-password?token=${token}">here</a> to reset your password.</p>`;
    sendSmtpEmail.htmlContent += `<p>The link will expire in 1 hour.</p>`;
    sendSmtpEmail.htmlContent += `<p>If you did not request a password reset, please ignore this email.</p>`;
    sendSmtpEmail.sender = sender;
    sendSmtpEmail.to = [to];
    sendSmtpEmail.replyTo = sender;

    return this.apiInstance.sendTransacEmail(sendSmtpEmail);
  }
}
