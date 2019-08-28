import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from '@Views/LoginPage';
import Home from '@Views/HomePage';
import './app.scss';

const App = () => (
  <BrowserRouter>
    <div data-test="appComponent">
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
    </div>
  </BrowserRouter>
);

export default App;
