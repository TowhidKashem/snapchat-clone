import React from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import classNames from 'classnames';
import { Animated } from 'react-animated-css';
import { showDrawer, hideAllDrawers, setFooterType } from 'AppShell/AppShellStore';
import { atleastOneDrawerOpen } from '../data';
import Button from 'components/Button/Button';
import './Footer.scss';

const Footer: React.FC = () => {
  const dispatch = useDispatch();
  const { drawers, footerType } = useSelector(({ app }: RootStateOrAny) => app);

  return (
    <>
      {footerType !== 'none' && (
        <footer
          className={classNames('footer', {
            'light-shadow': atleastOneDrawerOpen(drawers)
          })}
        >
          <div className="left">
            <Button
              icons={['faCommentAlt', 'faDot']}
              iconClasses={['', 'new-msg']}
              className="btn-chat"
              testId="btn-chat"
              label="Chat"
              onClick={() =>
                dispatch(
                  showDrawer({
                    component: 'chat',
                    animationIn: 'slideInLeft',
                    animationOut: 'slideOutLeft',
                    theme: 'stripped'
                  })
                )
              }
            />
          </div>
          <div className="center">
            <Animated
              animationIn="zoomIn"
              animationOut="zoomOut"
              animationInDuration={500}
              animationOutDuration={500}
              isVisible={footerType === 'collapsed'}
              animateOnMount={false}
            >
              <Button
                icon="faCircle"
                className="btn-capture"
                testId="btn-capture-footer"
                onClick={() => {
                  dispatch(setFooterType('full'));
                  dispatch(hideAllDrawers());
                }}
              />
            </Animated>
            <Animated
              animationIn="zoomIn"
              animationOut="zoomOut"
              animationInDuration={500}
              animationOutDuration={500}
              isVisible={footerType === 'full'}
              animateOnMount={false}
            >
              <Button
                icons={['faMobile', 'faMobileAlt']}
                className="btn-archive"
                testId="btn-archive"
                onClick={() => {
                  dispatch(setFooterType('collapsed'));
                  dispatch(
                    showDrawer({
                      component: 'archive',
                      animationIn: 'slideInUp',
                      animationOut: 'slideOutDown',
                      position: 'back'
                    })
                  );
                }}
              />
            </Animated>
          </div>
          <div className="right">
            <Button
              icons={['faMobile', 'faMobile']}
              className="btn-discover"
              testId="btn-discover"
              label="Discover"
              onClick={() => {
                dispatch(setFooterType('collapsed'));
                dispatch(
                  showDrawer({
                    component: 'discover',
                    animationIn: 'slideInRight',
                    animationOut: 'slideOutRight',
                    position: 'back'
                  })
                );
              }}
            />
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
