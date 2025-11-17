"use client";

import type { Action } from "@/lib/services/gtd/types";
import { ActionCard } from "./ActionCard";
import { GtdEmptyState } from "../GtdEmptyState";

interface ActionsListProps {
  actions: Action[];
  onSetNext?: (actionId: string) => void;
  onSetWaiting?: (actionId: string) => void;
  onSetSomeday?: (actionId: string) => void;
  onComplete?: (actionId: string) => void;
  showStatusControls?: boolean;
  emptyMessage?: string;
}

export function ActionsList({
  actions,
  onSetNext,
  onSetWaiting,
  onSetSomeday,
  onComplete,
  showStatusControls = true,
  emptyMessage = "No actions yet. Start by capturing items in your inbox.",
}: ActionsListProps) {
  if (actions.length === 0) {
    return (
      <GtdEmptyState
        icon="actions"
        title="No actions"
        description={emptyMessage}
      />
    );
  }

  return (
    <div className="space-y-3">
      {actions.map((action) => (
        <ActionCard
          key={action.id}
          action={action}
          onSetNext={onSetNext}
          onSetWaiting={onSetWaiting}
          onSetSomeday={onSetSomeday}
          onComplete={onComplete}
          showStatusControls={showStatusControls}
        />
      ))}
    </div>
  );
}
