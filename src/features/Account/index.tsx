import React, { useEffect, useState, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { ShowDrawer, HideDrawer } from 'AppShell/Drawer/types';
import { showDrawer, hideDrawer } from 'AppShell/duck';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Widget from 'common/Widget';
import ActionItem from 'common/Pod/ActionItem';
import Icon from 'common/Icon';
//import Map from './Map';
import './index.scss';

interface Props {
  showDrawer: ShowDrawer;
  hideDrawer: HideDrawer;
  currentUser: any;
}

const Account: React.FC<Props> = ({ showDrawer, hideDrawer, currentUser }) => {
  const [mapComponent, setMapComponent] = useState<JSX.Element>();

  useEffect(() => {
    setTimeout(async () => {
      const Map = await lazy(() => import('./Map'));
      setMapComponent(
        <Suspense fallback={<div>Loading...</div>}>
          <Map showDrawer={showDrawer} />
        </Suspense>
      );
    }, 300);
  }, []);

  return (
    <main className="account">
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
                  onClick={() =>
                    showDrawer({
                      component: 'settings',
                      animationIn: 'slideInRight',
                      animationOut: 'slideOutRight'
                    })
                  }
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
              {currentUser.username}
            </Col>
          </Row>
        </Col>
      </Grid>
      <Widget header="Stories" transparent>
        <ActionItem leftIcon="faCamera" rightIcon="faEllipsisV" label="Add to My Story" />
        <ActionItem
          leftIcon="faCamera"
          rightIcon="faEllipsisV"
          label="Add to Our Story"
        />
      </Widget>
      <Widget header="Friends" transparent>
        <ActionItem leftIcon="faUserPlus" rightIcon="faAngleRight" label="Add Friends" />
        <ActionItem leftIcon="faListAlt" rightIcon="faAngleRight" label="My Friends" />
      </Widget>
      <Widget header="Bitmoji" transparent>
        <ActionItem
          leftIcon="faGrinBeam"
          rightIcon="faAngleRight"
          label="Create Bitmoji"
        />
      </Widget>
      <Widget header="Snap Map">
        {mapComponent}
        <ActionItem
          leftIcon="faCompass"
          rightIcon="faAngleRight"
          label="Set a Status"
          transparent
        />
      </Widget>
    </main>
  );
};

const mapStateToProps = ({ app }) => ({
  currentUser: app.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (drawer) => dispatch(showDrawer(drawer)),
  hideDrawer: (component) => dispatch(hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
