import React from 'react';
import { User } from 'features/User/data';
import UserCard from 'components/UserCard/UserCard';
import Section from './Section';

export default {
  title: 'Section',
  component: Section
};

const users: User[] = [
  {
    id: '00975694-7b26-4cdc-83d7-a6bdd783c987',
    username: 'Itzel50',
    avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
    gender: 'male',
    age: 22,
    fullName: 'Josiane Keebler'
  },
  {
    id: '0a08aeaa-5d5c-4367-bbd4-078cf9cb8f5f',
    username: 'Dax81',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    gender: 'male',
    age: 22,
    fullName: 'Edd Cassin'
  },
  {
    id: '329798fe-82f5-4ff2-a71e-113e2262de30',
    username: 'Adela.Shields43',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    gender: 'male',
    age: 22,
    fullName: 'Nestor Nienow'
  }
];

export const Default = () => (
  <Section header="Some Header">
    <p>Some content..</p>
  </Section>
);

export const withCards = () => (
  <Section header="Your Friends">
    {users.map((user) => (
      <UserCard key={user.id} user={user} />
    ))}
  </Section>
);
