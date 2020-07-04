import React from 'react';
import Widget from './index';
import UserPod from 'common/Pod/User';

export default {
  title: 'Widget',
  component: Widget
};

type gender = 'male' | 'female' | 'other';

const users = [
  {
    id: '00975694-7b26-4cdc-83d7-a6bdd783c987',
    username: 'Itzel50',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/kevinjohndayy/128.jpg',
    gender: 'male' as gender,
    age: 22,
    fullName: 'Josiane Keebler'
  },
  {
    id: '0a08aeaa-5d5c-4367-bbd4-078cf9cb8f5f',
    username: 'Dax81',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/anatolinicolae/128.jpg',
    gender: 'male' as gender,
    age: 22,
    fullName: 'Edd Cassin'
  },
  {
    id: '329798fe-82f5-4ff2-a71e-113e2262de30',
    username: 'Adela.Shields43',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oskamaya/128.jpg',
    gender: 'male' as gender,
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
      <UserPod key={user.id} user={user} />
    ))}
  </Widget>
);
