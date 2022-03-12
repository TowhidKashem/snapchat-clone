import React from 'react';
import classNames from 'classnames';
import Icon from 'components/Icon/Icon';
import './Button.scss';

const Button: React.FC<
  Readonly<{
    image?: string;
    svg?: JSX.Element;
    icon?: string;
    icons?: string[];
    iconClass?: string;
    iconClasses?: string[];
    round?: boolean;
    plain?: boolean;
    purple?: boolean;
    label?: string;
    testId?: string;
  }> &
    React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  image,
  svg,
  icon,
  icons,
  iconClass = '',
  iconClasses = [],
  round,
  plain,
  purple,
  label,
  testId,
  ...nativeElemProps
}) => (
  <button
    type="button"
    data-test={testId}
    {...nativeElemProps}
    className={classNames('btn', nativeElemProps.className, {
      round,
      plain,
      purple
    })}
  >
    {image && <img src={image} alt="" />}

    {svg && svg}

    {icons &&
      icons.map((icon, index) => (
        <Icon key={icon + index} name={icon} className={iconClasses[index]} />
      ))}

    {icon && <Icon name={icon} className={iconClass} />}

    {label && <strong>{label}</strong>}
  </button>
);

export default Button;
