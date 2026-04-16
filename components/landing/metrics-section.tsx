"use client";

import { useEffect, useState, useRef } from "react";
import { AsciiWave } from "./ascii-wave";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const visionMetrics = [
  {
    value: "2026",
    label: "Primeiro produto próprio",
    sublabel: "Em desenvolvimento",
  },
  {
    value: "3",
    label: "Produtos no pipeline",
    sublabel: "SaaS B2B + AI",
  },
  {
    value: "CH + BR",
    label: "Operação bi-continental",
    sublabel: "Genebra + São Paulo",
  },
  {
    value: "∞",
    label: "Ideias por validar",
    sublabel: "O pipeline não para",
  },
];

const roadmapEntries = [
  { time: "now", event: "Produto #1 em desenvolvimento", region: "SP", status: "WIP" },
  { time: "Q2", event: "Lançamento MVP interno", region: "CH", status: "PLAN" },
  { time: "Q3", event: "Product engineering — cliente #1", region: "SP+CH", status: "NEXT" },
  { time: "Q4", event: "Expansão do time de engenharia", region: "BR", status: "PLAN" },
];

export function MetricsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".metrics-header", {
        autoAlpha: 0,
        y: 35,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".metrics-header",
          start: "top 85%",
        },
      });

      // Metrics cards stagger
      ScrollTrigger.batch(".metric-card", {
        onEnter: (elements) => {
          gsap.from(elements, {
            autoAlpha: 0,
            y: 40,
            scale: 0.95,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
          });
        },
        start: "top 88%",
        once: true,
      });

      // Activity feed slides up
      gsap.from(".metrics-feed", {
        autoAlpha: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".metrics-feed",
          start: "top 90%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* ASCII Wave Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <AsciiWave className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="metrics-header invisible mb-16">
          <p className="text-sm font-mono text-primary mb-3">// VISÃO</p>
          <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight text-balance">
            O que estamos construindo.
            <br />
            E para onde vamos.
          </h2>
        </div>

        {/* Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden card-shadow">
          {visionMetrics.map((metric) => (
            <div
              key={metric.label}
              className="metric-card bg-card p-8 flex flex-col gap-4"
            >
              <div className="text-primary">
                <div className="font-mono text-4xl lg:text-6xl font-semibold tracking-tight">
                  {metric.value}
                </div>
              </div>
              <div>
                <div className="text-foreground font-medium">{metric.label}</div>
                <div className="text-sm text-muted-foreground">{metric.sublabel}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Roadmap Feed */}
        <div className="metrics-feed invisible mt-12 p-6 rounded-xl bg-card border border-border card-shadow">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-sm text-muted-foreground">// log de atividade</span>
          </div>
          <div className="font-mono text-xs space-y-2 text-muted-foreground overflow-hidden">
            {roadmapEntries.map((entry) => (
              <div key={entry.event} className="flex items-center gap-4 animate-in slide-in-from-bottom-2 duration-500">
                <span className="text-muted-foreground/50 w-8">{entry.time}</span>
                <span className="text-foreground">{entry.event}</span>
                <span className="text-muted-foreground/50">{entry.region}</span>
                <span className={
                  entry.status === "WIP" ? "text-green-500" :
                  entry.status === "PLAN" ? "text-yellow-500" :
                  "text-primary"
                }>{entry.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
