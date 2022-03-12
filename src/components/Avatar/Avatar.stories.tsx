import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import Avatar from './Avatar';

export default {
  title: 'Avatar',
  component: Avatar,
  decorators: [withKnobs]
};

export const Default = () => (
  <Avatar src="https://randomuser.me/api/portraits/women/19.jpg" />
);

export const Sizes = () => {
  const size = select(
    'size',
    {
      sm: 'sm',
      md: 'md',
      lg: 'lg'
    },
    'sm'
  );
  return <Avatar src="https://randomuser.me/api/portraits/women/19.jpg" size={size} />;
};
