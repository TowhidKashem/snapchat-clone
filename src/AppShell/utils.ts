export const atleastOneDrawerOpen = (drawers): boolean =>
  drawers.some(({ show }) => show);

// export const isDrawerOpen = (drawers, drawer): boolean =>
//   drawers.some(({ component, show }) => component === drawer && show);
