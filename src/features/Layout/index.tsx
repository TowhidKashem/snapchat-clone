import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import Toolbar from './Toolbar';
import Header from './Header';
import Footer from './Footer';
import Drawer from './Drawer';
import styles from './index.module.scss';

interface Props {
  app: any;
  getUser: () => void;
  getUsers: () => void;
  children: JSX.Element;
}

const Layout: React.FC<Props> = ({ app, getUser, getUsers, children }) => {
  useEffect(() => {
    // // Load some dummy data
    // getUser();
    // getUsers();
  }, []);

  return (
    <>
      <Toolbar />
      <Header />
      <section className={styles.view}>{children}</section>
      <Drawer />
      <Footer />
    </>
  );
};

const mapStateToProps = ({ app, session, users }) => ({ app, session, users });

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(actions.getUser()),
  getUsers: () => dispatch(actions.getUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
