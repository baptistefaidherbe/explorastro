import { connect } from "react-redux";
import Comment from "src/components/Exploration/Create/Comment";
import { onClickDeleteComment } from "src/actions/exploration";

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  onClickDelete: (id, idEvent) => {
    dispatch(onClickDeleteComment(id, idEvent));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
