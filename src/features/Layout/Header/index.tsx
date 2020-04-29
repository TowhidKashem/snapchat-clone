import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSearch, faUserPlus, faRetweet } from '@fortawesome/free-solid-svg-icons';
import Input from 'common/Input';
import Drawer from 'common/Drawer';
import Search from 'features/Search';
import styles from './index.module.scss';

interface Props {
  setToggleMenu: () => void;
}

const Header: React.FC<Props> = ({ setToggleMenu }) => {
  const { useState } = React;
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  return (
    <>
      <header className={styles.header}>
        <Grid fluid>
          <Row middle="xs">
            <Col xs={1}>
              <FontAwesomeIcon icon={faUserCircle} onClick={setToggleMenu} size="3x" />
            </Col>
            <Col xs={10}>
              <Input
                placeholder="Search"
                leftIcon={faSearch}
                rightIcon={faUserPlus}
                rightIconClick={() => setOpenSearch(true)}
              />
            </Col>
            <Col xs={1}>
              <FontAwesomeIcon icon={faRetweet} />
            </Col>
          </Row>
        </Grid>
      </header>
      <Drawer show={openSearch}>
        <Search />
      </Drawer>
    </>
  );
};

export default Header;
