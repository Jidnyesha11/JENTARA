// lib/email/resend.ts

import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  throw new Error(
    "RESEND_API_KEY is not configured. Add it to .env.local for local development or Vercel Environment Variables for production.",
  );
}

export const resend = new Resend(apiKey);

export const resendFrom =
  process.env.RESEND_FROM_EMAIL || "JENTARA <onboarding@resend.dev>";