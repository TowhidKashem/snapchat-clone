import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import classNames from 'classnames';
import { hideDrawer } from 'AppShell/AppShellStore';
import { getMessages, postMessage } from './ChatStore';
import { Message, dummyMessages } from './data';
import { randomArrayVal, playSound, sleep } from 'utils';
import Input from 'components/Input/Input';
import Avatar from 'components/Avatar/Avatar';
import Pill from 'components/Pill/Pill';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Error from 'components/Error/Error';
import './Chat.scss';

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const {
    user: {
      session: { username }
    },
    chat: { thread, messages }
  } = useSelector(({ user, chat }: RootStateOrAny) => ({ user, chat }));

  const messageContainer = useRef<HTMLElement>(null);
  const audioElem = useRef<HTMLAudioElement>(null);

  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    dispatch(getMessages(thread));
    botResponse(true);
  }, []);

  useLayoutEffect(() => {
    // Scroll to bottom of container on load and each time a new message is posted
    if (messageContainer.current) {
      messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
    }
  }, [messages]);

  const botResponse = async (firstMsg = false) => {
    // Pretend to type for a bit...
    const typeAndStop = firstMsg ? [1000, 0] : [800, 500, 1000, 700, 600, 0];

    for (let i = 0; i < typeAndStop.length; i++) {
      setTyping((prevTyping) => !prevTyping);
      await sleep(typeAndStop[i]);
      continue;
    }

    const message = firstMsg ? 'Soooo, how was it!?' : randomArrayVal(dummyMessages);
    dispatch(postMessage(thread, message));

    if (audioElem.current) {
      playSound('newAppMessage', audioElem.current);
    }
  };

  const submitMessage = () => {
    if (message.length) {
      dispatch(postMessage(username, message));
      setMessage('');
      setTimeout(botResponse, 1000);
    }
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
            onClick={() => dispatch(hideDrawer('chat'))}
            className="btn-arrow"
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
          messages.data.map(({ author, message, time }: Message) => (
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
          <Button icon="faCamera" className="btn-camera" round />
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
            <Button icons={['faMobile', 'faMobileAlt']} className="btn-archive" />
            <Button icon="faRocket" />
          </div>
        </div>
      </footer>

      <audio ref={audioElem} className="app-sound" />
    </main>
  );
};

export default Chat;
