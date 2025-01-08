export type NavItem =
  | "ai"
  | "content"
  | "text"
  | "colors"
  | "background"
  | "branding"
  | "swipe"
  | "order"
  | "settings"
  | "randomize"
  | "my_carousels";

export type NavState = {
  activeNavItem: NavItem;
  colors: {backgroundColor: string; textColor: string; accentColor: string}
};
