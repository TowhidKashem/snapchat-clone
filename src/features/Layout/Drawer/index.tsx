import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import { Animated } from 'react-animated-css';
import Icon from 'common/Icon';
import Account from 'features/Account';
import Search from 'features/Search';
import styles from './index.module.scss';

interface Props {
  app: any;
  hideDrawer: (component: string) => void;
}

const Drawer: React.SFC<Props> = ({ app, hideDrawer }) => {
  const componentMap = {
    account: <Account />,
    search: <Search />
  };
  return app.drawers
    ? app.drawers.map(({ component, animationIn, animationOut, show }) => (
        <aside className={styles.drawer}>
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

const mapStateToProps = ({ app, users }) => ({ app, users });

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: (component) => dispatch(actions.hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
