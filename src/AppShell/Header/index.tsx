import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { ShowDrawer } from 'AppShell/types';
import Icon from 'common/Icon';
import Input from 'common/Input';
import './index.scss';

interface Props {
  showDrawer: ShowDrawer;
}

const Header: React.FC<Props> = ({ showDrawer }) => (
  <header className="header">
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

export default Header;
