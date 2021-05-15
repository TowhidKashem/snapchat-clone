import React from 'react';
import classNames from 'classnames';
import Icon from 'common/Icon';
import Button from 'common/Button';
import './index.scss';

const PodActionItem: React.FC<{
  readonly leftIcon: string;
  readonly rightIcon: string;
  readonly label: string;
  readonly straightEdge?: boolean;
}> = ({ leftIcon, rightIcon, label, straightEdge }) => (
  <article
    className={classNames('pod', 'action-item', {
      'straight-edge': straightEdge
    })}
  >
    <Icon icon={leftIcon} className="ico-left" />
    {label}
    <Button icon={rightIcon} buttonClass="ico-right" />
  </article>
);

export default PodActionItem;
