import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from './duck';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Input from 'common/Input';
import Avatar from 'common/Avatar';
import PillButtons from 'common/PillButtons';
import Button from 'common/Button';
import './index.scss';

interface Props {
  messages: any;
  sendMessage: any;
}

const Chat: React.FC<Props> = ({ messages, sendMessage }) => {
  const [message, setMessage] = useState<string>('');
  const [typing, setTyping] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setTyping(false), 1500);
  }, []);

  return (
    <main className="chat">
      <header>
        <Grid fluid>
          <Row middle="xs">
            <Col xs={10}>
              <Avatar src="./bitmoji.png" />
              <h2>Julia</h2>
            </Col>
            <Col xs={2}>
              <PillButtons icons={['faPhoneAlt', 'faVideo']} />
              <Button icon="faAngleRight" />
            </Col>
          </Row>
        </Grid>
      </header>
      <section>
        {messages['julia'].map(({ message, time }) => (
          <article key={time} className="message">
            <header>Julia</header>
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
                onChange={(e) => setMessage(e.currentTarget.value.trim())}
                onEnter={() => {
                  sendMessage('julia', message);
                  setMessage('');
                  setTimeout(() => setTyping(true), 500);
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

const mapStateToProps = ({ chat }) => ({ messages: chat.messages });

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (user, message) => dispatch(sendMessage(user, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
