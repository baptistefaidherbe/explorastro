import {
  WS_CONNECT,
  GET_CONVERSATION,
  saveConversation,
  GET_MESSAGE,
  saveMessage,
  ON_SUBMIT_MESSAGE,
  saveNewMessage,
} from 'src/actions/webSocket';
import api from './utils/api';

let socket;

const websocket = (store) => (next) => (action) => {
  switch (action.type) {
    case WS_CONNECT: {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const idUser = user.user.id;
        socket = window.io('http://localhost:3000', {
          transports: ['websocket'],
        });
        socket.emit('pseudo', idUser);

        socket.on('newUser', (message) => {
          console.log(message);
        });

        socket.on('quitUser', (message) => {
          console.log(message);
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
    default:
      next(action);
  }
};

export default websocket;
