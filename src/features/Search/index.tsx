import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { HideDrawer } from 'AppShell/types';
import { User } from 'features/User/types';
import { hideDrawer } from 'AppShell/duck';
import { getUsers } from 'features/User/duck';
import { escapeRegex } from 'utils';
import Input from 'common/Input';
import Button from 'common/Button';
import Widget from 'common/Widget';
import UserPod from 'common/Pod/User';
import './index.scss';

interface Props {
  friends: User[];
  getUsers: () => void;
  hideDrawer: HideDrawer;
}

const Search: React.FC<Props> = ({ friends = [], getUsers, hideDrawer }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const pattern = new RegExp(escapeRegex(query), 'gi');
  const users = query
    ? friends.filter(
        ({ fullName, username }) => fullName.match(pattern) || username.match(pattern)
      )
    : friends;

  return (
    <main className="search">
      <header>
        <Grid fluid>
          <Row middle="xs">
            <Col xs={10}>
              <Input
                placeholder="Search"
                leftIcon="faSearch"
                onChange={(e) => setQuery(e.currentTarget.value.trim())}
                focus
              />
            </Col>
            <Col xs={2}>
              <Button label="Cancel" plain onclick={() => hideDrawer('search')} />
            </Col>
          </Row>
        </Grid>
      </header>
      <section className="results">
        {users.length ? (
          <Widget header="Quick Add" transparent>
            {users.map((user) => (
              <UserPod key={user.id} user={user} />
            ))}
          </Widget>
        ) : (
          <p className="no-results">
            <span>💩</span> No results
          </p>
        )}
      </section>
    </main>
  );
};

const mapStateToProps = ({ user }) => ({
  friends: user.friends
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  hideDrawer: (component) => dispatch(hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
