export const WS_CONNECT = 'WS_CONNECT';
export const GET_CONVERSATION = 'GET_CONVERSATION';
export const SAVE_CONVERSATION = 'SAVE_CONVERSATION';
export const GET_MESSAGE = 'GET_MESSAGE';
export const SAVE_MESSAGE = 'SAVE_MESSAGE';
export const ON_CHANGE_MESSAGE = 'ON_CHANGE_MESSAGE';
export const ON_SUBMIT_MESSAGE = 'ON_SUBMIT_MESSAGE';
export const SAVE_NEW_MESSAGE = 'SAVE_NEW_MESSAGE';

export const wsConnect = () => ({
  type: WS_CONNECT,
});
export const getConversation = (payload) => ({
  type: GET_CONVERSATION,
  payload,
});
export const saveConversation = (payload) => ({
  type: SAVE_CONVERSATION,
  payload,
});
export const getMessage = (payload) => ({
  type: GET_MESSAGE,
  payload,
});
export const saveMessage = (payload) => ({
  type: SAVE_MESSAGE,
  payload,
});
export const onChangeMessage = (payload) => ({
  type: ON_CHANGE_MESSAGE,
  payload,
});
export const onSubmitMessage = (payload) => ({
  type: ON_SUBMIT_MESSAGE,
  payload,
});
export const saveNewMessage = (payload) => ({
  type: SAVE_NEW_MESSAGE,
  payload,
});
