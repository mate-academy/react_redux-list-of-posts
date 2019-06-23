import connect from 'react-redux/es/connect/connect';
import { commentItemRemove } from '../redux/actions';
import { Comment } from './Comment';

function mapDispatchToProps(dispatch) {
  return {
    commentItemRemove: id => dispatch(commentItemRemove(id)),
  };
}

export const CommentHandler = connect(null, mapDispatchToProps)(Comment);
