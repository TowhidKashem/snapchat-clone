import React, { useContext } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSearch, faUserPlus, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { DrawerContext } from 'contexts/drawer';
import Input from 'common/Input';
import styles from './index.module.scss';

const Header: React.FC<{}> = () => {
  const { setPage } = useContext(DrawerContext);

  return (
    <header className={styles.header}>
      <Grid fluid>
        <Row middle="xs">
          <Col xs={1}>
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
          </Col>
          <Col xs={10}>
            <Input
              placeholder="Search"
              leftIcon={faSearch}
              rightIcon={faUserPlus}
              rightIconClick={() => setPage('search')}
            />
          </Col>
          <Col xs={1}>
            <FontAwesomeIcon icon={faRetweet} />
          </Col>
        </Row>
      </Grid>
    </header>
  );
};

export default Header;
