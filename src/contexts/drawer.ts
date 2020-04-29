import { createContext } from 'react';

export interface DrawerInterface {
  page: string;
  setPage: (page: string) => void;
}

export const DrawerContext = createContext<DrawerInterface>({
  page: '',
  setPage: () => {}
});
