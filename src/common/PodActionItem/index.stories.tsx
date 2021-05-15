import React from 'react';
import PodActionItem from './index';

export default {
  title: 'PodActionItem',
  component: PodActionItem
};

export const Default = () => (
  <PodActionItem leftIcon="faCamera" rightIcon="faEllipsisV" label="Add to My Story" />
);

export const straightEdges = () => (
  <PodActionItem
    leftIcon="faCamera"
    rightIcon="faEllipsisV"
    label="Add to My Story"
    straightEdge
  />
);
