"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Inbox,
  CheckSquare,
  FolderKanban,
  MapPin,
  Target,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/LogoutButton";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { href: "/gtd", label: "Dashboard", icon: LayoutDashboard },
  { href: "/gtd/inbox", label: "Inbox", icon: Inbox },
  { href: "/gtd/actions", label: "Actions", icon: CheckSquare },
  { href: "/gtd/projects", label: "Projects", icon: FolderKanban },
  { href: "/gtd/contexts", label: "Contexts", icon: MapPin },
  { href: "/gtd/areas-of-focus", label: "Areas", icon: Target },
];

export function GtdNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto flex gap-1 overflow-x-auto px-4 py-2 items-center justify-between">
        <div className="flex gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="flex gap-2">
          <LogoutButton />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
