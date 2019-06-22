import connect from 'react-redux/es/connect/connect';
import { handleClick } from '../redux/actions';
import { CommentList } from './CommentList';

// function mapStateToProps(state) {
//   return {
//     requested: state.requested,
//     loadedUsers: state.loadedUsers,
//     loadedPosts: state.loadedPosts,
//     loadedComments: state.loadedComments,
//     articles: state.articles,
//     users: state.users,
//     posts: state.posts,
//     comments: state.comments,
//     postComponents: state.postComponents,
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
    handleClick: () => dispatch(handleClick()),
  };
}

export const CommentHandler = connect(null, mapDispatchToProps)(CommentList);
