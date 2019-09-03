import * as types from '../actions/types/index';

const initialState = {
  image: '',
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.POST_IMAGE_START:
      return {
        ...state,
      };
    case types.POST_IMAGE_SUCCESS:
      return {
        ...state,
        image: action.payload,
      };
    case types.POST_IMAGE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default imageReducer;
