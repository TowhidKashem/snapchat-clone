import React from 'react';
import { Animated } from 'react-animated-css';
import { ShowDrawer, HideDrawer, CollapseNav } from 'AppShell/types';
import Button from 'common/Button';
import './index.scss';

interface Props {
  collapsedNav: boolean;
  collapseNav: CollapseNav;
  showDrawer: ShowDrawer;
  hideDrawer: HideDrawer;
}

const Footer: React.FC<Props> = ({
  collapsedNav,
  collapseNav,
  showDrawer,
  hideDrawer
}) => (
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
        isVisible={collapsedNav}
        animateOnMount={false}
      >
        <Button
          icon="faCircle"
          buttonClass="btn-capture"
          onclick={() => {
            collapseNav(false);
            hideDrawer();
          }}
        />
      </Animated>
      <Animated
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInDuration={500}
        animationOutDuration={500}
        isVisible={!collapsedNav}
        animateOnMount={false}
      >
        <Button
          icons={['faMobile', 'faMobileAlt']}
          buttonClass="archive-btn"
          onclick={() =>
            showDrawer({
              component: 'archive',
              animationIn: 'slideInUp',
              animationOut: 'slideOutDown'
            })
          }
        />
      </Animated>
    </div>
    <div className="right">
      <Button
        icons={['faMobile', 'faMobile']}
        buttonClass="discover-btn"
        label="Discover"
        onclick={() => {
          collapseNav(true);
          showDrawer({
            component: 'discover',
            animationIn: 'slideInRight',
            animationOut: 'slideOutRight'
          });
        }}
      />
    </div>
  </footer>
);

export default Footer;
