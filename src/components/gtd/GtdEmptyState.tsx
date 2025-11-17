import { Inbox, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface GtdEmptyStateProps {
  icon?: "inbox" | "actions" | "list";
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function GtdEmptyState({
  icon = "list",
  title,
  description,
  action,
  className,
}: GtdEmptyStateProps) {
  const Icon = icon === "inbox" ? Inbox : FileText;

  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center",
        className
      )}
    >
      <div className="bg-muted/50 mb-4 flex size-20 items-center justify-center rounded-full">
        <Icon className="text-muted-foreground size-10" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-4 max-w-sm text-sm">
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
