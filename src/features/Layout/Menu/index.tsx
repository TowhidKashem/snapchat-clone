import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Search from 'features/Search';
import styles from './index.module.scss';

import { Animated } from 'react-animated-css';

const Menu: React.SFC<any> = ({ app, hideDrawer }) => {
  let component: JSX.Element | null = null;
  switch (app.drawerComponent) {
    case 'search':
      component = <Search />;
  }

  return (
    <aside className={styles.menu}>
      <Animated
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInDuration={300}
        animationOutDuration={300}
        isVisible={app.showDrawer}
        animateOnMount={false}
      >
        <section className={styles.content}>
          <FontAwesomeIcon icon={faAngleDown} size="2x" onClick={() => hideDrawer()} />
          {component}
        </section>
      </Animated>
    </aside>
  );
};

const mapStateToProps = ({ app, users }) => ({ app, users });

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (component) => dispatch(actions.showDrawer(component)),
  hideDrawer: () => dispatch(actions.hideDrawer())
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
