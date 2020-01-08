import { connect } from 'react-redux';
import PostList from './PostList';

const newPostList = connect(state => ({
  preparedPosts: state.preparedPosts,
  comments: state.comments,
}))(PostList);

export { newPostList as PostList };
