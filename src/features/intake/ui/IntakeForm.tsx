"use client";
import { useActionState } from "react";
import { submitIntakeAction, type IntakeState } from "../actions";
import { Field } from "@/features/auth/ui/Field";
import { SubmitButton } from "@/features/auth/ui/SubmitButton";
import styles from "./IntakeScreen.module.scss";

export function IntakeForm({ token }: { token: string }) {
  const action = submitIntakeAction.bind(null, token);
  const [state, formAction] = useActionState<IntakeState, FormData>(action, null);
  const fe = state && !state.success ? state.error.fields ?? {} : {};

  if (state && state.success) {
    return (
      <div className={styles.done}>
        <div className={styles.check} aria-hidden>✓</div>
        <h2>All set — thank you!</h2>
        <p>Your photographer has everything they need to build your day. You&apos;ll get a link to your timeline soon.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.row}>
        <Field label="Ceremony start time" name="ceremonyTime" placeholder="16:00" required errors={fe.ceremonyTime} />
        <Field label="Sunset time (optional)" name="sunsetTime" placeholder="19:30" errors={fe.sunsetTime} />
      </div>
      <div className={styles.row}>
        <Field label="People getting ready (hair & makeup)" name="gettingReadyPeople" type="number" placeholder="3" errors={fe.gettingReadyPeople} />
        <Field label="Wedding party size" name="weddingPartySize" type="number" placeholder="6" errors={fe.weddingPartySize} />
      </div>
      <fieldset className={styles.checks}>
        <label><input type="checkbox" name="hasFirstLook" /> We&apos;re planning a first look</label>
        <label><input type="checkbox" name="wantsGoldenHour" defaultChecked /> We&apos;d love golden hour portraits</label>
        <label><input type="checkbox" name="familyPhotos" defaultChecked /> We want family photos</label>
      </fieldset>
      <label className={styles.field}>
        <span className={styles.label}>Anything else we should know?</span>
        <textarea className={styles.textarea} name="notes" rows={3} placeholder="Special moments, surprises, must-have shots…" />
      </label>
      {state && !state.success && state.error.code !== "VALIDATION" && (
        <p className={styles.err}>{state.error.message}</p>
      )}
      <SubmitButton label="Send to our photographer" pending="Sending…" />
    </form>
  );
}
