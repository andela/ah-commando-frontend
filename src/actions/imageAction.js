import * as types from '@Actions/types';
import { axiosInstance } from '@Utils/';

export const postImageStart = () => ({
  type: types.POST_IMAGE_START,
});

export const postImageSuccess = (payload) => ({
  type: types.POST_IMAGE_SUCCESS,
  payload,
});

export const postImageFailure = (error) => ({
  type: types.POST_IMAGE_FAILURE,
  error,
});

export const postImage = (payload) => async (dispatch) => {
  dispatch(postImageStart());
  try {
    const response = await axiosInstance.post('/image', payload);
    return dispatch(postImageSuccess(response.data.image));
  } catch (error) {
    return dispatch(postImageFailure(error.response.data));
  }
};
