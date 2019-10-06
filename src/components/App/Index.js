import { connect } from 'react-redux';
import App from './App';
import {
  loadData,
} from '../../store/store';

const mapStateToProps = state => ({

  postListFromServer: state.postListFromServer,
  postList: state.postListFromServer,
  filteredList: state.postListFromServer,
  isLoading: state.isLoading,
  isLoaded: state.isLoaded,
  isError: state.isError,
  buttonText: state.buttonText,
});

const mapDispatchToProps = dispatch => ({
  loadDataFromServer: () => dispatch(loadData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
