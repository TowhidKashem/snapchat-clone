import React from 'react';
import classNames from 'classnames';
import './index.scss';

interface Props {
  header: string;
  transparent?: boolean;
  children: any;
}

const Widget: React.FC<Props> = ({ header, transparent, children }) => (
  <section className="widget">
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
