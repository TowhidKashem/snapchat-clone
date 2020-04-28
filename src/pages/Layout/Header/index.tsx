import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';

interface Props {
  setToggleMenu: () => void;
}

const Header: React.FC<Props> = ({ setToggleMenu }) => (
  <header className={styles.header}>
    <FontAwesomeIcon icon={faUserCircle} size="5x" onClick={setToggleMenu} />
  </header>
);

export default Header;
