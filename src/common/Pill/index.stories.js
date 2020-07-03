import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Pill from './index';

export default {
  title: 'Pill',
  component: Pill,
  decorators: [withKnobs]
};

export const Default = () => <Pill icons={['faPhoneAlt', 'faVideo']} />;
