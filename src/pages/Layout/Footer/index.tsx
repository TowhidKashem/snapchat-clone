import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentAlt,
  faMobile,
  faMobileAlt,
  faCircle,
  faLaugh
} from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <section className={styles.top}>
      <FontAwesomeIcon icon={faCircle} className={styles.capture} />
      <FontAwesomeIcon icon={faLaugh} className={styles.filter} />
    </section>
    <section className={styles.bottom}>
      <article>
        <FontAwesomeIcon icon={faCommentAlt} />
        Chat
      </article>
      <article>
        <FontAwesomeIcon icon={faMobile} />
        <FontAwesomeIcon icon={faMobileAlt} />
      </article>
      <article>
        <FontAwesomeIcon icon={faMobile} />
        Discover
      </article>
    </section>
  </footer>
);

export default Footer;
