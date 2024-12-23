import React, { FC } from "react";

const LeftArrow: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="tabler-icon tabler-icon-arrow-left"
    >
      <path d="M5 12h14" />
      <path d="M5 12l6 6" />
      <path d="M5 12l6-6" />
    </svg>
  );
};

export default LeftArrow;
