import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app';

import configureAppStore from './store/configureAppStore';

import registerServiceWorker from './serviceWorkerRegistration';

const store = configureAppStore();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);

registerServiceWorker();
