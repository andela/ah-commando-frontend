import {
  SET_CURRENT_USER,
} from '@Actions/types';
import { isEmpty } from '@Utils/';

export const initialState = {
  isAuthenticated: false,
  user: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
};
