import { connect } from 'react-redux';
import App from './App';
import {
  receivePosts, addTextForFilter, sortPosts, resetFilter,
} from './store/index';

const mapDispatchToProps = dispatch => ({
  receivePosts: () => dispatch(receivePosts()),
  addTextForFilter: event => dispatch(addTextForFilter(event)),
  sortPosts: event => dispatch(sortPosts(event)),
  resetFilter: () => dispatch(resetFilter()),
});

const EnhancedApp = connect(
  state => ({
    isLoading: state.isLoading,
    isInitialized: state.isInitialized,
    hasError: state.hasError,
    templateForFilter: state.templateForFilter,
  }),
  mapDispatchToProps,
)(App);

export default EnhancedApp;
