import React from 'react';
import classNames from 'classnames';
import { Animated } from 'react-animated-css';
import { Drawer, ShowDrawer, HideDrawer, FooterType, SetFooterType } from '../types';
import { atleastOneDrawerOpen } from '../utils';
import Button from 'common/Button';
import './index.scss';

interface Props {
  footerType: FooterType;
  setFooterType: SetFooterType;
  drawers: Drawer[];
  showDrawer: ShowDrawer;
  hideDrawer: HideDrawer;
}

const Footer: React.FC<Props> = ({
  footerType,
  setFooterType,
  drawers,
  showDrawer,
  hideDrawer
}) => (
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
              showDrawer({
                component: 'chat',
                animationIn: 'slideInLeft',
                animationOut: 'slideOutLeft',
                theme: 'stripped'
              })
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
                setFooterType('full');
                hideDrawer();
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
                setFooterType('collapsed');
                showDrawer({
                  component: 'archive',
                  animationIn: 'slideInUp',
                  animationOut: 'slideOutDown',
                  position: 'back'
                });
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
              setFooterType('collapsed');
              showDrawer({
                component: 'discover',
                animationIn: 'slideInRight',
                animationOut: 'slideOutRight',
                position: 'back'
              });
            }}
          />
        </div>
      </footer>
    )}
  </>
);

export default Footer;
