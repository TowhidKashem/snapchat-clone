import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Icon from 'common/Icon';
import { escapeRegex } from 'utils';
import Input from 'common/Input';
import UserPod from 'common/Pod/User';
import styles from './index.module.scss';

const Search = ({ app, users, hideDrawer }) => {
  const [query, setQuery] = useState<string>('');

  const filteredUsers = query
    ? users.filter(({ username }) => username.match(new RegExp(escapeRegex(query), 'gi')))
    : users;

  const results = filteredUsers.map((user) => <UserPod key={user.id} user={user} />);

  return (
    <main className={styles.search}>
      <Grid fluid>
        <Row middle="xs">
          <Col xs={10}>
            <Input
              placeholder="Find Friends"
              leftIcon="faSearch"
              onChange={(e) => setQuery(e.currentTarget.value.trim())}
            />
          </Col>
          <Col xs={2}>
            <button onClick={() => hideDrawer('search')}>Cancel</button>
          </Col>
        </Row>
      </Grid>
      <section className={styles.results}>
        {query.length ? (
          results.length ? (
            results
          ) : (
            '💩 No results'
          )
        ) : (
          <p>
            <Icon icon="faSearch" />
            Search for people, stories, games and more
          </p>
        )}
      </section>
    </main>
  );
};

const mapStateToProps = ({ app, users }) => ({
  app,
  users: users.dummyUsers
});

const mapDispatchToProps = (dispatch) => ({
  // showDrawer: (component) => dispatch(actions.showDrawer(component)),
  hideDrawer: (component) => dispatch(actions.hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
