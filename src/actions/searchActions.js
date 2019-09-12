import axios from 'axios';
import {
  UPDATE_FILTER, DISPLAY_FILTER, REMOVE_FILTER, UPDATE_ARTICLES,
  UPDATE_SEARCHQUERY, UPDATE_PAGENUMBER,
} from '@Actions/types';

export const updateFilters = (payload) => ({
  type: UPDATE_FILTER,
  payload,
});

export const displayFilters = (payload) => ({
  type: DISPLAY_FILTER,
  payload,
});

export const removeFilters = (payload) => ({
  type: REMOVE_FILTER,
  payload,
});

export const updateArticles = (payload) => ({
  type: UPDATE_ARTICLES,
  payload,
});

export const updateSearchQuery = (payload) => ({
  type: UPDATE_SEARCHQUERY,
  payload,
});

export const updatePageNumber = (payload) => ({
  type: UPDATE_PAGENUMBER,
  payload,
});

export const getFilteredArticles = () => (dispatch, getState) => {
  const { filters } = getState();
  const { searchQuery } = filters;
  const filterBody = filters.updateFields;
  const keys = Object.keys(filterBody);
  const object = {};
  keys.forEach((key) => {
    if (filterBody[`${key}`].length) {
      if (key === 'authors') {
        object.authorNames = filterBody[`${key}`].join().toLowerCase();
      } else {
        object[`${key}`] = filterBody[`${key}`].join().toLowerCase();
      }
    }
  });

  return axios.post(`http://a-haven-staging.herokuapp.com/api/v1/articles/search/filter?searchQuery=${searchQuery}&limit=2000`, object)
    .then((response) => {
      const { articles } = response.data;
      const { data } = articles;
      dispatch(updateArticles(data));
    })
    .catch(() => {
      dispatch(updateArticles(['No result found']));
    });
};
