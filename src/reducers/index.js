import { combineReducers } from 'redux';
import initialReducer from './initialReducer';
import uiReducer from './uiReducer';

const reducers = combineReducers({
  initialReducer,
  ui: uiReducer,
});
export default reducers;
