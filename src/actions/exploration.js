export const GET_ALL_EVENTS = 'GET_ALL_EVENTS';
export const SAVE_ALL_EVENTS = 'SAVE_ALL_EVENTS';
export const ON_CLICK_MODAL = 'ON_CLICK_MODAL';
export const ONCLICK_CLOSED_MODAL = 'ONCLICK_CLOSED_MODAL';
export const ON_CHANGE_AREA = 'ON_CHANGE_AREA';
export const USER_GEOLOC = 'USER_GEOLOC';
export const ON_SUBMIT_SEARCH_NAME = 'ON_SUBMIT_SEARCH_NAME';
export const ON_SUBMIT_DEPARTEMENT = 'ON_SUBMIT_DEPARTEMENT';
export const ON_SUBMIT_SEARCH_AUTHOR = 'ON_SUBMIT_SEARCH_AUTHOR';
export const ON_SUBMIT_NAME = 'ON_SUBMIT_NAME';
export const ON_CHANGE_NAME = 'ON_CHANGE_NAME';
export const GET_MY_EVENTS = 'GET_MY_EVENTS';
export const SAVE_MY_EVENTS = 'SAVE_MY_EVENTS';
export const ADD_NEW_EXPLORATION = 'ADD_NEW_EXPLORATION';

export const getAllEvents = () => ({
  type: GET_ALL_EVENTS,
});
export const saveAllEvents = (payload) => ({
  type: SAVE_ALL_EVENTS,
  payload,
});
export const onClickModal = () => ({
  type: ON_CLICK_MODAL,
});
export const onClickClosedModal = () => ({
  type: ONCLICK_CLOSED_MODAL,
});
export const onChangeArea = (payload) => ({
  type: ON_CHANGE_AREA,
  payload,
});
export const userGeoloc = (payload) => ({
  type: USER_GEOLOC,
  payload,
});
export const onSubmitSearchName = (payload, key) => ({
  type: ON_SUBMIT_SEARCH_NAME,
  key,
  payload,
});
export const onSubmitDepartement = (payload, key) => ({
  type: ON_SUBMIT_DEPARTEMENT,
  key,
  payload,
});
export const onSubmitSearchAuthor = (payload, key) => ({
  type: ON_SUBMIT_SEARCH_AUTHOR,
  key,
  payload,
});
export const onSubmitName = (payload) => ({
  type: ON_SUBMIT_NAME,
  payload,
});
export const onChangeName = (payload) => ({
  type: ON_CHANGE_NAME,
  payload,
});
export const getMyEvents = () => ({
  type: GET_MY_EVENTS,
});
export const saveMyEvents = (payload) => ({
  type: SAVE_MY_EVENTS,
  payload,
});
export const addNewExploration = (payload) => ({
  type: GET_MY_EVENTS,
  payload,
});
