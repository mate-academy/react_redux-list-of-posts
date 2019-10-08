import { connect } from 'react-redux';
import App from './App';
import { loadPosts, searchPost } from '../store';

const EnhancedApp = connect(
  state => ({
    isLoaded: state.isLoaded,
    isLoading: state.isLoading,
    hasError: state.hasError,
  }),
  dispatch => ({
    loadPosts: () => dispatch(loadPosts()),
    searchPost: value => dispatch(searchPost(value)),
  }),
)(App);

export {
  EnhancedApp as App,
};
