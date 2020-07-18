import React from 'react';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  message?: string;
}

const Error: React.FC<Props> = ({ message = "Oops couldn't load content" }) => (
  <div className="error">
    <p>
      <Icon icon="faExclamationCircle" /> {message}
    </p>
  </div>
);

export default Error;
