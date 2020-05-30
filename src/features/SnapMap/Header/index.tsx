import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
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
      <Grid fluid>
        <Row middle="xs">
          <Col xs={3}>
            <Button
              icon="faTimes"
              buttonClass="round"
              onclick={() => hideDrawer('snapMap')}
            />
            <Button icon="faSearch" buttonClass="round" />
          </Col>
          <Col xs={6}>
            <article className="weather">
              <header>{city}</header>
              <div className="icon-temp">
                <img src={icon} width={30} alt="" />
                <span className="temp">{temperature}&deg;F</span>
              </div>
            </article>
          </Col>
          <Col xs={3} className="gear-col">
            <Button icon="faCog" buttonClass="round" />
          </Col>
        </Row>
      </Grid>
    </header>
  );
};

export default Header;
