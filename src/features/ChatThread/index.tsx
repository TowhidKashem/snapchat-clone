import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import classNames from 'classnames';
import { getMessages, postMessage } from './duck';
import { dummyMessages } from './data';
import { randomArrayVal } from 'utils';
import Input from 'common/Input';
import Avatar from 'common/Avatar';
import PillButtons from 'common/PillButtons';
import Button from 'common/Button';
import './index.scss';

interface Props {
  user: string;
  messages: any;
  getMessages: any;
  postMessage: any;
}

const ChatThread: React.FC<Props> = ({
  user = 'julia',
  messages,
  getMessages,
  postMessage
}) => {
  const [message, setMessage] = useState<string>('');
  const [typing, setTyping] = useState<boolean>(false);
  const messageContainer = useRef<any>(null);

  useEffect(() => {
    getMessages(user);
    botResponse();
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
      new Audio('./audio/notification.mp3').play();
    }, randomArrayVal(typeTimes));
  };

  return (
    <main className="chat">
      <header>
        <Grid fluid>
          <Row middle="xs">
            <Col xs={10}>
              <Avatar src="./bitmoji.png" />
              <h2>{user}</h2>
            </Col>
            <Col xs={2}>
              <PillButtons icons={['faPhoneAlt', 'faVideo']} />
              <Button icon="faAngleRight" />
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

const mapStateToProps = ({ chats }) => ({ messages: chats });

const mapDispatchToProps = (dispatch) => ({
  getMessages: (user) => dispatch(getMessages(user)),
  postMessage: (user, author, message) => dispatch(postMessage(user, author, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatThread);
