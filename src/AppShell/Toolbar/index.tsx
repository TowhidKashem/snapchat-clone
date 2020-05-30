import React from 'react';
import classNames from 'classnames';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Drawer } from '../types';
import { drawerIsOpen } from '../utils';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  drawers: Drawer[];
}

const Toolbar: React.FC<Props> = ({ drawers }) => {
  const { useState, useEffect } = React;
  const [time, setTime] = useState<string>('');

  const updateTime = (): void => {
    const { language = 'en-US' } = navigator;
    const time = new Date()
      .toLocaleTimeString(language, {
        hour: 'numeric',
        minute: '2-digit'
      })
      .replace(/AM|PM/, '');
    setTime(time);
  };

  useEffect(() => {
    updateTime();
    setInterval(updateTime, 1000);
  }, []);

  return (
    <div
      className={classNames('toolbar', {
        dark: drawerIsOpen(drawers)
      })}
    >
      <Grid fluid>
        <Row middle="xs">
          <Col xs={6}>
            <time>{time}</time>
            <Icon icon="faLocationArrow" />
          </Col>
          <Col xs={6}>
            <Row middle="xs" end="xs">
              <Col xs={12}>
                <Icon icon="faSignal" />
                <Icon icon="faBatteryHalf" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Toolbar;
