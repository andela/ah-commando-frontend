import checkPropTypes from 'check-prop-types';
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

export const findByTestAttribute = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const checkProps = (component, propTypes, expectedProps) => {
  const propsErr = checkPropTypes(
    propTypes,
    expectedProps,
    'props',
    component.name,
  );
  return propsErr;
};

export const thousandths = (number) => {
  let thousands;
  if (number < 1000) { return number; }
  if (number > 1000 && number < 1000000) {
    thousands = Math.round(number / 1000);
    return `${thousands}k`;
  }
  thousands = Math.round(number / 1000000);
  return `${thousands}M`;
};
