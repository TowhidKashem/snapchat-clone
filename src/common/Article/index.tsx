import React from 'react';
import styles from './index.module.scss';

interface Props {
  username: string;
  avatar: string;
}

const Article: React.FC<Props> = ({ username, avatar }) => {
  return (
    <article className={styles.pod}>
      <header>{username}</header>
      <img src={avatar} />
    </article>
  );
};

export default Article;
