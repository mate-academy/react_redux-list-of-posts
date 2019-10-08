import connect from 'react-redux/es/connect/connect';
import { PostList } from './PostList';
import { filterChanged, loadTodos } from '../redux/actions';

function mapStateToProps(state) {
  return {
    requested: state.requested,
    usersLoaded: state.usersLoaded,
    postsLoaded: state.postsLoaded,
    commentsLoaded: state.commentsLoaded,
    posts: state.posts,
    filteredPosts: state.filteredPosts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick: () => dispatch(loadTodos()),
    filterChanged: event => dispatch(filterChanged(event.target.value)),
  };
}

export const PostListHandler = connect(mapStateToProps, mapDispatchToProps)(PostList);
