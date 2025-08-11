"use client";

import { FileText } from "lucide-react";

export function Header() {
  return (
    <header className="no-print bg-card border-b p-4">
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold text-foreground">ResuAI</h1>
      </div>
    </header>
  );
}
