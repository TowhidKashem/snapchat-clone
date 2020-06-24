import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Animated } from 'react-animated-css';
import { HideDrawer } from 'AppShell/types';
import { User } from 'features/User/types';
import { hideDrawer } from 'AppShell/duck';
import { escapeRegex } from 'utils/strings';
import Input from 'common/Input';
import Button from 'common/Button';
import Widget from 'common/Widget';
import UserPod from 'common/Pod/User';
import './index.scss';

interface Props {
  friends: User[];
  show: boolean;
  hideDrawer: HideDrawer;
}

const Search: React.FC<Props> = ({ friends = [], show, hideDrawer }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!show) setQuery('');
  }, [show]);

  const pattern = new RegExp(escapeRegex(query), 'gi');
  const users = query
    ? friends.filter(
        ({ fullName, username }) => fullName.match(pattern) || username.match(pattern)
      )
    : friends;
  const hasResults = users.length > 0;

  return (
    <main className="search">
      <header>
        <form>
          <Input
            placeholder="Search"
            leftIcon="faSearch"
            onChange={(e) => setQuery(e.currentTarget.value.trim())}
            focus
            animate
          />
          <Button label="Cancel" plain onclick={() => hideDrawer('search')} />
        </form>
      </header>
      <section className="view">
        <Animated
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInDuration={250}
          animationOutDuration={0}
          isVisible={show}
        >
          <div className="results">
            {hasResults && (
              <Widget header="Quick Add" transparent>
                {users.map((user) => (
                  <UserPod key={user.id} user={user} />
                ))}
              </Widget>
            )}
          </div>
          {query && !hasResults && (
            <p className="no-results">
              <span role="img" aria-label="poop emoji">
                💩
              </span>{' '}
              No results
            </p>
          )}
        </Animated>
      </section>
    </main>
  );
};

const mapStateToProps = ({ user }) => ({
  friends: user.friends
});

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: (component) => dispatch(hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
