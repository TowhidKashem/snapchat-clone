import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Input from 'common/Input';
import Drawer from 'common/Drawer';
import Search from 'features/Search';
import styles from './index.module.scss';

interface Props {
  setToggleMenu: () => void;
}

const Header: React.FC<Props> = ({ setToggleMenu }) => {
  const { useState } = React;
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  return (
    <header className={styles.header}>
      <FontAwesomeIcon icon={faUserCircle} size="5x" onClick={setToggleMenu} />
      <Input
        placeholder="Search"
        leftIcon={faSearch}
        rightIcon={faUserPlus}
        rightIconClick={() => setOpenSearch(true)}
      />
      <Drawer show={openSearch}>
        <Search />
      </Drawer>
    </header>
  );
};

export default Header;
