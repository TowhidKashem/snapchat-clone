import React from 'react';
import { ShowDrawer } from 'AppShell/types';
import Button from 'common/Button';
import Input from 'common/Input';
import './index.scss';

interface Props {
  avatar?: string;
  showDrawer: ShowDrawer;
  insideDrawer?: boolean;
  toggleCameraMode?: () => void;
}

const Header: React.FC<Props> = ({
  avatar,
  showDrawer,
  insideDrawer,
  toggleCameraMode
}) => {
  const iconImage = avatar ? { image: avatar } : { icon: 'faUserCircle' };
  return (
    <header className="header" data-test="header">
      <Button
        {...iconImage}
        onclick={() => showDrawer({ component: 'account' })}
        buttonClass="btn-user"
        testId="btn-user"
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
        dark={insideDrawer}
      />
      <Button icon="faRetweet" buttonClass="btn-flip-camera" onclick={toggleCameraMode} />
    </header>
  );
};

export default Header;
