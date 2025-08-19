
"use client";

import { FileText, LayoutTemplate, MailCheck, Briefcase, PencilRuler, Home } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import type { ResumeData } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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

  const mainLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/editor', label: 'Create Resume', icon: PencilRuler },
    { href: '/job-recommendations', label: 'Find Jobs', icon: Briefcase, storageKey: 'resumeDataForJobs' },
  ];

  const templatesLinks = [
     { href: '/templates', label: 'Resume Templates' },
     { href: '/cover-letter/templates', label: 'Cover Letter Templates' },
  ];

  return (
    <header className="no-print sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex items-center justify-between gap-2 p-4">
        <Link href="/" className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="hidden sm:block text-xl font-bold text-foreground">ResuAI</h1>
        </Link>
        
        <nav className="flex items-center gap-1 sm:gap-2">
           {mainLinks.map(link => (
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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className={cn(
                            "transition-colors duration-200",
                            pathname.includes('/templates') ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary"
                        )}
                    >
                         <LayoutTemplate className="h-4 w-4" />
                         <span className="hidden md:inline-block ml-2">Templates</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Choose a Template</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                     {templatesLinks.map(link => (
                        <DropdownMenuItem key={link.href} asChild>
                            <Link href={link.href}>
                                {link.label}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <Button
                asChild
                variant="ghost"
                className={cn(
                    "transition-colors duration-200",
                    pathname === '/cover-letter' ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary"
                )}
                onClick={() => handleStorage('resumeDataForCoverLetter')}
            >
                <Link href='/cover-letter' className="flex items-center gap-2 px-3 py-2 text-sm font-medium">
                    <MailCheck className="h-4 w-4" />
                    <span className="hidden md:inline-block">Cover Letter</span>
                </Link>
            </Button>
        </nav>
      </div>
    </header>
  );
}
