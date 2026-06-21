"use client";
import { useActionState } from "react";
import { signInAction, type AuthState } from "../actions";
import { Field } from "./Field";
import { SubmitButton } from "./SubmitButton";
import styles from "./AuthForm.module.scss";

export function SignInForm() {
  const [state, action] = useActionState<AuthState, FormData>(signInAction, null);
  const fe = state && !state.success ? state.error.fields ?? {} : {};
  return (
    <form action={action} className={styles.form}>
      <Field label="Email" name="email" type="email" required autoComplete="email" errors={fe.email} />
      <Field label="Password" name="password" type="password" required autoComplete="current-password" errors={fe.password} />
      {state && !state.success && state.error.code !== "VALIDATION" && (
        <p className={styles.formErr}>{state.error.message}</p>
      )}
      <SubmitButton label="Log in" pending="Signing in…" />
    </form>
  );
}
