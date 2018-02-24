// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootEl = document.getElementById('root')
if (rootEl) {
  ReactDOM.render(
  <App name='HejHopp' />,
  rootEl
);
}


registerServiceWorker();
