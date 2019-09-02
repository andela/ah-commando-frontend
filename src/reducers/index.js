import { combineReducers } from 'redux';
import initialReducer from './initialReducer';
import uiReducer from './uiReducer';
import { authReducer } from './authReducer';

const reducers = combineReducers({
  initialReducer,
  ui: uiReducer,
  auth: authReducer,
});
export default reducers;
