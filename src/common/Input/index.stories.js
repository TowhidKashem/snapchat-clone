import React from 'react';
import Input from './index';

export default {
  title: 'Input',
  component: Input
};

export const Default = () => <Input />;

export const Placeholder = () => <Input placeholder="Type here..." />;

export const disabled = () => <Input value="Can't type here.." onClick={() => {}} />;

export const LeftIcon = () => <Input leftIcon="faSearch" />;

export const RightIcon = () => <Input rightIcon="faUserPlus" />;

export const bothIcons = () => <Input leftIcon="faSearch" rightIcon="faUserPlus" />;

export const expandAnimation = () => (
  <div>
    <Input animate />
  </div>
);

export const focusField = () => <Input focus />;
