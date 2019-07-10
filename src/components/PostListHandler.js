import {connect} from 'react-redux';
import PostList from './PostList';
import {loadAction, findAction} from '../redux/action';

function mapStateToProps(state) {
  return {
    requested: state.requested,
    posts: state.listPosts,
    search: state.search,
    searchedPost: state.searchedPosts,
    comments: state.commentList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    load: () => dispatch(loadAction()),
    searchItem: (value) => dispatch(findAction(value))
  };
}

const PostListHandler = connect(mapStateToProps, mapDispatchToProps)(PostList);

export default PostListHandler;