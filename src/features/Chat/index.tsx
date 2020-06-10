import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Animated } from 'react-animated-css';
import classNames from 'classnames';
import { getMessages, postMessage } from './duck';
import { dummyMessages } from './data';
import { hideDrawer } from 'AppShell/duck';
import { HideDrawer } from 'AppShell/types';
import { randomArrayVal, playSound } from 'utils';
import Icon from 'common/Icon';
import Input from 'common/Input';
import Avatar from 'common/Avatar';
import PillButtons from 'common/PillButtons';
import Button from 'common/Button';
import './index.scss';

interface Props {
  user: string;
  messages: any;
  hideDrawer: HideDrawer;
  getMessages: any;
  postMessage: any;
}

const Chat: React.FC<Props> = ({
  user = 'julia',
  messages,
  hideDrawer,
  getMessages,
  postMessage
}) => {
  const [message, setMessage] = useState<string>('');
  const [typing, setTyping] = useState<boolean>(false);
  const [messageReceived, setMessageReceived] = useState<boolean>(false);
  const messageContainer = useRef<any>(null);

  useEffect(() => {
    getMessages(user);
    // botResponse();

    // New message
    setTimeout(() => setMessageReceived(true), 3000);
    setTimeout(() => setMessageReceived(false), 6000);
  }, []);

  useLayoutEffect(() => {
    // Scroll to bottom of container on load and each time a new message is posted
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
  }, [messages]);

  const botResponse = () => {
    // Randomize the response and typing times to make the bot seem a little more "realistic"
    const responseTimes = [500, 700, 900];
    const typeTimes = [1200, 1400, 1600];
    setTimeout(() => setTyping(true), randomArrayVal(responseTimes));
    setTimeout(() => {
      setTyping(false);
      postMessage(user, user, randomArrayVal(dummyMessages));
      playSound('newMessage');
    }, randomArrayVal(typeTimes));
  };

  return (
    <main className="chat">
      <Animated
        animationIn="slideInDown"
        animationOut="slideOutUp"
        animationInDuration={100}
        animationOutDuration={100}
        isVisible={messageReceived}
        animateOnMount={false}
      >
        <div className="notification">
          <header>
            <Grid fluid>
              <Row middle="xs">
                <Col xs={10}>
                  <Icon icon="faSnapchatSquare" size="7x" />
                  <span>SnapChat</span>
                </Col>
                <Col xs={2}>
                  <time>now</time>
                </Col>
              </Row>
            </Grid>
          </header>
          <p>from Tom</p>
        </div>
      </Animated>

      <header>
        <Grid fluid>
          <Row middle="xs">
            <Col xs={2}>
              <Avatar src="./bitmoji.png" />
            </Col>
            <Col xs={7}>
              <h2>{user}</h2>
            </Col>
            <Col xs={2}>
              <PillButtons icons={['faPhoneAlt', 'faVideo']} />
            </Col>
            <Col xs={1}>
              <Button icon="faAngleRight" onclick={() => hideDrawer('chat')} />
            </Col>
          </Row>
        </Grid>
      </header>
      <section ref={messageContainer} className="messages">
        {messages[user]?.map(({ author, message, time }) => (
          <article key={time} className="message">
            <header>{author}</header>
            <blockquote>{message}</blockquote>
          </article>
        ))}
      </section>
      <footer>
        <div className={classNames({ typing })}>
          <Avatar src="./bitmoji.png" />
        </div>
        <Grid fluid className="inner-content">
          <Row middle="xs">
            <Col xs={1}>
              <Button icon="faCamera" />
            </Col>
            <Col xs={8}>
              <Input
                placeholder="Send a chat"
                rightIcon="faMicrophone"
                onChange={(e) => setMessage(e.currentTarget.value)}
                onEnter={() => {
                  postMessage(user, 'tk', message);
                  setMessage('');
                  botResponse();
                }}
                value={message}
              />
            </Col>
            <Col xs={3}>
              <Button icon="faSmileWink" />
              <Button icon="faSmileWink" />
              <Button icon="faRocket" />
            </Col>
          </Row>
        </Grid>
      </footer>
    </main>
  );
};

const mapStateToProps = ({ chat }) => ({ messages: chat });

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: (component) => dispatch(hideDrawer(component)),
  getMessages: (user) => dispatch(getMessages(user)),
  postMessage: (user, author, message) => dispatch(postMessage(user, author, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
