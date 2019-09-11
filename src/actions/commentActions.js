/* eslint-disable import/prefer-default-export */
import {
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  POST_COMMENTS_SUCCESS,
  POST_COMMENTS_FAILURE,
  LOADING,
} from '@Actions/types';
import { axiosInstance } from '@Utils/';

export const getComments = (postId) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const response = await axiosInstance.get(`comment/${postId}`);
    dispatch({
      type: GET_COMMENTS_SUCCESS,
      payload: response.data.payload,
    });
  } catch (err) {
    dispatch({
      type: GET_COMMENTS_FAILURE,
      payload: err.response.data,
    });
  }
};

export const postComment = (newComment, postId) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const response = await axiosInstance.post(`comment/${postId}`, newComment);
    dispatch({
      type: POST_COMMENTS_SUCCESS,
      payload: response.data.payload,
    });
  } catch (err) {
    dispatch({
      type: POST_COMMENTS_FAILURE,
      payload: err.data.data,
    });
  }
};
