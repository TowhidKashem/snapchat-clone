import React, { useState, useEffect } from 'react';
import { Animated } from 'react-animated-css';
import { useSelector, useDispatch } from 'react-redux';
import { hideDrawer } from 'AppShell/store';
import { escapeRegex } from 'utils';
import Input from 'common/Input';
import Button from 'common/Button';
import Widget from 'common/Widget';
import PodUser from 'common/PodUser';
import Loader from 'common/Loader';
import Error from 'common/Error';
import './index.scss';

const Search: React.FC<{
  readonly show: boolean;
}> = ({ show }) => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(({ user }) => user.friends);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!show) setQuery('');
  }, [show]);

  const pattern = new RegExp(escapeRegex(query), 'gi');
  const users = query
    ? data.filter(
        ({ fullName, username }) => fullName.match(pattern) || username.match(pattern)
      )
    : data;
  const hasResults = users?.length > 0;

  return (
    <main className="search">
      <header>
        <Input
          placeholder="Search"
          leftIcon="faSearch"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          focus={show}
          animate
          dark
        />
        <Button
          label="Cancel"
          plain
          onclick={() => dispatch(hideDrawer('search'))}
          testId="btn-cancel"
        />
      </header>
      <section>
        {loading ? (
          <Loader nobg />
        ) : error ? (
          <Error />
        ) : (
          <Animated
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInDuration={250}
            animationOutDuration={0}
            isVisible={show}
          >
            <div className="results">
              {hasResults && (
                <Widget header="Quick Add">
                  {users.map((user) => (
                    <PodUser key={user.id} user={user} />
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
        )}
      </section>
    </main>
  );
};

export default Search;
