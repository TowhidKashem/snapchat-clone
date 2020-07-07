import React, { useRef } from 'react';
import classNames from 'classnames';
import { Animated } from 'react-animated-css';
import { onAnimationComplete } from 'utils/animation';
import { Drawer as DrawerType } from '../types';
import Account from 'features/Account';
import Search from 'features/Search';
import SnapMap from 'features/SnapMap';
import Snap from 'features/Snap';
import Archive from 'features/Archive';
import Chat from 'features/Chat';
import Discover from 'features/Discover';
import './index.scss';

interface Props {
  drawers: DrawerType[];
}

const Drawer: React.FC<Props> = ({ drawers }) => {
  const drawerContent = useRef(null);

  const getComponent = (component, show) => {
    const componentMap = {
      account: <Account />,
      search: <Search show={show} />,
      snapMap: <SnapMap />,
      snap: <Snap />,
      archive: <Archive />,
      chat: <Chat />,
      discover: <Discover drawerContent={drawerContent} />
    };
    return componentMap[component];
  };

  return drawers
    ? (drawers as any).map(
        ({
          component,
          animationIn,
          animationOut,
          animationInDuration,
          animationOutDuration,
          show,
          theme,
          position
        }) => {
          const elem = document.getElementById(component);
          if (show) {
            elem?.classList.remove('collapse');
          } else {
            onAnimationComplete(
              () => elem?.classList.add('collapse'),
              animationOutDuration
            );
          }

          return (
            <aside
              id={component}
              key={component}
              className={classNames('drawer', {
                [theme]: true,
                [position]: true
              })}
            >
              <div className="view" data-test={`${component}-drawer`}>
                <Animated
                  animationIn={animationIn}
                  animationOut={animationOut}
                  animationInDuration={animationInDuration}
                  animationOutDuration={animationOutDuration}
                  isVisible={show}
                >
                  <section
                    ref={drawerContent}
                    className="content"
                    data-test="drawer-content"
                    style={{ height: window.innerHeight + 'px' }}
                  >
                    {getComponent(component, show)}
                  </section>
                </Animated>
              </div>
            </aside>
          );
        }
      )
    : null;
};

export default Drawer;
