import { connect } from 'react-redux';

import App from './App';
import { getIsLoading, getHasError, getPosts } from '../../store';
import { loadData } from '../../store/dataLoadingReducer';
import { setQuery } from '../../store/queryReducer';

const mapStateToProps = state => ({
  posts: getPosts(state),
  isLoading: getIsLoading(state),
  hasError: getHasError(state),
});

export default connect(
  mapStateToProps,
  { loadData, setQuery }
)(App);
