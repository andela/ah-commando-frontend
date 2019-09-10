import * as types from '@Actions/types';
import { axiosInstance } from '@Utils/';
// import { updateSearchQuery } from './searchActions';

export const updateArticles = (payload) => ({
  type: types.UPDATE_CATEGORY_ARTICLES,
  payload,
});

export const updateCategory = (payload) => ({
  type: types.UPDATE_CATEGORY,
  payload,
});

export const updateMenuItem = (payload) => ({
  type: types.UPDATE_MENU_ITEM,
  payload,
});

export const getCategoryArticles = (category) => async (dispatch) => {
  const response = await axiosInstance.get(`/articles/categories/article?category=${category.toLowerCase()}`);
  const { data: { Categories } } = response;
  const { Articles } = Categories[0];
  dispatch(updateArticles({ category, Articles }));
};
