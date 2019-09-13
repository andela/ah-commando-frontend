import jwtDecode from 'jwt-decode';
import swal from 'sweetalert';

import * as types from '@Actions/types';
import { axiosInstance } from '@Utils/';

export const getProfileStart = () => ({
  type: types.GET_PROFILE_START,
});

export const getProfileSuccess = (payload) => ({
  type: types.GET_PROFILE_SUCCESS,
  payload,
});

export const getProfileFailure = (error) => ({
  type: types.GET_PROFILE_FAILURE,
  error,
});

export const editProfileStart = () => ({
  type: types.EDIT_PROFILE_START,
});

export const editProfileSuccess = (payload) => ({
  type: types.EDIT_PROFILE_SUCCESS,
  payload,
});

export const editProfileFailure = (error) => ({
  type: types.EDIT_PROFILE_FAILURE,
  error,
});

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

export const getProfile = (username) => async (dispatch) => {
  dispatch(getProfileStart());
  try {
    if (username) {
      const response = await axiosInstance.get(`/profiles/${username}/`);
      return dispatch(getProfileSuccess(response.data.profile));
    }
    const response = await axiosInstance.get('/user');
    return dispatch(getProfileSuccess(response.data.profile));
  } catch (error) {
    return dispatch(getProfileFailure(error.response.data));
  }
};

export const editProfile = (payload) => async (dispatch) => {
  dispatch(editProfileStart());
  try {
    const response = await axiosInstance.put('/user', payload);
    localStorage.setItem('haven', response.data.profile.token);
    swal({
      text: 'Your Profile has been successfully Edited',
      icon: 'success',
      timer: 3000,
    });
    return dispatch(editProfileSuccess(response.data.profile));
  } catch (error) {
    return dispatch(editProfileFailure(error.response.data));
  }
};

export const getArticles = (authorId) => async (dispatch) => {
  let id;
  dispatch(getArticlesStart());
  try {
    if (authorId) {
      id = authorId;
      const response = await axiosInstance.get(`/articles/?authorId=${id}`);
      return dispatch(getArticlesSuccess(response.data.articles));
    }
    const token = jwtDecode(localStorage.getItem('haven'));
    const response = await axiosInstance.get(`/articles/?authorId=${token.id}`);
    return dispatch(getArticlesSuccess(response.data.articles));
  } catch (error) {
    return dispatch(getArticlesFailure(error.response.data));
  }
};
