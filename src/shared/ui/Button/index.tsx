import React, {FC} from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./styles.module.css";

interface ButtonProps {
    children: React.ReactNode;
    // to do: ts
    onClick?: any;
    href?: string;
    as?: "button" | "link";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    variant?: "primary" | "arrowFillLight" | "stroke" | "violet" | "strokeViolet";
    size?: "small" | "medium" | "large";
    className?: string;
    target?: string;
    download?: boolean | string;
    locale?: string;
}

export const Button: FC<ButtonProps> = ({
    children,
    onClick,
    href,
    download,
    as = "button",
    type = "button",
    disabled = false,
    variant = "primary",
    className,
    target,
    locale,
}) => {
    const classNames = clsx(styles.button, styles[variant], className);

    if (as === "link" && href) {
        return (
            <Link
                href={href}
                passHref
                className={classNames}
                onClick={onClick}
                target={target}
                download={download}
                locale={locale}
            >
                <span className={styles.txt}>{children}</span>
            </Link>
        );
    }

    return (
        <button className={classNames} onClick={onClick} type={type} disabled={disabled}>
            <span className={styles.txt}>{children}</span>
        </button>
    );
};
