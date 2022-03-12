import React from 'react';
import SkeletonFrame from './SkeletonFrame';

export default {
  title: 'SkeletonFrame',
  component: SkeletonFrame
};

export const Default = () => <SkeletonFrame />;

export const Multiple = () =>
  new Array(3).fill(null).map((val, index) => <SkeletonFrame key={`frame-${index}`} />);
