import connect from 'react-redux/es/connect/connect';
import { PostList } from './PostList';
import { filterChanged, handleClick } from '../redux/actions';

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
    handleClick: () => dispatch(handleClick()),
    filterChanged: event => dispatch(filterChanged(event)),
  };
}

export const PostListHandler = connect(mapStateToProps, mapDispatchToProps)(PostList);
