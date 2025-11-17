"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InboxAddFormProps {
  onSubmit: (content: string) => Promise<void>;
  isSubmitting?: boolean;
  className?: string;
}

export function InboxAddForm({
  onSubmit,
  isSubmitting,
  className,
}: InboxAddFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    await onSubmit(content.trim());
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        disabled={isSubmitting}
        className="flex-1"
      />
      <Button
        type="submit"
        disabled={!content.trim() || isSubmitting}
        size="icon"
      >
        <Send />
      </Button>
    </form>
  );
}
