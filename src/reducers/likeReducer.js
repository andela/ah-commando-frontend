import * as types from '@Actions/types';

const initialState = {
  likeAction: null,
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIKE:
      return {
        ...state,
        likeAction: state.likeAction === 'like' ? 'dislike' : 'like',
      };
    case types.DISLIKE:
      return {
        ...state,
        likeAction: state.likeAction === 'dislike' ? 'like' : 'dislike',
      };
    case types.CANNOT_LIKE:
      return {
        ...state,
        likeAction: null,
      };
    default:
      return state;
  }
};
export default likeReducer;
