import React from "react";

interface Props {
    className?: string;
}

const XIcon = ({className}: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="23"
            viewBox="0 0 24 23"
            fill="none"
            className={className}
        >
            <path
                d="M21.9586 1.7766L12 11.0716M21.9586 20.5413L12 11.121M2 20.4786L11.9586 11.1836M2 1.71387L11.9586 11.1342"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default XIcon;
