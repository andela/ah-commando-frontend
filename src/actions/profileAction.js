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

export const getProfile = () => async (dispatch) => {
  dispatch(getProfileStart());
  try {
    const token = jwtDecode(localStorage.getItem('haven'));
    const response = await axiosInstance.get(`/profiles/${token.username}`);
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
      title: 'Edit User Profile',
      text: 'Your Profile has been edited successfully',
      icon: 'success',
    });
    return dispatch(editProfileSuccess(response.data.profile));
  } catch (error) {
    return dispatch(editProfileFailure(error.response.data));
  }
};

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
