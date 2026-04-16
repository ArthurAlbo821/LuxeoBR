"use client";

import dynamic from "next/dynamic";

const GlobeSection = dynamic(
  () => import("./globe-section").then((m) => ({ default: m.GlobeSection })),
  { ssr: false, loading: () => <div className="min-h-[600px]" /> }
);

const FeaturesSection = dynamic(
  () => import("./features-section").then((m) => ({ default: m.FeaturesSection })),
  { ssr: false, loading: () => <div className="min-h-[600px]" /> }
);

const HowItWorksSection = dynamic(
  () => import("./how-it-works-section").then((m) => ({ default: m.HowItWorksSection })),
  { ssr: false, loading: () => <div className="min-h-[500px]" /> }
);

const InfrastructureSection = dynamic(
  () => import("./infrastructure-section").then((m) => ({ default: m.InfrastructureSection })),
  { ssr: false, loading: () => <div className="min-h-[500px]" /> }
);

const MetricsSection = dynamic(
  () => import("./metrics-section").then((m) => ({ default: m.MetricsSection })),
  { ssr: false, loading: () => <div className="min-h-[500px]" /> }
);

const SecuritySection = dynamic(
  () => import("./security-section").then((m) => ({ default: m.SecuritySection })),
  { ssr: false, loading: () => <div className="min-h-[500px]" /> }
);

const CtaSection = dynamic(
  () => import("./cta-section").then((m) => ({ default: m.CtaSection })),
  { ssr: false, loading: () => <div className="min-h-[300px]" /> }
);

const FooterSection = dynamic(
  () => import("./footer-section").then((m) => ({ default: m.FooterSection })),
  { ssr: false, loading: () => <div className="min-h-[200px]" /> }
);

export function LazySections() {
  return (
    <>
      <GlobeSection />
      <FeaturesSection />
      <HowItWorksSection />
      <InfrastructureSection />
      <MetricsSection />
      <SecuritySection />
      <CtaSection />
      <FooterSection />
    </>
  );
}
