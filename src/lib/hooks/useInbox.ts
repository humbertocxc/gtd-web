"use client";

import { useCallback } from "react";
import {
  useInboxQuery,
  useCreateInboxItemMutation,
  useConvertInboxItemMutation,
} from "@/lib/queries/gtd-queries";
import type {
  CreateInboxItemRequest,
  ConvertInboxItemRequest,
} from "@/lib/services/gtd/types";

export function useInbox() {
  const query = useInboxQuery();
  const createMutation = useCreateInboxItemMutation();
  const convertMutation = useConvertInboxItemMutation();

  const createItem = useCallback(
    async (content: string) => {
      const data: CreateInboxItemRequest = { content };
      return createMutation.mutateAsync(data);
    },
    [createMutation]
  );

  const convertItem = useCallback(
    async (itemId: string, data: ConvertInboxItemRequest) => {
      return convertMutation.mutateAsync({ itemId, data });
    },
    [convertMutation]
  );

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createItem,
    isCreating: createMutation.isPending,
    convertItem,
    isConverting: convertMutation.isPending,
    refetch: query.refetch,
  };
}
