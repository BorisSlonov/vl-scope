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

    // Keep Lenis measurements in sync with visual viewport changes
    let queued = false;
    const onResize = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        (lenis as any).resize?.();
      });
    };
    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      // @ts-ignore lenis has destroy in runtime
      lenis.destroy?.();
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return null;
}
