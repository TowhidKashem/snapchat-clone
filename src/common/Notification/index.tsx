import React from 'react';
import { Animated } from 'react-animated-css';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  sender: string;
  time: string;
  show: boolean;
  onClick: () => void;
}

const Notification: React.FC<Props> = ({ sender, time, show, onClick }) => (
  <div className="notification" onClick={onClick}>
    <Animated
      animationIn="slideInDown"
      animationOut="slideOutUp"
      animationInDuration={100}
      animationOutDuration={100}
      isVisible={show}
      animateOnMount={false}
    >
      <div className="message">
        <header>
          <div className="left">
            <Icon icon="faSnapchatSquare" />
            <span>SnapChat</span>
          </div>
          <time>{time}</time>
        </header>
        <p>from {sender}</p>
      </div>
    </Animated>
  </div>
);

export default Notification;
