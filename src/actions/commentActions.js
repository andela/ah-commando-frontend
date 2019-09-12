/* eslint-disable import/prefer-default-export */
import {
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  POST_COMMENTS_SUCCESS,
  POST_COMMENTS_FAILURE,
  LOADING,
} from '@Actions/types';
import { axiosInstance } from '@Utils/';

export const getComment = (articleId) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const response = await axiosInstance.get(`comment/${articleId}`);
    dispatch({
      type: GET_COMMENTS_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_COMMENTS_FAILURE,
      payload: err.response.data,
    });
  }
};

export const postComment = (newComment, articleId) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const response = await axiosInstance.post(`comment/${articleId}`, { comment: newComment });
    dispatch({
      type: POST_COMMENTS_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch({
      type: POST_COMMENTS_FAILURE,
      payload: err.response.data,
    });
  }
};
