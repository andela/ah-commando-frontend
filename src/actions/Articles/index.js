import axois from 'axios';
import swal from '@sweetalert/with-react';
import {
  LOADING,
  NOT_LOADING,
  READ_ARTICLE,
} from '@Actions/types';
import { axiosInstance } from '@Utils/';

const APP_URL = 'https://a-haven-staging.herokuapp.com';

export const getHomePageArticles = () => async dispatch => {
  try {
    const response = await axois.get(
      `${APP_URL}/api/v1/articles/categories/article`,
    );
    dispatch({
      type: 'GET_HOME_ARTICLES_FROM_DATABASE',
      payload: response.data,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    // console.log(err);
  }
};

export const getArticle = () => async dispatch => {
  try {
    const response = await axois.get(
      `${APP_URL}/api/v1/articles/categories/article/featured`,
    );
    dispatch({
      type: 'GET_FEATURED',
      payload: response.data,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    // console.log(err);
  }
};

export const getEditorsChoice = () => async dispatch => {
  try {
    const response = await axois.get(
      `${APP_URL}/api/v1/articles?limit=5`,
    );
    dispatch({
      type: 'GET_EDITORS_CHOICE',
      payload: response.data,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    // console.log(err);
  }
};

export const createArticle = (articleData, history) => async dispatch => {
  dispatch({
    type: LOADING,
  });
  try {
    const response = await axiosInstance.post('articles', { article: { ...articleData } });
    const { slug } = response.data.articles;
    swal({
      text: 'Article created successfully',
      icon: 'success',
      buttons: false,
      timer: 3000,
    });
    await setTimeout(() => {
      history.push(`articles/${slug}`);
      document.location.reload();
    }, 5000);
    dispatch({
      type: NOT_LOADING,
    });
  } catch (err) {
    swal({
      text: err.response.data.error[0],
      icon: 'error',
      buttons: false,
      timer: 5000,
    });
  }
};

export const readArticle = slug => async dispatch => {
  dispatch({
    type: LOADING,
  });
  try {
    const response = await axiosInstance.get(`articles/${slug}`);
    dispatch({
      type: READ_ARTICLE,
      payload: response.data.article,
    });
    dispatch({
      type: NOT_LOADING,
    });
  } catch (err) {
    document.location = '/404';
  }
};

export const updateArticle = (articleData, articleSlug, history) => async dispatch => {
  dispatch({
    type: LOADING,
  });
  try {
    const response = await axiosInstance.put(`articles/${articleSlug}/edit`, { article: { ...articleData } });
    const { slug } = response.data.article;
    swal({
      text: 'Article updated',
      icon: 'success',
      buttons: false,
      timer: 2000,
    });
    await setTimeout(() => {
      history.push(`/articles/${slug}`);
      document.location.reload();
    }, 2000);

    dispatch({
      type: NOT_LOADING,
    });
  } catch (err) {
    swal({
      text: err.response.data.error[0],
      icon: 'error',
      buttons: false,
      timer: 5000,
    });
  }
};

export const deleteAnArticle = (slug, history) => async dispatch => {
  dispatch({
    type: LOADING,
  });
  try {
    await axiosInstance.delete(`articles/${slug}`);
    swal({
      text: 'Article deleted',
      icon: 'success',
      buttons: false,
      timer: 2000,
    });
    await setTimeout(() => {
      history.push('/profile');
    }, 2000);

    dispatch({
      type: NOT_LOADING,
    });
  } catch (err) {
    swal({
      text: err.response.data.error[0],
      icon: 'error',
      buttons: false,
      timer: 5000,
    });
  }
};
