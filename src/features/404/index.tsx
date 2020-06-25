import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'common/Icon';
import './index.scss';

const NotFound = () => (
  <main className="not-found">
    <div className="message">
      <h1>Well, this is awkward!</h1>
      <p>We couldn't find what you were looking for</p>
      <Link to="/">
        <Icon icon="faSnapchatSquare" />
        <span>Go Home</span>
      </Link>
    </div>
  </main>
);

export default NotFound;
