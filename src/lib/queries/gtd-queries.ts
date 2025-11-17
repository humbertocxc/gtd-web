"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import * as gtdApi from "@/lib/services/gtd/gtd-api-client";
import type {
  CreateInboxItemRequest,
  ConvertInboxItemRequest,
  UpdateActionWaitingRequest,
  CreateContextRequest,
  UpdateContextRequest,
  CreateAreaOfFocusRequest,
  UpdateAreaOfFocusRequest,
  FilteredActionsParams,
} from "@/lib/services/gtd/types";

export const gtdKeys = {
  all: ["gtd"] as const,
  inbox: () => [...gtdKeys.all, "inbox"] as const,
  actions: () => [...gtdKeys.all, "actions"] as const,
  actionsList: (filters?: FilteredActionsParams) =>
    [...gtdKeys.actions(), "list", filters] as const,
  actionsNext: () => [...gtdKeys.actions(), "next"] as const,
  contexts: () => [...gtdKeys.all, "contexts"] as const,
  context: (id: string) => [...gtdKeys.contexts(), id] as const,
  areasOfFocus: () => [...gtdKeys.all, "areasOfFocus"] as const,
  areaOfFocus: (id: string) => [...gtdKeys.areasOfFocus(), id] as const,
};

export function useInboxQuery() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  return useQuery({
    queryKey: gtdKeys.inbox(),
    queryFn: async () => {
      if (!accessToken) throw new Error("Access token not available");
      return gtdApi.getInboxItems(accessToken);
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 2,
  });
}

export function useCreateInboxItemMutation() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateInboxItemRequest) => {
      if (!session?.accessToken) throw new Error("Access token not available");
      return gtdApi.createInboxItem(session.accessToken, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gtdKeys.inbox() });
    },
  });
}

export function useConvertInboxItemMutation() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      itemId,
      data,
    }: {
      itemId: string;
      data: ConvertInboxItemRequest;
    }) => {
      if (!session?.accessToken) throw new Error("Access token not available");
      return gtdApi.convertInboxItem(session.accessToken, itemId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gtdKeys.inbox() });
      queryClient.invalidateQueries({ queryKey: gtdKeys.actions() });
    },
  });
}

export function useActionsQuery(next?: boolean) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  return useQuery({
    queryKey: next ? gtdKeys.actionsNext() : gtdKeys.actionsList(),
    queryFn: async () => {
      if (!accessToken) throw new Error("Access token not available");
      return gtdApi.getActions(accessToken, next);
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 2,
  });
}

export function useFilteredActionsQuery(params: FilteredActionsParams) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  return useQuery({
    queryKey: gtdKeys.actionsList(params),
    queryFn: async () => {
      if (!accessToken) throw new Error("Access token not available");
      return gtdApi.getFilteredActions(accessToken, params);
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 2,
  });
}

export function useSetActionNextMutation() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (actionId: string) => {
      if (!session?.accessToken) throw new Error("Access token not available");
      return gtdApi.setActionNext(session.accessToken, actionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gtdKeys.actions() });
    },
  });
}

export function useSetActionWaitingMutation() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      actionId,
      data,
    }: {
      actionId: string;
      data: UpdateActionWaitingRequest;
    }) => {
      if (!session?.accessToken) throw new Error("Access token not available");
      return gtdApi.setActionWaiting(session.accessToken, actionId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gtdKeys.actions() });
    },
  });
}

export function useSetActionSomedayMutation() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (actionId: string) => {
      if (!session?.accessToken) throw new Error("Access token not available");
      return gtdApi.setActionSomeday(session.accessToken, actionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gtdKeys.actions() });
    },
  });
}

export function useCompleteActionMutation() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (actionId: string) => {
      if (!session?.accessToken) throw new Error("Access token not available");
      return gtdApi.completeAction(session.accessToken, actionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gtdKeys.actions() });
    },
  });
}

export function useContextsQuery() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  return useQuery({
    queryKey: gtdKeys.contexts(),
    queryFn: async () => {
      if (!accessToken) throw new Error("Access token not available");
      return gtdApi.getContexts(accessToken);
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });
}

export function useContextQuery(contextId: string) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  return useQuery({
    queryKey: gtdKeys.context(contextId),
    queryFn: async () => {
      if (!accessToken) throw new Error("Access token not available");
      return gtdApi.getContext(accessToken, contextId);
    },
    enabled: !!accessToken && !!contextId,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateContextMutation() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateContextRequest) => {
      if (!session?.accessToken) throw new Error("Access token not available");
      return gtdApi.createContext(session.accessToken, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gtdKeys.contexts() });
    },
  });
}

export function useUpdateContextMutation() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      contextId,
      data,
    }: {
      contextId: string;
      data: UpdateContextRequest;
    }) => {
      if (!session?.accessToken) throw new Error("Access token not available");
      return gtdApi.updateContext(session.accessToken, contextId, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: gtdKeys.contexts() });
      queryClient.invalidateQueries({
        queryKey: gtdKeys.context(variables.contextId),
      });
    },
  });
}

export function useDeleteContextMutation() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contextId: string) => {
      if (!session?.accessToken) throw new Error("Access token not available");
      return gtdApi.deleteContext(session.accessToken, contextId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gtdKeys.contexts() });
      queryClient.invalidateQueries({ queryKey: gtdKeys.actions() });
    },
  });
}

export function useAreasOfFocusQuery() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  return useQuery({
    queryKey: gtdKeys.areasOfFocus(),
    queryFn: async () => {
      if (!accessToken) throw new Error("Access token not available");
      return gtdApi.getAreasOfFocus(accessToken);
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAreaOfFocusQuery(areaId: string) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  return useQuery({
    queryKey: gtdKeys.areaOfFocus(areaId),
    queryFn: async () => {
      if (!accessToken) throw new Error("Access token not available");
      return gtdApi.getAreaOfFocus(accessToken, areaId);
    },
    enabled: !!accessToken && !!areaId,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateAreaOfFocusMutation() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAreaOfFocusRequest) => {
      if (!session?.accessToken) throw new Error("Access token not available");
      return gtdApi.createAreaOfFocus(session.accessToken, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gtdKeys.areasOfFocus() });
    },
  });
}

export function useUpdateAreaOfFocusMutation() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      areaId,
      data,
    }: {
      areaId: string;
      data: UpdateAreaOfFocusRequest;
    }) => {
      if (!session?.accessToken) throw new Error("Access token not available");
      return gtdApi.updateAreaOfFocus(session.accessToken, areaId, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: gtdKeys.areasOfFocus() });
      queryClient.invalidateQueries({
        queryKey: gtdKeys.areaOfFocus(variables.areaId),
      });
    },
  });
}

export function useDeleteAreaOfFocusMutation() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (areaId: string) => {
      if (!session?.accessToken) throw new Error("Access token not available");
      return gtdApi.deleteAreaOfFocus(session.accessToken, areaId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gtdKeys.areasOfFocus() });
      queryClient.invalidateQueries({ queryKey: gtdKeys.actions() });
    },
  });
}

export function useProjectActions(projectId?: string) {
  return useFilteredActionsQuery({
    projectId,
    pageSize: 50,
  });
}
