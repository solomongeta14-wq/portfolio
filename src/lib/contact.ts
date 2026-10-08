/**
 * Contact transport layer.
 *
 * No email provider is configured yet. When `provider` is null the form
 * gracefully falls back to opening the visitor's email app (mailto:).
 *
 * To add a real provider later (EmailJS, Resend, Formspree, a custom
 * Next.js route handler, …) set `provider` and implement the branch in
 * `sendContactMessage`. No UI changes are required.
 */

import { portfolio } from "@/data/portfolio";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type ContactResult = {
  ok: boolean;
  /** Present when the message was handed off to the visitor's email app. */
  mailto?: string;
  error?: string;
};

export const CONTACT_CONFIG: { provider: null | "emailjs" | "resend" | "custom" } = {
  provider: null, // [SET PROVIDER HERE]
};

function buildMailto({ name, email, message }: ContactPayload): string {
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  return `mailto:${portfolio.email}?subject=${subject}&body=${body}`;
}

export async function sendContactMessage(payload: ContactPayload): Promise<ContactResult> {
  if (!CONTACT_CONFIG.provider) {
    // Graceful fallback: hand the message to the visitor's email app.
    return { ok: true, mailto: buildMailto(payload) };
  }

  try {
    // [ADD PROVIDER CALL HERE] e.g.
    // await fetch("/api/contact", { method: "POST", body: JSON.stringify(payload) });
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again or email me directly." };
  }
}
