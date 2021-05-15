import React from 'react';
import Icon from 'common/Icon';
import './index.scss';

const Error: React.FC<{
  readonly message?: string;
}> = ({ message = "Oops couldn't load content" }) => (
  <div className="error">
    <p>
      <Icon icon="faExclamationCircle" /> {message}
    </p>
  </div>
);

export default Error;
