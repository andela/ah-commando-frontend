import { combineReducers } from 'redux';
import initialReducer from './initialReducer';
import { authReducer } from './authReducer';
import uiReducer from './uiReducer';
import profileReducer from './profileReducer';
import articleReducer from './articleReducer';

const reducers = combineReducers({
  initialReducer,
  ui: uiReducer,
  auth: authReducer,
  profile: profileReducer,
  article: articleReducer,
});

export default reducers;
