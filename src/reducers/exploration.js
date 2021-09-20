import {
  SAVE_ALL_EVENTS,
  ON_CLICK_MODAL,
  ONCLICK_CLOSED_MODAL,
  ON_CHANGE_AREA,
} from 'src/actions/exploration';

const initialState = {
  explorations: [],
  togledModal: false,
  fieldZone: 100,
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

      };
    }
    default:
      return state;
  }
};

export default reducer;
