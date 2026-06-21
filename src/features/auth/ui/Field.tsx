"use client";
import { useState } from "react";
import styles from "./AuthForm.module.scss";
import { IconEye, IconEyeOff } from "@/features/marketing/ui/components/Icons";

export function Field({
  label, name, type = "text", required, placeholder, errors, autoComplete,
}: {
  label: string; name: string; type?: string; required?: boolean;
  placeholder?: string; errors?: string[]; autoComplete?: string;
}) {
  const isPassword = type === "password";
  const [show, setShow] = useState(false);
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <span className={styles.inputWrap}>
        <input
          className={`${styles.input} ${isPassword ? styles.inputPw : ""}`}
          name={name}
          type={inputType}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={errors && errors.length > 0}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
            tabIndex={-1}
          >
            {show ? <IconEyeOff /> : <IconEye />}
          </button>
        )}
      </span>
      {errors?.map((e) => <span key={e} className={styles.err}>{e}</span>)}
    </label>
  );
}
