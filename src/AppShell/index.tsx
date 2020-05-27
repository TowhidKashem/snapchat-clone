import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Drawer as DrawerType, ShowDrawer, HideDrawer } from './types';
import { showDrawer, hideDrawer } from './duck';
import { getUser } from 'features/User/duck';
import Toolbar from './Toolbar';
import Header from './Header';
import Footer from './Footer';
import Drawer from './Drawer';
import './index.scss';

interface Props {
  showDrawer: ShowDrawer;
  hideDrawer: HideDrawer;
  drawers: DrawerType[];
  getUser: () => void;
  children: JSX.Element;
}

const AppShell: React.FC<Props> = ({
  showDrawer,
  hideDrawer,
  drawers,
  getUser,
  children
}) => {
  // Init the app
  useEffect(() => {
    getUser();
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

const mapStateToProps = ({ app, users, media }) => ({
  users,
  media,
  drawers: app.drawers
});

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (component) => dispatch(showDrawer(component)),
  hideDrawer: (component) => dispatch(hideDrawer(component)),
  getUser: () => dispatch(getUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppShell);
