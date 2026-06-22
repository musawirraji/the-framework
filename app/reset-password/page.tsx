import Link from "next/link";
import { AuthScreen } from "@/features/auth/ui/AuthScreen";
import { ResetPasswordForm } from "@/features/auth/ui/ResetPasswordForm";

export const metadata = { title: "Choose a new password · The Framework" };

export default function ResetPasswordPage() {
  return (
    <AuthScreen
      title="Choose a new password"
      subtitle="Set a new password for your studio account."
      footer={<>Changed your mind? <Link href="/login">Back to log in</Link></>}
    >
      <ResetPasswordForm />
    </AuthScreen>
  );
}
