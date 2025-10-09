"use client";

import { useEffect, useRef } from "react";

// Locks vh-based sizing to a stable value to avoid jumps from mobile browser UI bars
// and also exposes a dynamic vh that follows visible viewport changes.
// Sets CSS vars:
//  - --app-1vh: stable 1vh in px (minimum observed in current orientation)
//  - --app-100vh: stable 100vh
//  - --app-1dvh: dynamic 1vh in px (updates on resize/visualViewport changes)
export default function ViewportUnitsFix() {
  const stableRef = useRef<number | null>(null);
  const orientationRef = useRef<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    const get1vh = () => (window.visualViewport?.height ?? window.innerHeight) / 100;
    const getOrientation = () => (window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape");

    const applyStable = (vh: number) => {
      root.style.setProperty("--app-1vh", `${vh}px`);
      root.style.setProperty("--app-100vh", `${vh * 100}px`);
    };
    const applyDynamic = (vh: number) => {
      root.style.setProperty("--app-1dvh", `${vh}px`);
    };

    const init = () => {
      orientationRef.current = getOrientation();
      const vh = get1vh();
      stableRef.current = vh;
      applyStable(vh);
      applyDynamic(vh);
    };

    const onResize = () => {
      const currentOrientation = getOrientation();
      const vh = get1vh();
      applyDynamic(vh);
      if (orientationRef.current !== currentOrientation) {
        // Orientation changed — reset baseline to current height.
        orientationRef.current = currentOrientation;
        stableRef.current = vh;
        applyStable(vh);
        return;
      }
      // Keep the smallest height seen to avoid jumps when bars collapse/expand
      if (stableRef.current == null || vh < stableRef.current) {
        stableRef.current = vh;
        applyStable(vh);
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
