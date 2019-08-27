import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from '@Views/Login';
import Home from '@Views/Home';
import './app.scss';

export const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
    </div>
  </BrowserRouter>
);

export default App;
