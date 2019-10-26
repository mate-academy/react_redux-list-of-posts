import { connect } from 'react-redux';
import PostList from './PostList';

const EnhancedPostList = connect(
  state => ({
    postsSorted: state.postsSorted,
  }),
)(PostList);

export default EnhancedPostList;
