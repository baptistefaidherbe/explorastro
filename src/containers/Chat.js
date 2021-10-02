import { connect } from 'react-redux';
import Chat from 'src/components/Chat';
import {
  getConversation, getMessage, onChangeMessage, onSubmitMessage, saveArrivalMessage,
} from 'src/actions/webSocket';
import { getUser } from 'src/actions/user';

const mapStateToProps = (state) => ({
  conversations: state.message.conversations,
  messages: state.message.messages,
  newMessage: state.message.newMessage,
  arrivalMessage: state.message.arrivalMessage,
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
  onSubmitMessage: (value) => {
    dispatch(onSubmitMessage(value));
  },
  saveArrivalMessage: (value) => {
    console.log('ici', value)
    dispatch(saveArrivalMessage(value));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
