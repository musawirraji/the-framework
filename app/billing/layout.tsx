import { requirePhotographer } from "@/lib/auth";
import { AppShell } from "@/features/app-shell/ui/AppShell";

export default async function BillingLayout({ children }: { children: React.ReactNode }) {
  const me = await requirePhotographer();
  return <AppShell photographerName={me.business_name || me.full_name || me.email}>{children}</AppShell>;
}
