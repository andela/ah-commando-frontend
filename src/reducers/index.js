import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import uiReducer from './uiReducer';
import profileReducer from './profileReducer';
import imageReducer from './imageReducer';
import homePageArticles from './HomePage';
import searchReducer from './searchReducer';
import notifications from './notifications';
import { articleReducer } from './Articles';

const reducers = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  profile: profileReducer,
  image: imageReducer,
  homePageArticles,
  filters: searchReducer,
  article: articleReducer,
  notifications,
});

export default reducers;
