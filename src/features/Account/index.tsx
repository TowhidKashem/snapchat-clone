import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Widget from 'common/Widget';
import ActionItem from 'common/Pod/ActionItem';
import Icon from 'common/Icon';
import Map from './Map';
import styles from './index.module.scss';

const Account: React.SFC<any> = ({ user, showDrawer, hideDrawer }) => (
  <main className={styles.account}>
    <Grid fluid>
      <Row middle="xs">
        <Col xs={6}>
          <Icon icon="faAngleDown" onClick={() => hideDrawer('account')} size="2x" />
        </Col>
        <Col xs={6}>
          <Row end="xs">
            <Col>
              <Icon
                icon="faCog"
                size="2x"
                onClick={() => showDrawer('settings', 'slideInRight', 'slideOutRight')}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Col xs={12}>
        <Row center="xs">
          <Col>
            <Icon icon="faSnapchatSquare" size="7x" />
            <br />
            {user.username}
          </Col>
        </Row>
      </Col>
    </Grid>
    <Widget header="Stories" transparent>
      <ActionItem leftIcon="faCamera" rightIcon="faEllipsisV" label="Add to My Story" />
      <ActionItem leftIcon="faCamera" rightIcon="faEllipsisV" label="Add to Our Story" />
    </Widget>
    <Widget header="Friends" transparent>
      <ActionItem leftIcon="faUserPlus" rightIcon="faAngleRight" label="Add Friends" />
      <ActionItem leftIcon="faListAlt" rightIcon="faAngleRight" label="My Friends" />
    </Widget>
    <Widget header="Bitmoji" transparent>
      <ActionItem leftIcon="faGrinBeam" rightIcon="faAngleRight" label="Create Bitmoji" />
    </Widget>
    <Widget header="Snap Map">
      <Map />
      <ActionItem
        leftIcon="faCompass"
        rightIcon="faAngleRight"
        label="Set a Status"
        transparent
      />
    </Widget>
  </main>
);

const mapStateToProps = ({ app, session }) => ({
  app,
  user: session.user
});

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (component, animationIn, animationOut) =>
    dispatch(actions.showDrawer(component, animationIn, animationOut)),
  hideDrawer: (component) => dispatch(actions.hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
