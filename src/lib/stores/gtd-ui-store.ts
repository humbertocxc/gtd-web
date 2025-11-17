import { create } from "zustand";
import type { FilteredActionsParams } from "@/lib/services/gtd/types";

interface GtdUIState {
  actionFilters: FilteredActionsParams;
  setActionFilters: (filters: FilteredActionsParams) => void;
  clearActionFilters: () => void;

  isInboxConvertDialogOpen: boolean;
  setInboxConvertDialogOpen: (open: boolean) => void;

  isContextFormOpen: boolean;
  setContextFormOpen: (open: boolean) => void;

  isAreaFormOpen: boolean;
  setAreaFormOpen: (open: boolean) => void;

  selectedContextId: string | null;
  setSelectedContextId: (id: string | null) => void;

  selectedAreaId: string | null;
  setSelectedAreaId: (id: string | null) => void;

  selectedInboxItemId: string | null;
  setSelectedInboxItemId: (id: string | null) => void;

  actionsViewMode: "list" | "kanban";
  setActionsViewMode: (mode: "list" | "kanban") => void;
}

export const useGtdUIStore = create<GtdUIState>((set) => ({
  actionFilters: {},
  setActionFilters: (filters) => set({ actionFilters: filters }),
  clearActionFilters: () => set({ actionFilters: {} }),

  isInboxConvertDialogOpen: false,
  setInboxConvertDialogOpen: (open) => set({ isInboxConvertDialogOpen: open }),

  isContextFormOpen: false,
  setContextFormOpen: (open) => set({ isContextFormOpen: open }),

  isAreaFormOpen: false,
  setAreaFormOpen: (open) => set({ isAreaFormOpen: open }),

  selectedContextId: null,
  setSelectedContextId: (id) => set({ selectedContextId: id }),

  selectedAreaId: null,
  setSelectedAreaId: (id) => set({ selectedAreaId: id }),

  selectedInboxItemId: null,
  setSelectedInboxItemId: (id) => set({ selectedInboxItemId: id }),

  actionsViewMode: "list",
  setActionsViewMode: (mode) => set({ actionsViewMode: mode }),
}));
