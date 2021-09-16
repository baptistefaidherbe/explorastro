import { connect } from 'react-redux';
import Header from 'src/components/Header';
import { logout } from 'src/actions/user';

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
