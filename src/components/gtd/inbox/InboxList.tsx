"use client";

import type { InboxItem } from "@/lib/services/gtd/types";
import { InboxItemCard } from "./InboxItem";
import { GtdEmptyState } from "../GtdEmptyState";

interface InboxListProps {
  items: InboxItem[];
  onConvert: (itemId: string) => void;
}

export function InboxList({ items, onConvert }: InboxListProps) {
  if (items.length === 0) {
    return (
      <GtdEmptyState
        icon="inbox"
        title="Inbox is empty"
        description="Capture anything that comes to mind. You can clarify and organize it later."
      />
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <InboxItemCard key={item.id} item={item} onConvert={onConvert} />
      ))}
    </div>
  );
}
