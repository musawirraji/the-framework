import { notFound } from "next/navigation";
import { getWeddingByIntakeToken } from "@/features/intake/queries";
import { IntakeScreen } from "@/features/intake/ui/IntakeScreen";
import { hasSupabaseEnv } from "@/lib/env";

export const metadata = { title: "Your wedding intake · The Framework" };
export const dynamic = "force-dynamic";

export default async function IntakePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const wedding = await getWeddingByIntakeToken(token);

  // In local/dev without service env, render a friendly preview instead of 404.
  if (!wedding) {
    if (!hasSupabaseEnv) {
      return <IntakeScreen token={token} coupleNames="Your Wedding" venue="Connect Supabase to load this couple" />;
    }
    notFound();
  }

  return (
    <IntakeScreen
      token={token}
      coupleNames={`${wedding.partner_one} & ${wedding.partner_two}`}
      venue={wedding.venue_name}
    />
  );
}
