import React from 'react';
import classNames from 'classnames';
import './index.scss';

interface Props {
  header: string;
  children: JSX.Element | JSX.Element[];
  className?: string;
  transparent?: boolean;
  box?: boolean;
}

const Widget: React.FC<Props> = ({
  header,
  children,
  className = '',
  transparent,
  box
}) => (
  <section
    className={classNames('widget', {
      [className]: className
    })}
  >
    <header>{header}</header>
    <div className={classNames('inner-content', { transparent, box })}>{children}</div>
  </section>
);

export default Widget;
