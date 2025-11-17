"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAreasOfFocus } from "@/lib/hooks/useAreasOfFocus";
import { GtdSectionHeader } from "@/components/gtd/GtdSectionHeader";
import { GtdLoadingState } from "@/components/gtd/GtdLoadingState";
import { AreaList } from "@/components/gtd/areas/AreaList";
import { AreaFormDialog } from "@/components/gtd/areas/AreaForm";
import type {
  AreaOfFocus,
  CreateAreaOfFocusRequest,
  UpdateAreaOfFocusRequest,
} from "@/lib/services/gtd/types";

export default function AreasOfFocusPage() {
  const { areasOfFocus, isLoading, create, update, remove, isCreating, isUpdating } =
    useAreasOfFocus();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<AreaOfFocus | undefined>();

  const handleCreate = async (data: CreateAreaOfFocusRequest | UpdateAreaOfFocusRequest) => {
    if ('name' in data && typeof data.name === 'string') {
      await create(data as CreateAreaOfFocusRequest);
    }
    setIsFormOpen(false);
  };

  const handleUpdate = async (data: CreateAreaOfFocusRequest | UpdateAreaOfFocusRequest) => {
    if (editingArea) {
      await update(editingArea.id, data);
      setEditingArea(undefined);
      setIsFormOpen(false);
    }
  };

  const handleEdit = (area: AreaOfFocus) => {
    setEditingArea(area);
    setIsFormOpen(true);
  };

  const handleDelete = async (areaId: string) => {
    if (confirm("Are you sure you want to delete this area of focus?")) {
      await remove(areaId);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingArea(undefined);
  };

  if (isLoading) {
    return <GtdLoadingState text="Loading areas of focus..." />;
  }

  return (
    <div className="container mx-auto space-y-6 py-8">
      <GtdSectionHeader
        title="Areas of Focus"
        description="Key responsibilities and life areas to maintain."
        action={
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus />
            New Area
          </Button>
        }
      />

      <AreaList
        areas={areasOfFocus}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AreaFormDialog
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={editingArea ? handleUpdate : handleCreate}
        area={editingArea}
        isSubmitting={isCreating || isUpdating}
      />
    </div>
  );
}
