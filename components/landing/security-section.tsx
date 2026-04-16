"use client";

import { useRef } from "react";
import { AsciiTorus } from "./ascii-torus";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const securityFeatures = [
  {
    title: "End-to-End Encryption",
    description: "AES-256 encryption for data at rest and in transit",
    ascii: `  ╔═══╗
  ║ ◈ ║
  ╚═══╝`,
  },
  {
    title: "Zero Trust Architecture",
    description: "Every request is authenticated and authorized",
    ascii: `  ┌───┐
  │ ✓ │
  └───┘`,
  },
  {
    title: "SOC 2 Type II",
    description: "Independently audited security controls",
    ascii: `  ╭───╮
  │ ★ │
  ╰───╯`,
  },
  {
    title: "GDPR Compliant",
    description: "Full compliance with data protection regulations",
    ascii: `  [===]
  [===]`,
  },
  {
    title: "Role-Based Access",
    description: "Granular permissions for team members",
    ascii: `  ◉─◉─◉
  │ │ │`,
  },
  {
    title: "Audit Logs",
    description: "Complete visibility into all system activities",
    ascii: `  ▪ ▪ ▪
  ▪ ▪ ▪`,
  },
];

const certifications = [
  { name: "SOC 2", status: "Type II" },
  { name: "ISO 27001", status: "Certified" },
  { name: "HIPAA", status: "Compliant" },
  { name: "GDPR", status: "Compliant" },
];

export function SecuritySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Header
      gsap.from(".security-header", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".security-header",
          start: "top 85%",
        },
      });

      // Batch security cards
      ScrollTrigger.batch(".security-card", {
        onEnter: (elements) => {
          gsap.from(elements, {
            autoAlpha: 0,
            y: 40,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
          });
        },
        start: "top 88%",
        once: true,
      });

      // Certifications bar
      gsap.from(".security-certs", {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".security-certs",
          start: "top 90%",
        },
      });

      // Bug bounty notice
      gsap.from(".security-notice", {
        autoAlpha: 0,
        y: 25,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".security-notice",
          start: "top 92%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-32 bg-muted/30 overflow-hidden">
      {/* ASCII Torus Background */}
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
        <AsciiTorus className="w-[500px] h-[450px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="security-header invisible text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-mono text-primary mb-4">// ENTERPRISE SECURITY</p>
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-balance">
            Security you can trust.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Bank-level security with enterprise-grade compliance. Your data is protected by
            industry-leading encryption and access controls.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {securityFeatures.map((feature) => (
            <div
              key={feature.title}
              className="security-card bg-card rounded-xl p-6 border border-border card-shadow hover:border-primary/50 transition-all duration-500"
            >
              {/* ASCII Icon */}
              <pre className="font-mono text-sm text-primary mb-4 leading-tight h-12 flex items-center">
                {feature.ascii}
              </pre>

              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Certifications Bar */}
        <div className="security-certs invisible rounded-xl bg-card border border-border card-shadow p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Certified & Compliant</h3>
              <p className="text-sm text-muted-foreground">
                Independently verified security and compliance standards
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="flex flex-col items-center gap-2 px-6 py-4 rounded-lg bg-muted/50 border border-border"
                >
                  <span className="font-mono text-xs text-primary">{cert.name}</span>
                  <span className="text-xs text-muted-foreground">{cert.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="security-notice invisible mt-8 p-6 rounded-xl bg-foreground/5 border border-primary/20">
          <div className="flex items-start gap-4">
            <pre className="font-mono text-2xl text-primary mt-1">🔒</pre>
            <div>
              <h4 className="font-semibold mb-2">Bug Bounty Program</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We work with security researchers worldwide to identify and fix vulnerabilities.
                Report security issues and get rewarded.
                <a href="#" className="text-primary hover:underline ml-1">
                  Learn more &rarr;
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
