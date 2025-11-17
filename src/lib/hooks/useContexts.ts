"use client";

import { useCallback } from "react";
import {
  useContextsQuery,
  useCreateContextMutation,
  useUpdateContextMutation,
  useDeleteContextMutation,
} from "@/lib/queries/gtd-queries";
import type {
  CreateContextRequest,
  UpdateContextRequest,
} from "@/lib/services/gtd/types";

export function useContexts() {
  const query = useContextsQuery();
  const createMutation = useCreateContextMutation();
  const updateMutation = useUpdateContextMutation();
  const deleteMutation = useDeleteContextMutation();

  const create = useCallback(
    async (data: CreateContextRequest) => {
      return createMutation.mutateAsync(data);
    },
    [createMutation]
  );

  const update = useCallback(
    async (contextId: string, data: UpdateContextRequest) => {
      return updateMutation.mutateAsync({ contextId, data });
    },
    [updateMutation]
  );

  const remove = useCallback(
    async (contextId: string) => {
      return deleteMutation.mutateAsync(contextId);
    },
    [deleteMutation]
  );

  return {
    contexts: query.data ?? [],
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
