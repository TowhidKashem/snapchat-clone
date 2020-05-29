import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { User as UserInterface } from 'features/User/types';
import Avatar from 'common/Avatar';
import Divider from 'common/Divider';
import './index.scss';

interface Props {
  user: UserInterface;
}

const User: React.FC<Props> = ({ user: { username, fullName, avatar } }) => (
  <article className="pod-user">
    <Grid fluid>
      <Row middle="xs">
        <Col xs={2}>
          <Avatar src={avatar} size="sm" />
        </Col>
        <Col xs={10}>
          <h3>{username}</h3>
          <span>{fullName}</span>
        </Col>
      </Row>
    </Grid>
    <Divider />
  </article>
);

export default User;
