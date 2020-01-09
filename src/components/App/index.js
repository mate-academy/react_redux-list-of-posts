import { connect } from 'react-redux';
import App from './App';
import { loadDatas } from '../../store/functions';
import { postsSelector } from '../../store/selectors';

const mapStateToProps = state => ({
  preparedPosts: postsSelector(state),
  isLoading: state.isLoading,
  hasError: state.hasError,
  loaded: state.loaded,
  val: state.val,
});

const mapDispatchToProps = dispatch => ({
  loadDatas: () => dispatch(loadDatas()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
