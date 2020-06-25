import React from 'react';
import classNames from 'classnames';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  leftIcon: string;
  rightIcon: string;
  label: string;
  transparent?: boolean;
}

const ActionItem: React.FC<Props> = ({ leftIcon, rightIcon, label, transparent }) => (
  <article className={classNames('pod-action-item', { transparent })}>
    <Icon icon={leftIcon} />
    {label}
    <Icon icon={rightIcon} className="right-icon" />
  </article>
);

export default ActionItem;
