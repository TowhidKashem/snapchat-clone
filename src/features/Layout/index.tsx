import React from 'react';
import { DrawerContext } from 'contexts/drawer';
import { useDrawer } from 'hooks/useDrawer';
import Toolbar from './Toolbar';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import styles from './index.module.scss';

interface Props {
  children: JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
  const drawer = useDrawer();

  return (
    <div className={styles.wrapper}>
      <DrawerContext.Provider value={drawer}>
        <Toolbar />
        <Header />
        <section className={styles.view}>{children}</section>
        <Menu />
        <Footer />
      </DrawerContext.Provider>
    </div>
  );
};

export default Layout;
