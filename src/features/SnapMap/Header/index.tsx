import React from 'react';
import { HideDrawer } from 'AppShell/types';
import { Weather } from '../types';
import { conditionIconMap } from '../data';
import Button from 'common/Button';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  weather: Weather;
  city: string;
  hideDrawer: HideDrawer;
}

const Header: React.FC<Props> = ({
  weather: { temperature, condition },
  city,
  hideDrawer
}) => (
  <header className="weather-header">
    <div className="left">
      <Button
        icon="faTimes"
        round
        onclick={() => hideDrawer('snapMap')}
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

export default Header;
