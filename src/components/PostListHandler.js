import connect from 'react-redux/es/connect/connect';
import { PostList } from './PostList';
import { filterChanged, handleClick } from '../redux/actions';

function mapStateToProps(state) {
  return {
    requested: state.requested,
    loadedUsers: state.loadedUsers,
    loadedPosts: state.loadedPosts,
    loadedComments: state.loadedComments,
    articles: state.articles,
    usersMap: state.usersMap,
    posts: state.posts,
    comments: state.comments,
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
