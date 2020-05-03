import React from 'react';
import styles from './index.module.scss';

interface Props {
  header?: string;
  children: any;
}

const UL: React.SFC<Props> = ({ header, children }) => (
  <div className={styles.list}>
    {header && <header>{header}</header>}
    <ul>{children}</ul>
  </div>
);

export default UL;
