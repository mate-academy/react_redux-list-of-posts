import { connect } from 'react-redux';
import App from './App';
import { resetPosts, getData, filterPosts } from '../../Store';

const mapDispatchToProps = dispatch => ({
  resetPosts: () => dispatch(resetPosts()),
  getData: () => dispatch(getData()),
  filterPosts: value => dispatch(filterPosts(value)),
});

const ImprovedApp = connect(
  state => ({
    originalPosts: state.originalPosts,
    isLoading: state.isLoading,
  }),
  mapDispatchToProps,
)(App);

export {
  ImprovedApp as App,
};
