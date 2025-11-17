"use client";

import { useActionsQuery } from "@/lib/queries/gtd-queries";

export function useNextAction() {
  const query = useActionsQuery(true);

  return {
    nextAction: query.data?.[0] ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
