import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ShowDrawer, HideDrawer } from 'app/Drawer/types';
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
  children: JSX.Element;
  drawers: any;
}

const Layout: React.FC<Props> = ({
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

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
