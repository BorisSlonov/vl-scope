"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

// Initializes Lenis smooth scrolling once on the client
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      // tuned for subtle smoothness; can be adjusted later
      lerp: 0.1,
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      // @ts-ignore lenis has destroy in runtime
      lenis.destroy?.();
    };
  }, []);

  return null;
}
