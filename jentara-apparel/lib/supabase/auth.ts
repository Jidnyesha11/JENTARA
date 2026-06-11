import { supabase } from "./client";

export async function signUp(
  email: string,
  password: string
) {
  return supabase.auth.signUp({
    email,
    password,
  });
}

export async function signIn(
  email: string,
  password: string
) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo:
        "http://localhost:3000/profile",
    },
  });
}

export async function sendOtp(
  phone: string
) {
  return supabase.auth.signInWithOtp({
    phone,
  });
}

export async function verifyOtp(
  phone: string,
  token: string
) {
  return supabase.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  });
}