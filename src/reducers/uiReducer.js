import {
  MODAL_OPEN,
  MODAL_CLOSE,
  LOADING,
  NOT_LOADING,
} from '@Actions/types';

export const uiState = {
  modalOpen: false,
  modal: '',
  loading: false,
};

const uiReducer = (state = uiState, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        ...state,
        modalOpen: true,
        modal: action.payload,
      };
    case MODAL_CLOSE:
      return {
        ...state,
        modalOpen: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case NOT_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default uiReducer;
