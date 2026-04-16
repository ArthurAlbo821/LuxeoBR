"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/use-in-view";

export function AsciiDna({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const isInViewRef = useRef(false);

  useEffect(() => {
    isInViewRef.current = isInView;
  }, [isInView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let running = false;

    const width = 60;
    const height = 100;

    canvas.width = width * 8;
    canvas.height = height * 6;

    const animate = () => {
      if (!isInViewRef.current) {
        running = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "11px JetBrains Mono, monospace";

      for (let y = 0; y < height; y++) {
        const offset = y * 0.15 + time;

        const x1 = Math.sin(offset) * 15 + width / 2;
        const z1 = Math.cos(offset);

        const x2 = Math.sin(offset + Math.PI) * 15 + width / 2;
        const z2 = Math.cos(offset + Math.PI);

        if (y % 4 === 0) {
          const steps = 20;
          for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const bx = x1 + (x2 - x1) * t;
            const bz = z1 + (z2 - z1) * t;
            const alpha = (bz + 1) / 2 * 0.5 + 0.2;
            ctx.fillStyle = `oklch(0.6 0.12 180 / ${alpha})`;
            ctx.fillText("─", bx * 8, y * 6 + 6);
          }
        }

        const alpha1 = (z1 + 1) / 2 * 0.8 + 0.2;
        const char1 = z1 > 0 ? "●" : "○";
        ctx.fillStyle = `oklch(0.7 0.18 170 / ${alpha1})`;
        ctx.fillText(char1, x1 * 8, y * 6 + 6);

        const alpha2 = (z2 + 1) / 2 * 0.8 + 0.2;
        const char2 = z2 > 0 ? "●" : "○";
        ctx.fillStyle = `oklch(0.65 0.15 150 / ${alpha2})`;
        ctx.fillText(char2, x2 * 8, y * 6 + 6);
      }

      time += 0.04;
      animationId = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (!running && isInViewRef.current) {
        running = true;
        animationId = requestAnimationFrame(animate);
      }
    };

    startLoop();

    const interval = setInterval(() => {
      if (isInViewRef.current && !running) startLoop();
    }, 200);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
