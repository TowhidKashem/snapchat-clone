import React from 'react';
import { ShowDrawer } from 'AppShell/types';
import Icon from 'common/Icon';
import Input from 'common/Input';
import './index.scss';

interface Props {
  showDrawer: ShowDrawer;
}

const Header: React.FC<Props> = ({ showDrawer }) => (
  <header className="header">
    <Icon
      icon="faUserCircle"
      onClick={() => showDrawer({ component: 'account' })}
      className="ico-user"
    />
    <Input
      placeholder="Search"
      leftIcon="faSearch"
      rightIcon="faUserPlus"
      onClick={() =>
        showDrawer({
          component: 'search',
          animationIn: 'fadeIn',
          animationOut: 'fadeOut',
          animationInDuration: 200,
          animationOutDuration: 200
        })
      }
    />
    <Icon icon="faRetweet" />
  </header>
);

export default Header;
