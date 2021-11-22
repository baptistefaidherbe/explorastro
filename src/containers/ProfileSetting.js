import { connect } from 'react-redux';
import ProfileSetting from 'src/components/ProfileSetting';
import {
  getUserById, changeValueSetting, submitProfilSetting, uploadUserIllustration,
} from 'src/actions/user';

const mapStateToProps = (state) => ({
  userToModify: state.user.userToModify,
});
const mapDispatchToProps = (dispatch) => ({
  getUserById: (id) => {
    dispatch(getUserById(id));
  },
  onChange: (value, key) => {
    dispatch(changeValueSetting(value, key));
  },
  onSubmit: (id) => {
    dispatch(submitProfilSetting(id));
  },
  uploadIllustration: (value, id) => {
    dispatch(uploadUserIllustration(value, id));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSetting);
