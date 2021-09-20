import { connect } from 'react-redux';
import Sidebar from 'src/components/Sidebar';

const mapStateToProps = (state) => ({
  username: state.user.username,
});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
