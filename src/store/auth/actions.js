import * as actionTypes from "./actionTypes";

export const isAuth = (data) => ({
  type: actionTypes.TOKEN,
  payload: data,
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const setTheme = (data) => ({
  type: actionTypes.THEME,
  payload: data,
});
