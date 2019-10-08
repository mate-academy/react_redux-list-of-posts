import connect from 'react-redux/es/connect/connect';
import { removeComment } from '../redux/actions';
import { Comment } from './Comment';

function mapDispatchToProps(dispatch) {
  return {
    commentItemRemove: id => dispatch(removeComment(id)),
  };
}

export const CommentHandler = connect(null, mapDispatchToProps)(Comment);
