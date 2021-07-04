import React from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { showDrawer } from 'AppShell/store';
import { toggleCameraMode } from 'features/Camera/store';
import { isMobile } from 'utils';
import Icon from 'common/Icon';
import Button from 'common/Button';
import Input from 'common/Input';
import './index.scss';

const Header: React.FC<{
  readonly insideDrawer?: boolean;
}> = ({ insideDrawer }) => {
  const dispatch = useDispatch();
  const { session } = useSelector(({ user }: RootStateOrAny) => user);

  const iconImage = session?.avatar
    ? { image: session.avatar }
    : { icon: 'faUserCircle' };

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
            onclick={() => {
              if (isMobile()) {
                dispatch(toggleCameraMode());
              } else {
                alert('You need a front facing camera for this, try it on your phone!');
              }
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
