import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Icon from 'common/Icon';
import Input from 'common/Input';
import styles from './index.module.scss';

interface Props {
  showDrawer: any;
}

const Header: React.FC<Props> = ({ showDrawer }) => (
  <header className={styles.header}>
    <Grid fluid>
      <Row middle="xs">
        <Col xs={1}>
          <Icon
            icon="faUserCircle"
            size="2x"
            onClick={() => showDrawer({ component: 'account' })}
          />
        </Col>
        <Col xs={10}>
          <Input
            placeholder="Search"
            leftIcon="faSearch"
            rightIcon="faUserPlus"
            rightIconClick={() => showDrawer({ component: 'search' })}
            onFocus={() => {}}
          />
        </Col>
        <Col xs={1}>
          <Icon icon="faRetweet" />
        </Col>
      </Row>
    </Grid>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (drawer) => dispatch(actions.showDrawer(drawer))
});

export default connect(null, mapDispatchToProps)(Header);
