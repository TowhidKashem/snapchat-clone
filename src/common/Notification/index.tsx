import React from 'react';
import { Animated } from 'react-animated-css';
import { Grid, Row, Col } from 'react-flexbox-grid';
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
          <Grid fluid>
            <Row middle="xs">
              <Col xs={10}>
                <Icon icon="faSnapchatSquare" size="7x" />
                <span>SnapChat</span>
              </Col>
              <Col xs={2}>
                <time>{time}</time>
              </Col>
            </Row>
          </Grid>
        </header>
        <p>from {sender}</p>
      </div>
    </Animated>
  </div>
);

export default Notification;
