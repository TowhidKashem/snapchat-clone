import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Spotlight from './index';

export default {
  title: 'Pod - Spotlight',
  component: Spotlight,
  decorators: [withKnobs]
};

export const Default = () => (
  <Spotlight title="What a Lovely Day" image="https://picsum.photos/id/1011/150/100" />
);
