"use client";

import { useState } from "react";
import { useInbox } from "@/lib/hooks/useInbox";
import { GtdSectionHeader } from "@/components/gtd/GtdSectionHeader";
import { GtdLoadingState } from "@/components/gtd/GtdLoadingState";
import { InboxList } from "@/components/gtd/inbox/InboxList";
import { InboxAddForm } from "@/components/gtd/inbox/InboxAddForm";
import { InboxConvertDialog } from "@/components/gtd/inbox/InboxConvertDialog";
import type { ConvertInboxItemRequest } from "@/lib/services/gtd/types";

export default function InboxPage() {
  const { items, isLoading, createItem, isCreating, convertItem, isConverting } =
    useInbox();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleConvert = async (data: ConvertInboxItemRequest) => {
    if (!selectedItemId) return;
    await convertItem(selectedItemId, data);
    setSelectedItemId(null);
  };

  if (isLoading) {
    return <GtdLoadingState text="Loading inbox..." />;
  }

  return (
    <div className="container mx-auto space-y-6 py-8">
      <GtdSectionHeader
        title="Inbox"
        description="Capture everything that comes to mind. Process it later."
      />

      <InboxAddForm
        onSubmit={async (content) => {
          await createItem(content);
        }}
        isSubmitting={isCreating}
      />

      <InboxList items={items} onConvert={setSelectedItemId} />

      <InboxConvertDialog
        isOpen={!!selectedItemId}
        onClose={() => setSelectedItemId(null)}
        onConvert={handleConvert}
        isConverting={isConverting}
      />
    </div>
  );
}
