"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type {
  AreaOfFocus,
  CreateAreaOfFocusRequest,
  UpdateAreaOfFocusRequest,
} from "@/lib/services/gtd/types";

interface AreaFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateAreaOfFocusRequest | UpdateAreaOfFocusRequest
  ) => Promise<void>;
  area?: AreaOfFocus;
  isSubmitting?: boolean;
}

export function AreaFormDialog({
  isOpen,
  onClose,
  onSubmit,
  area,
  isSubmitting,
}: AreaFormDialogProps) {
  const [name, setName] = useState(area?.name ?? "");
  const [description, setDescription] = useState(area?.description ?? "");

  const handleSubmit = async () => {
    const data = {
      name,
      description: description || undefined,
    };

    await onSubmit(data);

    if (!area) {
      setName("");
      setDescription("");
    }
    onClose();
  };

  const isValid = name.trim().length > 0;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {area ? "Edit Area of Focus" : "New Area of Focus"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Areas of focus represent key responsibilities or life areas to
            maintain.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="area-name">Name</Label>
            <Input
              id="area-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Health, Career, Family"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area-description">Description (optional)</Label>
            <Input
              id="area-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Saving..." : area ? "Update" : "Create"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
