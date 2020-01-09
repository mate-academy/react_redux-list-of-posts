import { connect } from 'react-redux';
import App from './App';
import { postsSelector } from '../../store/selectors';
import loadDatas from '../../store/fetch';

const mapStateToProps = state => ({
  preparedPosts: postsSelector(state),
  isLoading: state.isLoading,
  isLoaded: state.isLoaded,
  hasError: state.hasError,
});

const mapDispatchToProps = dispatch => ({
  loadDatas: () => dispatch(loadDatas()),
});

const AppWrap = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppWrap;
