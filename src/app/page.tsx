"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const LoginForm = dynamic(() => import("@/components/LoginForm"), {
  ssr: false,
  loading: () => <div className="max-w-md mx-auto mt-10">Loading...</div>,
});

const SignUpForm = dynamic(() => import("@/components/SignUpForm"), {
  ssr: false,
  loading: () => <div className="max-w-md mx-auto mt-10">Loading...</div>,
});

export default function Home() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    if (session?.user) {
      router.replace("/dashboard");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Verificando sessão...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Sistema GTD
          </h1>
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              onClick={() => setMode("login")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                mode === "login"
                  ? "bg-blue-800 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Login
            </Button>
            <Button
              onClick={() => setMode("signup")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                mode === "signup"
                  ? "bg-blue-800 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Cadastrar
            </Button>
          </div>
        </div>
        {mode === "login" ? <LoginForm /> : <SignUpForm />}
      </div>
    </div>
  );
}
