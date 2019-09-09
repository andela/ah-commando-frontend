import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import swal from '@sweetalert/with-react';
import {
  SET_CURRENT_USER,
  MODAL_CLOSE,
  LOADING,
  NOT_LOADING,
} from '@Actions/types';
import { axiosInstance, setToken } from '@Utils/';

export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});

export const logIn = (userData, history) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const response = await axiosInstance.post('users/login', { user: { ...userData } });
    if (response.status === 200) {
      const { user } = response.data;
      localStorage.setItem('haven', user.token);
      setToken(user.token);
      dispatch(setCurrentUser(jwtDecode(user.token)));
      history.push('/');
      toast.dismiss();
      toast.success('Login Successful');
    }
    dispatch({
      type: NOT_LOADING,
    });
    return dispatch({
      type: MODAL_CLOSE,
    });
  } catch (err) {
    const { error } = err.response.data;
    toast.dismiss();
    toast.error(error, { autoClose: 10000 });
    return dispatch({
      type: NOT_LOADING,
    });
  }
};

export const createUser = (userData, history) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const response = await axiosInstance.post('users', { user: { ...userData } });
    if (response.status === 201) {
      const { user } = response.data;
      localStorage.setItem('haven', user.token);
      setToken(user.token);
      dispatch(setCurrentUser(jwtDecode(user.token)));
      swal({
        text: 'Registration Successful!',
        icon: 'success',
        buttons: false,
        timer: 3000,
      });
      history.push('/');
    }
    dispatch({
      type: NOT_LOADING,
    });
    return dispatch({
      type: MODAL_CLOSE,
    });
  } catch (err) {
    const { error } = err.response.data;
    swal({
      text: error,
      icon: 'error',
      buttons: false,
      timer: 3000,
    });
    return dispatch({
      type: NOT_LOADING,
    });
  }
};

export const requestPasswordLink = (email) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });

  try {
    const response = await axiosInstance.post('users/passwordReset', { user: { email } });
    if (response.data.status === 200) {
      swal({
        title: 'Done!',
        text: 'Check your mail for password reset link',
        icon: 'success',
        button: {
          className: 'sweet-alert-btn',
        },
      });
    }
    dispatch({
      type: NOT_LOADING,
    });
    return dispatch({
      type: MODAL_CLOSE,
    });
  } catch (err) {
    const { error } = err.response.data;
    swal({
      text: error,
      icon: 'error',
      button: {
        className: 'sweet-alert-btn',
      },
    });
    return dispatch({
      type: NOT_LOADING,
    });
  }
};

export const setNewPassword = (data, history) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });

  try {
    const { password, id, token } = data;

    const response = await axiosInstance.put(`users/resetPassword/${id}/${token}`, { user: { password } });

    if (response.status === 200) {
      history.push('/');
      swal({
        title: 'Done!',
        text: 'Password reset successfully',
        icon: 'success',
        button: {
          className: 'sweet-alert-btn',
        },
      });
    }
    dispatch({ type: NOT_LOADING });
  } catch (err) {
    const { error } = err.response.data;
    swal({
      text: error,
      icon: 'error',
      button: {
        className: 'sweet-alert-btn',
      },
    });
  }
};
export const loginViaSocial = (brand) => async dispatch => {
  dispatch({ type: null });
  window.location = `https://a-haven-staging.herokuapp.com/api/v1/users/${brand}`;
};
