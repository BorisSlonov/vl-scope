import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import { GlareCard } from "@/shared/ui/GlareCard";

type FeatureCard = {
  className?: string;
  top: string | JSX.Element;
  bottom: JSX.Element | null;
};

const featuresRow1: FeatureCard[] = [
  {
    className: styles.item_blue,
    top: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="51"
        viewBox="0 0 40 51"
        fill="none"
        className={styles.icon}
      >
        <path
          d="M26.9738 30.9919C27.7507 29.8272 29.3253 29.5114 30.4904 30.2878L38.4152 35.571C39.1171 36.039 39.5401 36.8261 39.5441 37.6697C39.548 38.5131 39.132 39.3036 38.4347 39.7781L22.5851 50.5554C21.8083 51.0836 20.8031 51.1393 19.9728 50.6999C19.1427 50.2604 18.6232 49.398 18.6232 48.4587V37.7868C18.6235 36.3866 19.759 35.2507 21.1593 35.2507C22.5595 35.2509 23.6952 36.3867 23.6955 37.7868V43.6687L32.4679 37.7029L27.6769 34.5085C26.5118 33.7317 26.1973 32.1572 26.9738 30.9919ZM19.9728 0.572982C20.803 0.133682 21.8084 0.189339 22.5851 0.717513L38.4338 11.4949C39.1313 11.9693 39.548 12.7596 39.5441 13.6033C39.5401 14.4468 39.1161 15.2339 38.4142 15.7019L22.5656 26.2683L4.17985 38.5242C3.01468 39.3007 1.44013 38.986 0.663252 37.821C-0.113286 36.6558 0.202346 35.0813 1.36735 34.3044L14.3674 25.6365L1.36735 16.9695C0.20236 16.1927 -0.113036 14.6181 0.663252 13.4529C1.44017 12.2879 3.01469 11.9731 4.17985 12.7497L18.6232 22.3767V2.81419C18.6232 1.87488 19.1427 1.01247 19.9728 0.572982ZM23.6945 19.4187L32.4679 13.5701L23.6945 7.60423V19.4187Z"
          fill="#fff"
        />
      </svg>
    ),
    bottom: (
      <>
        Беспроводная
        <br />
        связь
      </>
    ),
  },
  {
    top: <>Портативность</>,
    bottom: (
      <div className={styles.portableDesc}>
        Лёгкий и эргономичный —<br />
        удобно держать и брать с собой
      </div>
    ),
  },
];

const featuresRow2: FeatureCard[] = [
  {
    top: <>10 Гц — 1000 Гц</>,
    bottom: <div className={styles.featureSub}>Частотный диапазон</div>,
  },
  {
    top: <>-70°С — 380°С</>,
    bottom: (
      <div className={styles.featureSub}>Оптический датчик температуры</div>
    ),
  },
];

const featuresRow3: FeatureCard[] = [
  {
    top: <>IP67</>,
    bottom: <div className={styles.featureSub}>Алюминиевый корпус</div>,
  },
  {
    className: styles.item_blue,
    top: <>24ч</>,
    bottom: (
      <div className={styles.featureSub}>
        Время <br /> работы
      </div>
    ),
  },
  {
    className: styles.item_blue,
    top: <>Дисплей</>,
    bottom: (
      <div className={styles.featureSub}>Собственный экран на датчике</div>
    ),
  },
];

const row1FlexOverrides = [{ flexBasis: "25%" }, { flexBasis: "75%" }];

const row3FlexOverrides = [
  { flexBasis: "30%" },
  { flexBasis: "30%" },
  { flexBasis: "40%" },
];

const Cards = () => {
  const totalCards =
    featuresRow1.length + featuresRow2.length + featuresRow3.length;
  const [waveActive, setWaveActive] = useState(Array(totalCards).fill(false));

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    for (let i = 0; i < totalCards; i++) {
      timeouts.push(
        setTimeout(() => {
          setWaveActive((prev) => {
            const arr = [...prev];
            arr[i] = true;
            return arr;
          });
        }, i * 60)
      );
    }

    for (let i = 0; i < totalCards; i++) {
      timeouts.push(
        setTimeout(() => {
          setWaveActive((prev) => {
            const arr = [...prev];
            arr[i] = false;
            return arr;
          });
        }, 360 + i * 60)
      );
    }

    return () => timeouts.forEach(clearTimeout);
  }, [totalCards]);

  let idx = 0;
  return (
    <>
      <div className={clsx(styles.row1)}>
        {featuresRow1.map((f, i) => {
          const cardIdx = idx++;
          const styleOverride = row1FlexOverrides[i];

          return (
            <GlareCard
              key={i}
              style={styleOverride}
              glareId={`card-${cardIdx}`}
              glarePosition="top"
              className={clsx(
                styles.item,
                f.className,
                waveActive[cardIdx] && styles.animateWave
              )}
            >
              <div className={styles.top}>{f.top}</div>
              {f.bottom && <div className={styles.bottom}>{f.bottom}</div>}
            </GlareCard>
          );
        })}
      </div>
      <div className={clsx(styles.row2)}>
        {featuresRow2.map((f, i) => {
          const cardIdx = idx++;
          return (
            <GlareCard
              key={i}
              glareId={`card-${cardIdx}`}
              glarePosition="right"
              className={clsx(
                styles.item,
                f.className,
                waveActive[cardIdx] && styles.animateWave
              )}
            >
              <div className={styles.top}>{f.top}</div>
              {f.bottom && <div className={styles.bottom}>{f.bottom}</div>}
            </GlareCard>
          );
        })}
      </div>
      <div className={clsx(styles.row3)}>
        {featuresRow3.map((f, i) => {
          const cardIdx = idx++;
          const styleOverride = row3FlexOverrides[i];

          return (
            <GlareCard
              key={i}
              style={styleOverride}
              glareId={`card-${cardIdx}`}
              glarePosition="top"
              className={clsx(
                styles.item,
                f.className,
                waveActive[cardIdx] && styles.animateWave
              )}
            >
              <div className={styles.top}>{f.top}</div>
              {f.bottom && <div className={styles.bottom}>{f.bottom}</div>}
            </GlareCard>
          );
        })}
      </div>
    </>
  );
};

export default Cards;
