import { connect } from 'react-redux';
import Participate from 'src/components/Exploration/Participate';
import { getEventData, onChangeEvent, onSubmitComment } from 'src/actions/exploration';

const mapStateToProps = (state) => ({
  eventToModify: state.exploration.eventToModify,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Participate);
