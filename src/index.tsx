import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './features/Layout';
import Camera from './features/Camera';
import NotFound from './features/404';

import * as serviceWorker from './serviceWorker';

// Redux
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import app from 'redux/reducers/app';
import user from 'redux/reducers/user';

import 'normalize.css';
import 'animate.css';
import './static/styles/global.scss';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const rootReducer = combineReducers({
  app,
  user
});

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact component={Camera} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
