import brevo, { TransactionalEmailsApiApiKeys } from "@getbrevo/brevo";

export class BrevoAdapter {
  private apiInstance: brevo.TransactionalEmailsApi;
  private static instance: BrevoAdapter;

  private constructor() {
    this.apiInstance = new brevo.TransactionalEmailsApi();
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

    const sendSmtpEmail = new brevo.SendSmtpEmail();

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
}
