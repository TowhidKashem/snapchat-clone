import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'common/Button';
import styles from './index.module.scss';

const Footer: React.SFC<{}> = () => (
  <footer className={styles.footer}>
    <Grid fluid>
      <Row middle="xs" center="xs">
        <Col xs={4}>
          <Button
            icons={['faCommentAlt', 'faDot']}
            iconClasses={[null, styles.msgNotification]}
            buttonClass={styles.chatBtn}
            label="Chat"
          />
        </Col>
        <Col xs={4}>
          <Button icons={['faMobile', 'faMobileAlt']} buttonClass={styles.archiveBtn} />
        </Col>
        <Col xs={4}>
          <Button
            icons={['faMobile', 'faMobile']}
            label="Discover"
            buttonClass={styles.discoverBtn}
          />
        </Col>
      </Row>
    </Grid>
  </footer>
);

export default Footer;
