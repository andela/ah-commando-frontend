import { combineReducers } from 'redux';
import initialReducer from './initialReducer';
import { authReducer } from './authReducer';
import uiReducer from './uiReducer';
import profileReducer from './profileReducer';
// import articleReducer from './articleReducer';
import imageReducer from './imageReducer';

const reducers = combineReducers({
  initialReducer,
  ui: uiReducer,
  auth: authReducer,
  profile: profileReducer,
  image: imageReducer,
});

export default reducers;
