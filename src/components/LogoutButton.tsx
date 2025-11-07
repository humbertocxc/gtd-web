"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.clear();
    signOut({ callbackUrl: "/" });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      <LogOut className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Logout</span>
    </Button>
  );
}
