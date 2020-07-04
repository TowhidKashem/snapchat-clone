import React from 'react';
import Input from './index';

export default {
  title: 'Input',
  component: Input
};

const defaultProps = { placeholder: 'Type here..' };

export const Default = () => <Input {...defaultProps} />;

export const Placeholder = () => <Input placeholder="Type here..." />;

export const disabled = () => (
  <Input {...defaultProps} value="Can't type here.." onClick={() => {}} />
);

export const LeftIcon = () => <Input {...defaultProps} leftIcon="faSearch" />;

export const RightIcon = () => <Input {...defaultProps} rightIcon="faUserPlus" />;

export const bothIcons = () => (
  <Input {...defaultProps} leftIcon="faSearch" rightIcon="faUserPlus" />
);

export const expandAnimation = () => (
  <div>
    <Input {...defaultProps} animate />
  </div>
);

export const focusField = () => <Input {...defaultProps} focus />;
