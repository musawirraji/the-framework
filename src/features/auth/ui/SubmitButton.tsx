"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/shared/ui/Button/Button";

export function SubmitButton({ label, pending }: { label: string; pending: string }) {
  const { pending: isPending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={isPending} style={{ width: "100%" }}>
      {isPending ? pending : label}
    </Button>
  );
}
