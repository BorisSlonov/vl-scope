import { colorsKit } from "@/shared/config/colors";
import React from "react";

interface Props {
  className?: string;
}

const Arrow = ({ className }: Props) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.6001 12.5H18.4001M18.4001 12.5L13.6001 7.70001M18.4001 12.5L13.6001 17.3"
        stroke={"#fff"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Arrow;
