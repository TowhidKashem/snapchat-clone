import React, { useEffect, useLayoutEffect, useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { getMessages, postMessage } from './duck';
import { dummyMessages } from './data';
import { hideDrawer } from 'AppShell/duck';
import { HideDrawer } from 'AppShell/types';
import { GetMessages, PostMessage, Message } from './types';
import { randomArrayVal } from 'utils/array';
import { playSound } from 'utils/audio';
import { sleep } from 'utils/system';
import Input from 'common/Input';
import Avatar from 'common/Avatar';
import Pill from 'common/Pill';
import Button from 'common/Button';
import './index.scss';

interface Props {
  username: string;
  thread: string;
  messages: Message[];
  hideDrawer: HideDrawer;
  getMessages: GetMessages;
  postMessage: PostMessage;
}

const Chat: React.FC<Props> = ({
  username,
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
    async (firstMsg?: boolean) => {
      // Pretend to type for a bit...
      const typeAndStop = firstMsg ? [1000, 0] : [800, 500, 1000, 700, 600, 0];
      for (let i = 0; i < typeAndStop.length; i++) {
        setTyping((prevTyping) => !prevTyping);
        await sleep(typeAndStop[i]);
        continue;
      }
      const message = firstMsg ? 'Soooo, how was it!?' : randomArrayVal(dummyMessages);
      postMessage(thread, message);
      if (audioElem.current) playSound('newAppMessage', audioElem.current);
    },
    [postMessage, thread]
  );

  useEffect(() => {
    getMessages(thread);
    botResponse(true);
  }, [thread, getMessages, botResponse]);

  const submitMessage = () => {
    if (!message.length) return;
    postMessage(username, message);
    setMessage('');
    setTimeout(botResponse, 1000);
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
            testId="btn-close-chat"
          />
        </div>
      </header>

      <section ref={messageContainer} className="messages">
        {messages.map(({ author, message, time }, index) => (
          <article
            key={time + index}
            className={classNames('message', {
              other: author !== username
            })}
            data-test="message"
          >
            <header>{author !== username ? author : 'Me'}</header>
            <blockquote>{message}</blockquote>
          </article>
        ))}
      </section>

      <footer>
        <div className={classNames('gravatar', { typing })}>
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
            <Button icons={['faMobile', 'faMobileAlt']} buttonClass="btn-archive" />
            <Button icon="faRocket" />
          </div>
        </div>
      </footer>

      <audio ref={audioElem} className="app-sound"></audio>
    </main>
  );
};

const mapStateToProps = ({ user, chat }) => ({
  username: user.session.username,
  thread: chat.thread,
  messages: chat.messages
});

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: (component) => dispatch(hideDrawer(component)),
  getMessages: (user) => dispatch(getMessages(user)),
  postMessage: (author, message) => dispatch(postMessage(author, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
