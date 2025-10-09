import { CSSProperties } from "react";
import s from "./styles.module.css";

type Side = "left" | "right" | "center";

type KitItemCardProps = {
  title: string;
  count: string;
  side: Side;
  appear: number; // 0..1
  style?: CSSProperties; // absolute position
  active?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
};

const KitItemCard = ({ title, count, side, appear, style, active, onEnter, onLeave }: KitItemCardProps) => {
  const baseShift = side === "left" ? -20 : side === "right" ? 20 : 0;
  const translate = side === "center" ? `translate3d(-50%, ${10 * (1 - appear)}px, 0)` : `translate3d(${baseShift * (1 - appear)}px, 0, 0)`;

  return (
    <div
      className={`${s.card} ${active ? s.active : ""}`}
      style={{
        opacity: appear,
        transform: translate,
        pointerEvents: appear > 0 ? "auto" : "none",
        ...(style || {}),
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className={s.cardBg} />
      <div className={s.cardContent}>
        <div className={s.cardTitle}>{title}</div>
        <div className={s.cardCount}>{count}</div>
      </div>
    </div>
  );
};

export default KitItemCard;
