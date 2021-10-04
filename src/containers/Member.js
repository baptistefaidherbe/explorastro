import { connect } from 'react-redux';
import Member from 'src/components/Member';
import { getAllUser } from 'src/actions/user';
import { createConversation, getConversation } from 'src/actions/webSocket';

const mapStateToProps = (state) => ({
  allUser: state.user.allUser,
  onlineUser: state.user.onlineUser,
  conversations: state.message.conversations,
});
const mapDispatchToProps = (dispatch) => ({
  getAllUser: () => {
    dispatch(getAllUser());
  },
  createConversation: (sender, receiver) => {
    dispatch(createConversation(sender, receiver));
  },
  getConversation: (value) => {
    dispatch(getConversation(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Member);
