import React from 'react';
import PodUser from './index';

export default {
  title: 'PodUser',
  component: PodUser
};

export const Default = () => (
  <PodUser
    user={{
      id: '00975694-7b26-4cdc-83d7-a6bdd783c987',
      username: 'Itzel50',
      avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
      gender: 'male',
      age: 22,
      fullName: 'Josiane Keebler'
    }}
  />
);
