import { connect } from 'react-redux';
import {
  getPosts,
  resetPostsFiltering,
  handleSearchInputChange,
  filterPosts,
} from '../store/store';
import App from './App';

const mapDispatchToProps = dispatch => ({
  getPosts: id => dispatch(getPosts(id)),
  resetPostsFiltering: () => dispatch(resetPostsFiltering()),
  handleSearchInputChange: value => dispatch(handleSearchInputChange(value)),
  filterPosts: () => dispatch(filterPosts()),
});

const enhancedApp = connect(
  state => ({
    isLoading: state.isLoading,
    isLoaded: state.isLoaded,
    isFiltered: state.isFiltered,
    searchWord: state.searchWord,
    posts: state.posts,
    filteredPosts: state.filteredPosts,
  }),
  mapDispatchToProps,
)(App);

export {
  enhancedApp as App,
}
