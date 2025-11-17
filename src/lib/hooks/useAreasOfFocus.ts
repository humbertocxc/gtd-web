"use client";

import { useCallback } from "react";
import {
  useAreasOfFocusQuery,
  useCreateAreaOfFocusMutation,
  useUpdateAreaOfFocusMutation,
  useDeleteAreaOfFocusMutation,
} from "@/lib/queries/gtd-queries";
import type {
  CreateAreaOfFocusRequest,
  UpdateAreaOfFocusRequest,
} from "@/lib/services/gtd/types";

export function useAreasOfFocus() {
  const query = useAreasOfFocusQuery();
  const createMutation = useCreateAreaOfFocusMutation();
  const updateMutation = useUpdateAreaOfFocusMutation();
  const deleteMutation = useDeleteAreaOfFocusMutation();

  const create = useCallback(
    async (data: CreateAreaOfFocusRequest) => {
      return createMutation.mutateAsync(data);
    },
    [createMutation]
  );

  const update = useCallback(
    async (areaId: string, data: UpdateAreaOfFocusRequest) => {
      return updateMutation.mutateAsync({ areaId, data });
    },
    [updateMutation]
  );

  const remove = useCallback(
    async (areaId: string) => {
      return deleteMutation.mutateAsync(areaId);
    },
    [deleteMutation]
  );

  return {
    areasOfFocus: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    create,
    isCreating: createMutation.isPending,
    update,
    isUpdating: updateMutation.isPending,
    remove,
    isDeleting: deleteMutation.isPending,
    refetch: query.refetch,
  };
}
