import * as types from '@Actions/types';

const initialState = {
  image: '',
  loading: false,
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.POST_IMAGE_START:
      return {
        ...state,
        loading: true,
      };
    case types.POST_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        image: action.payload,
      };
    case types.POST_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default imageReducer;
