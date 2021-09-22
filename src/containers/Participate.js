import { connect } from "react-redux";
import Participate from "src/components/Exploration/Participate";
import {
  getAllEvents,
  onClickModal,
  onClickClosedModal,
  onChangeArea,
  onChange,
  onSubmit,
  userGeoloc,
} from "src/actions/exploration";

const mapStateToProps = (state) => ({
  explorations: state.exploration.explorations,
  togledModal: state.exploration.togledModal,
  fieldZone: state.exploration.fieldZone,
  departement: state.exploration.departement,
  searchName: state.exploration.searchName,
  searchAuthor: state.exploration.searchAuthor,
  myGeoloc: state.exploration.myGeoloc,
  isEventLoading: state.exploration.isEventLoading,
});
const mapDispatchToProps = (dispatch) => ({
  getEvents: () => {
    dispatch(getAllEvents());
  },
  onClickModal: () => {
    dispatch(onClickModal());
  },
  onClickClosedModal: () => {
    dispatch(onClickClosedModal());
  },
  onChangeArea: (zone) => {
    dispatch(onChangeArea(zone));
  },
  onChange: (value, key) => {
    dispatch(onChange(value, key));
  },
  onSubmit: (value, key) => {
    dispatch(onSubmit(value, key));
  },
  userGeoloc: (value) => {
    dispatch(userGeoloc(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Participate);
