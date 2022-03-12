import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/Icon/Icon';
import './404.scss';

const NotFound = () => (
  <main className="not-found">
    <div className="message">
      <h1>Well, this is awkward!</h1>
      <p>We couldn't find what you were looking for</p>
      <Link to="/">
        <Icon name="faSnapchatSquare" />
        <span>Go Home</span>
      </Link>
    </div>
  </main>
);

export default NotFound;
