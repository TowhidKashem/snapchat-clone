import React, { useState, useEffect } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import classNames from 'classnames';
import { language } from 'utils';
import { atleastOneDrawerOpen } from '../data';
import Icon from 'components/Icon/Icon';
import './Toolbar.scss';

const Toolbar: React.FC = () => {
  const { drawers } = useSelector(({ app }: RootStateOrAny) => app);
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
        <Icon name="faLocationArrow" />
      </div>
      <div className="right">
        <Icon name="faSignal" className="icon-signal" />
        <Icon name="faBatteryHalf" />
      </div>
    </div>
  );
};

export default Toolbar;
