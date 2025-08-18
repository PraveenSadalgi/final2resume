
"use client";

import { FileText, LayoutTemplate, MailCheck, Briefcase, PencilRuler, Home } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import type { ResumeData } from "@/lib/types";
import { cn } from "@/lib/utils";

interface HeaderProps {
  resumeData?: ResumeData;
}

export function Header({ resumeData }: HeaderProps) {
  const pathname = usePathname();

  const handleStorage = (key: string) => {
    if (typeof window !== "undefined" && resumeData) {
      localStorage.setItem(key, JSON.stringify(resumeData));
    }
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/editor', label: 'Create Resume', icon: PencilRuler },
    { href: '/templates', label: 'Templates', icon: LayoutTemplate, storageKey: 'selectedTemplate' },
    { href: '/cover-letter', label: 'Cover Letter', icon: MailCheck, storageKey: 'resumeDataForCoverLetter' },
    { href: '/job-recommendations', label: 'Find Jobs', icon: Briefcase, storageKey: 'resumeDataForJobs' },
  ];

  return (
    <header className="no-print sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex items-center justify-between gap-2 p-4">
        <Link href="/" className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="hidden sm:block text-xl font-bold text-foreground">ResuAI</h1>
        </Link>
        
        <nav className="flex items-center gap-1 sm:gap-2">
           {navLinks.map(link => (
             <Button
                key={link.href}
                asChild
                variant="ghost"
                className={cn(
                    "transition-colors duration-200",
                    pathname === link.href ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary"
                )}
                onClick={() => link.storageKey && handleStorage(link.storageKey)}
              >
              <Link href={link.href} className="flex items-center gap-2 px-3 py-2 text-sm font-medium">
                  <link.icon className="h-4 w-4" />
                  <span className="hidden md:inline-block">{link.label}</span>
              </Link>
             </Button>
           ))}
        </nav>
      </div>
    </header>
  );
}
