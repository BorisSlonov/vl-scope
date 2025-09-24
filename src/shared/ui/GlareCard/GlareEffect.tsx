"use client";

import {useEffect} from "react";

export function GlareEffect() {
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const update = () => {
            const currentY = window.scrollY;
            const delta = currentY - lastScrollY;
            lastScrollY = currentY;

            const elements = document.querySelectorAll<HTMLElement>("[data-glare-id]");

            elements.forEach((el, i) => {
                const glare = el.querySelector<HTMLElement>("span");
                if (!glare) return;

                const direction = delta > 0 ? 1 : -1;
                const maxOffset = 40; // px
                const prevOffset = parseFloat(glare.dataset.offset || "0");
                let newOffset = prevOffset + direction * 0.5;

                newOffset = Math.max(-maxOffset, Math.min(maxOffset, newOffset));
                glare.dataset.offset = newOffset.toFixed(2);

                const position = glare.dataset.glarePosition;

                let x = 0,
                    y = 0;
                switch (position) {
                    case "top":
                    case "bottom":
                        x = newOffset;
                        break;
                    case "left":
                    case "right":
                        y = newOffset;
                        break;
                    case "topRight":
                    case "bottomLeft":
                        x = newOffset;
                        y = newOffset;
                        break;
                    case "topLeft":
                    case "bottomRight":
                        x = -newOffset;
                        y = newOffset;
                        break;
                }

                glare.style.transform = `translate(${x}px, ${y}px)`;
            });
        };

        window.addEventListener("scroll", update, {passive: true});
        return () => window.removeEventListener("scroll", update);
    }, []);

    return null;
}
