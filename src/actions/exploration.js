export const GET_ALL_EVENTS = 'GET_ALL_EVENTS';
export const SAVE_ALL_EVENTS = 'SAVE_ALL_EVENTS';

export const getAllEvents = () => ({
  type: GET_ALL_EVENTS,
});
export const saveAllEvents = (payload) => ({
  type: SAVE_ALL_EVENTS,
  payload,
});
