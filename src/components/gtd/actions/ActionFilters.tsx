"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  ActionStatus,
  FilteredActionsParams,
} from "@/lib/services/gtd/types";
import type { Context, AreaOfFocus } from "@/lib/services/gtd/types";

interface ActionFiltersProps {
  filters: FilteredActionsParams;
  onFiltersChange: (filters: FilteredActionsParams) => void;
  contexts?: Context[];
  areasOfFocus?: AreaOfFocus[];
}

export function ActionFilters({
  filters,
  onFiltersChange,
  contexts = [],
  areasOfFocus = [],
}: ActionFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statuses: ActionStatus[] = [
    "clarified",
    "next",
    "waiting",
    "someday",
    "done",
  ];

  const handleStatusToggle = (status: ActionStatus) => {
    onFiltersChange({
      ...filters,
      status: filters.status === status ? undefined : status,
    });
  };

  const handleContextChange = (contextId: string) => {
    onFiltersChange({
      ...filters,
      contextId: filters.contextId === contextId ? undefined : contextId,
    });
  };

  const handleAreaChange = (areaId: string) => {
    onFiltersChange({
      ...filters,
      areaOfFocusId: filters.areaOfFocusId === areaId ? undefined : areaId,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters =
    filters.status || filters.contextId || filters.areaOfFocusId;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Filters</CardTitle>
            <CardDescription className="text-xs">
              Refine your action list
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Filter />
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Status Filter */}
          <div className="space-y-2">
            <Label className="text-xs">Status</Label>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <Button
                  key={status}
                  variant={filters.status === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusToggle(status)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* Context Filter */}
          {contexts.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs">Context</Label>
              <div className="flex flex-wrap gap-2">
                {contexts.map((context) => (
                  <Button
                    key={context.id}
                    variant={
                      filters.contextId === context.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleContextChange(context.id)}
                  >
                    {context.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Area of Focus Filter */}
          {areasOfFocus.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs">Area of Focus</Label>
              <div className="flex flex-wrap gap-2">
                {areasOfFocus.map((area) => (
                  <Button
                    key={area.id}
                    variant={
                      filters.areaOfFocusId === area.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleAreaChange(area.id)}
                  >
                    {area.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
