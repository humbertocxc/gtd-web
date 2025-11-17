import { QuickCaptureButton } from "@/components/gtd/QuickCaptureButton";
import { GtdNavigation } from "@/components/gtd/GtdNavigation";

export default function GtdLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <GtdNavigation />
      <main>{children}</main>
      <QuickCaptureButton />
    </div>
  );
}
