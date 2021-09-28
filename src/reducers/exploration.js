import {
  SAVE_ALL_EVENTS,
  ON_CLICK_MODAL,
  ONCLICK_CLOSED_MODAL,
  ON_CHANGE_AREA,
  USER_GEOLOC,
  ON_SUBMIT_SEARCH_NAME,
  ON_SUBMIT_DEPARTEMENT,
  ON_SUBMIT_SEARCH_AUTHOR,
  ON_CHANGE_NAME,
  SAVE_MY_EVENTS,
  SAVE_EVENT_TO_MODIFY,
  ON_CHANGE_EVENT,
  ON_PUBLISHED,
  GET_COORD_LOCATION,
  EVENT_LOADING,
  SAVE_LAST_ID,
  REMOVE_LAST_ID,
} from 'src/actions/exploration';

const initialState = {
  explorations: [],
  togledModal: false,
  fieldZone: 0,
  departement: 'Choisisez un département',
  searchName: '',
  searchAuthor: '',
  myGeoloc: {},
  isEventLoading: true,
  name: '',
  myEvents: [],
  eventToModify: {},
  lastId: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_ALL_EVENTS: {
      return {
        ...state,
        explorations: action.payload.explorations,
      };
    }
    case ON_CLICK_MODAL: {
      return {
        ...state,
        togledModal: !state.togledModal,
      };
    }
    case ONCLICK_CLOSED_MODAL: {
      return {
        ...state,
        togledModal: !state.togledModal,
      };
    }
    case ON_CHANGE_AREA: {
      return {
        ...state,
        fieldZone: action.payload,
        departement: initialState.departement,
      };
    }
    case USER_GEOLOC: {
      return {
        ...state,
        myGeoloc: action.payload,
        isEventLoading: false,
      };
    }
    case ON_SUBMIT_SEARCH_NAME: {
      return {
        ...state,
        [action.key]: action.payload,
        searchAuthor: initialState.searchAuthor,
        departement: initialState.departement,
      };
    }
    case ON_SUBMIT_DEPARTEMENT: {
      return {
        ...state,
        [action.key]: action.payload,
        fieldZone: initialState.fieldZone,
        searchAuthor: initialState.searchAuthor,
        searchName: initialState.searchName,
      };
    }
    case ON_SUBMIT_SEARCH_AUTHOR: {
      return {
        ...state,
        [action.key]: action.payload,
        searchName: initialState.searchName,
        departement: initialState.departement,
      };
    }
    case ON_CHANGE_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    case SAVE_MY_EVENTS: {
      return {
        ...state,
        myEvents: action.payload,
        isEventLoading: false,
        name: initialState.name,
      };
    }
    case SAVE_EVENT_TO_MODIFY: {
      console.log(action.payload);
      return {
        ...state,
        eventToModify: action.payload,
      };
    }
    case ON_CHANGE_EVENT: {
      return {
        ...state,
        eventToModify: {
          ...state.eventToModify,
          [action.key]: action.payload,
        },
      };
    }
    case ON_PUBLISHED: {
      return {
        ...state,
        eventToModify: {
          ...state.eventToModify,
          is_published: !state.eventToModify.is_published,
        },
      };
    }
    case GET_COORD_LOCATION: {
      return {
        ...state,
        eventToModify: {
          ...state.eventToModify,
          geog: action.payload,
        },
      };
    }
    case EVENT_LOADING: {
      return {
        ...state,
        isEventLoading: initialState.isEventLoading,
      };
    }
    case SAVE_LAST_ID: {
      return {
        ...state,
        lastId: action.payload,
      };
    }
    case REMOVE_LAST_ID: {
      return {
        ...state,
        lastId: initialState.lastId,
      };
    }

    default:
      return state;
  }
};

export default reducer;
