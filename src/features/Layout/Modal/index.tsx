import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import { Animated } from 'react-animated-css';
import Icon from 'common/Icon';
import Map from 'features/Map';
import styles from './index.module.scss';

const Modal: React.SFC<any> = ({ app, hideModal }) => {
  let component: JSX.Element | null = null;
  switch (app.modalComponent) {
    case 'map':
      component = <Map />;
      break;
  }

  return (
    <div className={styles.modal}>
      <Animated
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInDuration={300}
        animationOutDuration={300}
        animateOnMount={false}
        isVisible={app.showModal}
      >
        <section className={styles.content}>
          <Icon icon="faTimesCircle" onClick={hideModal} size="2x" />
          {component}
        </section>
      </Animated>
    </div>
  );
};

const mapStateToProps = ({ app, users }) => ({ app, users });

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(actions.hideModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
