import { GET_ALL_EVENTS, saveAllEvents } from 'src/actions/exploration';
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

    default:
      next(action);
  }
};

export default exploration;
