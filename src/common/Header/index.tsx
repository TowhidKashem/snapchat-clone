import React from 'react';
import { ShowDrawer } from 'AppShell/types';
import Button from 'common/Button';
import Input from 'common/Input';
import './index.scss';

interface Props {
  showDrawer: ShowDrawer;
}

const Header: React.FC<Props> = ({ showDrawer }) => (
  <header className="header">
    <Button
      icon="faUserCircle"
      onclick={() => showDrawer({ component: 'account' })}
      buttonClass="btn-user"
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
    <Button icon="faRetweet" />
  </header>
);

export default Header;
