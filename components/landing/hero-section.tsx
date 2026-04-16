"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AsciiWave } from "./ascii-wave";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
      })
        .from(
          ".hero-headline",
          {
            autoAlpha: 0,
            y: 40,
            duration: 1,
          },
          "-=0.5"
        )
        .from(
          ".hero-subtitle",
          {
            autoAlpha: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".hero-cta",
          {
            autoAlpha: 0,
            y: 25,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ".hero-stat",
          {
            autoAlpha: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* ASCII Wave full width and height */}
      <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
        <AsciiWave className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-24">
        {/* Badge */}
        <div className="hero-badge invisible flex justify-center mb-10"></div>

        {/* Headline */}
        <div className="text-center max-w-5xl mx-auto mb-10">
          <h1
            className="hero-headline invisible text-5xl md:text-7xl font-semibold tracking-tight leading-[0.95] mb-8 lg:text-7xl"
            style={{ fontFamily: "var(--font-geist-pixel-line), monospace" }}
          >
            <span className="text-balance">The complete platform to</span>
            <br />
            <span className="text-balance">build the</span>{" "}
            <span className="text-primary">future.</span>
          </h1>

          <p className="hero-subtitle invisible text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Your toolkit to stop configuring and start innovating. Securely
            build, deploy, and scale AI-powered applications.
          </p>
        </div>

        {/* CTAs */}
        <div className="hero-cta invisible flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
          <Button
            size="lg"
            className="bg-foreground hover:bg-foreground/90 text-background px-6 h-11 text-sm font-medium group"
          >
            Get a demo
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-11 px-6 text-sm font-medium border-border hover:bg-secondary/50 bg-transparent"
          >
            Explore the Product
          </Button>
        </div>

        {/* Stats with company logos style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden card-shadow">
          {[
            {
              value: "20 days",
              label: "saved on daily builds.",
              company: "STRIPE",
            },
            {
              value: "98%",
              label: "faster time to market.",
              company: "VERCEL",
            },
            {
              value: "300%",
              label: "increase in throughput.",
              company: "LINEAR",
            },
            {
              value: "6x",
              label: "faster to build + deploy.",
              company: "NOTION",
            },
          ].map((stat) => (
            <div
              key={stat.company}
              className="hero-stat invisible p-6 lg:p-8 flex justify-between min-h-[140px] bg-black shadow-none lg:py-8 flex-col"
            >
              <div>
                <span className="text-xl lg:text-2xl font-semibold">
                  {stat.value}
                </span>
                <span className="text-muted-foreground text-sm lg:text-base">
                  {" "}
                  {stat.label}
                </span>
              </div>
              <div className="font-mono text-xs text-muted-foreground/60 tracking-widest mt-4">
                {stat.company}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
