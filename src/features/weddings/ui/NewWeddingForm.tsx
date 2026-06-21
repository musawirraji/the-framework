"use client";
import { useActionState } from "react";
import { createWeddingAction, type WeddingState } from "../actions";
import { Field } from "@/features/auth/ui/Field";
import { SubmitButton } from "@/features/auth/ui/SubmitButton";
import styles from "./NewWeddingForm.module.scss";

export function NewWeddingForm() {
  const [state, action] = useActionState<WeddingState, FormData>(createWeddingAction, null);
  const fe = state && !state.success ? state.error.fields ?? {} : {};
  return (
    <form action={action} className={styles.form}>
      <div className={styles.row}>
        <Field label="Partner one" name="partnerOne" required errors={fe.partnerOne} />
        <Field label="Partner two" name="partnerTwo" required errors={fe.partnerTwo} />
      </div>
      <div className={styles.row}>
        <Field label="Wedding date" name="weddingDate" type="date" errors={fe.weddingDate} />
        <Field label="Package hours" name="packageHours" type="number" placeholder="8" errors={fe.packageHours} />
      </div>
      <Field label="Venue name" name="venueName" placeholder="Oak & Vine Estate" errors={fe.venueName} />
      <Field label="Venue address" name="venueAddress" placeholder="Optional" errors={fe.venueAddress} />
      {state && !state.success && state.error.code !== "VALIDATION" && (
        <p className={styles.err}>{state.error.message}</p>
      )}
      <SubmitButton label="Add wedding" pending="Adding…" />
    </form>
  );
}
