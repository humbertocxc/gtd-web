"use client";

import dynamic from 'next/dynamic';

const SignUpForm = dynamic(() => import('@/components/SignUpForm'), {
  ssr: false,
  loading: () => <div className="max-w-md mx-auto mt-10">Loading...</div>,
});

export default function SignUpPage() {
  return <SignUpForm />;
}
