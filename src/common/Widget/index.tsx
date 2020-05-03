import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

interface Props {
  header: string;
  transparent?: boolean;
  children: any;
}

const Widget: React.SFC<Props> = ({ header, transparent, children }) => (
  <section className={styles.widget}>
    <header>{header}</header>
    <div
      className={classNames(styles.content, {
        [styles.transparent]: transparent
      })}
    >
      {children}
    </div>
  </section>
);

export default Widget;
