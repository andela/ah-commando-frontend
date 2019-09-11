import * as types from '@Actions/types';

const initialState = {
  isFollowing: false,
  error: null,
};

const unfollowReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UNFOLLOW_USER_START:
      return {
        ...state,
        isFollowing: false,
      };
    case types.UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        isFollowing: true,
      };
    case types.UNFOLLOW_USER_FAILURE:
      return {
        ...state,
        isFollowing: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default unfollowReducer;
