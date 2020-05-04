import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import classNames from 'classnames';
import { Animated } from 'react-animated-css';
import Icon from 'common/Icon';

import Account from 'features/Account';
import Settings from 'features/Account/Settings';
import Search from 'features/Search';
import Map from 'features/Map';
import Video from 'features/Video';

import styles from './index.module.scss';

interface Props {
  app: any;
  media: any;
  hideDrawer: (component: string) => void;
}

const Drawer: React.SFC<Props> = ({ app, media, hideDrawer }) => {
  const componentMap = {
    account: <Account />,
    settings: <Settings />,
    search: <Search />,
    map: <Map />,
    video: <Video />
  };
  return app.drawers
    ? app.drawers.map(({ component, animationIn, animationOut, show, theme }) => (
        <aside
          className={classNames(styles.drawer, {
            [styles.dark]: theme === 'dark'
            // [styles.dark]: true
          })}
        >
          <Animated
            animationIn={animationIn}
            animationOut={animationOut}
            animationInDuration={300}
            animationOutDuration={300}
            isVisible={show}
          >
            <section className={styles.content}>
              {/* <Icon icon="faAngleDown" onClick={() => hideDrawer(component)} size="2x" /> */}
              {componentMap[component]}
            </section>
          </Animated>
        </aside>
      ))
    : null;
};

const mapStateToProps = ({ app, users, media }) => ({ app, users, media });

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: (component) => dispatch(actions.hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
