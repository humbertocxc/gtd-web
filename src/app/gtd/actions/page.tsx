"use client";

import { useState } from "react";
import { useActions } from "@/lib/hooks/useActions";
import { useContexts } from "@/lib/hooks/useContexts";
import { useAreasOfFocus } from "@/lib/hooks/useAreasOfFocus";
import { GtdSectionHeader } from "@/components/gtd/GtdSectionHeader";
import { GtdLoadingState } from "@/components/gtd/GtdLoadingState";
import { ActionsList } from "@/components/gtd/actions/ActionsList";
import { ActionFilters } from "@/components/gtd/actions/ActionFilters";
import type { FilteredActionsParams } from "@/lib/services/gtd/types";

export default function ActionsPage() {
  const [filters, setFilters] = useState<FilteredActionsParams>({});

  const {
    actions,
    isLoading,
    setNext,
    setWaiting,
    setSomeday,
    complete,
  } = useActions(filters);

  const { contexts } = useContexts();
  const { areasOfFocus } = useAreasOfFocus();

  const handleSetWaiting = async (actionId: string) => {
    const waitingFor = prompt("Waiting for whom/what?");
    if (waitingFor) {
      await setWaiting(actionId, waitingFor);
    }
  };

  if (isLoading) {
    return <GtdLoadingState text="Loading actions..." />;
  }

  return (
    <div className="container mx-auto space-y-6 py-8">
      <GtdSectionHeader
        title="Actions"
        description="Review and manage all your actions."
      />

      <ActionFilters
        filters={filters}
        onFiltersChange={setFilters}
        contexts={contexts}
        areasOfFocus={areasOfFocus}
      />

      <ActionsList
        actions={actions}
        onSetNext={setNext}
        onSetWaiting={handleSetWaiting}
        onSetSomeday={setSomeday}
        onComplete={complete}
      />
    </div>
  );
}
