
"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export const TemplateShowcase: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    let offset = 0;
    const step = () => {
      offset += 0.5; // speed
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${-offset}px)`;
        const width = trackRef.current.scrollWidth / 2; // duplicated set width
        if (offset > width) offset = 0;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const card = (i: number) => (
    <div key={i} className="mx-3 w-[280px] shrink-0 rounded-2xl border bg-background p-4 shadow-sm">
      <div className="mb-3 aspect-[3/4] w-full rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-500/15" />
      <div className="space-y-2">
        <div className="h-3 w-2/3 rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
      </div>
    </div>
  );

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
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="overflow-hidden">
          <div ref={trackRef} className="flex w-[200%]">
            {[...Array(10)].map((_, i) => card(i))}
            {[...Array(10)].map((_, i) => card(i + 10))}
          </div>
        </div>
      </div>
    </section>
  );
};
