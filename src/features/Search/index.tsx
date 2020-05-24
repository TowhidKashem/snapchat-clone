import React, { useState } from 'react';
import { connect } from 'react-redux';
import { hideDrawer } from 'app/duck';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Icon from 'common/Icon';
import { escapeRegex } from 'utils';
import Input from 'common/Input';
import UserPod from 'common/Pod/User';
import './index.scss';

const Search = ({ users, hideDrawer }) => {
  const [query, setQuery] = useState<string>('');

  const filteredUsers = query
    ? users.filter(({ username }) => username.match(new RegExp(escapeRegex(query), 'gi')))
    : users;

  const results = filteredUsers.map((user) => <UserPod key={user.id} user={user} />);

  return (
    <main className="search">
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
      <section className="results">
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

const mapStateToProps = ({ app }) => ({
  app,
  users: app.dummyUsers
});

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: (component) => dispatch(hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
