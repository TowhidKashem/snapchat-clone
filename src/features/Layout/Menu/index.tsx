import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Drawer from 'common/Drawer';

interface Props {
  toggleMenu: boolean;
  setToggleMenu: () => void;
}

const Menu: React.SFC<Props> = ({ toggleMenu, setToggleMenu }) => (
  <Drawer show={toggleMenu}>
    <FontAwesomeIcon icon={faAngleDown} size="2x" onClick={setToggleMenu} />
  </Drawer>
);

export default Menu;
