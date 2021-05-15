import React from 'react';
import classNames from 'classnames';
import './index.scss';

const Widget: React.FC<{
  readonly header: string;
  readonly children: JSX.Element | JSX.Element[];
  readonly className?: string;
  readonly transparent?: boolean;
}> = ({ header, children, className = '', transparent }) => (
  <section
    className={classNames('widget', {
      [className]: true
    })}
  >
    <header>{header}</header>
    <div className={classNames('inner-content', { transparent })}>{children}</div>
  </section>
);

export default Widget;
