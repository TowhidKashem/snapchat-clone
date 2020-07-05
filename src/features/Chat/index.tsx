import React, { useEffect, useLayoutEffect, useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { getMessages, postMessage } from './duck';
import { dummyMessages } from './data';
import { hideDrawer } from 'AppShell/duck';
import { HideDrawer } from 'AppShell/types';
import { Session } from 'features/User/types';
import { GetMessages, PostMessage, Message } from 'features/Chat/types';
import { randomArrayVal } from 'utils/array';
import { playSound } from 'utils/audio';
import Input from 'common/Input';
import Avatar from 'common/Avatar';
import Pill from 'common/Pill';
import Button from 'common/Button';
import './index.scss';

interface Props {
  session: Session;
  thread: string;
  messages: Message[];
  hideDrawer: HideDrawer;
  getMessages: GetMessages;
  postMessage: PostMessage;
}

const Chat: React.FC<Props> = ({
  session,
  thread,
  messages,
  hideDrawer,
  getMessages,
  postMessage
}) => {
  const messageContainer = useRef<HTMLElement>(null);
  const audioElem = useRef<HTMLAudioElement>(null);

  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);

  useLayoutEffect(() => {
    // Scroll to bottom of container on load and each time a new message is posted
    if (messageContainer.current)
      messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
  }, [messages]);

  const botResponse = useCallback(
    (message?) => {
      // Randomize the response and typing times to make the bot seem a little more "realistic"
      const responseTimes = [500, 700, 900];
      const typeTimes = [1200, 1400, 1600];
      setTimeout(() => setTyping(true), randomArrayVal(responseTimes));
      setTimeout(() => {
        setTyping(false);
        postMessage(thread, message || randomArrayVal(dummyMessages));
        if (audioElem.current) playSound('newAppMessage', audioElem.current);
      }, randomArrayVal(typeTimes));
    },
    [postMessage, thread]
  );

  useEffect(() => {
    getMessages(thread);
    botResponse('Soooo, how was it!?');
  }, [thread, getMessages, botResponse]);

  const submitMessage = () => {
    if (!message.length) return;
    postMessage(session.username, message);
    setMessage('');
    botResponse();
  };

  return (
    <main className="chat">
      <header>
        <Avatar src="./images/bitmoji-other.png" />
        <h2>{thread}</h2>
        <div className="right">
          <Pill icons={['faPhoneAlt', 'faVideo']} />
          <Button
            icon="faAngleRight"
            onclick={() => hideDrawer('chat')}
            buttonClass="btn-arrow"
          />
        </div>
      </header>

      <section ref={messageContainer} className="messages">
        {messages.map(({ author, message, time }, index) => (
          <article
            key={time + index}
            className={classNames('message', {
              other: author !== session.username
            })}
          >
            <header>{author}</header>
            <blockquote>{message}</blockquote>
          </article>
        ))}
      </section>

      <footer>
        <div className={classNames({ typing })}>
          <Avatar src="./images/bitmoji-other.png" />
        </div>
        <div className="inner-content">
          <Button icon="faCamera" buttonClass="btn-camera" round />
          <Input
            placeholder="Send a chat"
            rightIcon="faMicrophone"
            onChange={(e: React.SyntheticEvent<HTMLInputElement>) =>
              setMessage(e.currentTarget.value)
            }
            onEnter={submitMessage}
            onBlur={submitMessage}
            value={message}
          />
          <div className="right">
            <Button icon="faSmileWink" />
            <Button icons={['faMobile', 'faMobileAlt']} buttonClass="archive-btn" />
            <Button icon="faRocket" />
          </div>
        </div>
      </footer>

      <audio ref={audioElem} className="app-sound"></audio>
    </main>
  );
};

const mapStateToProps = ({ user, chat }) => ({
  session: user.session,
  thread: chat.thread,
  messages: chat.messages
});

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: (component) => dispatch(hideDrawer(component)),
  getMessages: (user) => dispatch(getMessages(user)),
  postMessage: (author, message) => dispatch(postMessage(author, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
