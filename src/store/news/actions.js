import * as actionTypes from "./actionTypes";

export const addBookmark = (data) => ({
  type: actionTypes.BOOKMARK,
  payload: data,
});

export const clearData = () => ({
  type: actionTypes.CLEAR,
});

export const setAllNews = (data) => ({
  type: actionTypes.ALLNEWS,
  payload: data,
});
