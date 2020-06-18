import React from 'react';
import { Animated } from 'react-animated-css';
import { ShowDrawer, HideDrawer, FooterType, SetFooterType } from 'AppShell/types';
import Button from 'common/Button';
import './index.scss';

interface Props {
  footerType: FooterType;
  setFooterType: SetFooterType;
  showDrawer: ShowDrawer;
  hideDrawer: HideDrawer;
}

const Footer: React.FC<Props> = ({ footerType, setFooterType, showDrawer, hideDrawer }) =>
  footerType !== 'none' ? (
    <footer className="footer">
      <div className="left">
        <Button
          icons={['faCommentAlt', 'faDot']}
          iconClasses={[null, 'new-msg']}
          buttonClass="chat-btn"
          label="Chat"
          onclick={() =>
            showDrawer({
              component: 'chat',
              animationIn: 'slideInLeft',
              animationOut: 'slideOutLeft'
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
            buttonClass="archive-btn"
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
          buttonClass="discover-btn"
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
  ) : null;

export default Footer;
