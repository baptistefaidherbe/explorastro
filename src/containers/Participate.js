import { connect } from "react-redux";
import Participate from "src/components/Exploration/Participate";
import {
  getEventData,
  onChangeEvent,
  onSubmitComment,
  onClickParticipate,
  onClickNotParticipate,
  getWeather,
} from "src/actions/exploration";

const mapStateToProps = (state) => ({
  eventToModify: state.exploration.eventToModify,
  sendComment: state.exploration.eventToModify.sendComment,
  isEventLoading: state.exploration.isEventLoading,
  weather: state.exploration.weather,
});
const mapDispatchToProps = (dispatch) => ({
  getEventData: (value) => {
    dispatch(getEventData(value));
  },
  onChange: (value, key) => {
    dispatch(onChangeEvent(value, key));
  },
  onSubmit: (value) => {
    dispatch(onSubmitComment(value));
  },
  onClickParticipate: (id) => {
    dispatch(onClickParticipate(id));
  },
  onClickNotParticipate: (id) => {
    dispatch(onClickNotParticipate(id));
  },
  getWeather: (value) => {
    dispatch(getWeather(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Participate);
