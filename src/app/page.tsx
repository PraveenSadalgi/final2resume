
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, LayoutTemplate, Briefcase, FileText } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  const features = [
    {
      icon: <Bot className="h-10 w-10 text-primary" />,
      title: 'AI-Powered Assistant',
      description: 'Let our AI help you craft the perfect resume summary, experience descriptions, and skills.',
    },
    {
      icon: <LayoutTemplate className="h-10 w-10 text-primary" />,
      title: 'Professional Templates',
      description: 'Choose from a variety of professionally designed templates to match your style and industry.',
    },
    {
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      title: 'Job Recommendations',
      description: 'Get job recommendations based on your resume and find your next opportunity faster.',
    },
     {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: 'Cover Letter Generator',
      description: 'Create compelling cover letters tailored to specific job descriptions in just a few clicks.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center">
          <div className="container px-4 md:px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-4">
              Build Your Professional Resume in Minutes
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
              Create a standout resume with our AI-powered builder and land your dream job.
            </p>
            <Button asChild size="lg">
              <Link href="/editor">
                Create Your Resume Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <div className="mt-12 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/10 rounded-full blur-3xl -z-10"></div>
                <Image
                    src="https://placehold.co/1200x600.png"
                    data-ai-hint="resume builder dashboard"
                    alt="Resume Builder Interface"
                    width={1200}
                    height={600}
                    className="rounded-lg shadow-2xl"
                    priority
                />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-28 bg-card">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Why Choose ResuAI?</h2>
              <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
                Everything you need to create a professional resume that gets noticed.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-6 rounded-lg text-center">
                  <div className="flex justify-center items-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t">
        <div className="container mx-auto py-8 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">ResuAI</span>
          </div>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            © {new Date().getFullYear()} ResuAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
