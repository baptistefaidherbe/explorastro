import { connect } from "react-redux";
import ListParticipate from "src/components/Exploration/Participate/ListParticipate";
import { getMyEventsParticipateOrganise } from "src/actions/exploration";

const mapStateToProps = (state) => ({
  explorationParticipate: state.exploration.myEvents.explorationparticipate,
  isEventLoading: state.exploration.isEventLoading,
});
const mapDispatchToProps = (dispatch) => ({
  getMyEventsParticipateOrganise: () => {
    dispatch(getMyEventsParticipateOrganise());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListParticipate);
