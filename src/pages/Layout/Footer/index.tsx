import React from 'react';
import {
  faCommentAlt,
  faMobile,
  faMobileAlt,
  faCircle,
  faCircleNotch,
  faLaugh
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../common/Button';
import styles from './index.module.scss';

const Footer: React.FC<{}> = () => (
  <footer className={styles.footer}>
    <section className={styles.top}>
      <Button icon={faCircleNotch} iconClass={styles.capture} />
      <Button icon={faLaugh} iconClass={styles.filter} />
    </section>
    <section className={styles.bottom}>
      <article>
        <Button
          icons={[faCommentAlt, faCircle]}
          iconClasses={[null, styles.msgNotification]}
          buttonClass={styles.chatBtn}
          label="Chat"
        />
      </article>
      <article>
        <Button
          icons={[faMobile, faMobileAlt]}
          buttonClass={styles.archiveBtn}
        />
      </article>
      <article>
        <Button
          icons={[faMobile, faMobile]}
          label="Discover"
          buttonClass={styles.discoverBtn}
        />
      </article>
    </section>
  </footer>
);

export default Footer;
