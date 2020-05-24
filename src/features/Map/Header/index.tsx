import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { HideDrawer } from 'AppShell/Drawer/types';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  weather: any;
  hideDrawer: HideDrawer;
}

const Header: React.FC<Props> = ({ weather, hideDrawer }) => {
  const { city, icon, temperature } = weather;

  return (
    <header className="weather-info">
      <Grid fluid>
        <Row middle="xs">
          <Col xs={3}>
            <Icon
              icon="faTimesCircle"
              onClick={() => hideDrawer('map')}
              size="2x"
              className="close"
            />
            <Icon icon="faSearchPlus" onClick={() => {}} size="2x" className="close" />
          </Col>
          <Col xs={6}>
            <Row bottom="xs">
              <Col xs={12}>
                <article className="weather">
                  <h3>{city}</h3>
                  <div className="icon-temp">
                    <img src={icon} width={30} alt="" />
                    <span className="temp">{temperature}&deg;F</span>
                  </div>
                </article>
              </Col>
            </Row>
          </Col>
          <Col xs={3}>
            <Row end="xs">
              <Col xs={3}>
                <Icon icon="faCog" onClick={() => {}} size="2x" className="close" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </header>
  );
};

export default Header;
