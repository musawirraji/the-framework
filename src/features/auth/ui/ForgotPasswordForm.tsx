"use client";
import { useActionState } from "react";
import { requestPasswordResetAction, type AuthState } from "../actions";
import { Field } from "./Field";
import { SubmitButton } from "./SubmitButton";
import styles from "./AuthForm.module.scss";

export function ForgotPasswordForm() {
  const [state, action] = useActionState<AuthState, FormData>(requestPasswordResetAction, null);
  const fe = state && !state.success ? state.error.fields ?? {} : {};

  if (state && state.success) {
    return <p className={styles.formErr} style={{ color: "inherit", background: "rgba(95,107,82,.1)", borderColor: "rgba(95,107,82,.3)" }}>
      {state.data.message}
    </p>;
  }
  return (
    <form action={action} className={styles.form}>
      <Field label="Email" name="email" type="email" required autoComplete="email" errors={fe.email} />
      <SubmitButton label="Send reset link" pending="Sending…" />
    </form>
  );
}
