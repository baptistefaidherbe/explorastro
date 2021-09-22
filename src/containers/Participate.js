import { connect } from 'react-redux';
import Participate from 'src/components/Exploration/Participate';
import {
  getAllEvents,
  onClickModal,
  onClickClosedModal,
  onChangeArea,
  onChange,
  onSubmitSearchName,
  onSubmitDepartement,
  onSubmitSearchAuthor,
  userGeoloc,
} from 'src/actions/exploration';

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
    switch (key) {
      case 'searchName':
        dispatch(onSubmitSearchName(value, key));
        break;
      case 'departement':
        dispatch(onSubmitDepartement(value, key));
        break;
      case 'searchAuthor':
        dispatch(onSubmitSearchAuthor(value, key));
        break;
      default:
    }
    dispatch(onChange(value, key));
  },
  onSubmit: (value, key) => {
    switch (key) {
      case 'searchName':
        dispatch(onSubmitSearchName(value, key));
        break;
      case 'departement':
        dispatch(onSubmitDepartement(value, key));
        break;
      case 'searchAuthor':
        dispatch(onSubmitSearchAuthor(value, key));
        break;
      default:
    }
  },
  userGeoloc: (value) => {
    dispatch(userGeoloc(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Participate);
