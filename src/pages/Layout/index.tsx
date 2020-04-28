import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import styles from './index.module.scss';

const Layout = ({ children }) => (
  <div className={styles.wrapper}>
    <Header />
    <section className={styles.wrapper}>{children}</section>
    <Menu />
    <Footer />
  </div>
);

export default Layout;
