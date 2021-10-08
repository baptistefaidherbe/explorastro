import { connect } from "react-redux";
import Profile from "src/components/Profile";
import { getUserById } from "src/actions/user";
import { createConversation, getConversation } from 'src/actions/webSocket';

const mapStateToProps = (state) => ({
  userById: state.user.userById,
  conversations: state.message.conversations,
  isEventLoading: state.message.isEventLoading,
});
const mapDispatchToProps = (dispatch) => ({
  getUserById: (id) => {
    dispatch(getUserById(id));
  },
  createConversation: (sender, receiver, receiverName) => {
    dispatch(createConversation(sender, receiver, receiverName));
  },
  getConversation: (value) => {
    dispatch(getConversation(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
