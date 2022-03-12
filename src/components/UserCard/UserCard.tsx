import React from 'react';
import { User } from 'features/User/data';
import Avatar from 'components/Avatar/Avatar';
import './UserCard.scss';

const UserCard: React.FC<
  Readonly<{
    user: User;
  }>
> = ({ user: { username, fullName, avatar } }) => (
  <article className="user-card">
    <Avatar src={avatar} size="sm" />
    <div className="meta">
      <header>{fullName}</header>
      <span>{username}</span>
    </div>
  </article>
);

export default UserCard;
