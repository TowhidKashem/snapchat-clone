import React from 'react';
import Loader from './index';

export default {
  title: 'Loader',
  component: Loader
};

export const Default = () => <Loader />;

export const withMessage = () => <Loader message="Something is loading.." />;
