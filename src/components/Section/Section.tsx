import React from 'react';
import classNames from 'classnames';
import './Section.scss';

const Section: React.FC<
  Readonly<
    {
      header: string;
      transparent?: boolean;
    } & React.HTMLAttributes<HTMLElement>
  >
> = ({ header, transparent, children, ...nativeElemProps }) => (
  <section className={classNames('section', nativeElemProps.className)}>
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

export default Section;
