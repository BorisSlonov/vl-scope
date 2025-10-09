"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import s from "./styles.module.css";
import KitItemCard from "./KitItemCard";

type Side = "left" | "right" | "center";

type Item = {
  key: string;
  title: string;
  count: string;
  side: Side;
  cardStyle: React.CSSProperties;
  dotStyle: React.CSSProperties;
  appearAt: number; // 0..1
};

const items: Item[] = [
  {
    key: "usb",
    title: "КАБЕЛЬ USB",
    count: "1 шт.",
    side: "left",
    cardStyle: { top: "18%", left: "3%" },
    dotStyle: { top: "50%", left: "5%" },
    appearAt: 0.3,
  },
  {
    key: "vibro",
    title: "VIBRO-SCOPE",
    count: "1 шт.",
    side: "left",
    cardStyle: { top: "36%", left: "3%" },
    dotStyle: { top: "75%", left: "15%" },
    appearAt: 0.38,
  },
  {
    key: "magnet",
    title: "МАГНИТ",
    count: "1 шт.",
    side: "left",
    cardStyle: { top: "54%", left: "3%" },
    dotStyle: { top: "91%", left: "15%" },
    appearAt: 0.46,
  },
  {
    key: "probe-small",
    title: "ИЗМЕРИТЕЛЬНЫЙ ЩУП МАЛЫЙ",
    count: "1 шт.",
    side: "right",
    cardStyle: { top: "22%", right: "3%" },
    dotStyle: { top: "35%", left: "100%" },
    appearAt: 0.54,
  },
  {
    key: "probe-std",
    title: "ИЗМЕРИТЕЛЬНЫЙ ЩУП СТАНДАРТНЫЙ",
    count: "1 шт.",
    side: "right",
    cardStyle: { top: "40%", right: "3%" },
    dotStyle: { top: "47%", left: "78%" },
    appearAt: 0.62,
  },
  {
    key: "charger",
    title: "ЗАРЯДНОЕ УСТРОЙСТВО",
    count: "1 шт.",
    side: "right",
    cardStyle: { top: "58%", right: "3%" },
    dotStyle: { top: "97%", left: "72%" },
    appearAt: 0.7,
  },
  {
    key: "case",
    title: "КЕЙС С ЛОЖЕМЕНТОМ",
    count: "1 шт.",
    side: "center",
    cardStyle: { bottom: "4%", left: "50%", transform: "translateX(-50%)" },
    dotStyle: { top: "110%", left: "50%", transform: "translateX(-50%)" },
    appearAt: 0.78,
  },
];

const KitSubtract = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeKey, setActiveKey] = useState<string | undefined>();
  const [isCompact, setIsCompact] = useState(false); // <=1359px
  const skipClickRef = useRef(false);
  const centerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = el.offsetHeight - vh; // scrollable distance of this section
      const passed = Math.min(Math.max(vh - rect.top, 0), total);
      const p = total > 0 ? passed / total : 0;
      setProgress(Math.max(0, Math.min(1, p)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const raiseY = useMemo(() => {
    // pedestal + case rise in first 25% of the sequence
    const t = Math.min(progress / 0.25, 1);
    const start = 20; // vh down
    const end = 0; // centered
    return start * (1 - t) + end * t;
  }, [progress]);

  // track viewport for compact mode (<=1359px)
  useEffect(() => {
    const check = () => setIsCompact(window.innerWidth <= 1359);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close card on outside tap in compact mode
  useEffect(() => {
    if (!isCompact) return;
    const onPointerDown = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-kit-interactive="true"]')) return;
      setActiveKey(undefined);
    };
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown as any);
      document.removeEventListener("touchstart", onPointerDown as any);
    };
  }, [isCompact]);

  return (
    <section className={s.section} id="kit" ref={sectionRef}>
      <div className={s.scrollSpace} />
      <div className={s.sticky}>
        <div className={s.centerArea} ref={centerRef}>
          <div
            className={s.kitWrap}
            style={{
              transform: `translate3d(-50%, calc(-50% + ${raiseY} * var(--app-1dvh, 1vh)), 0)`,
            }}
          >
            <Image
              src="/landing_indicator/kit/kit.png"
              alt="Комплект на пьедестале"
              width={1200}
              height={800}
              priority
              className={s.kitImg}
            />
            <div className={s.dotsWrapper}>
              {/* dots overlay */}
              {items.map((it) => {
                const appear = Math.max(
                  0,
                  Math.min(1, (progress - it.appearAt) / 0.08)
                );
                const isActive = activeKey === it.key;
                return (
              <button
                key={`dot-${it.key}`}
                className={`${s.dot} ${isActive ? s.active : ""}`}
                style={{
                  opacity: appear,
                  transform: `translate(-50%, -50%) scale(${0.8 + 0.2 * appear})`,
                  ...(it.dotStyle as any),
                }}
                data-kit-interactive="true"
                // Desktop hover
                onMouseEnter={!isCompact ? () => setActiveKey(it.key) : undefined}
                onMouseLeave={!isCompact ? () => setActiveKey(undefined) : undefined}
                // Pointer and touch support (mobile hover simulation)
                onPointerEnter={() => setActiveKey(it.key)}
                onPointerLeave={!isCompact ? () => setActiveKey(undefined) : undefined}
                onTouchStart={() => {
                  skipClickRef.current = true;
                  setActiveKey((k) => (k === it.key ? undefined : it.key));
                }}
                onClick={() => {
                  if (skipClickRef.current) {
                    // prevent duplicate click after touchstart
                    skipClickRef.current = false;
                    return;
                  }
                  setActiveKey((k) => (k === it.key ? undefined : it.key));
                }}
                onFocus={() => setActiveKey(it.key)}
                onBlur={!isCompact ? () => setActiveKey(undefined) : undefined}
                aria-label={it.title}
              />
                );
              })}
            </div>
          </div>

          {/* cards */}
          {items.map((it) => {
            const seqAppear = Math.max(
              0,
              Math.min(1, (progress - it.appearAt) / 0.08)
            );
            const appear = isCompact ? (activeKey === it.key ? 1 : 0) : seqAppear;
            const isActive = activeKey === it.key;
            const centerStyle = { left: "50%", top: "18%", transform: "translateX(-50%)" } as const;
            return (
              <KitItemCard
                key={it.key}
                title={it.title}
                count={it.count}
                side={isCompact ? "center" : it.side}
                appear={appear}
                style={(isCompact ? (centerStyle as any) : (it.cardStyle as any))}
                active={isActive}
                {...(!isCompact && { onEnter: () => setActiveKey(it.key), onLeave: () => setActiveKey(undefined) })}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KitSubtract;
