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
export const saveArrivalMessage = (payload) => {
  console.log('o', payload); return ({
    type: SAVE_NEW_MESSAGE,
    payload,
  });
};
export const createConversation = (sender, receiver) => ({
  type: CREATE_CONVERSATION,
  sender,
  receiver,
});
// export const saveArrivalMessage = (payload) => {
//   console.log('meesage', payload);
//   return {
//     type: SAVE_ARRIVAL_MESSAGE,
//     message: payload,
//   };
// };
