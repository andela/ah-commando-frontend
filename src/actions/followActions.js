// import jwtDecode from 'jwt-decode';
// import swal from 'sweetalert';

import * as types from '@Actions/types';
import { axiosInstance } from '@Utils/';

export const followUserStart = () => ({
  type: types.FOLLOW_USER_START,
});

export const followUserSuccess = (payload) => ({
  type: types.FOLLOW_USER_SUCCESS,
  payload,
});

export const followUserFailure = (error) => ({
  type: types.FOLLOW_USER_FAILURE,
  error,
});


export const followUser = () => async (dispatch) => {
  dispatch(followUserStart());
  try {
    const response = await axiosInstance.post('/profiles/nonso/follow');
    // const response = await axiosInstance.get('/user');
    return dispatch(followUserSuccess(response.data.profile));
  } catch (error) {
    return dispatch(followUserFailure(error.response.data));
  }
};
