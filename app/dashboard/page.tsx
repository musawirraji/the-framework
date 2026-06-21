import { listWeddings } from "@/features/weddings/queries";
import { DashboardScreen } from "@/features/weddings/ui/DashboardScreen";

export const metadata = { title: "Dashboard · The Framework" };

export default async function DashboardPage() {
  const weddings = await listWeddings();
  return <DashboardScreen weddings={weddings} />;
}
