import React from 'react';
import classNames from 'classnames';
import { Animated } from 'react-animated-css';
import { Drawer as DrawerType, HideDrawer } from '../types';
import Account from 'features/Account';
import Search from 'features/Search';
import SnapMap from 'features/SnapMap';
import Snap from 'features/Snap';
import Archive from 'features/Archive';
import Chat from 'features/Chat';
import Discover from 'features/Discover';
import './index.scss';

interface Props {
  // drawers: DrawerType[];
  drawers: any;
  hideDrawer: HideDrawer;
}

const Drawer: React.FC<Props> = ({ drawers, hideDrawer }) => {
  const getComponent = (component, show) => {
    const componentMap = {
      account: <Account />,
      search: <Search show={show} />,
      snapMap: <SnapMap />,
      snap: <Snap />,
      archive: <Archive />,
      chat: <Chat />,
      discover: <Discover />
    };
    return componentMap[component];
  };

  return drawers.map(
    ({
      component,
      animationIn,
      animationOut,
      animationInDuration,
      animationOutDuration,
      show,
      theme,
      position
    }) => (
      <aside
        key={component}
        className={classNames('drawer', {
          dark: theme === 'dark',
          stripped: theme === 'stripped',
          back: position === 'back'
        })}
      >
        <Animated
          animationIn={animationIn}
          animationOut={animationOut}
          animationInDuration={animationInDuration}
          animationOutDuration={animationOutDuration}
          isVisible={show}
        >
          <section className="content">
            <button
              onClick={() => hideDrawer(component)}
              style={{
                position: 'fixed',
                bottom: 0,
                right: 0,
                zIndex: 100000
              }}
            >
              Close Drawer
            </button>
            {getComponent(component, show)}
          </section>
        </Animated>
      </aside>
    )
  );
};

export default Drawer;
