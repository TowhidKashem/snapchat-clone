import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import User from './index';

export default {
  title: 'Pod - User',
  component: User,
  decorators: [withKnobs]
};

export const Default = () => (
  <User
    user={{
      id: 'abc123',
      username: 'Bobby777',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/kevinjohndayy/128.jpg',
      gender: 'male',
      age: 30,
      fullName: 'Bobby Hill'
    }}
  />
);
