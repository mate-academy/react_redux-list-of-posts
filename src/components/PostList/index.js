import { connect } from 'react-redux';
import { PostList } from './PostList';

const Enhanced = connect(
  state => ({ posts: state.posts })
)(PostList);

export {
  Enhanced as PostList,
};
