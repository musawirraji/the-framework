/**
 * A single, consistent response shape for every server action and handler:
 *   { success: true, data } | { success: false, error }
 * Mirrors the convention used across our other products.
 */
export type Ok<T> = { success: true; data: T };
export type Err = { success: false; error: AppErrorShape };

export type Result<T> = Ok<T> | Err;

export type AppErrorShape = {
  message: string;
  code: ErrorCode;
  /** Field-level validation messages, keyed by field name. */
  fields?: Record<string, string[]>;
};

export type ErrorCode =
  | "VALIDATION"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "INTERNAL";

export function ok<T>(data: T): Ok<T> {
  return { success: true, data };
}

export function err(
  message: string,
  code: ErrorCode = "INTERNAL",
  fields?: Record<string, string[]>,
): Err {
  return { success: false, error: { message, code, fields } };
}
