import type { ErrorCode } from "./result";

/** Typed error hierarchy — thrown internally, normalised at the edge. */
export class AppError extends Error {
  code: ErrorCode;
  fields?: Record<string, string[]>;
  constructor(message: string, code: ErrorCode = "INTERNAL", fields?: Record<string, string[]>) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.fields = fields;
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "You must be signed in to do that.") {
    super(message, "UNAUTHORIZED");
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "You do not have access to this resource.") {
    super(message, "FORBIDDEN");
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found.") {
    super(message, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class ValidationError extends AppError {
  constructor(message = "Please check the form for errors.", fields?: Record<string, string[]>) {
    super(message, "VALIDATION", fields);
    this.name = "ValidationError";
  }
}
