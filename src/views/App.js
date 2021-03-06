import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import Login from '@Views/LoginPage';
import Search from '@Views/SearchPage/SearchPage';
import Home from '@Views/HomePage';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import SignUp from '@Components/Forms/SignUp';
import CategoryPage from '@Views/CategoryPage';
import SignIn from '@Components/Forms/SignIn';
import Header from '@Components/Header';
import ResetPassword from '@Views/ResetPassword';
import CreateArticle from '@Views/Articles/CreateArticle';
import ReadArticle from '@Views/Articles/ReadArticle';
import EditArticle from '@Views/Articles/EditArticle';
import Profile from '@Views/ProfilePage';
import NotFound from '@Views/404';
import Comments from '@Views/CommentPage';
import ArticleTags from './ArticlesTag/ArticlesTag';
import './app.scss';

const App = () => (
  <BrowserRouter>
    <SignIn />
    <SignUp />
    <Header />
    <div data-test="appComponent">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/me" component={Profile} />
        <Route exact path="/profiles/:username" component={Profile} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/create-article" component={CreateArticle} />
        <Route exact path="/articles/:slug" component={ReadArticle} />
        <Route exact path="/articles/:slug/edit" component={EditArticle} />
        <Route exact path="/articles" component={CategoryPage} />
        <Route exact path="/tags" component={ArticleTags} />
        <Route exact path="/articles/comments/:articleId" component={Comments} />
        <Redirect from="/logout" to="/" />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
