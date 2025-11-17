"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContexts } from "@/lib/hooks/useContexts";
import { GtdSectionHeader } from "@/components/gtd/GtdSectionHeader";
import { GtdLoadingState } from "@/components/gtd/GtdLoadingState";
import { ContextList } from "@/components/gtd/contexts/ContextList";
import { ContextFormDialog } from "@/components/gtd/contexts/ContextForm";
import type { Context, CreateContextRequest, UpdateContextRequest } from "@/lib/services/gtd/types";

export default function ContextsPage() {
  const { contexts, isLoading, create, update, remove, isCreating, isUpdating } =
    useContexts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContext, setEditingContext] = useState<Context | undefined>();

  const handleCreate = async (data: CreateContextRequest | UpdateContextRequest) => {
    if ('name' in data && typeof data.name === 'string') {
      await create(data as CreateContextRequest);
    }
    setIsFormOpen(false);
  };

  const handleUpdate = async (data: CreateContextRequest | UpdateContextRequest) => {
    if (editingContext) {
      await update(editingContext.id, data);
      setEditingContext(undefined);
      setIsFormOpen(false);
    }
  };

  const handleEdit = (context: Context) => {
    setEditingContext(context);
    setIsFormOpen(true);
  };

  const handleDelete = async (contextId: string) => {
    if (confirm("Are you sure you want to delete this context?")) {
      await remove(contextId);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingContext(undefined);
  };

  if (isLoading) {
    return <GtdLoadingState text="Loading contexts..." />;
  }

  return (
    <div className="container mx-auto space-y-6 py-8">
      <GtdSectionHeader
        title="Contexts"
        description="Organize actions by location, tool, or situation."
        action={
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus />
            New Context
          </Button>
        }
      />

      <ContextList
        contexts={contexts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ContextFormDialog
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={editingContext ? handleUpdate : handleCreate}
        context={editingContext}
        isSubmitting={isCreating || isUpdating}
      />
    </div>
  );
}
