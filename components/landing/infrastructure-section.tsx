"use client";

import { useRef } from "react";
import { AsciiDna } from "./ascii-dna";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stackItems = [
  { name: "Frontend", tech: "Next.js, React, Tailwind", detail: "SSR + Edge" },
  { name: "Backend", tech: "Node.js, Python, Go", detail: "APIs + Microservices" },
  { name: "AI / ML", tech: "OpenAI, LangChain, Vercel AI", detail: "LLMs + Embeddings" },
  { name: "Database", tech: "PostgreSQL, Redis, Supabase", detail: "SQL + Cache" },
  { name: "Infra", tech: "Vercel, AWS, Docker", detail: "Cloud Native" },
  { name: "Ferramentas", tech: "GitHub, Linear, Figma", detail: "Dev + Design" },
];

export function InfrastructureSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Left content slides in from left
      gsap.from(".infra-left", {
        autoAlpha: 0,
        x: -50,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".infra-left",
          start: "top 80%",
        },
      });

      // Right content slides in from right
      gsap.from(".infra-right", {
        autoAlpha: 0,
        x: 50,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".infra-right",
          start: "top 80%",
        },
      });

      // Stagger region cards
      ScrollTrigger.batch(".infra-region", {
        onEnter: (elements) => {
          gsap.from(elements, {
            autoAlpha: 0,
            y: 30,
            x: 20,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          });
        },
        start: "top 90%",
        once: true,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="stack" className="relative py-32 bg-muted/30 overflow-hidden">
      {/* ASCII DNA Background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <AsciiDna className="w-[600px] h-[500px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="infra-left invisible">
            <p className="text-sm font-mono text-primary mb-4">// COMO CONSTRUÍMOS</p>
            <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-balance">
              Stack de quem constrói a sério.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Escolhemos as ferramentas certas para cada produto. Tecnologia moderna,
              battle-tested, que escala.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <pre className="font-mono text-2xl text-primary">⚡</pre>
                <div>
                  <h3 className="font-semibold mb-1">Entrega Contínua</h3>
                  <p className="text-sm text-muted-foreground">
                    CI/CD automatizado, preview deploys, zero downtime
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <pre className="font-mono text-2xl text-primary">🧠</pre>
                <div>
                  <h3 className="font-semibold mb-1">AI-First</h3>
                  <p className="text-sm text-muted-foreground">
                    LLMs, embeddings e pipelines de dados integrados desde o dia 1
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <pre className="font-mono text-2xl text-primary">📐</pre>
                <div>
                  <h3 className="font-semibold mb-1">Qualidade de Código</h3>
                  <p className="text-sm text-muted-foreground">
                    TypeScript strict, testes automatizados, code review rigoroso
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stack Grid */}
          <div className="infra-right invisible">
            <div className="grid grid-cols-1 gap-3">
              {stackItems.map((item) => (
                <div
                  key={item.name}
                  className="infra-region group relative bg-card rounded-lg p-5 border border-border card-shadow hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{item.name}</h4>
                    <span className="font-mono text-xs text-primary">{item.detail}</span>
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">
                    {item.tech}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 p-6 rounded-lg bg-foreground/5 border border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-mono text-2xl font-semibold text-primary">12+</div>
                  <div className="text-xs text-muted-foreground">Tecnologias</div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-semibold text-primary">100%</div>
                  <div className="text-xs text-muted-foreground">TypeScript</div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-semibold text-primary">CI/CD</div>
                  <div className="text-xs text-muted-foreground">Em todo projeto</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
