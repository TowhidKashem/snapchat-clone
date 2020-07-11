import React from 'react';
import classNames from 'classnames';
import './index.scss';

interface Props {
  fixed?: boolean;
  message?: string;
}

const Loader: React.FC<Props> = ({ fixed, message }) => (
  <div className={classNames('loading', { fixed, message })}>
    <div className="center">
      <div className="sk-cube-grid">
        {new Array(9).fill(null).map((val, index) => (
          <div key={`cube-${index}`} className={'sk-cube sk-cube' + index}></div>
        ))}
      </div>
      {message && <span>{message}</span>}
    </div>
  </div>
);

export default Loader;
