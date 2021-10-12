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
  UPLOAD_EXPLORATION_ILLUSTRATION,
  callEventData,
  ON_SUBMIT_COMMENT,
  ON_CLICK_DELETE_COMMENT,
  resetInputComment,
  ON_CLICK_PARTICIPATE,
  ON_CLICK_NOT_PARTICIPATE,
  GET_WEATHER,
  saveWeather,
  GET_MY_EVENTS_PARTICIPATE_ORGANISE,
  saveMyEventsParticipateOrganise,
} from 'src/actions/exploration';
import axios from 'axios';
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

    case GET_MY_EVENTS_PARTICIPATE_ORGANISE: {
      const getMyEvents = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const { id } = user.user;
        try {
          const resp = await api.get(`/user/${id}`);
          store.dispatch(
            saveMyEventsParticipateOrganise(resp.data),
          );
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
    case UPLOAD_EXPLORATION_ILLUSTRATION: {
      const formData = new FormData();
      formData.append('image', action.payload, action.payload.name);
      const handleUploadIllustration = async () => {
        try {
          await api.post(`/exploration/${action.id}/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          store.dispatch(callEventData(action.id));
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.response);
        }
      };
      handleUploadIllustration();
      break;
    }
    case ON_SUBMIT_COMMENT: {
      const submitComment = async () => {
        const state = store.getState();
        const user = JSON.parse(localStorage.getItem('user'));
        const authorId = user.user.id;
        const id = action.payload;

        const data = {
          content: state.exploration.eventToModify.sendComment,
          author_id: authorId,
        };
        try {
          await api.post(`/exploration/${id}/comment`, data);
          store.dispatch(callEventData(id));
          store.dispatch(resetInputComment());
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.response);
        }
      };
      submitComment();
      break;
    }
    case ON_CLICK_DELETE_COMMENT: {
      const deleteComment = async () => {
        const { id, idEvent } = action;

        try {
          await api.delete(`/comment/${id}`);
          store.dispatch(callEventData(idEvent));
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.response);
        }
      };
      deleteComment();
      break;
    }
    case ON_CLICK_PARTICIPATE: {
      const participate = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const authorId = user.user.id;
        const { id } = action;
        const data = {
          user_id: authorId,
        };
        try {
          await api.post(`/participate/${id}`, data);
          store.dispatch(callEventData(id));
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.response);
        }
      };
      participate();
      break;
    }
    case ON_CLICK_NOT_PARTICIPATE: {
      const notParticipate = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const authorId = user.user.id;
        const { id } = action;
        try {
          await api.delete(`/participate/${id}`, {
            data: { user_id: authorId },
          });
          store.dispatch(callEventData(id));
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.response);
        }
      };
      notParticipate();
      break;
    }
    case GET_WEATHER: {
      const getWeather = async () => {
        const { payload } = action;

        if (payload) {
          try {
            const resp = await axios(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${payload[0]}&lon=${payload[1]}&units=metric&appid=761235a6e9c3bc9d94fe0e7d170588ad`,
            );
            store.dispatch(saveWeather(resp.data.current));
          }
          catch (error) {
            // eslint-disable-next-line no-console
            console.error(error.response);
          }
        }
      };
      getWeather();
      break;
    }

    default:
      next(action);
  }
};

export default exploration;
