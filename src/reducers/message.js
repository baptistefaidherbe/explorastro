import {
  SAVE_CONVERSATION,
  SAVE_MESSAGE,
  ON_CHANGE_MESSAGE,
  SAVE_NEW_MESSAGE,
  SAVE_ARRIVAL_MESSAGE,
  TOGGLE_FRIEND,
  GET_NOTIFICATION,
  ON_CLICK_NOTIF,
  ON_CLICK_READ,
  ON_CHANGE_FRIEND,
} from 'src/actions/webSocket';

const initialState = {
  conversations: [],
  messages: [],
  newMessage: '',
  arrivalMessage: {},
  toggleFriend: true,
  notification: 0,
  notificationSender: [],
  toggleNotif: false,
  searchFriend: '',
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
    case TOGGLE_FRIEND: {
      return {
        ...state,
        toggleFriend: !state.toggleFriend,
      };
    }

    case GET_NOTIFICATION: {
      return {
        ...state,
        notification: state.notification + 1,
        notificationSender: [...state.notificationSender, action.payload],
      };
    }
    case ON_CLICK_NOTIF: {
      return {
        ...state,
        toggleNotif: !state.toggleNotif,
      };
    }
    case ON_CLICK_READ: {
      return {
        ...state,
        notificationSender: initialState.notificationSender,
        notification: initialState.notification,
      };
    }
    case ON_CHANGE_FRIEND: {
      return {
        ...state,
        searchFriend: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
