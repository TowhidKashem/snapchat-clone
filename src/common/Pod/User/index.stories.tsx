import React from 'react';
import User from './index';

export default {
  title: 'Pod - User',
  component: User
};

export const Default = () => (
  <User
    user={{
      id: '00975694-7b26-4cdc-83d7-a6bdd783c987',
      username: 'Itzel50',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/kevinjohndayy/128.jpg',
      gender: 'male',
      age: 22,
      fullName: 'Josiane Keebler'
    }}
  />
);
