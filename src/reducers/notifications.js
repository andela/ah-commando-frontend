import * as types from '@Actions/types';

const initialState = {
  notifications: [],
};

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    default:
      return state;
  }
};

export default notifications;
