import React from 'react';
import Widget from './index';
import { Gender } from 'features/User/types';
import PodUser from 'common/PodUser';

export default {
  title: 'Widget',
  component: Widget
};

const users = [
  {
    id: '00975694-7b26-4cdc-83d7-a6bdd783c987',
    username: 'Itzel50',
    avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
    gender: 'male' as Gender,
    age: 22,
    fullName: 'Josiane Keebler'
  },
  {
    id: '0a08aeaa-5d5c-4367-bbd4-078cf9cb8f5f',
    username: 'Dax81',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    gender: 'male' as Gender,
    age: 22,
    fullName: 'Edd Cassin'
  },
  {
    id: '329798fe-82f5-4ff2-a71e-113e2262de30',
    username: 'Adela.Shields43',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    gender: 'male' as Gender,
    age: 22,
    fullName: 'Nestor Nienow'
  }
];

export const Default = () => (
  <Widget header="Some Header">
    <p>Some content..</p>
  </Widget>
);

export const withPods = () => (
  <Widget header="Your Friends">
    {users.map((user) => (
      <PodUser key={user.id} user={user} />
    ))}
  </Widget>
);
