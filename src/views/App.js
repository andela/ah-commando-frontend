import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
<<<<<<< HEAD
import Login from '@Views/LoginPage';
=======
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// import Filter from '@Views/SearchPage/Filter';
import Search from '@Views/SearchPage/SearchPage';
>>>>>>> ft(frontend): Search functionality
import Home from '@Views/HomePage';
import ResetPassword from '@Views/ResetPassword';
import Profile from '@Views/ProfilePage';
<<<<<<< HEAD
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
=======
import Login from '@Views/LoginPage';
>>>>>>> ft(frontend): Search functionality
import './app.scss';

const App = () => (
  <BrowserRouter>
    <ToastContainer />
    <div data-test="appComponent">
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
<<<<<<< HEAD
      <Route exact path="/reset-password" component={ResetPassword} />
=======
      <Route exact path="/search" component={Search} />
>>>>>>> ft(frontend): Search functionality
    </div>
  </BrowserRouter>
);

export default App;
