import React from 'react';
import styles from './index.module.scss';

interface Props {
  title: string;
  children: any;
}

const Module: React.FC<Props> = ({ title, children }) => (
  <section className={styles.module}>
    <header>{title}</header>
    {children}
  </section>
);

export default Module;
