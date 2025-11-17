"use client";

import Link from "next/link";
import { Inbox, CheckSquare, FolderKanban, MapPin, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useInbox } from "@/lib/hooks/useInbox";
import { useNextAction } from "@/lib/hooks/useNextAction";
import { GtdLoadingState } from "@/components/gtd/GtdLoadingState";
import { ActionCard } from "@/components/gtd/actions/ActionCard";

export default function GtdDashboardPage() {
  const { items: inboxItems, isLoading: inboxLoading } = useInbox();
  const { nextAction, isLoading: nextLoading } = useNextAction();

  const gtdSections = [
    {
      title: "Inbox",
      description: "Capture everything",
      icon: Inbox,
      href: "/gtd/inbox",
      count: inboxItems.length,
    },
    {
      title: "Actions",
      description: "Things to do",
      icon: CheckSquare,
      href: "/gtd/actions",
    },
    {
      title: "Projects",
      description: "Multi-step outcomes",
      icon: FolderKanban,
      href: "/gtd/projects",
    },
    {
      title: "Contexts",
      description: "Where & how",
      icon: MapPin,
      href: "/gtd/contexts",
    },
    {
      title: "Areas of Focus",
      description: "Life & responsibilities",
      icon: Target,
      href: "/gtd/areas-of-focus",
    },
  ];

  if (inboxLoading || nextLoading) {
    return <GtdLoadingState text="Loading GTD dashboard..." />;
  }

  return (
    <div className="container mx-auto space-y-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">GTD Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Get things done with clarity and control.
        </p>
      </div>

      {/* Next Action Card */}
      {nextAction && (
        <Card>
          <CardHeader>
            <CardTitle>Next Action</CardTitle>
            <CardDescription>Your most important action right now</CardDescription>
          </CardHeader>
          <CardContent>
            <ActionCard action={nextAction} showStatusControls={false} />
          </CardContent>
        </Card>
      )}

      {/* GTD Sections Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gtdSections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.href} href={section.href}>
              <Card className="transition-colors hover:bg-accent cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <Icon className="size-5" />
                        {section.title}
                      </CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                    {section.count !== undefined && section.count > 0 && (
                      <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                        {section.count}
                      </div>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>New to GTD? Start here.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild variant="default">
            <Link href="/gtd/inbox">
              <Inbox />
              Capture Ideas
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/gtd/contexts">
              <MapPin />
              Setup Contexts
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/gtd/areas-of-focus">
              <Target />
              Define Areas
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
