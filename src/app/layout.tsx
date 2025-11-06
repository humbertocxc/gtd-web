import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ApiProvider } from "@/context/ApiProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LogoutButton } from "@/components/LogoutButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gerenciamento de usuários",
  description: "Um aplicativo moderno de gerenciamento de usuários com RBAC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ApiProvider>
            <div className="fixed top-4 right-4 z-50 flex gap-2">
              <LogoutButton />
              <ThemeToggle />
            </div>
            {children}
          </ApiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
