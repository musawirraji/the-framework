import { notFound } from "next/navigation";
import { getPortalData } from "@/features/portal/queries";
import { PortalScreen } from "@/features/portal/ui/PortalScreen";

export const metadata = { title: "Your wedding timeline" };
export const dynamic = "force-dynamic";

export default async function PortalPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const data = await getPortalData(token);
  if (!data) notFound();
  return <PortalScreen data={data} />;
}
