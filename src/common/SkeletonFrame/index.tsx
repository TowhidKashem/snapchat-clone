import React from 'react';
import './index.scss';

interface Props {
  count?: number;
}

const SkeletonFrame: React.FC<Props> = ({ count = 1 }) => {
  const nums = new Array(count).fill(null);
  return (
    <>
      {nums.map((num, index) => (
        <article key={num + index} className="skeleton-frame"></article>
      ))}
    </>
  );
};

export default SkeletonFrame;
