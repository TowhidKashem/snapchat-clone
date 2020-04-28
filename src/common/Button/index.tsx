import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './index.module.scss';

interface Props {
  icon?: any;
  icons?: any[];
  iconClass?: string;
  iconClasses?: Array<string | null>;
  buttonClass?: string;
  label?: string;
}

const Button: React.FC<Props> = ({
  icon,
  icons,
  iconClass = '',
  iconClasses = [],
  buttonClass = '',
  label
}) => (
  <button
    className={classNames(styles.button, {
      [buttonClass]: buttonClass
    })}
  >
    {icons ? (
      icons.map((icon, index) => (
        <FontAwesomeIcon
          key={index}
          icon={icon}
          className={classNames({
            [iconClasses[index] as string]: iconClasses[index]
          })}
        />
      ))
    ) : (
      <FontAwesomeIcon
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
