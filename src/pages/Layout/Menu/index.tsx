import React from 'react';
import { Animated } from 'react-animated-css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';

interface Props {
  toggleMenu: boolean;
  setToggleMenu: () => void;
}

const Menu: React.SFC<Props> = ({ toggleMenu, setToggleMenu }) => (
  <Animated
    animationIn="slideInUp"
    animationOut="slideOutDown"
    animationInDuration={300}
    animationOutDuration={350}
    isVisible={toggleMenu}
    animateOnMount={false}
  >
    <aside className={styles.menu}>
      <FontAwesomeIcon icon={faAngleDown} size="2x" onClick={setToggleMenu} />
    </aside>
  </Animated>
);

export default Menu;
