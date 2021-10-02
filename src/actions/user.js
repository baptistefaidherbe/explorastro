export const CHANGE_VALUE = 'CHANGE_VALUE';
export const LOGIN = 'LOGIN';
export const SAVE_USER = 'SAVE_USER';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const CHECK_USER_LOGGED = 'CHECK_USER_LOGGED';
export const LOGOUT = 'LOGOUT';
export const GET_USER = 'GET_USER';

export const changeValue = (value, key) => ({
  type: CHANGE_VALUE,
  value,
  key,
});
export const login = () => ({
  type: LOGIN,
});
export const saveUser = (payload) => ({
  type: SAVE_USER,
  payload,
});
export const loginError = (payload) => ({
  type: LOGIN_ERROR,
  payload,
});
export const checkUserLogged = (payload) => ({
  type: CHECK_USER_LOGGED,
  payload,
});
export const logout = () => ({
  type: LOGOUT,
});
export const getUser = (payload) => ({
  type: GET_USER,
  payload,
});
