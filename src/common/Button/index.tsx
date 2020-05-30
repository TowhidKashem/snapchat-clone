import React from 'react';
import classNames from 'classnames';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  image?: string;
  icon?: any;
  icons?: any[];
  iconClass?: string;
  iconClasses?: Array<string | null>;
  buttonClass?: string;
  round?: boolean;
  plain?: boolean;
  label?: string;
  onclick?: () => void;
}

const Button: React.FC<Props> = ({
  image,
  icon,
  icons,
  iconClass = '',
  iconClasses = [],
  buttonClass = '',
  round,
  plain,
  label,
  onclick
}) => (
  <button
    onClick={onclick}
    className={classNames('button', {
      [buttonClass]: buttonClass,
      round,
      plain
    })}
  >
    {image ? (
      <img src={image} alt="" />
    ) : icons ? (
      icons.map((icon, index) => (
        <Icon
          key={index}
          icon={icon}
          className={classNames({
            [iconClasses[index] as string]: iconClasses[index]
          })}
        />
      ))
    ) : icon ? (
      <Icon
        icon={icon}
        className={classNames({
          [iconClass]: iconClass
        })}
      />
    ) : null}
    {label && <strong>{label}</strong>}
  </button>
);

export default Button;
