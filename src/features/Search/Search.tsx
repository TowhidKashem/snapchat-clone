import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { Animated } from 'react-animated-css';
import { hideDrawer } from 'AppShell/AppShellStore';
import { User } from 'features/User/data';
import { escapeRegex } from 'utils';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Section from 'components/Section/Section';
import UserCard from 'components/UserCard/UserCard';
import Loader from 'components/Loader/Loader';
import Error from 'components/Error/Error';
import './Search.scss';

const Search: React.FC<
  Readonly<{
    show: boolean;
  }>
> = ({ show }) => {
  const dispatch = useDispatch();
  const {
    friends: { loading, error, data }
  } = useSelector(({ user }: RootStateOrAny) => user);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!show) setQuery('');
  }, [show]);

  const pattern = new RegExp(escapeRegex(query), 'gi');
  const users = query
    ? data.filter(
        ({ fullName, username }: User) =>
          fullName.match(pattern) || username.match(pattern)
      )
    : data;
  const hasResults = users.length > 0;

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
          onClick={() => dispatch(hideDrawer('search'))}
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
                <Section header="Quick Add">
                  {users.map((user: User) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </Section>
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
