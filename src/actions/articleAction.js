import jwtDecode from 'jwt-decode';
import * as types from './types/index';
import { axiosInstance } from '@Utils/';

export const getArticlesStart = () => ({
  type: types.GET_ARTICLE_START,
});

export const getArticlesSuccess = (payload) => ({
  type: types.GET_ARTICLE_SUCCESS,
  payload,
});

export const getArticlesFailure = (error) => ({
  type: types.GET_ARTICLE_FAILURE,
  error,
});

export const getArticles = () => async (dispatch) => {
  dispatch(getArticlesStart());
  try {
    const token = jwtDecode(localStorage.getItem('haven'));
    const response = await axiosInstance.get(`/articles/?authorId=${token.id}`);
    return dispatch(getArticlesSuccess(response.data.articles));
  } catch (error) {
    return dispatch(getArticlesFailure(error.response.data));
  }
};
