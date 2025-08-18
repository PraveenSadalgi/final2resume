
"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { allTemplates } from "@/lib/mock-data";
import ResumePreview from "./resume-preview";

export const TemplateShowcase: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    let offset = 0;
    const scrollSpeed = 0.5; // Adjust speed here

    // Clone templates to create a seamless loop
    const templates = [...allTemplates, ...allTemplates];
    const templateElements = Array.from(track.children) as HTMLElement[];
    const totalWidth = templateElements.reduce((acc, el) => acc + el.offsetWidth, 0) / 2;

    let animationFrameId: number;

    const step = () => {
      offset -= scrollSpeed;
      if (Math.abs(offset) >= totalWidth) {
        offset = 0;
      }
      track.style.transform = `translateX(${offset}px)`;
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const templatesToRender = [...allTemplates, ...allTemplates];

  return (
    <section id="templates" className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Templates that pass ATS</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">Pick from elegant, readable templates that keep parsing systems happy.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/templates">Browse all templates</Link>
          </Button>
        </div>
      </div>
      <div className="relative h-[600px]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="absolute top-0 left-0 flex w-max" ref={trackRef}>
            {templatesToRender.map((template, i) => (
                <div key={i} className="mx-4 w-[400px] shrink-0">
                    <div className="transform scale-[0.5] origin-top-left">
                        <ResumePreview resumeData={template} />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};
