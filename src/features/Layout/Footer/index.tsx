import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {
  faCommentAlt,
  faMobile,
  faMobileAlt,
  faCircle,
  faCircleNotch,
  faLaugh
} from '@fortawesome/free-solid-svg-icons';
import Button from 'common/Button';
import styles from './index.module.scss';

const Footer: React.FC<{}> = () => (
  <footer className={styles.footer}>
    <section className={styles.top}>
      <Button icon={faCircleNotch} iconClass={styles.capture} />
      <Button icon={faLaugh} iconClass={styles.filter} />
    </section>
    <section className={styles.bottom}>
      <Grid fluid>
        <Row middle="xs" center="xs">
          <Col xs={4}>
            <Button
              icons={[faCommentAlt, faCircle]}
              iconClasses={[null, styles.msgNotification]}
              buttonClass={styles.chatBtn}
              label="Chat"
            />
          </Col>
          <Col xs={4}>
            <Button icons={[faMobile, faMobileAlt]} buttonClass={styles.archiveBtn} />
          </Col>
          <Col xs={4}>
            <Button
              icons={[faMobile, faMobile]}
              label="Discover"
              buttonClass={styles.discoverBtn}
            />
          </Col>
        </Row>
      </Grid>
    </section>
  </footer>
);

export default Footer;
