import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { DrawerContext } from 'contexts/drawer';
import Search from 'features/Search';

import { Animated } from 'react-animated-css';
import styles from './index.module.scss';

const Menu: React.SFC<{}> = () => {
  const { page, setPage } = useContext(DrawerContext);

  let component: JSX.Element | null = null;
  switch (page) {
    case 'search':
      component = <Search />;
  }

  return (
    <Animated
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInDuration={300}
      animationOutDuration={350}
      isVisible={component ? true : false}
      animateOnMount={false}
    >
      <aside className={styles.menu}>
        <FontAwesomeIcon icon={faAngleDown} size="2x" onClick={() => setPage('')} />
        {component}
      </aside>
    </Animated>
  );
};

export default Menu;
