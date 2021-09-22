import {
  SAVE_ALL_EVENTS,
  ON_CLICK_MODAL,
  ONCLICK_CLOSED_MODAL,
  ON_CHANGE_AREA,
  USER_GEOLOC,
  ON_SUBMIT_SEARCH_NAME,
  ON_SUBMIT_DEPARTEMENT,
  ON_SUBMIT_SEARCH_AUTHOR,
} from "src/actions/exploration";

const initialState = {
  explorations: [],
  togledModal: false,
  fieldZone: 0,
  departement: "Choisisez un département",
  searchName: "",
  searchAuthor: "",
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
        fieldZone: initialState.fieldZone,
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
        fieldZone: initialState.fieldZone,
        searchName: initialState.searchName,
        departement: initialState.departement,
      };
    }
    default:
      return state;
  }
};

export default reducer;
