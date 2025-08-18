
"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export const TemplateShowcase: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    let offset = 0;
    const scrollSpeed = 0.5; // Adjust speed here

    // Clone templates to create a seamless loop
    const children = Array.from(track.children) as HTMLElement[];
    const totalWidth = children.reduce((acc, el) => acc + el.offsetWidth + 8 * 2, 0) / 2; // account for mx-4

    let animationFrameId: number;

    const step = () => {
      offset -= scrollSpeed;
      if (Math.abs(offset) >= totalWidth) {
        offset = 0;
      }
      track.style.transform = `translateX(${offset}px)`;
      animationFrameId = requestAnimationFrame(step);
    };

    // Need to have a slight delay to allow for the elements to render and have width
    const timeoutId = setTimeout(() => {
        animationFrameId = requestAnimationFrame(step);
    }, 100)


    return () => {
        cancelAnimationFrame(animationFrameId)
        clearTimeout(timeoutId)
    };
  }, []);

  const card = (i: number) => (
    <div key={i} className="mx-4 w-[400px] shrink-0">
         <div className="transform scale-[0.5] origin-top-left rounded-lg overflow-hidden border bg-background p-4 shadow-sm">
            <div className="mb-3 aspect-[3/4] w-full rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-500/15" />
            <div className="space-y-2">
                <div className="h-4 w-2/3 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />
            </div>
        </div>
    </div>
  );

  const templatesToRender = [...Array(5), ...Array(5)];

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
      <div className="relative h-[600px] ">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="absolute top-0 left-0 flex w-max" ref={trackRef}>
            {templatesToRender.map((_, i) => (
                card(i)
            ))}
        </div>
      </div>
    </section>
  );
};
