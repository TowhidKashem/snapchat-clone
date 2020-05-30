import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { User as UserInterface } from 'features/User/types';
import Avatar from 'common/Avatar';
import './index.scss';

interface Props {
  user: UserInterface;
}

const User: React.FC<Props> = ({ user }) => {
  const { username, fullName, avatar } = user;
  return (
    <article className="pod-user">
      <Grid fluid>
        <Row middle="xs">
          <Col xs={2}>
            <Avatar src={avatar} size="sm" />
          </Col>
          <Col xs={10}>
            <header>{fullName}</header>
            <span>{username}</span>
          </Col>
        </Row>
      </Grid>
    </article>
  );
};

export default User;
