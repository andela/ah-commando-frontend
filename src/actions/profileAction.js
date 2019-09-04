import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import * as types from './types/index';
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
    toast.dismiss();
    toast.success('Profile Edited successfully');
    return dispatch(editProfileSuccess(response.data.profile));
  } catch (error) {
    return dispatch(editProfileFailure(error.response.data));
  }
};
