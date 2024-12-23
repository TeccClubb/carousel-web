import { DefineSVGIcon } from "@/types";

const SVGIcon: React.FC<DefineSVGIcon> = ({
  icon,
  color,
  title,
  role = "img",
  ariaLabel,
  ariaHidden = false,
  size = "1em",
  ...props
}) => {
  return (
    <svg
      viewBox={icon.viewBox}
      width={size}
      height={size}
      role={role}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ? "true" : "false"}
      {...props}
    >
      {title && <title>{title}</title>}
      <path color={color} fill="currentColor" d={icon.pathData} />
    </svg>
  );
};

export default SVGIcon;
