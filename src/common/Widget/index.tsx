import React from 'react';
import classNames from 'classnames';
import './index.scss';

interface Props {
  header: string;
  children: JSX.Element | JSX.Element[];
  className?: string;
  transparent?: boolean;
}

const Widget: React.FC<Props> = ({ header, children, className = '', transparent }) => (
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
