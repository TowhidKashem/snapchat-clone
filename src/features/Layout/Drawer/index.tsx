import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import { Animated } from 'react-animated-css';
import Icon from 'common/Icon';
import Account from 'features/Account';
import Search from 'features/Search';
import styles from './index.module.scss';

const Drawer: React.SFC<any> = ({ app, hideDrawer }) => {
  let component: JSX.Element | null = null;
  switch (app.drawerComponent) {
    case 'account':
      component = <Account />;
      break;
    case 'search':
      component = <Search />;
      break;
  }

  return (
    <aside className={styles.drawer}>
      <Animated
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInDuration={300}
        animationOutDuration={300}
        animateOnMount={false}
        isVisible={app.showDrawer}
      >
        <section className={styles.content}>
          {/* <Icon icon="faAngleDown" onClick={hideDrawer} size="2x" /> */}
          {component}
        </section>
      </Animated>
    </aside>
  );
};

const mapStateToProps = ({ app, users }) => ({ app, users });

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: () => dispatch(actions.hideDrawer())
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
