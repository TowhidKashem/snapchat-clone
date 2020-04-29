import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './features/Layout';
import Camera from './features/Camera';
import NotFound from './features/404';

import * as serviceWorker from './serviceWorker';

import 'normalize.css';
import 'animate.css';
import './static/styles/global.scss';

const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact component={Camera} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
