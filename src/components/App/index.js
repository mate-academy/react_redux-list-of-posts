import { connect } from 'react-redux';
import App from './App';
import {
  loading, getData, loadData, searchPost,
} from '../../store';

const mapDispatchToProps = dispatch => ({
  loading: () => dispatch(loading()),
  getData: () => dispatch(getData()),
  loadData: () => dispatch(loadData()),
  searchPost: e => dispatch(searchPost(e)),
});

const newApp = connect(
  state => ({
    preparedPosts: state.preparedPosts,
    originalPosts: state.originalPosts,
    users: state.users,
    comments: state.comments,
    isLoading: state.isLoading,
  }),
  mapDispatchToProps
)(App);

export { newApp as App };
