import { connect } from "react-redux";
import Member from "src/components/Member";
import { getAllUser } from "src/actions/user";

const mapStateToProps = (state) => ({
  allUser: state.user.allUser,
  onlineUser: state.user.onlineUser,
});
const mapDispatchToProps = (dispatch) => ({
  getAllUser: () => {
    dispatch(getAllUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Member);
