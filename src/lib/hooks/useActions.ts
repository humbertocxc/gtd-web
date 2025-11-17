"use client";

import { useCallback } from "react";
import {
  useActionsQuery,
  useFilteredActionsQuery,
  useSetActionNextMutation,
  useSetActionWaitingMutation,
  useSetActionSomedayMutation,
  useCompleteActionMutation,
} from "@/lib/queries/gtd-queries";
import type {
  FilteredActionsParams,
  UpdateActionWaitingRequest,
} from "@/lib/services/gtd/types";

export function useActions(filters?: FilteredActionsParams) {
  const filteredQuery = useFilteredActionsQuery(filters || {});
  const allQuery = useActionsQuery(false);

  const query =
    filters && Object.keys(filters).length > 0 ? filteredQuery : allQuery;
  const setNextMutation = useSetActionNextMutation();
  const setWaitingMutation = useSetActionWaitingMutation();
  const setSomedayMutation = useSetActionSomedayMutation();
  const completeMutation = useCompleteActionMutation();

  const setNext = useCallback(
    async (actionId: string) => {
      return setNextMutation.mutateAsync(actionId);
    },
    [setNextMutation]
  );

  const setWaiting = useCallback(
    async (actionId: string, waitingFor: string) => {
      const data: UpdateActionWaitingRequest = { waitingFor };
      return setWaitingMutation.mutateAsync({ actionId, data });
    },
    [setWaitingMutation]
  );

  const setSomeday = useCallback(
    async (actionId: string) => {
      return setSomedayMutation.mutateAsync(actionId);
    },
    [setSomedayMutation]
  );

  const complete = useCallback(
    async (actionId: string) => {
      return completeMutation.mutateAsync(actionId);
    },
    [completeMutation]
  );

  const hasFilters = filters && Object.keys(filters).length > 0;
  const actions = hasFilters
    ? query.data && "data" in query.data
      ? query.data.data
      : []
    : Array.isArray(query.data)
    ? query.data
    : [];
  const meta =
    hasFilters && query.data && "meta" in query.data
      ? query.data.meta
      : undefined;

  return {
    actions,
    meta,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    setNext,
    isSettingNext: setNextMutation.isPending,
    setWaiting,
    isSettingWaiting: setWaitingMutation.isPending,
    setSomeday,
    isSettingSomeday: setSomedayMutation.isPending,
    complete,
    isCompleting: completeMutation.isPending,
    refetch: query.refetch,
  };
}
