"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const integrations = [
  {
    name: "Next.js",
    category: "Framework",
    ascii: `  ▲
  ─`,
  },
  {
    name: "Supabase",
    category: "Backend",
    ascii: `  [█]
  [█]`,
  },
  {
    name: "OpenAI",
    category: "AI",
    ascii: `  ◈◈
  ◈◈`,
  },
  {
    name: "Linear",
    category: "Gestão",
    ascii: `  ┌─┐
  │→│
  └─┘`,
  },
  {
    name: "Figma",
    category: "Design",
    ascii: `  ╔═╗
  ║◇║
  ╚═╝`,
  },
  {
    name: "GitHub",
    category: "Código",
    ascii: `  ╔═╗
  ║<║
  ╚═╝`,
  },
  {
    name: "Vercel",
    category: "Deploy",
    ascii: `  ≋≋
  ≋≋`,
  },
  {
    name: "Stripe",
    category: "Pagamentos",
    ascii: `  ┌$┐
  └─┘`,
  },
];

export function IntegrationsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".integrations-header", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".integrations-header",
          start: "top 85%",
        },
      });

      // Batch animate integration cards
      ScrollTrigger.batch(".integration-card", {
        onEnter: (elements) => {
          gsap.from(elements, {
            autoAlpha: 0,
            y: 40,
            scale: 0.9,
            duration: 0.6,
            stagger: 0.07,
            ease: "back.out(1.4)",
          });
        },
        start: "top 88%",
        once: true,
      });

      gsap.from(".integrations-cta", {
        autoAlpha: 0,
        y: 35,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".integrations-cta",
          start: "top 88%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="integrations-header invisible text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-mono text-primary mb-4">// ECOSSISTEMA</p>
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-balance">
            Ferramentas que usamos.
            <br />
            Resultados que entregamos.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nosso stack não é só código. É o ecossistema completo que acelera
            cada fase do produto.
          </p>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="integration-card group relative bg-card rounded-xl p-6 border border-border card-shadow hover:border-primary/50 transition-all duration-500"
            >
              {/* ASCII Icon */}
              <pre className="font-mono text-lg text-primary mb-4 leading-tight h-12 flex items-center justify-center">
                {integration.ascii}
              </pre>

              <div className="text-center">
                <h3 className="font-semibold mb-1">{integration.name}</h3>
                <p className="text-xs text-muted-foreground">{integration.category}</p>
              </div>

              {/* Hover indicator */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-primary font-mono text-xs">&rarr;</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="integrations-cta invisible relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-muted/50 border border-border card-shadow">
          <div className="relative z-10 p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-semibold mb-4">
                  Quer construir algo junto?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Aplicamos o mesmo stack e rigor dos nossos produtos internos
                  em projetos selecionados de product engineering.
                </p>
                <a href="#contato" className="px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors inline-block">
                  Fale com a gente
                </a>
              </div>

              <div className="font-mono text-xs text-muted-foreground space-y-2 bg-background/50 rounded-lg p-6 border border-border">
                <div className="text-primary mb-2">// Início de todo projeto</div>
                <div>
                  <span className="text-purple-400">const</span> projeto ={" "}
                  <span className="text-blue-400">await</span> luxeo.start({"{"}
                </div>
                <div className="pl-4">
                  <span className="text-green-400">tipo</span>:{" "}
                  <span className="text-yellow-400">&apos;product-engineering&apos;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-green-400">stack</span>:{" "}
                  <span className="text-yellow-400">&apos;custom&apos;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-green-400">prazo</span>:{" "}
                  <span className="text-yellow-400">&apos;agressivo&apos;</span>
                </div>
                <div>{"}"});</div>
              </div>
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 grid-pattern pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
