import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import ActionItem from './index';

export default {
  title: 'Pod - ActionItem',
  component: ActionItem,
  decorators: [withKnobs]
};

export const Default = () => (
  <ActionItem leftIcon="faCamera" rightIcon="faEllipsisV" label="Add to My Story" />
);

export const straightEdges = () => (
  <ActionItem
    leftIcon="faCamera"
    rightIcon="faEllipsisV"
    label="Add to My Story"
    straightEdge
  />
);
