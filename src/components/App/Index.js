import { connect } from 'react-redux';
import App from './App';
import {
  filterListOfPosts,
  loadData,
} from '../../store/store';

const mapStateToProps = state => ({
  postListFromServer: state.postListFromServer,
  postList: state.postList,
  filteredList: state.filteredList,
  isLoading: state.isLoading,
  isLoaded: state.isLoaded,
  isError: state.isError,
  buttonText: state.buttonText,
});

const mapDispatchToProps = dispatch => ({
  loadDataFromServer: () => dispatch(loadData()),
  filterList: searchStr => dispatch(filterListOfPosts(searchStr)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
