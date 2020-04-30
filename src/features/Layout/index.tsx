import React from 'react';
import Toolbar from './Toolbar';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import styles from './index.module.scss';

interface Props {
  children: JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => (
  <div className={styles.wrapper}>
    <Toolbar />
    <Header />
    <section className={styles.view}>{children}</section>
    <Menu />
    <Footer />
  </div>
);

export default Layout;
