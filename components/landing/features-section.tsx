"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AsciiCube } from "./ascii-cube";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Animated ASCII generators
const asciiAnimations = {
  neural: (frame: number) => {
    const states = ["◉", "◎", "○", "◎"];
    const getChar = (offset: number) => states[(frame + offset) % states.length];
    return `  ┌───────┐
  │ ${getChar(0)} ${getChar(1)} ${getChar(2)} │
  │ ${getChar(3)} ${getChar(4)} ${getChar(5)} │
  │ ${getChar(6)} ${getChar(7)} ${getChar(8)} │
  └───────┘`;
  },
  workflow: (frame: number) => {
    const arrows = ["─", "═", "━", "═"];
    const pulse = ["►", "▸", "▹", "▸"];
    const a = arrows[frame % arrows.length];
    const p = pulse[frame % pulse.length];
    return `  ┌─┐   ┌─┐
  │A├${a}${a}${p}│B│
  └─┘   └┬┘
        ┌▼┐
        │C│
        └─┘`;
  },
  security: (frame: number) => {
    const lock = ["◈", "◇", "◆", "◇"];
    const bars = ["░", "▒", "▓", "▒"];
    const l = lock[frame % lock.length];
    const b = bars[frame % bars.length];
    return `   ╔═══╗
   ║ ${l} ║
  ┌╨───╨┐
  │${b}${b}${b}${b}${b}│
  └─────┘`;
  },
  analytics: (frame: number) => {
    const heights = [
      [1, 2, 3, 2],
      [2, 3, 2, 3],
      [3, 2, 3, 1],
      [2, 1, 2, 2],
    ];
    const h = heights[frame % heights.length];
    const bar = (height: number) => {
      if (height === 3) return "█";
      if (height === 2) return "▄";
      return "▁";
    };
    return `  │${h[0] === 3 ? "▄" : " "}${h[1] === 3 ? "▄" : " "}${h[2] === 3 ? "▄" : " "}${h[3] === 3 ? "▄" : " "}
  │${bar(h[0])} ${bar(h[1])} ${bar(h[2])} ${bar(h[3])}
  │█ █ █ █
  └────────`;
  },
  globe: (frame: number) => {
    const rotations = [
      `    .--.
   /    \\
  | (  ) |
   \\    /
    '--'`,
      `    .--.
   /    \\
  |  () |
   \\    /
    '--'`,
      `    .--.
   /    \\
  |  (  )|
   \\    /
    '--'`,
      `    .--.
   /    \\
  | ()  |
   \\    /
    '--'`,
    ];
    return rotations[frame % rotations.length];
  },
  api: (frame: number) => {
    const methods = ["GET", "POST", "PUT", "GET"];
    const arrows = [
      "────────►",
      "═══════►",
      "━━━━━━━►",
      "────────►",
    ];
    const m = methods[frame % methods.length];
    const a = arrows[frame % arrows.length];
    return `  ${m} /api
  ${a}
  ◄────────
  { data }`;
  },
};

const features = [
  {
    title: "Neural Processing",
    description: "Advanced deep learning models that understand context and adapt to your specific business needs.",
    animationKey: "neural" as const,
  },
  {
    title: "Smart Workflows",
    description: "Visual workflow builder with drag-and-drop simplicity. Chain AI actions to create powerful automations.",
    animationKey: "workflow" as const,
  },
  {
    title: "Enterprise Security",
    description: "SOC 2 Type II certified with end-to-end encryption. Your data never leaves your control.",
    animationKey: "security" as const,
  },
  {
    title: "Real-time Analytics",
    description: "Live dashboards and instant insights. Monitor performance and optimize workflows on the fly.",
    animationKey: "analytics" as const,
  },
  {
    title: "Global Scale",
    description: "Distributed infrastructure across 12 regions. Sub-100ms latency worldwide.",
    animationKey: "globe" as const,
  },
  {
    title: "API First",
    description: "RESTful and GraphQL APIs with comprehensive SDKs. Integrate Nexus into any stack.",
    animationKey: "api" as const,
  },
];

function AnimatedAscii({ animationKey }: { animationKey: keyof typeof asciiAnimations }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => f + 1);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const getAscii = useCallback(() => {
    return asciiAnimations[animationKey](frame);
  }, [animationKey, frame]);

  return (
    <pre className="font-mono text-xs text-primary leading-tight whitespace-pre">
      {getAscii()}
    </pre>
  );
}

function FeatureCard({
  feature,
}: {
  feature: (typeof features)[0];
}) {
  return (
    <div className="feature-card group relative rounded-xl p-8 card-shadow hover:border-primary/50 bg-transparent border-0 border-none border-transparent">
      {/* Animated ASCII Icon */}
      <div className="mb-6 h-20 flex items-center">
        <AnimatedAscii animationKey={feature.animationKey} />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate the header
      gsap.from(".features-header-title", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features-header-title",
          start: "top 85%",
        },
      });

      gsap.from(".features-header-desc", {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features-header-desc",
          start: "top 85%",
        },
      });

      // Batch animate feature cards with stagger
      ScrollTrigger.batch(".feature-card", {
        onEnter: (elements) => {
          gsap.from(elements, {
            autoAlpha: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          });
        },
        start: "top 88%",
        once: true,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header with ASCII cube */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="text-sm font-mono text-primary mb-3">// PLATFORM</p>
            <h2 className="features-header-title invisible text-3xl lg:text-5xl font-semibold tracking-tight mb-6">
              <span className="text-balance">Everything you need</span>
              <br />
              <span className="text-balance">to build at scale.</span>
            </h2>
            <p className="features-header-desc invisible text-lg text-muted-foreground leading-relaxed max-w-lg">
              A complete platform for building, deploying, and scaling AI applications.
              From prototype to production in minutes, not months.
            </p>
          </div>

          {/* ASCII Cube visualization */}
          <div className="flex justify-center lg:justify-end">
            <AsciiCube className="w-[480px] h-[640px]" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
