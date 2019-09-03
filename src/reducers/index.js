import { combineReducers } from 'redux';
import initialReducer from './initialReducer';
import { authReducer } from './authReducer';
import uiReducer from './uiReducer';

const reducers = combineReducers({
  initialReducer,
  ui: uiReducer,
  auth: authReducer,
});
export default reducers;
