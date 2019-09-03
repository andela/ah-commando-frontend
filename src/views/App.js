import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Login from '@Views/LoginPage';
import SignUp from '@Views/SignupPage';
import Home from '@Views/HomePage';
import './app.scss';

const App = () => (
  <BrowserRouter>
    <ToastContainer />
    <div data-test="appComponent">
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
    </div>
  </BrowserRouter>
);

export default App;
