import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faSignal, faBatteryHalf } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';

const Toolbar: React.SFC<{}> = () => {
  const { useState, useEffect } = React;
  const [time, setTime] = useState<string>();

  const updateTime = (): void => {
    const time = new Date().toLocaleTimeString('en-us', {
      hour: 'numeric',
      minute: '2-digit'
    });
    setTime(time);
  };

  useEffect(() => {
    updateTime();
    setInterval(updateTime, 1000);
  }, []);

  return (
    <div className={styles.toolbar}>
      <Grid fluid>
        <Row middle="xs">
          <Col xs={6}>
            <time>{time}</time>
            <FontAwesomeIcon icon={faLocationArrow} />
          </Col>
          <Col xs={6}>
            <Row middle="xs" end="xs">
              <Col xs={12}>
                <FontAwesomeIcon icon={faSignal} />
                <FontAwesomeIcon icon={faBatteryHalf} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Toolbar;
