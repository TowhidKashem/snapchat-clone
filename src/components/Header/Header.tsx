import React from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { showDrawer } from 'AppShell/AppShellStore';
import { toggleCameraMode } from 'features/Camera/CameraStore';
import { isMobile } from 'utils';
import Icon from 'components/Icon/Icon';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import './Header.scss';

const Header: React.FC<
  Readonly<{
    insideDrawer?: boolean;
  }>
> = ({ insideDrawer }) => {
  const dispatch = useDispatch();
  const { session } = useSelector(({ user }: RootStateOrAny) => user);

  const iconImage = session?.avatar
    ? { image: session.avatar }
    : { icon: 'faUserCircle' };

  return (
    <header className="header" data-test="header">
      <Button
        {...iconImage}
        onClick={() => dispatch(showDrawer({ component: 'account' }))}
        className="btn-user"
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
          <Icon name="faEllipsisH" />
        ) : (
          <Button
            icon="faRetweet"
            className="btn-flip-camera"
            onClick={() => {
              if (isMobile()) {
                dispatch(toggleCameraMode());
              } else {
                alert('You need a front facing camera for this, try it on your phone.');
              }
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
