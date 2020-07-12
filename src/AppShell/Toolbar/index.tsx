import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { language } from 'utils/browser';
import { Drawer } from '../types';
import { atleastOneDrawerOpen } from '../utils';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  drawers: Drawer[];
}

const Toolbar: React.FC<Props> = ({ drawers }) => {
  const [time, setTime] = useState('');

  const updateTime = () => {
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
        <Icon icon="faLocationArrow" />
      </div>
      <div className="right">
        <Icon icon="faSignal" className="icon-signal" />
        <Icon icon="faBatteryHalf" />
      </div>
    </div>
  );
};

export default Toolbar;
