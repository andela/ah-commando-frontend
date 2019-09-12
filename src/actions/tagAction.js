import { GET_ARTICLES_WITH_TAG } from '@Actions/types';
import swal from '@sweetalert/with-react';
import { axiosInstance } from '@Utils/';


export const getArticlesWithTag = (payload, tag) => ({
  type: GET_ARTICLES_WITH_TAG,
  payload,
  tag,
});

export const getArticlesWithTagFromDb = (tag, history) => async dispatch => {
  try {
    const response = await axiosInstance.post('/articles/tag/get-article', { tag: { articleTag: tag } });
    // console.log('response', response.data.articles);

    if (response.status === 200) {
      dispatch(getArticlesWithTag(response.data.articles, tag));
      history.push('/tags');
    }
  } catch (err) {
    swal({
      text: err.response.data.error,
      icon: 'error',
      buttons: false,
      timer: 4000,
    });
  }
};
