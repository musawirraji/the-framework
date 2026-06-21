import { requirePhotographer } from "@/lib/auth";
import { BillingScreen } from "@/features/billing/ui/BillingScreen";

export const metadata = { title: "Billing · The Framework" };

export default async function BillingPage() {
  const me = await requirePhotographer();
  return <BillingScreen currentPlan={me.plan} />;
}
