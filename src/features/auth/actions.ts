"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { publicEnv } from "@/lib/env";
import {
  signInSchema, signUpSchema, resetRequestSchema, passwordUpdateSchema, fieldErrors,
} from "@/lib/validations";
import { ok, err, type Result } from "@/shared/result";

export type AuthState = Result<{ message?: string }> | null;

export async function signUpAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = signUpSchema.safeParse({
    fullName: formData.get("fullName"),
    businessName: formData.get("businessName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return err("Please check the form.", "VALIDATION", fieldErrors(parsed.error));

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${publicEnv.NEXT_PUBLIC_APP_URL}/auth/confirm`,
      data: { full_name: parsed.data.fullName, business_name: parsed.data.businessName || null },
    },
  });
  if (error) return err(error.message, "CONFLICT");
  redirect("/dashboard");
}

export async function signInAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return err("Please check the form.", "VALIDATION", fieldErrors(parsed.error));

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return err("Incorrect email or password.", "UNAUTHORIZED");
  redirect("/dashboard");
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

/** Sends the "Reset password" email (Supabase recovery flow). */
export async function requestPasswordResetAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = resetRequestSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) return err("Enter a valid email.", "VALIDATION", fieldErrors(parsed.error));

  const supabase = await createSupabaseServerClient();
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${publicEnv.NEXT_PUBLIC_APP_URL}/reset-password`,
  });
  // Always succeed (don't reveal whether the email exists).
  return ok({ message: "If that email has an account, a reset link is on its way." });
}

/** Sets a new password for the recovery-authenticated user. */
export async function updatePasswordAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = passwordUpdateSchema.safeParse({ password: formData.get("password") });
  if (!parsed.success) return err("Please check the form.", "VALIDATION", fieldErrors(parsed.error));

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return err("This reset link has expired. Request a new one.", "UNAUTHORIZED");
  redirect("/dashboard");
}
