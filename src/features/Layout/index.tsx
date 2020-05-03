import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import Toolbar from './Toolbar';
import Header from './Header';
import Footer from './Footer';
import Drawer from './Drawer';
import styles from './index.module.scss';

interface Props {
  getUsers: () => void;
  children: JSX.Element;
}

const Layout: React.FC<Props> = ({ getUsers, children }) => {
  useEffect(() => {
    // Load some dummy data
    getUsers();
  }, []);
  return (
    <div className={styles.wrapper}>
      <Toolbar />
      <Header />
      <section className={styles.view}>{children}</section>
      <Drawer />
      <Footer />
    </div>
  );
};

const mapStateToProps = ({ app, users }) => ({ app, users });

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(actions.getUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
