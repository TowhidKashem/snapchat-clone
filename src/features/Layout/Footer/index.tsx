import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import { Drawer } from 'types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'common/Button';
import styles from './index.module.scss';

interface Props {
  showDrawer: (component: Drawer) => void;
}

const Footer: React.SFC<Props> = ({ showDrawer }) => (
  <footer className={styles.footer}>
    <Grid fluid>
      <Row middle="xs" center="xs">
        <Col xs={4}>
          <Button
            icons={['faCommentAlt', 'faDot']}
            iconClasses={[null, styles.msgNotification]}
            buttonClass={styles.chatBtn}
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
            buttonClass={styles.archiveBtn}
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
            buttonClass={styles.discoverBtn}
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
  showDrawer: (component) => dispatch(actions.showDrawer(component)),
  hideDrawer: (component) => dispatch(actions.hideDrawer(component))
});

export default connect(null, mapDispatchToProps)(Footer);
