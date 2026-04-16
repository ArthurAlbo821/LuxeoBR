"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export function useInView(
  ref: RefObject<HTMLElement | null>,
  options?: { rootMargin?: string }
): boolean {
  const [isInView, setIsInView] = useState(false);
  const rootMargin = options?.rootMargin ?? "200px";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isInView;
}
