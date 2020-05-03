import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Module from 'common/Module';
import ActionItem from 'common/Pod/ActionItem';
import Icon from 'common/Icon';
import Map from './Map';
import styles from './index.module.scss';

const Account: React.SFC<any> = ({ app, hideDrawer }) => (
  <main className={styles.account}>
    <Grid fluid>
      <Row middle="xs">
        <Col xs={6}>
          <Icon icon="faAngleDown" onClick={hideDrawer} size="2x" />
        </Col>
        <Col xs={6}>
          <Icon icon="faCog" size="1x" />
        </Col>
      </Row>
    </Grid>

    <Icon icon="faSnapchatSquare" size="7x" />

    <Module header="Stories" transparent>
      <ActionItem leftIcon="faCamera" rightIcon="faEllipsisV" label="Add to My Story" />
      <ActionItem leftIcon="faCamera" rightIcon="faEllipsisV" label="Add to Our Story" />
    </Module>
    <Module header="Friends" transparent>
      <ActionItem leftIcon="faUserPlus" rightIcon="faAngleRight" label="Add Friends" />
      <ActionItem leftIcon="faListAlt" rightIcon="faAngleRight" label="My Friends" />
    </Module>
    <Module header="Bitmoji" transparent>
      <ActionItem leftIcon="faGrinBeam" rightIcon="faAngleRight" label="Create Bitmoji" />
    </Module>
    <Module header="Snap Map">
      <Map />
      <ActionItem
        leftIcon="faCompass"
        rightIcon="faAngleRight"
        label="Set a Status"
        transparent
      />
    </Module>
  </main>
);

const mapStateToProps = ({ app, users }) => ({
  app,
  users: users.dummyUsers
});

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: () => dispatch(actions.hideDrawer())
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
