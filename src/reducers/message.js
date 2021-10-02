import { SAVE_CONVERSATION, SAVE_MESSAGE, ON_CHANGE_MESSAGE, SAVE_NEW_MESSAGE, SAVE_ARRIVAL_MESSAGE } from 'src/actions/webSocket';

const initialState = {
  conversations: [],
  messages: [],
  newMessage: '',
  arrivalMessage: {},
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_CONVERSATION: {
      return {
        ...state,
        conversations: action.payload,
      };
    }
    case SAVE_MESSAGE: {
      return {
        ...state,
        messages: action.payload,
      };
    }
    case ON_CHANGE_MESSAGE: {
      return {
        ...state,
        newMessage: action.payload,
      };
    }
    case SAVE_NEW_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action.payload],
        newMessage: initialState.newMessage,
      };
    }
    case SAVE_ARRIVAL_MESSAGE: {
      return {
        ...state,
        arrivalMessage: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
