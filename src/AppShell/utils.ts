export const atleastOneDrawerOpen = (drawers): boolean =>
  drawers.some(({ show }) => show);
