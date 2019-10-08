import { connect } from 'react-redux';
import PostList from './PostList';

const enhancedPostList = connect(
  state => ({
    posts: state.isFiltered ? state.filteredPosts : state.posts,
  }),
)(PostList);

export {
  enhancedPostList as PostList,
}
