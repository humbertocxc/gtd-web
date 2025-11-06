"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Sistema de gerenciamento de usuários
          </h1>
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setMode("login")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                mode === "login"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                mode === "signup"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Cadastrar
            </button>
          </div>
        </div>
        {mode === "login" ? <LoginForm /> : <SignUpForm />}
      </div>
    </div>
  );
}
