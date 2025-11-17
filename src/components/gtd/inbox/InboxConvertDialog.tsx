"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import type { ConvertInboxItemRequest } from "@/lib/services/gtd/types";

interface InboxConvertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConvert: (data: ConvertInboxItemRequest) => Promise<void>;
  isConverting?: boolean;
}

export function InboxConvertDialog({
  isOpen,
  onClose,
  onConvert,
  isConverting,
}: InboxConvertDialogProps) {
  const [conversionType, setConversionType] = useState<"action" | "project">(
    "action"
  );
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState("");

  const handleConvert = async () => {
    const data: ConvertInboxItemRequest =
      conversionType === "action"
        ? {
            type: "action",
            actionPayload: { description },
          }
        : {
            type: "project",
            projectPayload: { name: projectName },
          };

    await onConvert(data);

    // Reset form
    setDescription("");
    setProjectName("");
    setConversionType("action");
    onClose();
  };

  const isValid =
    conversionType === "action"
      ? description.trim().length > 0
      : projectName.trim().length > 0;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clarify Inbox Item</AlertDialogTitle>
          <AlertDialogDescription>
            What is this? Choose how to organize this item.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={conversionType === "action" ? "default" : "outline"}
              onClick={() => setConversionType("action")}
              className="flex-1"
            >
              Action
            </Button>
            <Button
              type="button"
              variant={conversionType === "project" ? "default" : "outline"}
              onClick={() => setConversionType("project")}
              className="flex-1"
            >
              Project
            </Button>
          </div>

          {conversionType === "action" ? (
            <div className="space-y-2">
              <Label htmlFor="action-description">Action Description</Label>
              <Input
                id="action-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What needs to be done?"
                disabled={isConverting}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="What's the outcome?"
                disabled={isConverting}
              />
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isConverting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConvert}
            disabled={!isValid || isConverting}
          >
            {isConverting ? "Converting..." : "Convert"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
