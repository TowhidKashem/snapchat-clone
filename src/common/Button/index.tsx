import React from 'react';
import classNames from 'classnames';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  icon?: any;
  icons?: any[];
  iconClass?: string;
  iconClasses?: Array<string | null>;
  buttonClass?: string;
  label?: string;
  onclick?: () => void;
}

const Button: React.FC<Props> = ({
  icon,
  icons,
  iconClass = '',
  iconClasses = [],
  buttonClass = '',
  label,
  onclick
}) => (
  <button
    onClick={onclick}
    className={classNames('button', {
      [buttonClass]: buttonClass
    })}
  >
    {icons ? (
      icons.map((icon, index) => (
        <Icon
          key={index}
          icon={icon}
          className={classNames({
            [iconClasses[index] as string]: iconClasses[index]
          })}
        />
      ))
    ) : (
      <Icon
        icon={icon}
        className={classNames({
          [iconClass]: iconClass
        })}
      />
    )}
    {label && <strong>{label}</strong>}
  </button>
);

export default Button;
