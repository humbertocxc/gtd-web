import { cn } from "@/lib/utils";

interface AreaBadgeProps {
  name: string;
  className?: string;
}

export function AreaBadge({ name, className }: AreaBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30",
        className
      )}
    >
      {name}
    </span>
  );
}
