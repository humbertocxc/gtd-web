"use client";

import { GtdSectionHeader } from "@/components/gtd/GtdSectionHeader";
import { GtdEmptyState } from "@/components/gtd/GtdEmptyState";

export default function ProjectsPage() {
  // Projects functionality to be implemented when backend provides full CRUD
  return (
    <div className="container mx-auto space-y-6 py-8">
      <GtdSectionHeader
        title="Projects"
        description="Multi-step outcomes requiring multiple actions."
      />

      <GtdEmptyState
        icon="list"
        title="Projects coming soon"
        description="Project management will be available once the backend API is complete. For now, you can create projects by converting inbox items."
      />
    </div>
  );
}
