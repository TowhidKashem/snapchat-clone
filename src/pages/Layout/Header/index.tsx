import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Input from '../../../common/Input';
import styles from './index.module.scss';

interface Props {
  setToggleMenu: () => void;
}

const Header: React.FC<Props> = ({ setToggleMenu }) => (
  <header className={styles.header}>
    <FontAwesomeIcon icon={faUserCircle} size="5x" onClick={setToggleMenu} />
    <Input
      placeholder="Search"
      leftIcon={faSearch}
      rightIcon={faUserPlus}
      rightIconClick={() => {}}
    />
  </header>
);

export default Header;
