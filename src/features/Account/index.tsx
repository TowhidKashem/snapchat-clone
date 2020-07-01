import React from 'react';
import { connect } from 'react-redux';
import { User } from 'features/User/types';
import { ShowDrawer, HideDrawer } from 'AppShell/types';
import { showDrawer, hideDrawer } from 'AppShell/duck';
import { SetLatLon, GetGeoLocation } from 'features/User/types';
import { getGeoLocation, setLatLon } from 'features/User/duck';
import Button from 'common/Button';
import Widget from 'common/Widget';
import ActionItem from 'common/Pod/ActionItem';
import Icon from 'common/Icon';
import Map from './Map';
import './index.scss';

interface Props {
  showDrawer: ShowDrawer;
  hideDrawer: HideDrawer;
  session: User;
  getGeoLocation: GetGeoLocation;
  setLatLon: SetLatLon;
}

const Account: React.FC<Props> = ({
  showDrawer,
  hideDrawer,
  session,
  getGeoLocation,
  setLatLon
}) => (
  <main className="account">
    <header>
      <Button
        icon="faAngleDown"
        onclick={() => hideDrawer('account')}
        buttonClass="btn-close"
      />
      <Icon icon="faCog" className="ico-gear" />
    </header>
    <div className="logo">
      <Icon icon="faSnapchatSquare" className="ico-brand" />
      <strong>{session.username}</strong>
    </div>
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
      <Map
        getGeoLocation={getGeoLocation}
        setLatLon={setLatLon}
        showDrawer={showDrawer}
      />
      <ActionItem
        leftIcon="faCompass"
        rightIcon="faAngleRight"
        label="Set a Status"
        straightEdge
      />
    </Widget>
    <footer>
      <p>
        <a
          href="https://github.com/TowhidKashem/react-snapchat-clone"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="faGithub" /> Github Repo
        </a>
      </p>
    </footer>
  </main>
);

const mapStateToProps = ({ user }) => ({
  session: user.session
});

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (drawer) => dispatch(showDrawer(drawer)),
  hideDrawer: (component) => dispatch(hideDrawer(component)),
  getGeoLocation: () => dispatch(getGeoLocation()),
  setLatLon: (lat, lon) => dispatch(setLatLon(lat, lon))
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
