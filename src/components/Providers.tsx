"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ApiProvider } from "@/context/ApiProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <ApiProvider>{children}</ApiProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
