import { notFound } from "next/navigation";
import { getWeddingDetail } from "@/features/weddings/queries";
import { WeddingDetailScreen } from "@/features/weddings/ui/WeddingDetailScreen";
import { publicEnv } from "@/lib/env";

export default async function WeddingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = await getWeddingDetail(id);
  if (!detail) notFound();
  return <WeddingDetailScreen detail={detail} appUrl={publicEnv.NEXT_PUBLIC_APP_URL} />;
}
