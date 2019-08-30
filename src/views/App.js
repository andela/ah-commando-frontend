import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from '@Views/LoginPage';
import Home from '@Views/HomePage';
import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

const App = () => (
  <BrowserRouter>
    <ToastContainer />
    <div data-test="appComponent">
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
    </div>
  </BrowserRouter>
);

export default App;
