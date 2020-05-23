import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import classNames from 'classnames';
import { Animated } from 'react-animated-css';
import Account from 'features/Account';
import Settings from 'features/Account/Settings';
import Search from 'features/Search';
// import Map from 'features/Map';
import Video from 'features/Video';
import Snaps from 'features/Snaps';
import Chat from 'features/Chat';
import Discover from 'features/Discover';

import styles from './index.module.scss';

// const Account = lazy(() => import('features/Account'));
const Map = lazy(() => import('features/Map'));
// const Discover = lazy(() => import('features/Discover'));

interface Props {
  app: any;
  media: any;
  hideDrawer: (component: string) => void;
}

const Drawer: React.SFC<Props> = ({ app, media, hideDrawer }) => {
  if (app.drawers.some(({ show }) => show)) {
    // //@ts-ignore
    // JEEFACEFILTERAPI.toggle_pause(true, true);
  }

  const componentMap = {
    account: <Account />,
    settings: <Settings />,
    search: <Search />,
    map: (
      <Suspense fallback={<div>Loading...</div>}>
        <Map />
      </Suspense>
    ),
    // map: <Map />,
    video: <Video />,
    snaps: <Snaps />,
    chat: <Chat />,
    discover: <Discover />
  };

  return app.drawers
    ? app.drawers.map(
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
            className={classNames(styles.drawer, {
              [styles.dark]: theme === 'dark'
            })}
          >
            <Animated
              animationIn={animationIn}
              animationOut={animationOut}
              animationInDuration={animationInDuration}
              animationOutDuration={animationOutDuration}
              isVisible={show}
            >
              <section className={styles.content}>
                <button onClick={() => hideDrawer(component)}>Close Drawer</button>
                {componentMap[component]}
              </section>
            </Animated>
          </aside>
        )
      )
    : null;
};

const mapStateToProps = ({ app, users, media }) => ({ app, users, media });

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: (component) => dispatch(actions.hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
