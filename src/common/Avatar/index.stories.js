import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import Avatar from 'common/Avatar';

export default {
  title: 'Avatar',
  component: Avatar,
  decorators: [withKnobs]
};

export const Default = () => (
  <Avatar src="https://pngimage.net/wp-content/uploads/2019/05/bitmoji-png-1.png" />
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
      src="https://pngimage.net/wp-content/uploads/2019/05/bitmoji-png-1.png"
      size={size}
    />
  );
};
