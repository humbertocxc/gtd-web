import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GtdLoadingStateProps {
  className?: string;
  text?: string;
}

export function GtdLoadingState({
  className,
  text = "Loading...",
}: GtdLoadingStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[200px] flex-col items-center justify-center gap-2",
        className
      )}
    >
      <Loader2 className="text-muted-foreground size-8 animate-spin" />
      <p className="text-muted-foreground text-sm">{text}</p>
    </div>
  );
}
