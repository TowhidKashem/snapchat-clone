import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { ShowDrawer, HideDrawer } from 'AppShell/types';
import { showDrawer, hideDrawer } from 'AppShell/duck';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Input from 'common/Input';
import Avatar from 'common/Avatar';
import Icon from 'common/Icon';
import Button from 'common/Button';
import './index.scss';

interface Props {
  showDrawer: ShowDrawer;
  hideDrawer: HideDrawer;
}

const Chat: React.FC<Props> = ({ showDrawer }) => {
  return (
    <main className="chat">
      <header className="header">
        <Grid fluid>
          <Row middle="xs">
            <Col xs={1}>
              <Icon
                icon="faUserCircle"
                size="2x"
                // onClick={() => showDrawer({ component: 'account' })}
              />
            </Col>
            <Col xs={10}>
              <Input
                placeholder="Search"
                leftIcon="faSearch"
                rightIcon="faUserPlus"
                // onClick={() =>
                //   showDrawer({
                //     component: 'search',
                //     animationIn: 'fadeIn',
                //     animationOut: 'fadeOut',
                //     animationInDuration: 200,
                //     animationOutDuration: 200
                //   })
                // }
              />
            </Col>
            <Col xs={1}>
              <Icon icon="faEdit" />
            </Col>
          </Row>
        </Grid>
      </header>
      <section className="messages">
        <button
          onClick={() =>
            showDrawer({
              component: 'chatThread',
              animationIn: 'slideInLeft',
              animationOut: 'slideOutLeft',
              animationInDuration: 200,
              animationOutDuration: 200
            })
          }
        >
          Julia
        </button>
      </section>
    </main>
  );
};

const mapStateToProps = ({ chats }) => ({ messages: chats });

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (drawer) => dispatch(showDrawer(drawer)),
  hideDrawer: (component) => dispatch(hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
