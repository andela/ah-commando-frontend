/* eslint-disable import/prefer-default-export */
import {
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  POST_COMMENTS_SUCCESS,
  POST_COMMENTS_FAILURE,
} from '@Actions/types';

const initialState = {
  comments: [],
  error: null,
};

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
      };
    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case POST_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
      };
    case POST_COMMENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default: return state;
  }
};
