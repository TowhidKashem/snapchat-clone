import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import app from 'AppShell/store';
import camera from 'features/Camera/store';
import user from 'features/User/store';
import snapMap from 'features/SnapMap/store';
import snap from 'features/Snap/store';
import chat from 'features/Chat/store';

import AppShell from 'AppShell';
import Camera from 'features/Camera';
import NotFound from 'features/404';

import 'normalize.css';
import 'animate.css';
import './styles/app.scss';

export const store = configureStore({
  reducer: { app, camera, user, snapMap, snap, chat }
});

const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AppShell>
          <Switch>
            <Route path="/" exact component={Camera} />
            <Route path="/snapchat-clone" exact component={Camera} />
            <Route component={NotFound} />
          </Switch>
        </AppShell>
      </Router>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(<App />, document.getElementById('root'));
