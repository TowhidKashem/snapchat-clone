import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Drawer as DrawerType, ShowDrawer, HideDrawer, CollapseNav } from './types';
import { showDrawer, hideDrawer, collapseNav } from './duck';
import { getUser, getUsers } from 'features/User/duck';
import Toolbar from './Toolbar';
import Footer from './Footer';
import Drawer from './Drawer';
import Header from 'common/Header';
import './index.scss';

interface Props {
  showDrawer: ShowDrawer;
  hideDrawer: HideDrawer;
  drawers: DrawerType[];
  collapseNav: CollapseNav;
  collapsedNav: boolean;
  getUser: () => void;
  getUsers: () => void;
  children: JSX.Element;
}

const AppShell: React.FC<Props> = ({
  showDrawer,
  hideDrawer,
  drawers,
  collapseNav,
  collapsedNav,
  getUser,
  getUsers,
  children
}) => {
  // Init the app
  useEffect(() => {
    getUser();
    getUsers();
  }, []);

  return (
    <>
      <Toolbar drawers={drawers} />
      <Header showDrawer={showDrawer} />
      <section className="view">{children}</section>
      {drawers && <Drawer drawers={drawers} hideDrawer={hideDrawer} />}
      <Footer
        collapsedNav={collapsedNav}
        collapseNav={collapseNav}
        showDrawer={showDrawer}
        hideDrawer={hideDrawer}
      />
    </>
  );
};

const mapStateToProps = ({ app, users, media }) => ({
  users,
  media,
  drawers: app.drawers,
  collapsedNav: app.collapsedNav
});

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (component) => dispatch(showDrawer(component)),
  hideDrawer: (component) => dispatch(hideDrawer(component)),
  collapseNav: (collapse) => dispatch(collapseNav(collapse)),
  getUser: () => dispatch(getUser()),
  getUsers: () => dispatch(getUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppShell);
