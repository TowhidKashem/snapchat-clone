import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import app from 'AppShell/AppShellStore';
import camera from 'features/Camera/CameraStore';
import user from 'features/User/UserStore';
import snapMap from 'features/SnapMap/SnapMapStore';
import snap from 'features/Snap/SnapStore';
import chat from 'features/Chat/ChatStore';

import AppShell from 'AppShell/AppShell';
import Camera from 'features/Camera/Camera';
import NotFound from 'features/404/404';

import 'normalize.css';
import 'animate.css';
import './styles/app.scss';

export const store = configureStore({
  reducer: { app, camera, user, snapMap, snap, chat }
});

const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppShell>
          <Switch>
            <Route path="/" component={Camera} exact />
            <Route path="/snapchat-clone" component={Camera} exact />
            <Route component={NotFound} />
          </Switch>
        </AppShell>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(<App />, document.getElementById('root'));
