// @ts-nocheck
import React, { useEffect } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faSearch,
  faUserPlus,
  faRetweet
} from '@fortawesome/free-solid-svg-icons';
import Input from 'common/Input';
import styles from './index.module.scss';

import { connect } from 'react-redux';
import * as actions from 'redux/actions';

const Header: React.FC<{}> = ({ app, users, loadMenu, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, []);
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
              rightIconClick={() => loadMenu('search')}
              onFocus={() => {}}
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

const mapStateToProps = ({ app, users }) => ({ app, users });

const mapDispatchToProps = (dispatch) => ({
  loadMenu: (component) => dispatch(actions.loadMenu(component)),
  getUsers: () => dispatch(actions.getUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
