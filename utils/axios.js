import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

export const setAuthToken = (token) => {
  if (!token) {
    delete instance.defaults.headers.common.Authorization;
  }
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
setAuthToken(localStorage.getItem('haven'));

export default instance;
