import React from 'react';
import ActionItem from './index';

export default {
  title: 'Pod - ActionItem',
  component: ActionItem
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
