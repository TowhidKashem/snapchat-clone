import React from 'react';
import classNames from 'classnames';
import './Loader.scss';

const Loader: React.FC<
  Readonly<{
    fixed?: boolean;
    nobg?: boolean;
    message?: string;
  }>
> = ({ fixed, nobg, message }) => (
  <div
    className={classNames('loading', {
      fixed,
      message,
      nobg
    })}
  >
    <div className="center">
      <div className="sk-cube-grid">
        {new Array(9).fill(null).map((val, index) => (
          <div key={`cube-${index}`} className={'sk-cube sk-cube' + index} />
        ))}
      </div>
      {message && <span>{message}</span>}
    </div>
  </div>
);

export default Loader;
