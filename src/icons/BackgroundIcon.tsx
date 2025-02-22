import React, { FC } from "react";

const BackgroundIcon: FC<{ size?: number }> = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={size ? "h-" + size + " w-" + size : "h-5 w-5"}
  >
    <path d="M4 8l4 -4" />
    <path d="M14 4l-10 10" />
    <path d="M4 20l16 -16" />
    <path d="M20 10l-10 10" />
    <path d="M20 16l-4 4" />
  </svg>
);

export default BackgroundIcon;
