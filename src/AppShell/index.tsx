import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Drawer as DrawerType,
  ShowDrawer,
  HideDrawer,
  FooterType,
  SetFooterType
} from './types';
import { showDrawer, hideDrawer, setFooterType } from './duck';
import { getSession, getFriends } from 'features/User/duck';
import { getPhotos, toggleCameraMode } from 'features/Camera/duck';
import Toolbar from './Toolbar';
import Footer from './Footer';
import Drawer from './Drawer';
import Header from 'common/Header';

interface Props {
  drawers: DrawerType[];
  showDrawer: ShowDrawer;
  hideDrawer: HideDrawer;
  footerType: FooterType;
  setFooterType: SetFooterType;
  avatar: string;
  getSession: () => void;
  getFriends: () => void;
  getPhotos: () => void;
  toggleCameraMode: () => void;
  children: JSX.Element;
}

const AppShell: React.FC<Props> = ({
  drawers,
  showDrawer,
  hideDrawer,
  footerType,
  setFooterType,
  avatar,
  getSession,
  getFriends,
  getPhotos,
  toggleCameraMode,
  children
}) => {
  // Init the app
  useEffect(() => {
    getSession();
    getFriends();
    getPhotos();
  }, [getSession, getFriends, getPhotos]);

  return (
    <>
      <Toolbar drawers={drawers} />
      <Header
        avatar={avatar}
        showDrawer={showDrawer}
        toggleCameraMode={toggleCameraMode}
      />
      <section className="view">{children}</section>
      {drawers && <Drawer drawers={drawers} />}
      <Footer
        footerType={footerType}
        setFooterType={setFooterType}
        drawers={drawers}
        showDrawer={showDrawer}
        hideDrawer={hideDrawer}
      />
    </>
  );
};

const mapStateToProps = ({ app, user, users, media }) => ({
  users,
  media,
  drawers: app.drawers,
  footerType: app.footerType,
  avatar: user.session.avatar
});

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (component) => dispatch(showDrawer(component)),
  hideDrawer: (component?) => dispatch(hideDrawer(component)),
  setFooterType: (footerType) => dispatch(setFooterType(footerType)),
  getSession: () => dispatch(getSession()),
  getFriends: () => dispatch(getFriends()),
  getPhotos: () => dispatch(getPhotos()),
  toggleCameraMode: () => dispatch(toggleCameraMode())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppShell);
