import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import uiReducer from './uiReducer';
import profileReducer from './profileReducer';
import imageReducer from './imageReducer';
import homePageArticles from './HomePage';

const reducers = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  profile: profileReducer,
  image: imageReducer,
  homePageArticles,
});

export default reducers;
