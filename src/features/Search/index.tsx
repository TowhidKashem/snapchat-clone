import React, { useEffect, useState } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Input from 'common/Input';
import styles from './index.module.scss';

const Search = () => {
  const search = (e): void => {
    console.warn(e.currentTarget.value);
  };

  const [results, setResults] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos');
      const photos = await response.json();
      setResults(photos);
      console.warn('mma', photos);
    })();
  }, []);

  return (
    <main className={styles.search}>
      <Grid fluid>
        <Row middle="xs">
          <Col xs={10}>
            <Input
              placeholder="Search"
              leftIcon={faSearch}
              rightIconClick={() => {}}
              // onChange={search}
            />
          </Col>
          <Col xs={2}>Cancel</Col>
        </Row>
      </Grid>
      {/* {results ? (
        results.filter(({ title }) => title.charAt(0) === 'a').map(({ title }) => <h2>{title}</h2>)
      ) : (
        <p>
          <FontAwesomeIcon icon={faSearch} />
          Search for people, stories, games and more
        </p>
      )} */}
    </main>
  );
};

export default Search;
