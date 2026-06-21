"use client";
import { useActionState } from "react";
import { signUpAction, type AuthState } from "../actions";
import { Field } from "./Field";
import { SubmitButton } from "./SubmitButton";
import styles from "./AuthForm.module.scss";

export function SignUpForm() {
  const [state, action] = useActionState<AuthState, FormData>(signUpAction, null);
  const fe = state && !state.success ? state.error.fields ?? {} : {};
  return (
    <form action={action} className={styles.form}>
      <Field label="Your name" name="fullName" required autoComplete="name" errors={fe.fullName} />
      <Field label="Studio / business name" name="businessName" placeholder="Optional" errors={fe.businessName} />
      <Field label="Email" name="email" type="email" required autoComplete="email" errors={fe.email} />
      <Field label="Password" name="password" type="password" required autoComplete="new-password" errors={fe.password} />
      {state && !state.success && state.error.code !== "VALIDATION" && (
        <p className={styles.formErr}>{state.error.message}</p>
      )}
      <SubmitButton label="Create account" pending="Creating…" />
    </form>
  );
}
