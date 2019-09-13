/* eslint-disable import/prefer-default-export */
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';


const mockStore = configureStore([thunk]);
export const createMockStore = (state = {}) => mockStore({
  ...state,
});
