import { supabase } from "./client";

export interface SignUpMetadata {
  full_name?: string;
  phone?: string;
}

function normalizeIndianPhone(
  phone: string
): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10) {
    return `+91${digits}`;
  }

  if (
    digits.length === 12 &&
    digits.startsWith("91")
  ) {
    return `+${digits}`;
  }

  if (phone.startsWith("+")) {
    return phone;
  }

  return phone;
}

export async function signUp(
  email: string,
  password: string,
  metadata?: SignUpMetadata
) {
  return supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: metadata,
    },
  });
}

export async function signIn(
  email: string,
  password: string
) {
  return supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function signInWithGoogle() {
  if (typeof window === "undefined") {
    throw new Error(
      "Google sign-in must be started in the browser."
    );
  }

  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo:
        `${window.location.origin}/profile`,
    },
  });
}

export async function sendOtp(
  phone: string
) {
  const normalizedPhone =
    normalizeIndianPhone(phone);

  return supabase.auth.signInWithOtp({
    phone: normalizedPhone,
  });
}

export async function verifyOtp(
  phone: string,
  token: string
) {
  const normalizedPhone =
    normalizeIndianPhone(phone);

  return supabase.auth.verifyOtp({
    phone: normalizedPhone,
    token,
    type: "sms",
  });
}

export async function sendPasswordResetEmail(
  email: string
) {
  if (typeof window === "undefined") {
    throw new Error(
      "Password reset must be started in the browser."
    );
  }

  return supabase.auth.resetPasswordForEmail(
    email.trim().toLowerCase(),
    {
      redirectTo:
        `${window.location.origin}/reset-password`,
    }
  );
}
