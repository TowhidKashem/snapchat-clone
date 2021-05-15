import React from 'react';
import './index.scss';

const SkeletonFrame: React.FC<{
  readonly count?: number;
}> = ({ count = 1 }) => (
  <>
    {new Array(count).fill(null).map((val, index) => (
      <article key={`frame-${index}`} className="skeleton-frame"></article>
    ))}
  </>
);

export default SkeletonFrame;
