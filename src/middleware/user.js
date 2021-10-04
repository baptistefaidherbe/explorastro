import { GET_ALL_USER, saveAllUser } from 'src/actions/user';
import api from './utils/api';

const user = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_ALL_USER: {
      const getAllUser = async () => {
        try {
          const resp = await api.get('/user');
          store.dispatch(saveAllUser(resp.data));
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.response);
        }
      };
      getAllUser();
      break;
    }

    default:
      next(action);
  }
};

export default user;
