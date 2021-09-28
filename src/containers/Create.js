import { connect } from 'react-redux';
import Create from 'src/components/Exploration/Create';
import {
  onSubmitName,
  onChangeName,
  getMyEvents,
  onDeleteEvent,
  eventLoading,
  removLastID,
} from 'src/actions/exploration';

const mapStateToProps = (state) => ({
  explorationcreate: state.exploration.myEvents.explorationcreate,
  isEventLoading: state.exploration.isEventLoading,
  name: state.exploration.name,
  lastId: state.exploration.lastId,
});
const mapDispatchToProps = (dispatch) => ({
  onSubmit: () => {
    dispatch(onSubmitName());
  },
  onChange: (value) => {
    dispatch(onChangeName(value));
  },
  getMyEvents: () => {
    dispatch(getMyEvents());
  },
  onDelete: (value) => {
    dispatch(onDeleteEvent(value));
  },
  eventLoading: () => {
    dispatch(eventLoading());
  },
  removLastID: () => {
    dispatch(removLastID());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
