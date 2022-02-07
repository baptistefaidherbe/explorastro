import { connect } from 'react-redux';
import Exploration from 'src/components/App';
import { checkUserLogged, getUserById } from 'src/actions/user';
import { wsConnect } from 'src/actions/webSocket';

const mapStateToProps = (state) => ({
  isLogged: state.user.logged,
});
const mapDispatchToProps = (dispatch) => ({
  checkIsLogged: () => {
    dispatch(checkUserLogged());
  },
  wsConnect: () => {
    dispatch(wsConnect());
  },
  getUserById: (id) => {
    dispatch(getUserById(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Exploration);
