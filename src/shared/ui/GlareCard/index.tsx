import {ReactNode, CSSProperties} from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

export type GlarePosition =
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";

interface GlareCardProps {
    children: ReactNode;
    className?: string;
    glareId?: string;
    glarePosition?: GlarePosition;
    style?: CSSProperties;
}

export const GlareCard = ({
    children,
    className,
    glareId,
    glarePosition = "top",
    style,
}: GlareCardProps) => {
    return (
        <div
            className={clsx(styles.card, className)}
            data-glare-id={glareId}
            data-glare-position={glarePosition}
            style={style}
        >
            <span className={styles.glare} data-glare-position={glarePosition} />
            {children}
        </div>
    );
};
