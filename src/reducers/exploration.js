import {
  SAVE_ALL_EVENTS,
  ON_CLICK_MODAL,
  ONCLICK_CLOSED_MODAL,
  ON_CHANGE_AREA,
  ON_CHANGE,
  ON_SUBMIT,
  USER_GEOLOC,
} from 'src/actions/exploration';

const initialState = {
  explorations: [],
  togledModal: false,
  fieldZone: 0,
  departement: '',
  searchName: '',
  searchAuthor: '',
  myGeoloc: {},
  isEventLoading: true,
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
        searchName: initialState.searchName,
        departement: initialState.departement,
        searchAuthor: initialState.searchAuthor,
      };
    }
    case ON_CHANGE: {
      return {
        ...state,
        [action.key]: action.payload,
        departement: initialState.departement,
      };
    }
    case ON_SUBMIT: {
      return {
        ...state,
        [action.key]: action.payload,
        fieldZone: initialState.fieldZone,
      };
    }
    case USER_GEOLOC: {
      return {
        ...state,
        myGeoloc: action.payload,
        isEventLoading: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
