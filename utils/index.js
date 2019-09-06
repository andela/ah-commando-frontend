import instance, { setAuthToken } from './axios';
import Validator from './Validator';
import empty from './isEmpty';

export const axiosInstance = instance;
export const setToken = setAuthToken;
export const {
  validate,
  emailSchema,
  passwordSchema,
  usernameSchema,
  firstnameSchema,
  lastnameSchema,
  bioSchema,
} = Validator;
export const isEmpty = empty;
export default (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};
