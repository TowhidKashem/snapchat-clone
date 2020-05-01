import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { loadMenu } from 'redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Search from 'features/Search';
import styles from './index.module.scss';

interface Props {}

const Menu: React.SFC<any> = ({ app }) => {
  useEffect(() => {
    console.warn('mma', app);
  }, []);

  let component: JSX.Element | null = null;
  switch (app.drawer) {
    case 'search':
      component = <Search />;
  }
  return (
    <>
      {app.drawer && (
        <aside className={styles.menu}>
          <FontAwesomeIcon icon={faAngleDown} size="2x" onClick={() => {}} />
          {component}
        </aside>
      )}
    </>
  );
};

const mapStateToProps = ({ app, user }) => ({ app, user });

export default connect(mapStateToProps)(Menu);
