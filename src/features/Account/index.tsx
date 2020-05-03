import React from 'react';
import { connect } from 'react-redux';
import { mapOptions } from 'config';
import UL from 'common/UL';
import LI from 'common/LI';
import Map from './Map';
import styles from './index.module.scss';

interface MapOptions {
  googleMapURL: string;
  loadingElement: string;
  containerElement: string;
  mapElement: string;
}

const Account: React.FC<any> = ({ app, users, loadMenu }) => (
  <main className={styles.account}>
    <UL header="Stories">
      <LI leftIcon="faCamera" rightIcon="faCommentDots" label="Add to My Story" />
      <LI leftIcon="faCamera" rightIcon="faCommentDots" label="Add to Our Story" />
    </UL>
    <UL header="Friends">
      <LI leftIcon="faUserPlus" rightIcon="faAngleRight" label="Add Friends" />
      <LI leftIcon="faListAlt" rightIcon="faAngleRight" label="My Friends" />
    </UL>
    <UL header="Bitmoji">
      <LI leftIcon="faGrinBeam" rightIcon="faAngleRight" label="Create Bitmoji" />
    </UL>
    <UL header="Snap Map">
      <LI>
        {/* <Map {...(mapOptions as MapOptions)} lat={-34.397} lng={150.644} showMarker /> */}
      </LI>
      <LI leftIcon="faCompass" rightIcon="faAngleRight" label="Set a Status" />
    </UL>
  </main>
);

const mapStateToProps = ({ app, users }) => ({
  app,
  users: users.dummyUsers
});

export default connect(mapStateToProps)(Account);
