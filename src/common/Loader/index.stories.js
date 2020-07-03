import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Loader from './index';

export default {
  title: 'Loader',
  component: Loader,
  decorators: [withKnobs]
};

export const Default = () => <Loader />;

export const withMessage = () => <Loader message="Something is loading..." />;
