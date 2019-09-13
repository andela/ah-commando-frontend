import axios from 'axios';

const APP_URL = 'https://a-haven-staging.herokuapp.com/api/v1/';
// const APP_URL = 'http://localhost:5001/api/v1/';

const instance = axios.create({
  baseURL: APP_URL,
});

export const setAuthToken = (token) => {
  if (!token) {
    return delete instance.defaults.headers.common.Authorization;
  }
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
setAuthToken(localStorage.getItem('haven'));

export default instance;
