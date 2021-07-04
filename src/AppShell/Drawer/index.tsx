import React, { useRef, ReactElement } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Animated } from 'react-animated-css';
import { onAnimationComplete } from 'utils';
import { Object } from 'types';
import { AnimationType, Drawer as DrawerT } from '../types';
import Account from 'features/Account';
import Search from 'features/Search';
import SnapMap from 'features/SnapMap';
import Snap from 'features/Snap';
import Archive from 'features/Archive';
import Chat from 'features/Chat';
import Discover from 'features/Discover';
import './index.scss';

const Drawer: React.FC = () => {
  const { drawers } = useSelector(({ app }: RootStateOrAny) => app);
  const drawerContent = useRef<HTMLElement>(null);

  const getComponent = (component: string, show: boolean): ReactElement => {
    const componentMap: Object<ReactElement> = {
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

  return (
    <>
      {drawers &&
        drawers.map(
          ({
            component,
            animationIn,
            animationOut,
            animationInDuration,
            animationOutDuration,
            show = false,
            theme,
            position
          }: DrawerT) => {
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
                className={`drawer ${theme} ${position}`}
              >
                <div className="view" data-test={`${component}-drawer`}>
                  <Animated
                    animationIn={animationIn as AnimationType}
                    animationOut={animationOut as AnimationType}
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
        )}
    </>
  );
};

export default Drawer;
