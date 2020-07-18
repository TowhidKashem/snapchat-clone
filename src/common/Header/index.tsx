import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showDrawer } from 'AppShell/store';
import { toggleCameraMode } from 'features/Camera/store';
import Icon from 'common/Icon';
import Button from 'common/Button';
import Input from 'common/Input';
import './index.scss';

interface Props {
  insideDrawer?: boolean;
}

const Header: React.FC<Props> = ({ insideDrawer }) => {
  const dispatch = useDispatch();
  const avatar = useSelector(({ user }) => user.session.avatar);

  const iconImage = avatar ? { image: avatar } : { icon: 'faUserCircle' };

  return (
    <header className="header" data-test="header">
      <Button
        {...iconImage}
        onclick={() => dispatch(showDrawer({ component: 'account' }))}
        buttonClass="btn-user"
        testId="btn-user"
      />
      <Input
        placeholder="Search"
        leftIcon="faSearch"
        rightIcon="faUserPlus"
        dark={insideDrawer}
        onClick={() =>
          dispatch(
            showDrawer({
              component: 'search',
              animationIn: 'fadeIn',
              animationOut: 'fadeOut',
              animationInDuration: 200,
              animationOutDuration: 200
            })
          )
        }
      />
      <div className="right">
        {insideDrawer ? (
          <Icon icon="faEllipsisH" />
        ) : (
          <Button
            icon="faRetweet"
            buttonClass="btn-flip-camera"
            onclick={() => dispatch(toggleCameraMode())}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
