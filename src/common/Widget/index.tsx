import React from 'react';
import classNames from 'classnames';
import './index.scss';

interface Props {
  className?: string;
  header: string;
  transparent?: boolean;
  children: JSX.Element | JSX.Element[];
}

const Widget: React.FC<Props> = ({ className = '', header, transparent, children }) => (
  <section
    className={classNames('widget', {
      [className]: className
    })}
  >
    <header>{header}</header>
    <div
      className={classNames('inner-content', {
        transparent
      })}
    >
      {children}
    </div>
  </section>
);

export default Widget;
