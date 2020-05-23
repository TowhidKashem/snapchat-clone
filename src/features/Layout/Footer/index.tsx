import React from 'react';
import { connect } from 'react-redux';
import { showDrawer, hideDrawer } from 'features/Layout/duck';
import { Drawer } from 'types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'common/Button';
import './index.scss';

interface Props {
  showDrawer: (component: Drawer) => void;
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
                component: 'snaps',
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

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (component) => dispatch(showDrawer(component)),
  hideDrawer: (component) => dispatch(hideDrawer(component))
});

export default connect(null, mapDispatchToProps)(Footer);
