"use client"

import { useEffect, useState } from "react"
import { Globe } from "@/components/ui/cobe-globe"

const markers = [
  { id: "saopaulo", location: [-23.5505, -46.6333] as [number, number], label: "São Paulo" },
  { id: "geneve", location: [46.2044, 6.1432] as [number, number], label: "Genève" },
]

const arcs = [
  {
    id: "gru-gva",
    from: [-23.5505, -46.6333] as [number, number],
    to: [46.2044, 6.1432] as [number, number],
    label: "GRU → GVA",
  },
]

const features = [
  {
    title: "Edge Computing",
    description:
      "Distribute intelligent workloads closer to users. Sub-20ms inference latency across 300+ global PoPs.",
  },
  {
    title: "99.99% Uptime",
    description:
      "Self-healing clusters and automated multi-region failover guarantee enterprise-grade resilience.",
  },
  {
    title: "Auto-scaling",
    description:
      "Elastic resource provisioning adapts to your traffic patterns dynamically without manual devops.",
  },
]

export function GlobeSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative w-full border-t border-border/30 overflow-hidden py-20 md:py-32 lg:py-40">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to bottom, black 10%, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 10%, transparent 90%)",
        }}
      />

      {/* Ambient glow behind globe */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] aspect-square bg-primary opacity-[0.03] rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 z-10">
        {/* Left column: Content */}
        <div className="flex-1 w-full flex flex-col items-start min-w-[300px]">
          {/* Badge */}
          <div
            className={`flex items-center gap-3 mb-6 bg-white/[0.03] border border-white/[0.08] rounded-full pl-2 pr-4 py-1.5 backdrop-blur-sm transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_8px_var(--primary)]" />
            </span>
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] text-primary uppercase pt-0.5">
              Global Infrastructure
            </span>
          </div>

          {/* Heading */}
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] mb-6 tracking-tight transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "var(--font-geist-pixel-line), monospace" }}
          >
            <span className="block text-foreground/90">Deploy anywhere.</span>
            <span className="block bg-gradient-to-r from-foreground to-foreground/40 bg-clip-text text-transparent">
              Scale everywhere.
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className={`text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mb-12 font-light transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Our infrastructure spans across continents, ensuring low-latency access and maximum
            uptime for your{" "}
            <span className="text-foreground/80 font-normal">agentic applications</span> worldwide.
          </p>

          {/* Features */}
          <div
            className={`flex flex-col gap-8 w-full max-w-lg mt-2 relative before:absolute before:left-[27px] before:top-4 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-white/10 before:via-white/5 before:to-transparent transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-6 items-start group cursor-default">
                <div className="relative z-10 w-14 h-14 rounded-xl bg-[#14161b] border border-white/10 shadow-[inset_0_1px_rgba(255,255,255,0.05)] flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-colors duration-500 overflow-hidden shrink-0">
                  <div className="absolute inset-x-0 -bottom-full h-full bg-gradient-to-t from-primary/20 to-transparent group-hover:bottom-0 transition-all duration-500 ease-out" />
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                </div>
                <div className="pt-1 flex-1">
                  <h3 className="text-foreground/90 font-semibold mb-1.5 text-base tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Globe */}
        <div
          className={`flex-1 w-full max-w-[500px] lg:max-w-none lg:w-[500px] relative flex items-center justify-center mt-8 lg:mt-0 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Orbital ring decoration */}
          <div className="absolute inset-0 rounded-full border border-white/[0.04] flex items-center justify-center -rotate-12 pointer-events-none">
            <div className="w-[85%] h-[85%] rounded-full border border-dashed border-white/[0.08] animate-[spin_60s_linear_infinite]" />
          </div>

          <Globe
            markers={markers}
            arcs={arcs}
            markerColor={[0.3, 0.85, 0.75]}
            baseColor={[0.15, 0.15, 0.2]}
            arcColor={[0.3, 0.85, 0.75]}
            glowColor={[0.05, 0.05, 0.1]}
            dark={1}
            mapBrightness={6}
            markerSize={0.03}
            markerElevation={0.015}
            speed={0.002}
            className="w-full"
          />
        </div>
      </div>
    </section>
  )
}
