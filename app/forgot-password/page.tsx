import Link from "next/link";
import { AuthScreen } from "@/features/auth/ui/AuthScreen";
import { ForgotPasswordForm } from "@/features/auth/ui/ForgotPasswordForm";

export const metadata = { title: "Reset password · The Framework" };

export default function ForgotPasswordPage() {
  return (
    <AuthScreen
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link."
      footer={<>Remembered it? <Link href="/login">Back to log in</Link></>}
    >
      <ForgotPasswordForm />
    </AuthScreen>
  );
}
