/* istanbul ignore file */
import swal from '@sweetalert/with-react';
import jwtDecode from 'jwt-decode';
import { axiosInstance } from '@Utils/';

export const likeDislikeAResource = (action, id, type) => async dispatch => {
  const token = localStorage.getItem('haven');
  if (!token || !jwtDecode(token)) {
    dispatch({ type: null });
    swal({
      text: `Log in to ${action} this ${type}`,
      icon: 'error',
      buttons: true,
    });
    return false;
  }

  if (action === 'like') {
    const response = await axiosInstance.post(`/likes/${id}`, {
      liked: {
        liked: true,
        type,
      },
    });
    if (response.status !== 200) {
      // dispacth error occured on like
      throw new Error();
    }
    const { likes, dislikes } = response.data[`${type}_Likes`];
    return { likes, dislikes };
  }
  if (action === 'dislike') {
    const response = await axiosInstance.post(`/likes/${id}`, {
      liked: {
        liked: false,
        type,
      },
    });
    if (response.status !== 200) {
      // dispacth error occured on dislike
      throw new Error();
    }
    const { likes, dislikes } = response.data[`${type}_Likes`];
    return { likes, dislikes };
  }
};

export const getLikedAResource = (id, type) => async dispatch => {
  const token = localStorage.getItem('haven');
  if (!token) {
    dispatch({ type: null });
    return 'not_logged_in';
  }
  const response = await axiosInstance.get(`/likes/${id}?type=${type}`);
  if (response.data.status !== 201) return 'not_liked';
  const { data: { likes } } = response.data;
  return likes;
};
