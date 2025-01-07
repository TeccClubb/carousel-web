import React, { FC } from "react";

const TikTokGradientIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-label="TikTok"
    role="img"
    viewBox="0 0 512 512"
    className={className}
  >
    <rect rx="15%" height="512" width="512" fill="#ffffff" />
    <defs>
      <path
        id="t"
        d="M219 200a117 117 0 1 0 101 115v-128a150 150 0 0 0 88 28v-63a88 88 0 0 1-88-88h-64v252a54 54 0 1 1-37-51z"
        style={{ mixBlendMode: "multiply" }}
      />
    </defs>
    <use href="#t" fill="#f05" x="18" y="15" />
    <use href="#t" fill="#0ee" />
  </svg>
);

export default TikTokGradientIcon;
