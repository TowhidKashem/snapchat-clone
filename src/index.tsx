import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './pages/Layout';
import Camera from './pages/Camera';
import NotFound from './pages/404';

import * as serviceWorker from './serviceWorker';
import 'normalize.css';
import './static/styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={Camera} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
