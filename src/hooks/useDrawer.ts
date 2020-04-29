import { useState, useCallback } from 'react';
import { DrawerInterface } from 'contexts/drawer';

export const useDrawer = (): DrawerInterface => {
  const [page, setPage] = useState('LOL');
  return {
    page,
    setPage: useCallback((page: string): void => {
      setPage(page);
    }, [])
  };
};
