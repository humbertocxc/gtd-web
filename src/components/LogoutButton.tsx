"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const handleLogout = () => {
    localStorage.clear();
    signOut({ callbackUrl: "/" });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleLogout}
      className="relative"
    >
      <LogOut className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Logout</span>
    </Button>
  );
}
