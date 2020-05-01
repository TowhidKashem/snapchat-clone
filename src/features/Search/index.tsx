import React, { useEffect, useState } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { escapeRegex } from 'utils';
import Input from 'common/Input';
import styles from './index.module.scss';

import Article from 'common/Article';

import { connect } from 'react-redux';

const Search = ({ app, users, loadMenu }) => {
  const [query, setQuery] = useState<string>('s');

  const results = users
    .filter(({ username }) => username.match(new RegExp(escapeRegex(query), 'gi')))
    .map((user) => <Article key={user.id} user={user} />);

  return (
    <main className={styles.search}>
      <Grid fluid>
        <Row middle="xs">
          <Col xs={10}>
            <Input
              placeholder="Search"
              leftIcon={faSearch}
              rightIconClick={() => {}}
              onChange={(e) => setQuery(e.currentTarget.value.trim())}
            />
          </Col>
          <Col xs={2}>Cancel</Col>
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
            <FontAwesomeIcon icon={faSearch} />
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

export default connect(mapStateToProps)(Search);
