import type {
  InboxItem,
  Action,
  Context,
  AreaOfFocus,
  CreateInboxItemRequest,
  ConvertInboxItemRequest,
  UpdateActionWaitingRequest,
  CreateContextRequest,
  UpdateContextRequest,
  CreateAreaOfFocusRequest,
  UpdateAreaOfFocusRequest,
  FilteredActionsParams,
  PaginatedResponse,
} from "./types";

const GTD_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

class GtdApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public error?: string
  ) {
    super(message);
    this.name = "GtdApiError";
  }
}

async function fetchWithAuth<T>(
  endpoint: string,
  accessToken: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${GTD_API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: response.statusText,
    }));
    throw new GtdApiError(
      response.status,
      errorData.message || "Request failed",
      errorData.error
    );
  }

  return response.json();
}

export async function getInboxItems(accessToken: string): Promise<InboxItem[]> {
  return fetchWithAuth<InboxItem[]>("/inbox", accessToken);
}

export async function createInboxItem(
  accessToken: string,
  data: CreateInboxItemRequest
): Promise<InboxItem> {
  return fetchWithAuth<InboxItem>("/inbox", accessToken, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function convertInboxItem(
  accessToken: string,
  itemId: string,
  data: ConvertInboxItemRequest
): Promise<Action | { message: string }> {
  return fetchWithAuth<Action | { message: string }>(
    `/inbox/${itemId}/convert`,
    accessToken,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export async function getActions(
  accessToken: string,
  next?: boolean
): Promise<Action[]> {
  const query = next ? "?next=true" : "";
  return fetchWithAuth<Action[]>(`/actions${query}`, accessToken);
}

export async function getFilteredActions(
  accessToken: string,
  params: FilteredActionsParams
): Promise<PaginatedResponse<Action>> {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const query = searchParams.toString();
  const endpoint = `/actions/filtered${query ? `?${query}` : ""}`;

  return fetchWithAuth<PaginatedResponse<Action>>(endpoint, accessToken);
}

export async function setActionNext(
  accessToken: string,
  actionId: string
): Promise<Action> {
  return fetchWithAuth<Action>(`/actions/${actionId}/next`, accessToken, {
    method: "PATCH",
  });
}

export async function setActionWaiting(
  accessToken: string,
  actionId: string,
  data: UpdateActionWaitingRequest
): Promise<Action> {
  return fetchWithAuth<Action>(`/actions/${actionId}/waiting`, accessToken, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function setActionSomeday(
  accessToken: string,
  actionId: string
): Promise<Action> {
  return fetchWithAuth<Action>(`/actions/${actionId}/someday`, accessToken, {
    method: "PATCH",
  });
}

export async function completeAction(
  accessToken: string,
  actionId: string
): Promise<Action> {
  return fetchWithAuth<Action>(
    `/actions/${actionId}/complete-action`,
    accessToken,
    {
      method: "POST",
    }
  );
}

export async function getContexts(accessToken: string): Promise<Context[]> {
  return fetchWithAuth<Context[]>("/contexts", accessToken);
}

export async function getContext(
  accessToken: string,
  contextId: string
): Promise<Context> {
  return fetchWithAuth<Context>(`/contexts/${contextId}`, accessToken);
}

export async function createContext(
  accessToken: string,
  data: CreateContextRequest
): Promise<Context> {
  return fetchWithAuth<Context>("/contexts", accessToken, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateContext(
  accessToken: string,
  contextId: string,
  data: UpdateContextRequest
): Promise<Context> {
  return fetchWithAuth<Context>(`/contexts/${contextId}`, accessToken, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteContext(
  accessToken: string,
  contextId: string
): Promise<{ message: string }> {
  return fetchWithAuth<{ message: string }>(
    `/contexts/${contextId}`,
    accessToken,
    {
      method: "DELETE",
    }
  );
}

export async function getAreasOfFocus(
  accessToken: string
): Promise<AreaOfFocus[]> {
  return fetchWithAuth<AreaOfFocus[]>("/areas-of-focus", accessToken);
}

export async function getAreaOfFocus(
  accessToken: string,
  areaId: string
): Promise<AreaOfFocus> {
  return fetchWithAuth<AreaOfFocus>(`/areas-of-focus/${areaId}`, accessToken);
}

export async function createAreaOfFocus(
  accessToken: string,
  data: CreateAreaOfFocusRequest
): Promise<AreaOfFocus> {
  return fetchWithAuth<AreaOfFocus>("/areas-of-focus", accessToken, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateAreaOfFocus(
  accessToken: string,
  areaId: string,
  data: UpdateAreaOfFocusRequest
): Promise<AreaOfFocus> {
  return fetchWithAuth<AreaOfFocus>(`/areas-of-focus/${areaId}`, accessToken, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteAreaOfFocus(
  accessToken: string,
  areaId: string
): Promise<{ message: string }> {
  return fetchWithAuth<{ message: string }>(
    `/areas-of-focus/${areaId}`,
    accessToken,
    {
      method: "DELETE",
    }
  );
}
