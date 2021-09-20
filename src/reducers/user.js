import {
  CHANGE_VALUE, SAVE_USER, LOGIN_ERROR, LOGOUT,
} from 'src/actions/user';

const initialState = {
  userId: null,
  username: '',
  logged: false,
  avatarUrl: null,
  email: '',
  password: '',
  loginError: '',
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
    default:
      return state;
  }
};

export default reducer;
