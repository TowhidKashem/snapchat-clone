import React from 'react';
import { connect } from 'react-redux';
import { showDrawer } from 'AppShell/duck';
import Header from 'common/Header';

const Archive = () => (
  <main className="archive">
    <Header showDrawer={showDrawer} />
    Archive
  </main>
);

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (drawer) => dispatch(showDrawer(drawer))
});

export default connect(null, mapDispatchToProps)(Archive);
