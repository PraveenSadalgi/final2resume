
"use client";

import { FileText, LayoutTemplate, MailCheck, Briefcase, PencilRuler, Home, Upload } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { parseResume } from "@/ai/flows/parse-resume";
import { classicTemplate } from "@/lib/mock-data";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./ui/loading-spinner";


export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const mainLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/editor', label: 'Create Resume', icon: PencilRuler },
    { href: '/job-recommendations', label: 'Find Jobs', icon: Briefcase },
    { href: '/cover-letter', label: 'Cover Letter', icon: MailCheck },
  ];

  const templatesLinks = [
     { href: '/templates', label: 'Resume Templates' },
     { href: '/cover-letter/templates', label: 'Cover Letter Templates' },
  ];

  const getLinkClass = (href: string, isTemplateLink = false) => {
    const isActive = isTemplateLink ? pathname.includes(href) : pathname === href;
    return cn(
        "transition-colors duration-200",
        isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/10"
    );
  };
  
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    toast({ title: "Importing...", description: "AI is analyzing your resume. This may take a moment." });

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const dataUri = reader.result as string;
        try {
           const parsedData = await parseResume({ resumeFile: dataUri });
           localStorage.setItem("selectedTemplate", JSON.stringify(parsedData));
           router.push(`/editor?template=imported`);
           toast({ title: "Success!", description: "Your resume has been imported and improved." });
        } catch (aiError) {
             console.error("Error parsing resume with AI:", aiError);
            toast({
                title: "AI Error",
                description: "The AI could not process your resume. Please try a different file.",
                variant: "destructive",
            });
        } finally {
            setIsImporting(false);
            if(fileInputRef.current) fileInputRef.current.value = "";
        }
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        toast({ title: "File Error", description: "Could not read the selected file.", variant: "destructive" });
        setIsImporting(false);
      }
    } catch (error) {
      console.error("Error handling file change:", error);
      toast({ title: "Error", description: "An unexpected error occurred during import.", variant: "destructive" });
      setIsImporting(false);
    }
  };


  return (
    <header className="no-print sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
      />
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
                className={getLinkClass(link.href)}
              >
              <Link href={link.href} className="flex items-center gap-2 px-3 py-2 text-sm font-medium">
                  <link.icon className="h-4 w-4" />
                  <span className="hidden md:inline-block">{link.label}</span>
              </Link>
             </Button>
           ))}
            <Button
              variant="ghost"
              onClick={handleImportClick}
              disabled={isImporting}
              className={cn("transition-colors duration-200 text-muted-foreground hover:text-primary hover:bg-primary/10")}
            >
              {isImporting ? <LoadingSpinner className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
              <span className="hidden md:inline-block ml-2">Import</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className={getLinkClass('/templates', true)}
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
        </nav>
      </div>
    </header>
  );
}
