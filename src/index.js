import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from '@Views/App';
import store from './store';


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
