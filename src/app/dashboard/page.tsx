"use client";

import { useUserProfile } from "@/lib/queries/user-queries";
import { Alert } from "@/components/Alert";

export default function Dashboard() {
  const { data: user, isLoading, error } = useUserProfile();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 font-sans dark:bg-black">
        <Alert
          message={
            error instanceof Error
              ? error.message
              : "An unexpected error occurred"
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans dark:bg-black">
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome back, {user?.name}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Profile Information
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Name
              </p>
              <p className="mt-1 text-gray-900 dark:text-white">{user?.name}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Email
              </p>
              <p className="mt-1 text-gray-900 dark:text-white">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                User ID
              </p>
              <p className="mt-1 font-mono text-sm text-gray-900 dark:text-white">
                {user?.id}
              </p>
            </div>

            {user?.role && (
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Role
                </p>
                <p className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {user.role}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
