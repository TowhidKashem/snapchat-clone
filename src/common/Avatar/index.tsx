import React from 'react';
import styles from './index.module.scss';

interface Props {
  src: string;
}

const Avatar: React.FC<Props> = ({ src }) => <img src={src} className={styles.avatar} />;

export default Avatar;
