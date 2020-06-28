import React from 'react';
import classNames from 'classnames';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  leftIcon: string;
  rightIcon: string;
  label: string;
  straightEdge?: boolean;
}

const ActionItem: React.FC<Props> = ({ leftIcon, rightIcon, label, straightEdge }) => (
  <article
    className={classNames('pod-action-item', {
      'straight-edge': straightEdge
    })}
  >
    <Icon icon={leftIcon} />
    {label}
    <Icon icon={rightIcon} className="right-icon" />
  </article>
);

export default ActionItem;
