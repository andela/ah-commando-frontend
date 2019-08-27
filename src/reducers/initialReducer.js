import { IS_REDUCING, HAS_REDUCED } from '../actions/types/initialTypes';

const initialState = {
  isReducing: false,
};

const initialReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_REDUCING:
      return {
        ...state,
        isReducing: true,
      };
    case HAS_REDUCED:
      return {
        ...state,
        isReducing: false,
      };
    default:
      return state;
  }
};

export default initialReducer;
