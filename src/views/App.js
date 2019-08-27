import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from '@App/views/LoginPage';
import Home from '@App/views/HomePage';
import './app.scss';

export const App = () => (
  <BrowserRouter>
    <div data-test="appComponent">
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
    </div>
  </BrowserRouter>
);

export default App;
