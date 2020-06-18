import React from 'react';
import './index.scss';

interface Props {
  message?: string;
}

const Loader: React.FC<Props> = ({ message }) => {
  const pieces = new Array(9).fill(null);
  return (
    <div className="loading">
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
