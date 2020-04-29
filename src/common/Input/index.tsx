import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './index.module.scss';

interface Props {
  placeholder: string;
  leftIcon: any;
  rightIcon: any;
  rightIconClick: () => void;
}

const Input: React.FC<Props> = ({ placeholder, leftIcon, rightIcon, rightIconClick }) => {
  const iconClick = rightIconClick
    ? {
        onClick: rightIconClick
      }
    : {};
  return (
    <div className={styles.input}>
      <Grid fluid>
        <Row middle="xs" center="xs">
          <Col xs={4}>{leftIcon && <FontAwesomeIcon icon={leftIcon} />}</Col>
          <Col xs={4}>
            <input type="text" placeholder={placeholder} />
          </Col>
          <Col xs={4}>{rightIcon && <FontAwesomeIcon icon={rightIcon} {...iconClick} />}</Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Input;
