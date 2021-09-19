import { connect } from "react-redux";
import Participate from "src/components/Exploration/Participate";
import { getAllEvents } from "src/actions/exploration";

const mapStateToProps = (state) => ({
  explorations: state.exploration.explorations,
});
const mapDispatchToProps = (dispatch) => ({
  getEvents: () => {
    dispatch(getAllEvents());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Participate);
