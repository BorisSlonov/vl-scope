"use client";
import { useState, useEffect } from "react";
import { Button } from "@/shared/ui/Button";
import styles from "./styles.module.css";
import Cards from "./Cards";
import Arrow from "@/shared/ui/icons/Arrow";
import { useInView } from "@/shared/hooks/useInView";
import Image from "next/image";

const TECH_TABLE_EXTRA = [
  ["Частотный диапазон (экран устройства)", "от 10 Гц до 1000 Гц"],
  ["Оси", "1 (Z)"],
  ["Амплитудный диапазон", "до 150 м/с²"],
  ["Температурный диапазон", "от -70°С до 380°С"],
  ["Диапазоны чувствительности датчика", "2 / 4 / 8 / 16 g"],
  ["Способ крепления", "Щуп"],
  ["Частота дискретизации", "26 кГЦ"],
  ["Собственные шумы датчика", "75 µg/√Hz"],
  ["Относительная погрешность", "±5%"],
  ["Питание", "Аккумуляторное"],
  ["Материал корпуса", "Анодируемый алюминий"],
  ["Габариты вибродатчика", "40х40х80 мм"],
  ["Масса вибродатчика", "200 гр"],
];

const TAB_CONTENT = {
  extra: {
    logo: (
      <>
        экспресс-диагностика НА ЛАДОНИ <br /> — VIBRO-SCOPE
      </>
    ),
    desc: (
      <>
        <span style={{ fontWeight: 400 }}>VIBRO-SCOPE</span>
        {
          " — портативный прибор для быстрой вибродиагностики и контроля состояния оборудования с расширенной аналитикой и хранением данных через приложение VIBRO-LASER VIBRATION"
        }
      </>
    ),
  },
};

const PREVIEW_IMAGE = "/landing_indicator/scope.png";

const TechInfo = () => {
  const [showTable, setShowTable] = useState(false);
  const { ref: bodyRef, inView } = useInView({ threshold: 0.5 });
  const [delayedInView, setDelayedInView] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (inView) {
      timeout = setTimeout(() => setDelayedInView(true), 500);
    } else {
      setDelayedInView(false);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [inView]);

  return (
    <section className={styles.section} id="characteristics">
      <div className="container">
        <div className={styles.header}>
          <div>
            <div className={[styles.fadeIn].join(" ")}>
              <p className={styles.logo}>{TAB_CONTENT.extra.logo}</p>
            </div>
            <div className={[styles.fadeIn].join(" ")}>
              <p className={styles.p}>{TAB_CONTENT.extra.desc}</p>
            </div>
          </div>
          <div className={styles.lastBtns}>
            {!showTable ? (
              <Button
                className={styles.btnBack}
                variant="strokeViolet"
                onClick={() => setShowTable(true)}
              >
                Все характеристики
              </Button>
            ) : (
              <Button
                variant="strokeViolet"
                onClick={() => setShowTable(false)}
              >
                <Arrow className={styles.arrowBack} />
              </Button>
            )}
          </div>
        </div>
        <div
          ref={bodyRef}
          className={[
            styles.body,
            delayedInView ? styles.bodyAfterVisible : styles.bodyAfterHidden,
          ].join(" ")}
        >
          <div className={styles.cardsTableWrapper}>
            <div
              className={[
                showTable ? styles.cardsHidden : styles.cardsVisible,
                showTable ? styles.fadeOut : styles.fadeIn,
              ].join(" ")}
            >
              <Cards />
            </div>
            <div
              className={showTable ? styles.tableVisible : styles.tableHidden}
            >
              <div className={styles.tableCard}>
                <div className={styles.tableHeader}>
                  <span>ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ</span>
                </div>
                <table className={styles.techTable}>
                  <tbody>
                    {TECH_TABLE_EXTRA.map(([name, value]) => (
                      <tr className={styles.tr} key={name}>
                        <td className={styles.td}>{name}</td>
                        <td className={styles.td}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className={styles.bodyImgWrapper}>
            <Image
              src={PREVIEW_IMAGE}
              alt="вибро-скоуп"
              width={645}
              height={645}
              className={[styles.bodyBgImg, styles.fadeIn].join(" ")}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechInfo;
