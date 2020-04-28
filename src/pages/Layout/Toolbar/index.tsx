import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationArrow,
  faSignal,
  faBatteryHalf
} from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';

const Toolbar: React.SFC<{}> = () => {
  const { useState } = React;
  const [time, setTime] = useState<string>();

  const updateTime = () => {
    const time = new Date().toLocaleTimeString('en-us', {
      hour: 'numeric',
      minute: '2-digit'
    });
    setTime(time);
  };

  setInterval(updateTime, 1000);

  return (
    <div className={styles.toolbar}>
      <article className={styles.left}>
        <time>{time}</time>
        <FontAwesomeIcon icon={faLocationArrow} />
      </article>
      <article className={styles.right}>
        <FontAwesomeIcon icon={faSignal} />
        <FontAwesomeIcon icon={faBatteryHalf} />
      </article>
    </div>
  );
};

export default Toolbar;
