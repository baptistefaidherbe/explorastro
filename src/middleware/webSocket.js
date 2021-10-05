import {
  WS_CONNECT,
  GET_CONVERSATION,
  saveConversation,
  GET_MESSAGE,
  saveMessage,
  ON_SUBMIT_MESSAGE,
  saveNewMessage,
  CREATE_CONVERSATION,
  saveArrivalMessage,
  getNotication,
} from 'src/actions/webSocket';
import { saveOnlineUser } from 'src/actions/user';
import api from './utils/api';

let socket;

const websocket = (store) => (next) => (action) => {
  switch (action.type) {
    case WS_CONNECT: {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const { id } = user.user;
        const idUser = user.user.id;
        socket = window.io('http://localhost:3000', {
          transports: ['websocket'],
        });
        socket.emit('pseudo', idUser);

        socket.emit('addUser', id);
        socket.on('getUsers', (users) => {
          store.dispatch(saveOnlineUser(users));
        });

        socket.on('getMessage', (data) => {
          store.dispatch(
            saveArrivalMessage({
              username: data.username,
              sender: data.senderId,
              text: data.text,
              createdAt: Date.now(),
            }),
          );

          if (data.senderId !== id) {
            store.dispatch(getNotication(data.username));
          }
        });
      }
      break;
    }
    case GET_CONVERSATION: {
      const getConversation = async () => {
        const idUser = action.payload;

        try {
          const resp = await api.get(`/conversation/${idUser}`);
          store.dispatch(saveConversation(resp.data));
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.response);
        }
      };
      getConversation();
      break;
    }
    case GET_MESSAGE: {
      const getMessage = async () => {
        const conversationId = action.payload;

        try {
          const resp = await api.get(`/message/${conversationId}`);
          store.dispatch(saveMessage(resp.data));
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.response);
        }
      };
      getMessage();
      break;
    }
    case ON_SUBMIT_MESSAGE: {
      const submitMessage = async () => {
        const message = action.payload;

        try {
          const resp = await api.post('/message', message);
          store.dispatch(saveNewMessage(resp.data));
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.response);
        }
      };
      submitMessage();
      break;
    }
    case CREATE_CONVERSATION: {
      const createConversation = async () => {
        const conversation = {
          sender: action.sender.toString(),
          receiver: action.receiver.toString(),
        };
        try {
          const resp = await api.post('/conversation', conversation);
          // store.dispatch(saveNewMessage(resp.data));
          console.log(resp.data);
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.response);
        }
      };
      createConversation();
      break;
    }
    default:
      next(action);
  }
};

export default websocket;
