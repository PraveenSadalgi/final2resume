
"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sparkles, Bot, Zap, CheckCircle2, ArrowRight, Shield, FileText, Wand2, Stars, MousePointerClick } from "lucide-react";
import Link from 'next/link';
import { TemplateShowcase } from "@/components/template-showcase";


const GradientBackground: React.FC = () => {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.violet.500/.25),transparent_60%)] blur-2xl" />
      <div className="absolute -bottom-40 right-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.cyan.500/.20),transparent_60%)] blur-2xl" />
    </div>
  );
};

const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div style={{ scaleX }} className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />
  );
};

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -160]);

  return (
    <section id="hero" ref={ref} className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-24 pt-28 md:grid-cols-2">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-4 inline-flex items-center gap-2"> <Sparkles className="h-4 w-4" /> New: AI bullet→polish</Badge>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Build a job‑ready resume
              <span className="block bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                in seconds with AI
              </span>
            </h1>
            <p className="mb-6 max-w-xl text-base text-muted-foreground md:text-lg">
              ResuAI turns your experience into ATS‑friendly, beautifully designed resumes. Write bullet points with AI, tailor for roles, and export instantly.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
               <Button asChild size="lg" className="group">
                <Link href="/editor">
                    Try it free
                    <Stars className="ml-2 h-5 w-5 transition group-hover:scale-110" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#how"> See how it works </a>
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1"><Shield className="h-4 w-4" /> Privacy-first</div>
              <div className="flex items-center gap-1"><Zap className="h-4 w-4" /> Fast & simple</div>
              <div className="flex items-center gap-1"><FileText className="h-4 w-4" /> ATS-optimized</div>
            </div>
          </motion.div>
        </div>
        <div className="relative">
          <motion.div style={{ y: y1 }} className="relative rounded-2xl border bg-card p-4 shadow-xl">
            <div className="rounded-xl border bg-background p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <Badge variant="secondary">Preview</Badge>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-3">
                  <div className="aspect-square w-full rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20" />
                  <div className="space-y-2">
                    <div className="h-3 w-2/3 rounded bg-muted" />
                    <div className="h-3 w-1/2 rounded bg-muted" />
                  </div>
                  <Button variant="secondary" size="sm" className="w-full">Upload Photo</Button>
                </div>
                <div className="col-span-2 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Name" />
                    <Input placeholder="Email" />
                    <Input placeholder="Role" />
                    <Input placeholder="Location" />
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="mb-2 flex items-center justify-between text-sm font-medium">
                      Experience <Badge variant="outline">AI assist</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Wand2 className="h-4 w-4" /> Try: “Boosted checkout conversion by 18% using A/B tests.”
                      </div>
                      <div className="h-9 w-full rounded-md border bg-background/60" />
                       <Button size="sm" className="w-full">
                         <Link href="/editor">Generate bullet with AI</Link>
                       </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>ATS score: <span className="font-semibold text-foreground">92</span></span>
                    <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Ready to apply</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute -left-6 -top-6 -z-10 hidden h-40 w-40 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 blur-xl md:block" />
        </div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{ title: string; icon: React.ReactNode; desc: string; }>= ({ title, icon, desc }) => (
  <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="rounded-xl bg-primary/10 p-2 text-primary">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const Features: React.FC = () => {
  const items = [
    { title: "AI Bullet Writer", icon: <Wand2 className="h-5 w-5" />, desc: "Turn raw achievements into crisp, quantified bullets in one click." },
    { title: "1‑Click Tailoring", icon: <MousePointerClick className="h-5 w-5" />, desc: "Paste a job link or JD; we align your resume to match keywords." },
    { title: "Beautiful Templates", icon: <Sparkles className="h-5 w-5" />, desc: "Designer-made, ATS-friendly templates with sensible typography." },
    { title: "Metrics & Impact", icon: <Zap className="h-5 w-5" />, desc: "Auto-suggest metrics, action verbs, and outcomes to show impact." },
    { title: "Privacy First", icon: <Shield className="h-5 w-5" />, desc: "Your data stays yours. Export locally, control what’s shared." },
    { title: "One‑click Export", icon: <FileText className="h-5 w-5" />, desc: "Export to PDF/DOCX; switch templates without reformatting." },
  ];
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Everything you need to stand out</h2>
        <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">Craft, tailor, and ship a high‑impact resume without wrestling with design or formatting.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <FeatureCard key={it.title} {...it} />
        ))}
      </div>
    </section>
  );
};

