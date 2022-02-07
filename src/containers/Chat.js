import { connect } from 'react-redux';
import Chat from 'src/components/Chat';
import {
  getConversation,
  getMessage,
  onChangeMessage,
  onSubmitMessage,
  saveArrivalMessage,
  toggleFriend,
  onchangeFriend,
} from 'src/actions/webSocket';
import { getUser } from 'src/actions/user';

const mapStateToProps = (state) => ({
  conversations: state.message.conversations,
  messages: state.message.messages,
  newMessage: state.message.newMessage,
  arrivalMessage: state.message.arrivalMessage,
  onlineUser: state.user.onlineUser,
  isToggleFriend: state.message.toggleFriend,
  searchFriend: state.message.searchFriend,
});
const mapDispatchToProps = (dispatch) => ({
  getConversation: (value) => {
    dispatch(getConversation(value));
  },
  getUser: (value) => {
    dispatch(getUser(value));
  },
  getMessage: (value) => {
    dispatch(getMessage(value));
  },
  onChangeMessage: (value) => {
    dispatch(onChangeMessage(value));
  },
  onSubmitMessage: (value, onlineREceiver) => {
    dispatch(onSubmitMessage(value, onlineREceiver));
  },
  saveArrivalMessage: (value) => {
    dispatch(saveArrivalMessage(value));
  },
  toggleFriend: () => {
    dispatch(toggleFriend());
  },
  onchangeFriend: (value) => {
    dispatch(onchangeFriend(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
