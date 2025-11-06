"use client";

import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("@/components/LoginForm"), {
  ssr: false,
  loading: () => <div className="max-w-md mx-auto mt-10">Loading...</div>,
});

export default function LoginPage() {
  return <LoginForm />;
}
