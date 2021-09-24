import { connect } from 'react-redux';
import Create from 'src/components/Exploration/Create';
import {
  onSubmitName,
  onChangeName,
  getMyEvents,
} from 'src/actions/exploration';

const mapStateToProps = (state) => ({
  explorationcreate: state.exploration.myEvents.explorationcreate,
  isEventLoading: state.exploration.isEventLoading,
  name: state.exploration.name,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
