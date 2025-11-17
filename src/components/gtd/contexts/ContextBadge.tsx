import { cn } from "@/lib/utils";

interface ContextBadgeProps {
  name: string;
  className?: string;
}

export function ContextBadge({ name, className }: ContextBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30",
        className
      )}
    >
      {name}
    </span>
  );
}
