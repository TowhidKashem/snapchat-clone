import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Icon from 'common/Icon';
import styles from './index.module.scss';

interface Props {
  user: any;
  hideDrawer: (component: string) => void;
}

const Header: React.SFC<Props> = ({ user, hideDrawer }) => {
  const { city, icon, temperature } = user.weather;

  return (
    <header className={styles.header}>
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
                <article className={styles.weather}>
                  <h3>{city}</h3>
                  <div className={styles.iconTemp}>
                    <img src={icon} width={30} />
                    <span className={styles.temp}>{temperature}&deg;F</span>
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

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: (component) => dispatch(actions.hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
