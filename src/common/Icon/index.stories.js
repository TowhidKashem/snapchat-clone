import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Icon from './index';

export default {
  title: 'Icon',
  component: Icon,
  decorators: [withKnobs]
};

export const Default = () => <Icon icon="faSnapchatSquare" />;
