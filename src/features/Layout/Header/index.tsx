import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSearch, faUserPlus, faRetweet } from '@fortawesome/free-solid-svg-icons';
import Input from 'common/Input';
import styles from './index.module.scss';

import { connect } from 'react-redux';
import { loadMenu, autoLogin } from 'redux/actions';

const Header: React.FC<{}> = () => (
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

const mapStateToProps = ({ app, user }) => ({
  app,
  user
});

const mapDispatchToProps = (dispatch) => ({
  loadMenu: (component) => dispatch(loadMenu(component))
  // getMoreComments: (postId, moreComments) => dispatch(autoLogin(postId, moreComments))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
