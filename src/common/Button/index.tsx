import React from 'react';
import classNames from 'classnames';
import Icon from 'common/Icon';
import './index.scss';

const Button: React.FC<{
  readonly image?: string;
  readonly icon?: string;
  readonly icons?: string[];
  readonly iconClass?: string;
  readonly iconClasses?: Array<string | null>;
  readonly buttonClass?: string;
  readonly round?: boolean;
  readonly plain?: boolean;
  readonly purple?: boolean;
  readonly label?: string;
  readonly onclick?: () => void;
  readonly testId?: string;
}> = ({
  image,
  icon,
  icons,
  iconClass = '',
  iconClasses = [],
  buttonClass = '',
  round,
  plain,
  purple,
  label,
  onclick,
  testId
}) => (
  <button
    type="button"
    onClick={onclick}
    className={classNames('btn', {
      [buttonClass]: true,
      round,
      plain,
      purple
    })}
    data-test={testId}
  >
    {image ? (
      <img src={image} alt="" />
    ) : icons ? (
      icons.map((icon, index) => (
        <Icon
          key={icon + index}
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
          [iconClass]: true
        })}
      />
    ) : null}
    {label && <strong>{label}</strong>}
  </button>
);

export default Button;
