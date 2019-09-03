import * as types from '../actions/types/index';

const initialState = {
  article: null,
  error: null,
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ARTICLE_START:
      return {
        ...state,
      };
    case types.GET_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload,
      };
    case types.GET_ARTICLE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default articleReducer;
