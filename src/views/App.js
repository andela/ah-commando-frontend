import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from '@Views/LoginPage';
import Home from '@Views/HomePage';
import ResetPassword from '@Views/ResetPassword';
import Profile from '@Views/ProfilePage';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './app.scss';

const App = () => (
  <BrowserRouter>
    <ToastContainer />
    <div data-test="appComponent">
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/reset-password" component={ResetPassword} />
    </div>
  </BrowserRouter>
);

export default App;
