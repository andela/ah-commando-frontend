import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://a-haven-staging.herokuapp.com/api/v1',
});

export const setAuthToken = (token) => {
  if (!token) {
    delete instance.defaults.headers.common.Authorization;
  }
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default instance;
