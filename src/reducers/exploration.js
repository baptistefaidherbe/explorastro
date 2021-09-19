import { SAVE_ALL_EVENTS } from 'src/actions/exploration';

const initialState = {
  explorations: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_ALL_EVENTS: {
      return {
        ...state,
        explorations: action.payload.explorations,
      };
    }
    default:
      return state;
  }
};

export default reducer;
