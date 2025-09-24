import React from "react";

interface Props {
    className?: string;
}

const InstIcon = ({className}: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            className={className}
        >
            <circle
                opacity="0.3"
                cx="20"
                cy="20"
                r="19.5"
                transform="matrix(-1 0 0 1 40 0)"
                stroke="white"
            />
            <rect
                x="14.75"
                y="14.75"
                width="11.5"
                height="11.5"
                rx="2.25"
                stroke="white"
                strokeWidth="1.5"
            />
            <circle cx="20.5" cy="20.5" r="2.5" stroke="white" strokeWidth="1.4" />
        </svg>
    );
};

export default InstIcon;
