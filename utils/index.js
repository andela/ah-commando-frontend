import checkPropTypes from 'check-prop-types';
import instance, { setAuthToken } from './axios';
import Validator from './Validator';
import empty from './isEmpty';
import Editor from './editor';
import jsonToHtml from './editorConverter';
import { createMockStore } from './mockStore';
import { activateLike, activateDislikes } from './likesFunc';

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
export const makeMockStore = createMockStore;

export const editor = Editor;

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
    return `${thousands}K`;
  }
  thousands = Math.round(number / 1000000);
  return `${thousands}M`;
};

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const formatDate = (thedate) => {
  const date = new Date(thedate);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return {
    day, month, year, hours, minutes,
  };
};

export const convertToHtml = jsonToHtml;

export const activateLikeAction = activateLike;
export const activateDislikeAction = activateDislikes;
