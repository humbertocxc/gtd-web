"use client";

import { formatDistanceToNow } from "date-fns";
import { GitBranch } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { InboxItem } from "@/lib/services/gtd/types";

interface InboxItemCardProps {
  item: InboxItem;
  onConvert: (itemId: string) => void;
}

export function InboxItemCard({ item, onConvert }: InboxItemCardProps) {
  const timeAgo = formatDistanceToNow(new Date(item.createdAt), {
    addSuffix: true,
  });

  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4 py-4">
        <div className="flex-1 space-y-1">
          <p className="text-sm">{item.content}</p>
          <p className="text-muted-foreground text-xs">{timeAgo}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => onConvert(item.id)}>
          <GitBranch />
          Clarify
        </Button>
      </CardContent>
    </Card>
  );
}
