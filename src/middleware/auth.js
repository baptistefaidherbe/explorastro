import {
  LOGIN,
  saveUser,
  loginError,
  CHECK_USER_LOGGED,
} from 'src/actions/user';

import api from './utils/api';

const auth = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      const state = store.getState();
      const data = {
        email: state.user.email,
        password: state.user.password,
      };
      const login = async () => {
        try {
          const response = await api.post('/login', data);
          if (response.data.login) {
            localStorage.setItem('user', JSON.stringify(response.data.login));

            api.defaults.headers.common.authorization = `Bearer ${response.data.login.token}`;
          }

          store.dispatch(saveUser(response.data.login));
        }
        catch (error) {
          store.dispatch(loginError(error.response.data));
        }
      };
      login();
      break;
    }
    case CHECK_USER_LOGGED: {
      const user = JSON.parse(localStorage.getItem('user'));
      api.defaults.headers.common.authorization = `BEARER ${user?.token}`;
      store.dispatch(saveUser(user));
      break;
    }

    default:
      next(action);
  }
};

export default auth;
