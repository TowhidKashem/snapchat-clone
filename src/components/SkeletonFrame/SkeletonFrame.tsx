import React from 'react';
import './SkeletonFrame.scss';

const SkeletonFrame: React.FC<
  Readonly<{
    count?: number;
  }>
> = ({ count = 1 }) => (
  <>
    {new Array(count).fill(null).map((val, index) => (
      <article key={`frame-${index}`} className="skeleton-frame" />
    ))}
  </>
);

export default SkeletonFrame;
