import { connect } from 'react-redux';
import Exploration from 'src/components/App';
import { checkUserLogged } from 'src/actions/user';

const mapStateToProps = (state) => ({
  isLogged: state.user.logged,
});
const mapDispatchToProps = (dispatch) => ({
  checkIsLogged: () => {
    dispatch(checkUserLogged());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Exploration);
