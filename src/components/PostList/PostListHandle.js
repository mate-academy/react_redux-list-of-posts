import { connect } from 'react-redux';
import PostList from './PostList';

const EnhancedPostList = connect(
  state => ({
    postsSorted: state.postsSorted,
    isSorted: state.isSorted,
  }),
)(PostList);

export default EnhancedPostList;
