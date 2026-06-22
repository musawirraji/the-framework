import Link from "next/link";
import { AuthScreen } from "@/features/auth/ui/AuthScreen";
import { SignInForm } from "@/features/auth/ui/SignInForm";

export const metadata = { title: "Log in · The Framework" };

export default function LoginPage() {
  return (
    <AuthScreen
      title="Welcome back"
      subtitle="Log in to your studio dashboard."
      footer={<><Link href="/forgot-password">Forgot password?</Link> · New here? <Link href="/signup">Create an account</Link></>}
    >
      <SignInForm />
    </AuthScreen>
  );
}
