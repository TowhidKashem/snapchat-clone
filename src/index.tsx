import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './features/Layout';
import Camera from './features/Camera';
import NotFound from './features/404';

import * as serviceWorker from './serviceWorker';

import 'normalize.css';
import 'animate.css';
import './static/styles/global.scss';

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={Camera} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
