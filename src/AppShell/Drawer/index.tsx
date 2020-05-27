import React from 'react';
import classNames from 'classnames';
import { Animated } from 'react-animated-css';
import { Drawer as DrawerType, HideDrawer } from '../types';
import Account from 'features/Account';
import Settings from 'features/Settings';
import Search from 'features/Search';
import Map from 'features/Map';
import Video from 'features/Video';
import Snaps from 'features/Snaps';
import Chat from 'features/Chat';
import Discover from 'features/Discover';
import './index.scss';

interface Props {
  // drawers: DrawerType[];
  drawers: any;
  hideDrawer: HideDrawer;
}

const Drawer: React.FC<Props> = ({ drawers, hideDrawer }) => {
  const componentMap = {
    account: <Account />,
    settings: <Settings />,
    search: <Search />,
    map: <Map />,
    video: <Video />,
    snaps: <Snaps />,
    chat: <Chat />,
    discover: <Discover />
  };

  return drawers.map(
    ({
      component,
      animationIn,
      animationOut,
      animationInDuration,
      animationOutDuration,
      show,
      theme
    }) => (
      <aside
        key={component}
        className={classNames('drawer', {
          dark: theme === 'dark'
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
              style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 1000 }}
            >
              Close Drawer - {animationInDuration}
            </button>
            {componentMap[component]}
          </section>
        </Animated>
      </aside>
    )
  );
};

export default Drawer;
