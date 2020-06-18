import React from 'react';
import classNames from 'classnames';
import './index.scss';

interface Props {
  fixed?: boolean;
  message?: string;
}

const Loader: React.FC<Props> = ({ fixed, message }) => {
  const pieces = new Array(9).fill(null);
  return (
    <div
      className={classNames('loading', {
        fixed
      })}
    >
      <div className="center">
        <div className="sk-cube-grid">
          {pieces.map((val, index) => (
            <div key={index} className={'sk-cube sk-cube' + index}></div>
          ))}
        </div>
        {message && <span>{message}</span>}
      </div>
    </div>
  );
};

export default Loader;
