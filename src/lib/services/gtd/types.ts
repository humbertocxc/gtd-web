export type ActionStatus =
  | "inbox"
  | "clarified"
  | "next"
  | "waiting"
  | "someday"
  | "done";

export interface InboxItem {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
}

export interface Action {
  id: string;
  description: string;
  status: ActionStatus;
  contextId?: string;
  projectId?: string;
  areaOfFocusId?: string;
  dueDate?: string;
  waitingForPerson?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  userId: string;
}

export interface Context {
  id: string;
  name: string;
  description?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AreaOfFocus {
  id: string;
  name: string;
  description?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  areaOfFocusId?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInboxItemRequest {
  content: string;
}

export interface ConvertInboxItemRequest {
  type: "action" | "project";
  actionPayload?: {
    description: string;
    contextId?: string;
    projectId?: string;
    dueDate?: string;
    waitingForPerson?: string;
  };
  projectPayload?: {
    name: string;
    areaOfFocusId?: string;
  };
}

export interface UpdateActionWaitingRequest {
  waitingFor: string;
}

export interface CreateContextRequest {
  name: string;
  description?: string;
}

export interface UpdateContextRequest {
  name?: string;
  description?: string;
}

export interface CreateAreaOfFocusRequest {
  name: string;
  description?: string;
}

export interface UpdateAreaOfFocusRequest {
  name?: string;
  description?: string;
}

export interface FilteredActionsParams {
  status?: ActionStatus;
  contextId?: string;
  projectId?: string;
  areaOfFocusId?: string;
  dueBefore?: string;
  dueAfter?: string;
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
