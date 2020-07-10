import React from 'react';
import './index.scss';

interface Props {
  count?: number;
}

const SkeletonFrame: React.FC<Props> = ({ count = 1 }) => (
  <>
    {new Array(count).fill(null).map((val, index) => (
      <article key={`frame-${index}`} className="skeleton-frame"></article>
    ))}
  </>
);

export default SkeletonFrame;
