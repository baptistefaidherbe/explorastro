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
  getNotification,
  SAVE_NOTIFICATION,
  getConversation,
  saveNotication,
  GET_NOTIFICATION,
  ON_CLICK_READ,
} from 'src/actions/webSocket';
import {
  saveOnlineUser,
  saveUserById,
  resetNotification,
} from 'src/actions/user';
import api from './utils/api';

let socket;

const websocket = (store) => (next) => (action) => {
  switch (action.type) {
    case WS_CONNECT: {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const { id } = user.user;

        socket = window.io('http://localhost:3000', {
          transports: ['websocket'],
        });

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
            store.dispatch(saveNotication(data.username, id));
          }
        });
      }
      break;
    }
    case GET_CONVERSATION: {
      const conversation = async () => {
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
      conversation();
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

          const { onlineREceiver } = action;

          if (!onlineREceiver && message.sender !== message.receiverId) {
            store.dispatch(
              saveNotication(message.username, message.receiverId),
            );
          }
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
          sender: action.sender?.toString(),
          receiver: action.receiver?.toString(),
          receiverName: action.receiverName,
        };
        try {
          const resp = await api.post('/conversation', conversation);
          store.dispatch(getConversation(resp.data.members[0]));
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.response);
        }
      };
      createConversation();
      break;
    }
    case SAVE_NOTIFICATION: {
      const notification = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const id = user?.user?.id;
        const state = store.getState();
        const data = {
          notificationCount: state.user.notificationCount,
          notificationSender: [action.sender],
        };
        const receicerId = action.receicer;
        try {
          await api.patch(`/user/${receicerId}/update/notification`, data);
          store.dispatch(getNotification(id));
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.response);
        }
      };
      notification();
      break;
    }
    case ON_CLICK_READ: {
      const reset = async () => {
        const data = {
          notificationCount: 0,
        };
        const user = JSON.parse(localStorage.getItem('user'));
        const { id } = user.user;
        try {
          await api.patch(`/user/${id}/delete/notification`, data);
          store.dispatch(resetNotification());
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.response);
        }
      };
      reset();
      break;
    }
    case GET_NOTIFICATION: {
      const notification = async () => {
        const { id } = action;
        try {
          const resp = await api.get(`/user/${id}`);
          store.dispatch(saveUserById(resp.data));
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.response);
        }
      };
      notification();
      break;
    }
    default:
      next(action);
  }
};

export default websocket;
