import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { DrawerContext } from 'contexts/drawer';
import Search from 'features/Search';
import styles from './index.module.scss';

const Menu: React.SFC<{}> = () => {
  const { page, setPage } = useContext(DrawerContext);

  let component: JSX.Element | null = null;
  switch (page) {
    case 'search':
      component = <Search />;
  }

  return (
    <>
      {page && (
        <aside className={styles.menu}>
          <FontAwesomeIcon icon={faAngleDown} size="2x" onClick={() => setPage('')} />
          {component}
        </aside>
      )}
    </>
  );
};

export default Menu;
