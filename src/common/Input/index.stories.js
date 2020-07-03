import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Input from './index';

export default {
  title: 'Input',
  component: Input,
  decorators: [withKnobs]
};

export const Default = () => <Input placeholder="Type here..." />;

export const LeftIcon = () => <Input leftIcon="faSearch" />;

export const RightIcon = () => <Input rightIcon="faUserPlus" />;

export const bothIcon = () => <Input leftIcon="faSearch" rightIcon="faUserPlus" />;

export const expandAnimation = () => <Input animate />;
