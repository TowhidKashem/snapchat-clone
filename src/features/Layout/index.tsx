import React from 'react';
import Toolbar from './Toolbar';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import styles from './index.module.scss';

interface Props {
  children: JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { useState } = React;
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Toolbar />
      <Header setToggleMenu={() => setToggleMenu(!toggleMenu)} />
      <section className={styles.view}>{children}</section>
      <Menu toggleMenu={toggleMenu} setToggleMenu={() => setToggleMenu(!toggleMenu)} />
      <Footer />
    </div>
  );
};

export default Layout;
