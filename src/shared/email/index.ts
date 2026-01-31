import { resend, emailConfig } from "../config/resend";
import { errorResponse } from "../infra/http/api-response";
import { STATUS_CODES } from "../infra/http/status-codes";

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  const { data, error } = await resend.emails.send({
    from: emailConfig.from,
    to,
    subject,
    html,
    text,
  });

  if (error) {
    return errorResponse(
      `Failed to send email: ${error.message}`,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
    );
  }

  return data;
}
