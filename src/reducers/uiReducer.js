import { MODAL_OPEN, MODAL_CLOSE } from '@Actions/types';

const uiState = {
  modalOpen: true,
  modal: 'signin',
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
    default:
      return state;
  }
};

export default uiReducer;
