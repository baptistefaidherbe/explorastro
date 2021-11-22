import {
  GET_ALL_USER,
  saveAllUser,
  GET_USER_BY_ID,
  saveUserById,
  PROFIL_SUBMIT_SETTING,
  UPLOAD_USER_ILLUSTRATION,
  callGetUserById,
} from 'src/actions/user';
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
    case GET_USER_BY_ID: {
      const getUserById = async () => {
        const id = action.payload;
        try {
          const resp = await api.get(`/user/${id}`);
          console.log(id)
          store.dispatch(saveUserById(resp.data));
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.response);
        }
      };
      getUserById();
      break;
    }
    case PROFIL_SUBMIT_SETTING: {
      const submitSetting = async () => {
        const state = store.getState();
        const { id } = action;
        const data = {

          firstname: state.user.userToModify.firstname,
          lastname: state.user.userToModify.lastname,
          city: state.user.userToModify.city,
          bio: state.user.userToModify.bio,
          zipcode: state.user.userToModify.zipcode,

        };

        const email = {

          email: state.user.userToModify.email,
        };

        const password = {

          password: state.user.userToModify.password,
        };

        try {
          await api.patch(`/user/${id}/update/info`, data);
          await api.patch(`/user/${id}/update/email`, email);
          await api.patch(`/user/${id}/update/password`, password);
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.response);
        }
      };
      submitSetting();
      break;
    }
    case UPLOAD_USER_ILLUSTRATION: {
      const formData = new FormData();
      formData.append('image', action.payload, action.payload.name);

      const handleUploadIllustration = async () => {
        try {
          await api.post(`/user/${action.id}/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(action.id)
          store.dispatch(callGetUserById(action.id));
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.error(error.response);
        }
      };
      handleUploadIllustration();
      break;
    }

    default:
      next(action);
  }
};

export default user;