const HowItWorks: React.FC = () => {
  const steps = [
    { title: "Describe your experience", desc: "Type a rough bullet or paste from LinkedIn/portfolio.", icon: <FileText className="h-5 w-5" /> },
    { title: "Polish with AI", desc: "Rewrite bullets with strong verbs, metrics, and clarity.", icon: <Wand2 className="h-5 w-5" /> },
    { title: "Tailor to job", desc: "Paste a job link; we match keywords and boost ATS score.", icon: <Stars className="h-5 w-5" /> },
    { title: "Export & apply", desc: "Pick a template and export to PDF/DOCX instantly.", icon: <ArrowRight className="h-5 w-5" /> },
  ];
  return (
    <section id="how" className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How it works</h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">From messy notes to a polished resume in minutes.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="relative">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="rounded-xl bg-primary/10 p-2 text-primary">{s.icon}</span>
                    {i + 1}. {s.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA: React.FC = () => (
  <section className="relative py-20">
    <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border bg-gradient-to-br from-violet-600 to-fuchsia-600 p-1 shadow-xl">
      <div className="rounded-[22px] bg-background px-8 py-12 sm:px-12">
        <div className="grid items-center gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold tracking-tight md:text-3xl">Ready to land more interviews?</h3>
            <p className="mt-2 text-muted-foreground">Start free. No credit card required. Generate your first resume in minutes.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button asChild size="lg" className="group">
              <Link href="/editor">
                Start building now
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">View pricing</Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FAQ: React.FC = () => (
  <section id="faq" className="bg-muted/30 py-20">
    <div className="mx-auto max-w-4xl px-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Frequently asked questions</h2>
        <p className="mt-2 text-muted-foreground">All the nitty-gritty answered in one place.</p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is ResuAI ATS-friendly?</AccordionTrigger>
          <AccordionContent>
            Yes. Our templates use clean structure, logical headings, and avoid images/columns that confuse parsers.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Do I need a credit card to start?</AccordionTrigger>
          <AccordionContent>
            No. You can try ResuAI for free and export a sample PDF before upgrading.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I tailor my resume to a job post?</AccordionTrigger>
          <AccordionContent>
            Absolutely. Paste the job description or link; ResuAI highlights keywords and suggests tweaks.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Will my data be private?</AccordionTrigger>
          <AccordionContent>
            We’re privacy-first. Your data isn’t sold, and you control exports. You can delete everything anytime.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer id="contact" className="border-t">
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2">
            <div className="rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 p-2 text-white shadow">
              <Bot className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold">ResuAI</span>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">AI‑powered resume builder to help you land interviews faster.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-foreground">Features</a></li>
            <li><a href="#templates" className="hover:text-foreground">Templates</a></li>
            <li><a href="#how" className="hover:text-foreground">How it works</a></li>
            <li><a className="hover:text-foreground">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-foreground">About</a></li>
            <li><a className="hover:text-foreground">Careers</a></li>
            <li><a className="hover:text-foreground">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Get in touch</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-foreground">support@resuai.app</a></li>
            <li><a className="hover:text-foreground">Twitter</a></li>
            <li><a className="hover:text-foreground">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 flex flex-col justify-between gap-4 border-t pt-6 text-xs text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} ResuAI. All rights reserved.</p>
        <div className="flex gap-4">
          <a className="hover:text-foreground">Privacy</a>
          <a className="hover:text-foreground">Terms</a>
          <a className="hover:text-foreground">Security</a>
        </div>
      </div>
    </div>
  </footer>
);

const NoiseOverlay: React.FC = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1400\" height=\"800\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.5\"/></svg>')" }} />
);

export default function ResuAIHome() {
  useEffect(() => {
    const handler = (e: Event) => {
      const t = e.target as HTMLElement;
      const a = t.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href')?.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ScrollProgressBar />
      <GradientBackground />
      <NoiseOverlay />
      <Hero />
      <Features />
      <HowItWorks />
      <TemplateShowcase />
      <CTA />
      <FAQ />
      <Footer />
    </main>
  );
}
