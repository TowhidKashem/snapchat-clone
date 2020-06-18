import React from 'react';
import { HideDrawer } from 'AppShell/types';
import { Weather } from '../types';
import Button from 'common/Button';
import './index.scss';

interface Props {
  weather: Weather;
  hideDrawer: HideDrawer;
}

const Header: React.FC<Props> = ({ weather, hideDrawer }) => {
  const { city, icon, temperature } = weather;

  return (
    <header className="weather-header">
      <div className="left">
        <Button icon="faTimes" round onclick={() => hideDrawer('snapMap')} />
        <Button icon="faSearch" round />
      </div>
      <div className="center">
        <article className="weather">
          <header>{city}</header>
          <div className="icon-temp">
            <img src={icon} width={30} alt="" />
            <span className="temp">{temperature}&deg;F</span>
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
