import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import SkeletonFrame from './index';

export default {
  title: 'SkeletonFrame',
  component: SkeletonFrame,
  decorators: [withKnobs]
};

export const Default = () => <SkeletonFrame />;

export const Multiple = () =>
  new Array(6).fill(null).map((val, index) => <SkeletonFrame key={index} />);
