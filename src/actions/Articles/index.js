import axois from 'axios';

const APP_URL = 'https://a-haven-staging.herokuapp.com';
// const APP_URL = 'http://localhost:5001';

export const getHomePageArticles = () => async dispatch => {
  try {
    const response = await axois.get(
      `${APP_URL}/api/v1/articles/categories/article`,
    );
    dispatch({
      type: 'GET_HOME_ARTICLES_FROM_DATABASE',
      payload: response.data,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    // console.log(err);
  }
};

export const getArticle = () => async dispatch => {
  try {
    const response = await axois.get(
      `${APP_URL}/api/v1/articles/categories/article/featured`,
    );
    dispatch({
      type: 'GET_FEATURED',
      payload: response.data,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    // console.log(err);
  }
};

export const getEditorsChoice = () => async dispatch => {
  try {
    const response = await axois.get(
      `${APP_URL}/api/v1/articles?limit=5`,
    );
    dispatch({
      type: 'GET_EDITORS_CHOICE',
      payload: response.data,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    // console.log(err);
  }
};
