export interface Drawer {
  component: string;
  animationIn?: string;
  animationOut?: string;
  animationInDuration?: number;
  animationOutDuration?: number;
  theme?: 'light' | 'dark' | 'stripped';
  position?: 'front' | 'back';
  show?: boolean;
}

export type ShowDrawer = (drawer: Drawer) => void;

export type HideDrawer = (component?: string) => void;

export type FooterType = 'full' | 'collapsed' | 'none';

export type SetFooterType = (footerType: FooterType) => void;
