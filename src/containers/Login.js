import { connect } from 'react-redux';
import Login from 'src/components/Login';
import { changeValue, login } from 'src/actions/user';

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
  loginError: state.user.loginError,
});
const mapDispatchToProps = (dispatch) => ({
  changeField: (value, key) => {
    dispatch(changeValue(value, key));
  },
  handleLogin: () => {
    dispatch(login());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
