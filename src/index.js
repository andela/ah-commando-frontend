import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import App from '@Views/App';
import { setCurrentUser } from '@Actions/authActions';
import { setToken } from '@Utils/';
import store from './store';

if (localStorage.haven) {
  setToken(localStorage.haven);
  const decoded = jwtDecode(localStorage.haven);
  store.dispatch(setCurrentUser(decoded));
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
