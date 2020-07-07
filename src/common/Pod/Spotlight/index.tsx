import React from 'react';
import './index.scss';

interface Props {
  title: string;
  image: string;
  testId?: string;
}

const Spotlight: React.FC<Props> = ({ title, image, testId }) => (
  <article className="pod spotlight" data-test={testId}>
    <img src={image} alt="" />
    <div className="meta">
      <header>{title}</header>
    </div>
  </article>
);

export default Spotlight;
