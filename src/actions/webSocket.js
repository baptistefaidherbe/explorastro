export const WS_CONNECT = 'WS_CONNECT';
export const GET_CONVERSATION = 'GET_CONVERSATION';
export const SAVE_CONVERSATION = 'SAVE_CONVERSATION';
export const GET_MESSAGE = 'GET_MESSAGE';
export const SAVE_MESSAGE = 'SAVE_MESSAGE';
export const ON_CHANGE_MESSAGE = 'ON_CHANGE_MESSAGE';
export const ON_SUBMIT_MESSAGE = 'ON_SUBMIT_MESSAGE';
export const SAVE_NEW_MESSAGE = 'SAVE_NEW_MESSAGE';
export const SAVE_ARRIVAL_MESSAGE = 'SAVE_ARRIVAL_MESSAGE';
export const CREATE_CONVERSATION = 'CREATE_CONVERSATION';
export const TOGGLE_FRIEND = 'TOGGLE_FRIEND';
export const GET_NOTIFICATION = 'GET_NOTIFICATION';
export const ON_CLICK_NOTIF = 'ON_CLICK_NOTIF';
export const ON_CLICK_READ = 'ON_CLICK_READ';
export const ON_CHANGE_FRIEND = 'ON_CHANGE_FRIEND';

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
export const saveArrivalMessage = (payload) => ({
  type: SAVE_NEW_MESSAGE,
  payload,
});
export const createConversation = (sender, receiver, receiverName) => ({
  type: CREATE_CONVERSATION,
  sender,
  receiver,
  receiverName,
});
export const toggleFriend = () => ({
  type: TOGGLE_FRIEND,
});
export const getNotication = (payload) => ({
  type: GET_NOTIFICATION,
  payload,
});
export const onClickNotif = () => ({
  type: ON_CLICK_NOTIF,
});
export const onClickRead = () => ({
  type: ON_CLICK_READ,
});
export const onchangeFriend = (payload) => ({
  type: ON_CHANGE_FRIEND,
  payload,
});
