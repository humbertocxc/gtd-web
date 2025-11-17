"use client";

import { Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { AreaOfFocus } from "@/lib/services/gtd/types";
import { GtdEmptyState } from "../GtdEmptyState";

interface AreaListProps {
  areas: AreaOfFocus[];
  onEdit: (area: AreaOfFocus) => void;
  onDelete: (areaId: string) => void;
}

export function AreaList({ areas, onEdit, onDelete }: AreaListProps) {
  if (areas.length === 0) {
    return (
      <GtdEmptyState
        icon="list"
        title="No areas of focus"
        description="Create areas of focus to organize your projects and actions by life areas."
      />
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {areas.map((area) => (
        <Card key={area.id}>
          <CardContent className="py-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-semibold">{area.name}</h3>
                  {area.description && (
                    <p className="text-muted-foreground mt-1 text-sm">
                      {area.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(area)}
                >
                  <Edit />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(area.id)}
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
