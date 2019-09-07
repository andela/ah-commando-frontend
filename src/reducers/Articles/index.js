import {
  READ_ARTICLE,
} from '@Actions/types';

export const initialState = {

};

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_ARTICLE:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
