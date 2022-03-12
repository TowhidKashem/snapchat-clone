import React from 'react';
import Error from './Error';

export default {
  title: 'Error',
  component: Error
};

export const Default = () => <Error />;

export const customMessage = () => <Error message="Something went terribly wrong!" />;
