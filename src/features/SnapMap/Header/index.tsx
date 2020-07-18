import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideDrawer } from 'AppShell/store';
import Button from 'common/Button';
import Icon from 'common/Icon';
import { conditionIconMap } from '../data';
import './index.scss';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { city, weather } = useSelector(({ user, snapMap }) => ({
    city: user.geolocation.city,
    weather: snapMap.weather
  }));
  const { temperature, condition } = weather;

  return (
    <header className="weather-header">
      <div className="left">
        <Button
          icon="faTimes"
          round
          onclick={() => dispatch(hideDrawer('snapMap'))}
          buttonClass="btn-close"
          testId="btn-close"
        />
        <Button icon="faSearch" round />
      </div>
      <div className="center">
        <article className="weather">
          <header>{city}</header>
          <div className="condition">
            <Icon icon={conditionIconMap[condition]} />
            <span className="temperature">{temperature}&deg;F</span>
          </div>
        </article>
      </div>
      <div className="right">
        <Button icon="faCog" round />
      </div>
    </header>
  );
};

export default Header;
