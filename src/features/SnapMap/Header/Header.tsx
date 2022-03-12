import React from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { hideDrawer } from 'AppShell/AppShellStore';
import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';
import { conditionIconMap } from '../data';
import './Header.scss';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const {
    user: {
      geolocation: { city }
    },
    snapMap: {
      weather: { temperature, condition }
    }
  } = useSelector(({ user, snapMap }: RootStateOrAny) => ({ user, snapMap }));

  return (
    <header className="weather-header">
      <div className="left">
        <Button
          icon="faTimes"
          onClick={() => dispatch(hideDrawer('snapMap'))}
          className="btn-close"
          testId="btn-close"
          round
        />
        <Button icon="faSearch" round />
      </div>
      <div className="center">
        <article className="weather">
          <header>{city}</header>
          <div className="condition">
            {condition && <Icon name={conditionIconMap[condition]} />}
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
