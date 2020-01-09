import { connect } from 'react-redux';
import PostList from './PostList';

const ImprovedPostList = connect(
  state => ({ posts: state.posts })
)(PostList);

export {
  ImprovedPostList as PostList,
};
