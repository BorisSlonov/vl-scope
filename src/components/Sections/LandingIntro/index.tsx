"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import Link from "next/link";
import { InViewStyle } from "@/shared/ui/InViewStyle";
import Socials from "@/components/Socials";
import PdfIcon from "@/shared/ui/icons/pdfIcon";

const LandingIntro = () => {
  const programs = [
    { text: "Центровка", link: "/docs/VL-01_Центровка.pdf" },
    { text: "Вибродиагностика", link: "/docs/VL-03_Вибродиагностика.pdf" },
    { text: "Тепловидение", link: "/docs/VL-04_Тепловидение.pdf" },
    { text: "Балансировка", link: "/docs/VL-02_Балансировка.pdf" },
    { text: "Виброналадка", link: "/docs/VL-05_Виброналадка.pdf" },
  ];

  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={clsx(styles.section, active && styles.anim)}
    >
      <div className="container">
        <div className={styles.body}>
          <div className={clsx(styles.item, styles.item_top)}>
            <h1 className={clsx(styles.h1, "h1")}>
              <InViewStyle
                initialClass="bottomToTop"
                animationClass="visible"
                triggerOnce
                className={clsx(styles.item, styles.item1)}
              >
                <span>VIBRO-SCOPE</span>
              </InViewStyle>
            </h1>
            <div className={styles.p}>
              <InViewStyle
                initialClass="bottomToTop"
                animationClass="visible"
                triggerOnce
                className={clsx(styles.item, styles.item1)}
              >
                <span>
                  Портативный беспроводной прибор для виброконтроля и
                  мониторинга состояния оборудования
                </span>
              </InViewStyle>
            </div>
          </div>
          <div className={clsx(styles.item, styles.item_bot)}>
            <a className={styles.a} href="#contacts">
              <span>Оставить заявку</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingIntro;
