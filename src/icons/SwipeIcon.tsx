import React, { FC } from "react";

const SwipeIcon: FC = () => (
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
    className="h-5 w-5"
  >
    <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18" />
    <path d="M16 12l-4 -4" />
    <path d="M16 12h-8" />
    <path d="M12 16l4 -4" />
  </svg>
);

export default SwipeIcon;
