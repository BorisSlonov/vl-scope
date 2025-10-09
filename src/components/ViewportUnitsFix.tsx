"use client";

import { useEffect, useRef } from "react";

// Locks vh-based sizing to a stable value to avoid jumps from mobile browser UI bars.
// Sets CSS vars: --app-1vh (in px) and --app-100vh.
export default function ViewportUnitsFix() {
  const stableRef = useRef<number | null>(null);
  const orientationRef = useRef<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    const get1vh = () => (window.visualViewport?.height ?? window.innerHeight) / 100;
    const getOrientation = () => (window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape");

    const apply = (vh: number) => {
      root.style.setProperty("--app-1vh", `${vh}px`);
      root.style.setProperty("--app-100vh", `${vh * 100}px`);
    };

    const init = () => {
      orientationRef.current = getOrientation();
      const vh = get1vh();
      stableRef.current = vh;
      apply(vh);
    };

    const onResize = () => {
      const currentOrientation = getOrientation();
      const vh = get1vh();
      if (orientationRef.current !== currentOrientation) {
        // Orientation changed — reset baseline to current height.
        orientationRef.current = currentOrientation;
        stableRef.current = vh;
        apply(vh);
        return;
      }
      // Keep the smallest height seen to avoid jumps when bars collapse/expand
      if (stableRef.current == null || vh < stableRef.current) {
        stableRef.current = vh;
        apply(vh);
      }
    };

    init();
    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}

