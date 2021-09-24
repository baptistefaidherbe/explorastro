import {
  GET_ALL_EVENTS,
  saveAllEvents,
  ON_SUBMIT_NAME,
  GET_MY_EVENTS,
  saveMyEvents,
  addNewExploration,
} from 'src/actions/exploration';
import api from './utils/api';

const exploration = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_ALL_EVENTS: {
      const getAllEvents = async () => {
        try {
          const resp = await api.get('/exploration');
          store.dispatch(saveAllEvents(resp.data));
        }
        catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      };
      getAllEvents();
      break;
    }
    case GET_MY_EVENTS: {
      const postName = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const { id } = user.user;
        try {
          const resp = await api.get(`/user/${id}`);
          store.dispatch(saveMyEvents(resp.data));
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      };
      postName();
      break;
    }

    case ON_SUBMIT_NAME: {
      const postName = async () => {
        const state = store.getState();
        const user = JSON.parse(localStorage.getItem('user'));
        const { id } = user.user;
        const data = {
          name: state.exploration.name,
          author_id: id,
        };
        try {
          await api.post('/exploration', data);
          store.dispatch(addNewExploration());
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      };
      postName();
      break;
    }

    default:
      next(action);
  }
};

export default exploration;
