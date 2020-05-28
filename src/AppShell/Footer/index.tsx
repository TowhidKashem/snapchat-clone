import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { ShowDrawer, HideDrawer } from 'AppShell/types';
import Button from 'common/Button';
import './index.scss';

interface Props {
  showDrawer: ShowDrawer;
  hideDrawer: HideDrawer;
}

const Footer: React.FC<Props> = ({ showDrawer }) => (
  <footer className="footer">
    <Grid fluid>
      <Row middle="xs" center="xs">
        <Col xs={4}>
          <Button
            icons={['faCommentAlt', 'faDot']}
            iconClasses={[null, 'msg-notification']}
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
        </Col>
        <Col xs={4}>
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
        </Col>
        <Col xs={4}>
          <Button
            icons={['faMobile', 'faMobile']}
            buttonClass="discover-btn"
            label="Discover"
            onclick={() =>
              showDrawer({
                component: 'discover',
                animationIn: 'slideInRight',
                animationOut: 'slideOutRight'
              })
            }
          />
        </Col>
      </Row>
    </Grid>
  </footer>
);

export default Footer;
