import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Widget from './index';

export default {
  title: 'Widget',
  component: Widget,
  decorators: [withKnobs]
};

export const Default = () => (
  <Widget header="Your Friends">
    <p>The quick brown fox jumped over the lazy dog</p>
  </Widget>
);
