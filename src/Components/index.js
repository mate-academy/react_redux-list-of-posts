import { connect } from 'react-redux';
import App from '../App';
import {
  getIsLoaded,
  getIsLoading,
  getHasError,
  getPosts,
} from './Store';
import { loadData } from './Store/dataLoadingReducer';
import { setQuery } from './Store/queryReducer';

const mapStateToProps = state => ({
  posts: getPosts(state),
  isLoading: getIsLoading(state),
  hasError: getHasError(state),
  isLoaded: getIsLoaded(state),
});

export default connect(mapStateToProps, {
  loadData, setQuery,
})(App);
