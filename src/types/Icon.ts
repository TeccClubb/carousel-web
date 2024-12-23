export type Icon = {
  viewBox: string;
  pathData: string;
};

export type DefineSVGIcon = React.SVGAttributes<SVGElement> & {
  icon: Icon;
  size?: number | string;
  color?: string;
  title?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
};
