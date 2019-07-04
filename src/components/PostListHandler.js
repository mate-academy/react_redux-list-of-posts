import {connect} from 'react-redux';
import {loadPosts, loadUsers, loadComments} from '../redux/actions';
import PostList from './PostList';
import {selectPostMap, selectIsLoading, selectIsLoaded} from '../redux/selectors';

function mapStateToProps(state) {
  return {
    isLoading: selectIsLoading(state),
    isLoaded: selectIsLoaded(state),
    postMap: selectPostMap(state)
  };
};

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: () => dispatch(loadPosts()),
    loadUsers: () => dispatch(loadUsers()),
    loadComments: () => dispatch(loadComments())
  };
};

const PostListHandler = connect(mapStateToProps, mapDispatchToProps)(PostList);

export default PostListHandler;
