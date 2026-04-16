"use client";

import { useEffect, useRef } from "react";
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
};

const features = [
  {
    title: "Incubação de Produtos",
    description: "Identificamos oportunidades, validamos hipóteses e construímos MVPs com rigor técnico e visão de negócio.",
    animationKey: "neural" as const,
  },
  {
    title: "Engenharia de Produto",
    description: "Design, desenvolvimento e deploy. Stack moderna, código limpo, entrega contínua. Do protótipo à produção.",
    animationKey: "workflow" as const,
  },
  {
    title: "Operação & Escala",
    description: "Infraestrutura, monitoramento e otimização. Operamos os produtos que construímos com ownership real.",
    animationKey: "analytics" as const,
  },
];

function AnimatedAscii({ animationKey }: { animationKey: keyof typeof asciiAnimations }) {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    let frame = 0;
    if (preRef.current) {
      preRef.current.textContent = asciiAnimations[animationKey](frame);
    }
    const interval = setInterval(() => {
      frame++;
      if (preRef.current) {
        preRef.current.textContent = asciiAnimations[animationKey](frame);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [animationKey]);

  return (
    <pre ref={preRef} className="font-mono text-xs text-primary leading-tight whitespace-pre" />
  );
}

function FeatureCard({ feature }: { feature: (typeof features)[0] }) {
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
      id="studio"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <p className="text-sm font-mono text-primary mb-3">// STUDIO</p>
          <h2 className="features-header-title invisible text-3xl lg:text-5xl font-semibold tracking-tight mb-6">
            <span className="text-balance">Tudo que você precisa</span>
            <br />
            <span className="text-balance">para lançar um produto.</span>
          </h2>
          <p className="features-header-desc invisible text-lg text-muted-foreground leading-relaxed max-w-lg">
            Do conceito à operação. Combinamos estratégia de produto, engenharia de software
            e operação para transformar ideias em negócios reais.
          </p>
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
