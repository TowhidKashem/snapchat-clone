import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import Avatar from './index';

export default {
  title: 'Avatar',
  component: Avatar,
  decorators: [withKnobs]
};

export const Default = () => (
  <Avatar src="https://s3.amazonaws.com/uifaces/faces/twitter/anatolinicolae/128.jpg" />
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
  return (
    <Avatar
      src="https://s3.amazonaws.com/uifaces/faces/twitter/anatolinicolae/128.jpg"
      size={size}
    />
  );
};
