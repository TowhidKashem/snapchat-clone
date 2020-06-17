import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { getMessages, postMessage, switchThread } from './duck';
import { dummyMessages } from './data';
import { hideDrawer } from 'AppShell/duck';
import { HideDrawer } from 'AppShell/types';
import { randomArrayVal, playSound } from 'utils';
import Notification from 'common/Notification';
import Input from 'common/Input';
import Avatar from 'common/Avatar';
import PillButtons from 'common/PillButtons';
import Button from 'common/Button';
import './index.scss';

interface Props {
  session: any;
  user: string;
  messages: any;
  hideDrawer: HideDrawer;
  getMessages: any;
  postMessage: any;
  switchThread: any;
}

const Chat: React.FC<Props> = ({
  session,
  user,
  messages,
  hideDrawer,
  getMessages,
  postMessage,
  switchThread
}) => {
  const [message, setMessage] = useState<string>('');
  const [typing, setTyping] = useState<boolean>(false);
  const [messageReceived, setMessageReceived] = useState<boolean>(false);
  const messageContainer = useRef<any>(null);

  // New message from other user
  useEffect(() => {
    setTimeout(() => {
      setMessageReceived(true);
      playSound('newSystemMessage');
      setTimeout(() => setMessageReceived(false), 3000);
    }, 3000);
  }, []);

  useEffect(() => {
    getMessages(user);
    botResponse(); // New message from current user
  }, [user]);

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
      playSound('newAppMessage');
    }, randomArrayVal(typeTimes));
  };

  return (
    <main className="chat">
      <Notification
        sender="Tom"
        time="now"
        show={messageReceived}
        onClick={() => {
          setMessageReceived(false);
          switchThread('tom');
        }}
      />
      <header>
        <Grid fluid>
          <Row middle="xs">
            <Col xs={2}>
              <Avatar src="./images/bitmoji.png" />
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
          <Avatar src="./images/bitmoji.png" />
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
                  postMessage(user, session.username, message);
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

const mapStateToProps = ({ user, chat }) => ({
  session: user.session,
  user: chat.activeThread,
  messages: chat
});

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: (component) => dispatch(hideDrawer(component)),
  getMessages: (user) => dispatch(getMessages(user)),
  postMessage: (user, author, message) => dispatch(postMessage(user, author, message)),
  switchThread: (user) => dispatch(switchThread(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
