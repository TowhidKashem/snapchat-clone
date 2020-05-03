import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { User as UserInterface } from 'types';
import Avatar from 'common/Avatar';
import Divider from 'common/Divider';
import styles from './index.module.scss';

interface Props {
  user: UserInterface;
}

const User: React.FC<Props> = ({ user: { username, fullName, avatar } }) => {
  return (
    <article className={styles.pod}>
      <Grid fluid>
        <Row middle="xs">
          <Col xs={2}>
            <Avatar src={avatar} />
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
};

export default User;
