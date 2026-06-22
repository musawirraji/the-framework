"use client";
import { useActionState } from "react";
import { updatePasswordAction, type AuthState } from "../actions";
import { Field } from "./Field";
import { SubmitButton } from "./SubmitButton";
import styles from "./AuthForm.module.scss";

export function ResetPasswordForm() {
  const [state, action] = useActionState<AuthState, FormData>(updatePasswordAction, null);
  const fe = state && !state.success ? state.error.fields ?? {} : {};
  return (
    <form action={action} className={styles.form}>
      <Field label="New password" name="password" type="password" required autoComplete="new-password" errors={fe.password} />
      {state && !state.success && state.error.code !== "VALIDATION" && (
        <p className={styles.formErr}>{state.error.message}</p>
      )}
      <SubmitButton label="Set new password" pending="Saving…" />
    </form>
  );
}
