import React from 'react';
import './index.scss';

interface Props {
  title: string;
  time: string;
  image: string;
}

const Spotlight: React.FC<Props> = ({ title, time, image }) => (
  <article className="pod spotlight">
    <img src={image} alt="" />
    <div className="meta">
      <header>{title}</header>
      <time>{time}</time>
    </div>
  </article>
);

export default Spotlight;
