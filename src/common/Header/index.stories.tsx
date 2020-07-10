import React from 'react';
import Header from './index';

export default {
  title: 'Header',
  component: Header
};

export const withAvatar = () => (
  <Header
    avatar="https://i.imgur.com/EbafXMb.png"
    showDrawer={() => {}}
    toggleCameraMode={() => {}}
  />
);

export const withIcon = () => (
  <Header showDrawer={() => {}} toggleCameraMode={() => {}} />
);
