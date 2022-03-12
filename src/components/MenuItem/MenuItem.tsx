import React from 'react';
import classNames from 'classnames';
import Icon from 'components/Icon/Icon';
import Button from 'components/Button/Button';
import './MenuItem.scss';

const MenuItem: React.FC<
  Readonly<{
    leftIcon: string;
    rightIcon: string;
    label: string;
    straightEdge?: boolean;
  }>
> = ({ leftIcon, rightIcon, label, straightEdge }) => (
  <article
    className={classNames('menu-item', {
      'straight-edge': straightEdge
    })}
  >
    <Icon name={leftIcon} className="ico-left" />
    {label}
    <Button icon={rightIcon} className="ico-right" />
  </article>
);

export default MenuItem;
