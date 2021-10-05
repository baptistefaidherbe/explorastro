import { connect } from "react-redux";
import Navbar from "src/components/Navbar";
import { logout } from "src/actions/user";
import { onClickNotif, onClickRead } from "src/actions/webSocket";

const mapStateToProps = (state) => ({
  username: state.user.username,
  notification: state.message.notification,
  notificationSender: state.message.notificationSender,
  toggleNotif: state.message.toggleNotif,
});
const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => {
    dispatch(logout());
  },
  onClickNotif: () => {
    dispatch(onClickNotif());
  },
  onClickRead: () => {
    dispatch(onClickRead());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
