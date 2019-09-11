import * as types from '@Actions/types';

const initialState = {
  isFollowing: false,
  error: null,
};

const followReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FOLLOW_USER_START:
      return {
        ...state,
        isFollowing: false,
      };
    case types.FOLLOW_USER_SUCCESS:
      return {
        ...state,
        isFollowing: true,
      };
    case types.FOLLOW_USER_FAILURE:
      return {
        ...state,
        isFollowing: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default followReducer;
