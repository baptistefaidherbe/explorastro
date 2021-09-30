import { connect } from 'react-redux';
import FormEvent from 'src/components/Exploration/Create/FormEvent';
import {
  getEventData,
  onChangeEvent,
  onPublished,
  getCoordLocation,
  onSubmitEvent,
  onClickModal,
  uploadExplorationIllustration,
  onClickDeleteComment,
} from 'src/actions/exploration';

const mapStateToProps = (state) => ({
  eventToModify: state.exploration.eventToModify,
  togledModal: state.exploration.togledModal,
});
const mapDispatchToProps = (dispatch) => ({
  getEventData: (value) => {
    dispatch(getEventData(value));
  },
  onChange: (value, key) => {
    dispatch(onChangeEvent(value, key));
  },
  onPublished: () => {
    dispatch(onPublished());
  },
  getCoordLocation: (value) => {
    dispatch(getCoordLocation(value));
  },
  onSubmit: (value) => {
    dispatch(onSubmitEvent(value));
  },
  onClickModal: () => {
    dispatch(onClickModal());
  },
  uploadIllustration: (value, id) => {
    dispatch(uploadExplorationIllustration(value, id));
  },
  onClickDelete: (id) => {
    dispatch(onClickDeleteComment(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FormEvent);
