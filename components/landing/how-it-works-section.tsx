"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Target, Palette, Code, Rocket, TrendingUp } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  {
    number: "01",
    title: "Descoberta",
    description:
      "Entendemos o problema, mapeamos o mercado e definimos o escopo mínimo viável. Sem documentos de 50 páginas — um plano claro e executável.",
  },
  {
    number: "02",
    title: "Construção",
    description:
      "Sprints curtos, entregas contínuas. Design, código e testes integrados. Você acompanha cada commit, cada deploy.",
  },
  {
    number: "03",
    title: "Lançamento",
    description:
      "Go-to-market com produto real. Monitoramento, iteração rápida e operação contínua. Não entregamos e sumimos.",
  },
];

const timelineNodes = [
  {
    id: 1,
    title: "Research",
    date: "Semana 1-2",
    content:
      "Análise de mercado, entrevistas com usuários, estudo de concorrência.",
    category: "Descoberta",
    icon: Search,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Validação",
    date: "Semana 2-3",
    content: "Testes de hipótese, prototipagem rápida, feedback loop.",
    category: "Descoberta",
    icon: Target,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 3,
    title: "Design",
    date: "Semana 3-5",
    content: "UI/UX design, sistema de design, arquitetura técnica.",
    category: "Construção",
    icon: Palette,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 70,
  },
  {
    id: 4,
    title: "Dev",
    date: "Semana 5-10",
    content:
      "Sprints semanais, CI/CD, code review, testes automatizados.",
    category: "Construção",
    icon: Code,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 55,
  },
  {
    id: 5,
    title: "Launch",
    date: "Semana 10-11",
    content: "Deploy produção, monitoramento, go-to-market.",
    category: "Lançamento",
    icon: Rocket,
    relatedIds: [4, 6],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 6,
    title: "Escala",
    date: "Semana 12+",
    content: "Otimização, growth, iteração baseada em dados.",
    category: "Lançamento",
    icon: TrendingUp,
    relatedIds: [5],
    status: "pending" as const,
    energy: 15,
  },
];

const stepToNodes: Record<number, number[]> = {
  0: [1, 2],
  1: [3, 4],
  2: [5, 6],
};

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".hiw-header", {
        autoAlpha: 0,
        y: 35,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hiw-header",
          start: "top 85%",
        },
      });

      gsap.from(".hiw-steps", {
        autoAlpha: 0,
        x: -40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hiw-steps",
          start: "top 80%",
        },
      });

      gsap.from(".hiw-orbital", {
        autoAlpha: 0,
        scale: 0.85,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".hiw-orbital",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="metodo"
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="hiw-header invisible mb-20">
          <p className="text-sm font-mono text-primary mb-3">// MÉTODO</p>
          <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-6">
            <span className="text-balance">Três fases.</span>
            <br />
            <span className="text-balance">Um produto no ar.</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Steps list */}
          <div className="hiw-steps invisible space-y-2">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${
                  activeStep === index
                    ? "bg-card border-primary/50 card-shadow"
                    : "bg-transparent border-transparent hover:bg-card/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`font-mono text-sm transition-colors ${
                      activeStep === index
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                    <p
                      className={`text-sm leading-relaxed transition-colors ${
                        activeStep === index
                          ? "text-muted-foreground"
                          : "text-muted-foreground/60"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                {activeStep === index && (
                  <div className="mt-4 ml-8">
                    <div className="h-0.5 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full origin-left animate-[progress_4s_linear]"
                      />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Radial Orbital Timeline */}
          <div className="hiw-orbital invisible lg:sticky lg:top-32">
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <RadialOrbitalTimeline
                timelineData={timelineNodes}
                highlightedGroup={stepToNodes[activeStep]}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
}
