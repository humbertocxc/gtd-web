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
  Context,
  CreateContextRequest,
  UpdateContextRequest,
} from "@/lib/services/gtd/types";

interface ContextFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateContextRequest | UpdateContextRequest
  ) => Promise<void>;
  context?: Context;
  isSubmitting?: boolean;
}

export function ContextFormDialog({
  isOpen,
  onClose,
  onSubmit,
  context,
  isSubmitting,
}: ContextFormDialogProps) {
  const [name, setName] = useState(context?.name ?? "");
  const [description, setDescription] = useState(context?.description ?? "");

  const handleSubmit = async () => {
    const data = {
      name,
      description: description || undefined,
    };

    await onSubmit(data);

    if (!context) {
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
            {context ? "Edit Context" : "New Context"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Contexts represent locations, tools, or situations where actions can
            be done.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="context-name">Name</Label>
            <Input
              id="context-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., @computer, @office, @phone"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="context-description">Description (optional)</Label>
            <Input
              id="context-description"
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
            {isSubmitting ? "Saving..." : context ? "Update" : "Create"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
