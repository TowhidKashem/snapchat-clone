import React from 'react';
import './index.scss';

interface Props {
  title: string;
  image: string;
}

const Spotlight: React.FC<Props> = ({ title, image }) => (
  <article className="pod spotlight">
    <img src={image} alt="" />
    <div className="meta">
      <header>{title}</header>
    </div>
  </article>
);

export default Spotlight;
