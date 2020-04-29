import React from 'react';
import { Animated } from 'react-animated-css';
import styles from './index.module.scss';

interface Props {
  show: boolean;
}

const Drawer: React.SFC<Props> = ({ show, children }) => (
  <Animated
    animationIn="slideInUp"
    animationOut="slideOutDown"
    animationInDuration={300}
    animationOutDuration={350}
    isVisible={show}
    animateOnMount={false}
  >
    <aside className={styles.drawer}>{children}</aside>
  </Animated>
);

export default Drawer;
