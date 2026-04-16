"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AsciiCube } from "./ascii-cube";
import { AsciiSphere } from "./ascii-sphere";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Main CTA card entrance
      gsap.from(".cta-card", {
        autoAlpha: 0,
        y: 60,
        scale: 0.97,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-card",
          start: "top 85%",
        },
      });

      // Stagger CTA content
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cta-card",
          start: "top 75%",
        },
      });

      tl.from(".cta-title", {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".cta-desc",
          {
            autoAlpha: 0,
            y: 20,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".cta-buttons",
          {
            autoAlpha: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        );

      // Subtle parallax on the CTA card
      gsap.to(".cta-card", {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="cta-card relative rounded-2xl overflow-hidden">
          {/* Background with grid */}
          <div className="absolute inset-0 bg-foreground" />
          <div className="absolute inset-0 grid-pattern opacity-10" />

          {/* Cube animation as full background */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 overflow-hidden opacity-25">
            <AsciiCube className="w-[600px] h-[500px]" />
          </div>

          <div className="relative z-10 px-8 lg:px-16 py-16 bg-transparent lg:py-0.5">
            <div className="flex items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="cta-title invisible text-3xl lg:text-5xl font-semibold tracking-tight mb-6 text-background text-balance">
                  Start building the future, today.
                </h2>

                <p className="cta-desc invisible text-lg text-background/70 mb-8 leading-relaxed max-w-lg">
                  Join thousands of teams shipping faster with Nexus. Free to start, scales with
                  you.
                </p>

                <div className="cta-buttons invisible flex flex-col sm:flex-row items-start gap-4">
                  <Button
                    size="lg"
                    className="bg-background hover:bg-background/90 text-foreground px-6 h-12 text-sm font-medium group"
                  >
                    Get started free
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-6 text-sm font-medium border-background/30 text-background hover:bg-background/10 bg-transparent"
                  >
                    Talk to sales
                  </Button>
                </div>

                <p className="text-sm text-background/50 mt-6 font-mono">
                  No credit card required
                </p>
              </div>

              {/* Animated ASCII Sphere */}
              <div className="hidden lg:block opacity-40">
                <AsciiSphere className="w-[600px] h-[560px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
