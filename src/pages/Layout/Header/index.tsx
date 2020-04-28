import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';

const Header = () => (
  <header className={styles.header}>
    <FontAwesomeIcon icon={faUserCircle} />
  </header>
);

export default Header;
