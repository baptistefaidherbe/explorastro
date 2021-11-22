import {
  CHANGE_VALUE,
  SAVE_USER,
  LOGIN_ERROR,
  LOGOUT,
  CHANGE_VALUE_SETTING,
  SAVE_FRIEND_USER,
  SAVE_ALL_USER,
  SAVE_ONLINE_USER,
  SAVE_USER_BY_ID,
  RESET_NOTIFICATION,
} from 'src/actions/user';

const initialState = {
  userId: null,
  username: '',
  logged: false,
  avatarUrl: null,
  email: '',
  password: '',
  userToModify: {},
  loginError: '',
  allUser: [],
  onlineUser: [],
  userById: {},
  notificationSender: [],
  notificationCount: 0,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_VALUE: {
      return {
        ...state,
        [action.key]: action.value,
        loginError: '',
      };
    }
    case CHANGE_VALUE_SETTING: {
      return {
        ...state,
        userToModify: {
          ...state.userToModify,
          [action.key]: action.value,
        },
      };
    }
    case SAVE_USER: {
      return {
        ...state,
        userId: action.payload?.user?.id,
        username: action.payload?.user?.username,
        logged: action.payload?.logged,
        avatarUrl: action.payload?.user?.avatar_url,
        email: '',
        password: '',
        loginError: '',
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        loginError: action.payload,
      };
    }
    case LOGOUT: {
      localStorage.removeItem('user');
      return {
        ...initialState,
        logged: false,
      };
    }
    case SAVE_ALL_USER: {
      return {
        ...state,
        allUser: action.payload,
      };
    }
    case SAVE_ONLINE_USER: {
      return {
        ...state,
        onlineUser: action.payload,
      };
    }
    case SAVE_USER_BY_ID: {
      return {
        ...state,
        userById: action.payload,
        userToModify: action.payload,
        notificationCount: action.payload.notificationcount,
        notificationSender: [...state.notificationSender, action.payload.notificationsender],
      };
    }
    case RESET_NOTIFICATION: {
      return {
        ...state,
        notificationCount: 0,
        notificationSender: [],
      };
    }

    default:
      return state;
  }
};

export default reducer;
