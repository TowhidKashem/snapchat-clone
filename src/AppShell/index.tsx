import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSession, getFriends } from 'features/User/store';
import { getPhotos } from 'features/Camera/store';
import Header from 'common/Header';
import Toolbar from './Toolbar';
import Drawer from './Drawer';
import Footer from './Footer';

interface Props {
  children: JSX.Element;
}

const AppShell: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  // Init the app
  useEffect(() => {
    dispatch(getSession());
    dispatch(getFriends());
    dispatch(getPhotos());
  }, [dispatch]);

  return (
    <>
      <Toolbar />
      <Header />
      <section className="view">{children}</section>
      <Drawer />
      <Footer />
    </>
  );
};

export default AppShell;
