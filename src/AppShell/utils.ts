// Atleast 1 drawer is open
export const drawerIsOpen = (drawers) => drawers.some(({ show }) => show);
