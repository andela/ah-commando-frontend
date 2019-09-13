import * as types from '@Actions/types';
import { axiosInstance } from '@Utils/';

export const unfollowUserStart = () => ({
  type: types.UNFOLLOW_USER_START,
});

export const unfollowUserSuccess = (payload) => ({
  type: types.UNFOLLOW_USER_SUCCESS,
  payload,
});

export const unfollowUserFailure = (error) => ({
  type: types.UNFOLLOW_USER_FAILURE,
  error,
});


export const unFollowUser = (username) => async (dispatch) => {
  dispatch(unfollowUserStart());
  try {
    const response = await axiosInstance.delete(`/profiles/${username}/follow`);
    return dispatch(unfollowUserSuccess(response.data.profile));
  } catch (error) {
    return dispatch(unfollowUserFailure(error.response.data));
  }
};
