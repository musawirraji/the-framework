import Link from "next/link";
import { AuthScreen } from "@/features/auth/ui/AuthScreen";
import { SignUpForm } from "@/features/auth/ui/SignUpForm";

export const metadata = { title: "Create account · The Framework" };

export default function SignupPage() {
  return (
    <AuthScreen
      title="Claim your founding seat"
      subtitle="Free during the private beta. No card required."
      footer={<>Already have an account? <Link href="/login">Log in</Link></>}
    >
      <SignUpForm />
    </AuthScreen>
  );
}
