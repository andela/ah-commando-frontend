import instance, { setAuthToken } from './axios';

export const axiosInstance = instance;
export const setToken = setAuthToken;
export default (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};
