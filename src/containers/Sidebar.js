import { connect } from 'react-redux';
import Sidebar from 'src/components/Sidebar';
import { getMyEventsParticipateOrganise } from 'src/actions/exploration';

const mapStateToProps = (state) => ({
  username: state.user.username,
  explorationParticipate: state.exploration.myEvents.explorationparticipate,
  explorationCreate: state.exploration.myEvents.explorationcreate,
});
const mapDispatchToProps = (dispatch) => ({
  getMyEventsParticipateOrganise: () => {
    dispatch(getMyEventsParticipateOrganise());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
