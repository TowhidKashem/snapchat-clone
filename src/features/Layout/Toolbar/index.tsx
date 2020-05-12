import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Icon from 'common/Icon';
import styles from './index.module.scss';

interface Props {
  drawers: any;
}

const Toolbar: React.SFC<Props> = ({ drawers }) => {
  const { useState, useEffect } = React;
  const [time, setTime] = useState<string>('');

  const updateTime = (): void => {
    const time = new Date()
      .toLocaleTimeString('en-us', {
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

  const atleastOneDrawerOpen = drawers.some(({ show }) => show);

  return (
    <div
      className={classNames(styles.toolbar, {
        [styles.dark]: atleastOneDrawerOpen
      })}
    >
      <Grid fluid>
        <Row middle="xs">
          <Col xs={6}>
            <time>{time}</time>
            <Icon icon="faLocationArrow" />
          </Col>
          <Col xs={6}>
            <Row middle="xs" end="xs">
              <Col xs={12}>
                <Icon icon="faSignal" />
                <Icon icon="faBatteryHalf" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ app }) => ({ drawers: app.drawers });

export default connect(mapStateToProps)(Toolbar);
