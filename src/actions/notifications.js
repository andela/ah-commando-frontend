/* eslint-disable import/prefer-default-export */
import * as types from './types';
import { axiosInstance } from '@Utils/';


export const getNotifications = () => async dispatch => {
  try {
    const response = await axiosInstance.get('notifications/');
    dispatch({
      type: types.FETCH_NOTIFICATIONS,
      payload: response.data.notifications,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    // console.log(err);
  }
};

export const markAsRead = (id) => async dispatch => {
  try {
    const response = await axiosInstance.patch(`notifications/${id}/read`);
    dispatch({
      type: types.UPDATE_NOTIFICATIONS,
      payload: response.data,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    // console.log(err);
  }
};

export const markAllRead = () => async dispatch => {
  try {
    const response = await axiosInstance.patch('notifications/read');
    dispatch({
      type: types.MARK_READ,
      payload: response.data,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    // console.log(err);
  }
};

export const updateSubscription = (type) => async dispatch => {
  try {
    const response = (type) ? await axiosInstance.patch('notifications/email/subscribe')
      : await axiosInstance.delete('notifications/email/subscribe');
    dispatch({
      type: types.UPDATE_SUB,
      payload: response.data,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    // console.log(err);
  }
};
