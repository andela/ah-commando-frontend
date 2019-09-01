import instance, { setAuthToken } from './axios';
import Validator from './Validator';

export const axiosInstance = instance;
export const setToken = setAuthToken;
export const {
  validate,
  emailSchema,
  passwordSchema,
} = Validator;
export default (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};
