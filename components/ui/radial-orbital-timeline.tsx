"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  highlightedGroup?: number[];
}

const RADIUS = 150;
const ROTATION_DURATION = 60; // seconds for full rotation

export default function RadialOrbitalTimeline({
  timelineData,
  highlightedGroup,
}: RadialOrbitalTimelineProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [frozenAngle, setFrozenAngle] = useState(0);
  const orbitRef = useRef<HTMLDivElement>(null);

  // When a node is clicked, freeze the CSS animation at its current angle
  const freezeCurrentAngle = useCallback(() => {
    if (!orbitRef.current) return 0;
    const style = getComputedStyle(orbitRef.current);
    const matrix = style.transform;
    if (matrix === "none") return 0;
    const values = matrix.split("(")[1].split(")")[0].split(",");
    const a = parseFloat(values[0]);
    const b = parseFloat(values[1]);
    return Math.round(Math.atan2(b, a) * (180 / Math.PI));
  }, []);

  const toggleItem = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
      setAutoRotate(true);
    } else {
      const angle = freezeCurrentAngle();
      setFrozenAngle(angle);
      setExpandedId(id);
      setAutoRotate(false);
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (orbitRef.current && e.target === orbitRef.current)) {
      setExpandedId(null);
      setAutoRotate(true);
    }
  };

  const getRelatedItems = (itemId: number): number[] => {
    const item = timelineData.find((t) => t.id === itemId);
    return item ? item.relatedIds : [];
  };

  const isHighlighted = (itemId: number): boolean => {
    return !!highlightedGroup?.includes(itemId);
  };

  const isDimmed = (itemId: number): boolean => {
    if (!highlightedGroup || highlightedGroup.length === 0) return false;
    return !highlightedGroup.includes(itemId) && expandedId !== itemId;
  };

  const isRelatedToExpanded = (itemId: number): boolean => {
    if (!expandedId) return false;
    return getRelatedItems(expandedId).includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-foreground bg-primary/20 border-primary/50";
      case "in-progress":
        return "text-primary-foreground bg-primary border-primary";
      case "pending":
        return "text-muted-foreground bg-muted/50 border-border";
      default:
        return "text-muted-foreground bg-muted/50 border-border";
    }
  };

  // Each node is placed at a fixed angle, the orbit container rotates via CSS
  const getNodeStaticPosition = (index: number, total: number) => {
    const angle = (index / total) * 360;
    const radian = (angle * Math.PI) / 180;
    return {
      x: RADIUS * Math.cos(radian),
      y: RADIUS * Math.sin(radian),
      angle,
    };
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center overflow-visible"
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
        {/* Center pulsing orb — does NOT rotate */}
        <div className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-primary via-primary/70 to-accent animate-pulse flex items-center justify-center z-10">
          <div className="w-6 h-6 rounded-full bg-primary/80" />
        </div>

        {/* Orbit ring — does NOT rotate */}
        <div className="absolute w-80 h-80 rounded-full border border-border/30" />

        {/* Rotating orbit container — pure CSS animation, zero JS re-renders */}
        <div
          ref={orbitRef}
          className="absolute inset-0 flex items-center justify-center"
          style={
            autoRotate
              ? {
                  animation: `orbital-spin ${ROTATION_DURATION}s linear infinite`,
                  animationDelay: `${(-frozenAngle / 360) * ROTATION_DURATION}s`,
                }
              : {
                  transform: `rotate(${frozenAngle}deg)`,
                }
          }
        >
          {timelineData.map((item, index) => {
            const pos = getNodeStaticPosition(index, timelineData.length);
            const isExp = expandedId === item.id;
            const isRel = isRelatedToExpanded(item.id);
            const isHl = isHighlighted(item.id);
            const dim = isDimmed(item.id);
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="absolute cursor-pointer"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  zIndex: isExp ? 200 : 10,
                  opacity: dim ? 0.2 : 1,
                  transition: "opacity 0.4s ease",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Counter-rotate so nodes stay upright */}
                <div
                  className="flex flex-col items-center"
                  style={
                    autoRotate
                      ? {
                          animation: `orbital-spin ${ROTATION_DURATION}s linear infinite reverse`,
                          animationDelay: `${(-frozenAngle / 360) * ROTATION_DURATION}s`,
                        }
                      : {
                          transform: `rotate(${-frozenAngle}deg)`,
                        }
                  }
                >
                  {/* Energy glow */}
                  {(isHl || isRel) && (
                    <div
                      className="absolute rounded-full animate-pulse"
                      style={{
                        background: `radial-gradient(circle, oklch(0.7 0.18 170 / 0.25) 0%, transparent 70%)`,
                        width: `${item.energy * 0.4 + 40}px`,
                        height: `${item.energy * 0.4 + 40}px`,
                        left: `50%`,
                        top: `50%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  )}

                  {/* Node circle */}
                  <div
                    className={`
                      w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300
                      ${
                        isExp
                          ? "bg-primary text-primary-foreground border-primary shadow-[0_0_12px_oklch(0.7_0.18_170/0.4)] scale-[1.4]"
                          : isRel || isHl
                          ? "bg-primary/50 text-primary-foreground border-primary"
                          : "bg-card text-foreground border-border"
                      }
                    `}
                  >
                    <Icon size={14} />
                  </div>

                  {/* Label */}
                  <span
                    className={`
                      mt-2 text-[10px] font-semibold tracking-wider font-mono whitespace-nowrap transition-colors duration-300
                      ${isExp || isHl ? "text-foreground" : "text-muted-foreground"}
                    `}
                  >
                    {item.title}
                  </span>

                  {/* Expanded card */}
                  {isExp && (
                    <Card className="absolute top-16 left-1/2 -translate-x-1/2 w-56 bg-card border-border shadow-xl shadow-primary/5 overflow-visible z-50">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-border" />
                      <CardHeader className="pb-2 p-4">
                        <div className="flex justify-between items-center">
                          <Badge
                            className={`px-2 text-[10px] ${getStatusStyles(item.status)}`}
                          >
                            {item.status === "completed"
                              ? "COMPLETO"
                              : item.status === "in-progress"
                              ? "EM PROGRESSO"
                              : "PENDENTE"}
                          </Badge>
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {item.date}
                          </span>
                        </div>
                        <CardTitle className="text-xs mt-2 text-foreground">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-[11px] text-muted-foreground p-4 pt-0">
                        <p>{item.content}</p>

                        <div className="mt-3 pt-2 border-t border-border">
                          <div className="flex justify-between items-center text-[10px] mb-1">
                            <span className="flex items-center text-muted-foreground">
                              <Zap size={9} className="mr-1" />
                              Energia
                            </span>
                            <span className="font-mono">{item.energy}%</span>
                          </div>
                          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-accent"
                              style={{ width: `${item.energy}%` }}
                            />
                          </div>
                        </div>

                        {item.relatedIds.length > 0 && (
                          <div className="mt-3 pt-2 border-t border-border">
                            <h4 className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground mb-1.5">
                              Nodes conectados
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {item.relatedIds.map((relatedId) => {
                                const rel = timelineData.find((i) => i.id === relatedId);
                                return (
                                  <Button
                                    key={relatedId}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center h-5 px-1.5 py-0 text-[10px] rounded-sm border-border bg-transparent hover:bg-muted text-muted-foreground hover:text-foreground"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleItem(relatedId);
                                    }}
                                  >
                                    {rel?.title}
                                    <ArrowRight size={8} className="ml-0.5 text-muted-foreground" />
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes orbital-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
