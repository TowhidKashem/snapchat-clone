import React from 'react';
import { User as UserInterface } from 'features/User/types';
import Avatar from 'common/Avatar';
import './index.scss';

interface Props {
  user: UserInterface;
}

const User: React.FC<Props> = ({ user }) => {
  const { username, fullName, avatar } = user;
  return (
    <article className="pod user">
      <Avatar src={avatar} size="sm" />
      <div className="meta">
        <header>{fullName}</header>
        <span>{username}</span>
      </div>
    </article>
  );
};

export default User;
