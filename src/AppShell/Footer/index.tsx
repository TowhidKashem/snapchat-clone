import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Animated } from 'react-animated-css';
import { showDrawer, hideAllDrawers, setFooterType } from 'AppShell/store';
import { atleastOneDrawerOpen } from '../utils';
import Button from 'common/Button';
import './index.scss';

const Footer: React.FC = () => {
  const dispatch = useDispatch();
  const { drawers, footerType } = useSelector(({ app }) => ({
    drawers: app.drawers,
    footerType: app.footerType
  }));

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
              iconClasses={[null, 'new-msg']}
              buttonClass="btn-chat"
              testId="btn-chat"
              label="Chat"
              onclick={() =>
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
                buttonClass="btn-capture"
                testId="btn-capture-footer"
                onclick={() => {
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
                buttonClass="btn-archive"
                testId="btn-archive"
                onclick={() => {
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
              buttonClass="btn-discover"
              testId="btn-discover"
              label="Discover"
              onclick={() => {
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
