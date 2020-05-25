import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppShell from './AppShell';
import Camera from './features/Camera';
import NotFound from './features/404';

// Redux
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import app from 'AppShell/duck';
import weather from 'features/Map/duck';
import media from 'features/Video/duck';
import chat from 'features/Chat/duck';

import 'normalize.css';
import 'animate.css';
import './static/styles/global.scss';

const rootReducer = combineReducers({ app, weather, media, chat });

// Redux devtools extension
// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
const composeEnhancers =
  (typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AppShell>
          <Switch>
            <Route path="/" exact component={Camera} />
            <Route component={NotFound} />
          </Switch>
        </AppShell>
      </Router>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(<App />, document.getElementById('root'));
