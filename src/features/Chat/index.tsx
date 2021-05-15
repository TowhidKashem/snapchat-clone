import React, { useEffect, useLayoutEffect, useState, useRef, useCallback } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { hideDrawer } from 'AppShell/store';
import { getMessages, postMessage } from './store';
import { dummyMessages } from './data';
import { randomArrayVal, playSound, sleep } from 'utils';
import Input from 'common/Input';
import Avatar from 'common/Avatar';
import Pill from 'common/Pill';
import Button from 'common/Button';
import Loader from 'common/Loader';
import Error from 'common/Error';
import './index.scss';

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const { username, thread, messages } = useSelector(({ user, chat }) => ({
    username: user.session.username,
    thread: chat.thread,
    messages: chat.messages
  }));

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
      dispatch(postMessage(thread, message));
      if (audioElem.current) playSound('newAppMessage', audioElem.current);
    },
    [thread, dispatch]
  );

  useEffect(() => {
    dispatch(getMessages(thread));
    botResponse(true);
  }, [thread, botResponse, dispatch]);

  const submitMessage = () => {
    if (!message.length) return;
    dispatch(postMessage(username, message));
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
            onclick={() => dispatch(hideDrawer('chat'))}
            buttonClass="btn-arrow"
            testId="btn-close-chat"
          />
        </div>
      </header>

      <section ref={messageContainer} className="messages">
        {messages.loading ? (
          <Loader nobg />
        ) : messages.error ? (
          <Error />
        ) : (
          messages.data.map(({ author, message, time }) => (
            <article
              key={time}
              className={classNames('message', {
                other: author !== username
              })}
              data-test="message"
            >
              <header>{author !== username ? author : 'Me'}</header>
              <blockquote>{message}</blockquote>
            </article>
          ))
        )}
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

export default Chat;
