import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getMessages, postMessage } from './duck';
import { dummyMessages } from './data';
import { Grid, Row, Col } from 'react-flexbox-grid';
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

const Chat: React.FC<Props> = ({
  user = 'julia',
  messages,
  getMessages,
  postMessage
}) => {
  const [message, setMessage] = useState<string>('');
  const [typing, setTyping] = useState<boolean>(true);

  useEffect(() => {
    getMessages(user);
    getMessages('tom');

    setTimeout(() => setTyping(false), 1500);
  }, []);

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
      <section className="messages">
        {messages[user]?.map(({ author, message, time }) => (
          <article key={time} className="message">
            <header>{author}</header>
            <blockquote>{message}</blockquote>
          </article>
        ))}
      </section>
      <footer>
        {typing && <Avatar src="./bitmoji.png" />}
        <Grid fluid>
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
                  postMessage(user, message);
                  setMessage('');
                  // setTimeout(() => {
                  //   setTyping(true);
                  //   postMessage(user, 'Julia', dummyMessages[0]);
                  // }, 500);
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
  postMessage: (user, message) => dispatch(postMessage(user, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
