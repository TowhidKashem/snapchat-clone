import React from 'react';
import MenuItem from './MenuItem';

export default {
  title: 'MenuItem',
  component: MenuItem
};

export const Default = () => (
  <MenuItem leftIcon="faCamera" rightIcon="faEllipsisV" label="Add to My Story" />
);

export const straightEdges = () => (
  <MenuItem
    leftIcon="faCamera"
    rightIcon="faEllipsisV"
    label="Add to My Story"
    straightEdge
  />
);
