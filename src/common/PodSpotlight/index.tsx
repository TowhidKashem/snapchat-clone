import React from 'react';
import './index.scss';

const PodSpotlight: React.FC<{
  readonly title: string;
  readonly image: string;
  readonly testId?: string;
}> = ({ title, image, testId }) => (
  <article className="pod spotlight" data-test={testId}>
    <img src={image} alt="" />
    <div className="meta">
      <header>{title}</header>
    </div>
  </article>
);

export default PodSpotlight;
