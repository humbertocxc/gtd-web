"use client";

import { formatDistanceToNow } from "date-fns";
import {
  Clock,
  AlertCircle,
  CheckCircle2,
  PlayCircle,
  Pause,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Action, ActionStatus } from "@/lib/services/gtd/types";

interface ActionCardProps {
  action: Action;
  onSetNext?: (actionId: string) => void;
  onSetWaiting?: (actionId: string) => void;
  onSetSomeday?: (actionId: string) => void;
  onComplete?: (actionId: string) => void;
  showStatusControls?: boolean;
}

export function ActionCard({
  action,
  onSetNext,
  onSetWaiting,
  onSetSomeday,
  onComplete,
  showStatusControls = true,
}: ActionCardProps) {
  const getStatusInfo = (
    status: ActionStatus
  ): { icon: React.ReactNode; label: string; color: string } => {
    switch (status) {
      case "next":
        return {
          icon: <PlayCircle className="size-4" />,
          label: "Next",
          color: "text-green-600 dark:text-green-400",
        };
      case "waiting":
        return {
          icon: <Clock className="size-4" />,
          label: "Waiting",
          color: "text-yellow-600 dark:text-yellow-400",
        };
      case "someday":
        return {
          icon: <Pause className="size-4" />,
          label: "Someday",
          color: "text-blue-600 dark:text-blue-400",
        };
      case "done":
        return {
          icon: <CheckCircle2 className="size-4" />,
          label: "Done",
          color: "text-gray-600 dark:text-gray-400",
        };
      default:
        return {
          icon: <AlertCircle className="size-4" />,
          label: "Clarified",
          color: "text-muted-foreground",
        };
    }
  };

  const statusInfo = getStatusInfo(action.status);
  const timeAgo = formatDistanceToNow(new Date(action.createdAt), {
    addSuffix: true,
  });

  return (
    <Card>
      <CardContent className="py-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span
                  className={cn("flex items-center gap-1.5", statusInfo.color)}
                >
                  {statusInfo.icon}
                  <span className="text-xs font-medium">
                    {statusInfo.label}
                  </span>
                </span>
              </div>
              <p className="text-sm font-medium">{action.description}</p>
              {action.waitingForPerson && (
                <p className="text-muted-foreground text-xs">
                  Waiting for: {action.waitingForPerson}
                </p>
              )}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{timeAgo}</span>
                {action.dueDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {new Date(action.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          {showStatusControls && action.status !== "done" && (
            <div className="flex flex-wrap gap-2">
              {action.status !== "next" && onSetNext && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSetNext(action.id)}
                >
                  <PlayCircle />
                  Next
                </Button>
              )}
              {action.status !== "waiting" && onSetWaiting && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSetWaiting(action.id)}
                >
                  <Clock />
                  Waiting
                </Button>
              )}
              {action.status !== "someday" && onSetSomeday && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSetSomeday(action.id)}
                >
                  <Pause />
                  Someday
                </Button>
              )}
              {onComplete && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onComplete(action.id)}
                >
                  <CheckCircle2 />
                  Complete
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
