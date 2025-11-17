"use client";

import { useState } from "react";
import { Plus, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useInbox } from "@/lib/hooks/useInbox";

interface QuickCaptureButtonProps {
  className?: string;
}

export function QuickCaptureButton({ className }: QuickCaptureButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState("");
  const { createItem, isCreating } = useInbox();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isCreating) return;

    await createItem(content.trim());
    setContent("");
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <Button
        size="icon-lg"
        className={cn(
          "fixed bottom-6 right-6 size-14 rounded-full shadow-lg",
          className
        )}
        onClick={() => setIsExpanded(true)}
      >
        <Plus className="size-6" />
      </Button>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 flex items-center gap-2 rounded-full bg-card shadow-lg border p-2",
        className
      )}
    >
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Quick capture..."
          disabled={isCreating}
          className="w-64"
          autoFocus
        />
        <Button
          type="submit"
          size="icon"
          disabled={!content.trim() || isCreating}
        >
          <Send />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => {
            setIsExpanded(false);
            setContent("");
          }}
        >
          <X />
        </Button>
      </form>
    </div>
  );
}
