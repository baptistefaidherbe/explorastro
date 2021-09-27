import {
  GET_ALL_EVENTS,
  saveAllEvents,
  ON_SUBMIT_NAME,
  GET_MY_EVENTS,
  saveMyEvents,
  addNewExploration,
  ON_DELETE_EVENT,
  GET_EVENT_DATA,
  saveEventToModify,
  ON_SUBMIT_EVENT,
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
      const getMyEvents = async () => {
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
      getMyEvents();
      break;
    }

    case ON_SUBMIT_NAME: {
      const submitName = async () => {
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
      submitName();
      break;
    }
    case ON_DELETE_EVENT: {
      const deleteEvent = async () => {
        const id = action.payload;
        try {
          await api.delete(`/exploration/${id}`);
          store.dispatch(addNewExploration());
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      };
      deleteEvent();
      break;
    }

    case GET_EVENT_DATA: {
      const getOneEvent = async () => {
        const id = action.payload;
        try {
          const resp = await api.get(`/exploration/${id}`);
          store.dispatch(saveEventToModify(resp.data));
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      };
      getOneEvent();
      break;
    }

    case ON_SUBMIT_EVENT: {
      const submitEvent = async () => {
        const state = store.getState();
        const id = action.payload;

        const data = {
          name: state.exploration.eventToModify.name,
          description: state.exploration.eventToModify.description,
          geog: state.exploration.eventToModify.geog,
          date: state.exploration.eventToModify.date,
          max_participants: state.exploration.eventToModify.max_participants,
          is_published: state.exploration.eventToModify.is_published,
          departement: state.exploration.eventToModify.departement,
        };
        try {
          await api.patch(`/exploration/${id}`, data);
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      };
      submitEvent();
      break;
    }

    default:
      next(action);
  }
};

export default exploration;
