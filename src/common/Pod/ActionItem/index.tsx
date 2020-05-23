import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import classNames from 'classnames';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  leftIcon?: any;
  rightIcon?: any;
  label?: string;
  transparent?: boolean;
  children?: any;
}

const ActionItem: React.FC<Props> = ({ leftIcon, rightIcon, label, transparent }) => (
  <article className={classNames('pod-action-item', { transparent })}>
    <Grid fluid>
      <Row middle="xs">
        <Col xs={2}>
          <Icon icon={leftIcon} />
        </Col>
        <Col xs={8}>{label}</Col>
        <Col xs={2}>
          <Icon icon={rightIcon} />
        </Col>
      </Row>
    </Grid>
  </article>
);

export default ActionItem;
