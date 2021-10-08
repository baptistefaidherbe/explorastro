export const CHANGE_VALUE = "CHANGE_VALUE";
export const LOGIN = "LOGIN";
export const SAVE_USER = "SAVE_USER";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const CHECK_USER_LOGGED = "CHECK_USER_LOGGED";
export const LOGOUT = "LOGOUT";
export const GET_USER = "GET_USER";
export const GET_ALL_USER = "GET_ALL_USER";
export const SAVE_ALL_USER = "SAVE_ALL_USER";
export const SAVE_ONLINE_USER = 'SAVE_ONLINE_USER';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const SAVE_USER_BY_ID = 'SAVE_USER_BY_ID';
export const RESET_NOTIFICATION = 'RESET_NOTIFICATION';

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
export const getUser = () => ({
  type: GET_USER,
});
export const getAllUser = () => ({
  type: GET_ALL_USER,
});
export const saveAllUser = (payload) => ({
  type: SAVE_ALL_USER,
  payload,
});
export const saveOnlineUser = (payload) => ({
  type: SAVE_ONLINE_USER,
  payload,
});
export const getUserById = (payload) => ({
  type: GET_USER_BY_ID,
  payload,
});
export const saveUserById = (payload) => ({
  type: SAVE_USER_BY_ID,
  payload,
});
export const resetNotification = () => ({
  type: RESET_NOTIFICATION,
});
