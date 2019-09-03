import { combineReducers } from 'redux';
import initialReducer from './initialReducer';
import { authReducer } from './authReducer';
import uiReducer from './uiReducer';
import profileReducer from './profileReducer';
import imageReducer from './imageReducer';
import searchReducer from './searchReducer';

const reducers = combineReducers({
  initialReducer,
  ui: uiReducer,
  auth: authReducer,
  profile: profileReducer,
  image: imageReducer,
  filters: searchReducer,
});

export default reducers;
