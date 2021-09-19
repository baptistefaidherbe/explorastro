import { connect } from 'react-redux';
import Navbar from 'src/components/Navbar';
import { logout } from 'src/actions/user';

const mapStateToProps = (state) => ({
  username: state.user.username,
});
const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
