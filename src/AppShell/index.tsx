import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Drawer as DrawerType, ShowDrawer, HideDrawer } from 'AppShell/Drawer/types';
import { showDrawer, hideDrawer, getUser, getUsers } from './duck';
import Toolbar from './Toolbar';
import Header from './Header';
import Footer from './Footer';
import Drawer from './Drawer';
import './index.scss';

interface Props {
  getUser: () => void;
  getUsers: () => void;
  showDrawer: ShowDrawer;
  hideDrawer: HideDrawer;
  drawers: DrawerType[];
  children: JSX.Element;
}

const AppShell: React.FC<Props> = ({
  // getUser,
  // getUsers,
  children,
  showDrawer,
  hideDrawer,
  drawers
}) => {
  useEffect(() => {
    // // Load some dummy data
    // getUser();
    // getUsers();
  }, []);

  return (
    <>
      <Toolbar drawers={drawers} />
      <Header showDrawer={showDrawer} />
      <section className="view">{children}</section>
      {drawers && <Drawer drawers={drawers} hideDrawer={hideDrawer} />}
      <Footer showDrawer={showDrawer} hideDrawer={hideDrawer} />
    </>
  );
};

const mapStateToProps = ({ app, session, users, media }) => ({
  session,
  users,
  media,
  drawers: app.drawers
});

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (component) => dispatch(showDrawer(component)),
  hideDrawer: (component) => dispatch(hideDrawer(component)),
  getUser: () => dispatch(getUser()),
  getUsers: () => dispatch(getUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppShell);
