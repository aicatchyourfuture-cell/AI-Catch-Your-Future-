import nodemailer, { type Transporter } from "nodemailer";
import { logger } from "./logger";

const DEFAULT_TO = "atelier@catchfuture.com";

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
};

function readSmtpConfig(): SmtpConfig | null {
  const host = process.env["SMTP_HOST"];
  const user = process.env["SMTP_USER"];
  const pass = process.env["SMTP_PASS"];
  const from = process.env["MAIL_FROM"] ?? user;
  const to = process.env["MAIL_TO"] ?? DEFAULT_TO;
  const portRaw = process.env["SMTP_PORT"] ?? "587";
  const port = Number(portRaw);

  if (!host || !user || !pass || !from || Number.isNaN(port)) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    user,
    pass,
    from,
    to,
  };
}

let cachedTransporter: Transporter | null = null;
let cachedConfig: SmtpConfig | null = null;

function getTransporter(config: SmtpConfig): Transporter {
  if (cachedTransporter && cachedConfig && cachedConfig.host === config.host) {
    return cachedTransporter;
  }
  cachedTransporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  });
  cachedConfig = config;
  return cachedTransporter;
}

export type InquiryEmailPayload = {
  id: number;
  name: string;
  email: string;
  inquiryType: "lookbook" | "trade" | "general";
  message: string;
  createdAt: Date;
};

const TYPE_LABEL: Record<InquiryEmailPayload["inquiryType"], string> = {
  lookbook: "Lookbook Request",
  trade: "Trade & Wholesale",
  general: "General Correspondence",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderHtml(payload: InquiryEmailPayload): string {
  const messageHtml = escapeHtml(payload.message).replace(/\n/g, "<br/>");
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f4f1eb;font-family:Georgia,serif;color:#182f22;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1eb;padding:32px 0;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #182f2222;">
        <tr><td style="padding:32px 40px 16px;background:#182f22;color:#f4f1eb;">
          <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#a68b4d;">Catch Future · Atelier</p>
          <h1 style="margin:8px 0 0;font-family:Georgia,serif;font-size:26px;font-weight:normal;">A new inquiry has arrived</h1>
        </td></tr>
        <tr><td style="padding:32px 40px;">
          <p style="margin:0 0 6px;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a68b4d;">${escapeHtml(TYPE_LABEL[payload.inquiryType])}</p>
          <p style="margin:0 0 24px;font-family:Georgia,serif;font-size:22px;">${escapeHtml(payload.name)}</p>
          <p style="margin:0 0 4px;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#182f2299;">Reply to</p>
          <p style="margin:0 0 24px;font-family:Helvetica,Arial,sans-serif;font-size:14px;"><a href="mailto:${encodeURIComponent(payload.email)}" style="color:#182f22;">${escapeHtml(payload.email)}</a></p>
          <p style="margin:0 0 4px;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#182f2299;">Message</p>
          <p style="margin:0 0 24px;font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#182f22;">${messageHtml}</p>
          <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#182f2266;">Inquiry #${payload.id} · received ${escapeHtml(payload.createdAt.toUTCString())}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function renderText(payload: InquiryEmailPayload): string {
  return [
    `Catch Future · Atelier`,
    `A new ${TYPE_LABEL[payload.inquiryType]} inquiry has arrived.`,
    ``,
    `Name:    ${payload.name}`,
    `Email:   ${payload.email}`,
    `Type:    ${TYPE_LABEL[payload.inquiryType]}`,
    `Date:    ${payload.createdAt.toUTCString()}`,
    ``,
    `Message:`,
    payload.message,
    ``,
    `Inquiry #${payload.id}`,
  ].join("\n");
}

export async function sendInquiryNotification(
  payload: InquiryEmailPayload,
): Promise<void> {
  const config = readSmtpConfig();
  if (!config) {
    logger.warn(
      { id: payload.id },
      "Inquiry notification skipped: SMTP is not configured (set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO).",
    );
    return;
  }

  const transporter = getTransporter(config);
  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: payload.email,
    subject: `Catch Future · ${TYPE_LABEL[payload.inquiryType]} from ${payload.name}`,
    text: renderText(payload),
    html: renderHtml(payload),
  });
}
