export interface Drawer {
  component: string;
  animationIn?: string;
  animationOut?: string;
  animationInDuration?: number;
  animationOutDuration?: number;
  theme?: 'light' | 'dark' | 'stripped';
  show?: boolean;
}

export type ShowDrawer = (drawer: Drawer) => void;

export type HideDrawer = (component?: string) => void;

export type CollapseNav = (collapse: boolean) => void;
