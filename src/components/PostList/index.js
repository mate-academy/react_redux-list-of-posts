import { connect } from 'react-redux';
import PostList from './PostList';

const PostListHandler = connect(
  state => ({ posts: state.posts }),
)(PostList);

export {
  PostListHandler as PostList,
};
