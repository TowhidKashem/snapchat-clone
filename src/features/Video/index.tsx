import React from 'react';
import styles from './index.module.scss';

const Video = () => (
  <main className={styles.video}>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/Jhq6RyOGVU4?controls=0&autoplay=0"
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </main>
);

export default Video;
