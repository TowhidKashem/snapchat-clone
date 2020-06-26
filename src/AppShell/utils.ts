import { Drawer } from './types';

export const atleastOneDrawerOpen = (drawers: Drawer[]): boolean =>
  drawers.some(({ show }) => show);
