export const GET_ALL_EVENTS = 'GET_ALL_EVENTS';
export const SAVE_ALL_EVENTS = 'SAVE_ALL_EVENTS';
export const ON_CLICK_MODAL = 'ON_CLICK_MODAL';
export const ONCLICK_CLOSED_MODAL = 'ONCLICK_CLOSED_MODAL';
export const ON_CHANGE_AREA = 'ON_CHANGE_AREA';

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
