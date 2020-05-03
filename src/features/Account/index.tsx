import React from 'react';
import { connect } from 'react-redux';
import Module from 'common/Module';
import ActionItem from 'common/Pod/ActionItem';
import Icon from 'common/Icon';
import Map from './Map';
import styles from './index.module.scss';

const Account: React.SFC<any> = ({ app }) => (
  <main className={styles.account}>
    <Icon icon="faSnapchatSquare" />
    <Module title="Stories">
      <ActionItem leftIcon="faCamera" rightIcon="faCommentDots" label="Add to My Story" />
      <ActionItem
        leftIcon="faCamera"
        rightIcon="faCommentDots"
        label="Add to Our Story"
      />
    </Module>
    <Module title="Friends">
      <ActionItem leftIcon="faUserPlus" rightIcon="faAngleRight" label="Add Friends" />
      <ActionItem leftIcon="faListAlt" rightIcon="faAngleRight" label="My Friends" />
    </Module>
    <Module title="Bitmoji">
      <ActionItem leftIcon="faGrinBeam" rightIcon="faAngleRight" label="Create Bitmoji" />
    </Module>
    <Module title="Snap Map">
      <Map />
      <ActionItem leftIcon="faCompass" rightIcon="faAngleRight" label="Set a Status" />
    </Module>
  </main>
);

const mapStateToProps = ({ app, users }) => ({
  app,
  users: users.dummyUsers
});

export default connect(mapStateToProps)(Account);
