"use client";

import { Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Context } from "@/lib/services/gtd/types";
import { GtdEmptyState } from "../GtdEmptyState";

interface ContextListProps {
  contexts: Context[];
  onEdit: (context: Context) => void;
  onDelete: (contextId: string) => void;
}

export function ContextList({ contexts, onEdit, onDelete }: ContextListProps) {
  if (contexts.length === 0) {
    return (
      <GtdEmptyState
        icon="list"
        title="No contexts"
        description="Create contexts to organize your actions by location, tool, or situation."
      />
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {contexts.map((context) => (
        <Card key={context.id}>
          <CardContent className="py-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-semibold">{context.name}</h3>
                  {context.description && (
                    <p className="text-muted-foreground mt-1 text-sm">
                      {context.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(context)}
                >
                  <Edit />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(context.id)}
                >
                  <Trash2 />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
