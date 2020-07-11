import React from 'react';
import classNames from 'classnames';
import { Drawer } from '../types';
import { atleastOneDrawerOpen } from '../utils';
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
        dark: atleastOneDrawerOpen(drawers)
      })}
    >
      <div className="left">
        <time>{time}</time>
        <Icon icon="faLocationArrow" className="icon-location" />
      </div>
      <div className="right">
        <Icon icon="faSignal" className="icon-signal" />
        <Icon icon="faBatteryHalf" />
      </div>
    </div>
  );
};

export default Toolbar;
